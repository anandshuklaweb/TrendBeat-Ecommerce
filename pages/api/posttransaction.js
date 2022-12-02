import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
const PaytmChecksum = require("paytmchecksum");

const handler = async (req, res) => {
  let order;

  var paytmChecksum = "";

  var paytmParams = {};

  const received_data = req.body;

  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }

  var isValidChecksum = PaytmChecksum.verifySignature(
    paytmParams,
    process.env.PAYTM_MKEY,
    paytmChecksum
  );
  if (!isValidChecksum) {
    res.status(500).send("Some error occured!");
    return;
  }

  // Update status into Orders table after checking the transaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      {
        status: "Paid",
        paymentInfo: JSON.stringify(req.body),
        transactionid: req.body.TXNID,
      }
    );

    let products = order.products;
    for (let slug in products) {
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } }
      );
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      {
        status: "Pending",
        paymentInfo: JSON.stringify(req.body),
        transactionid: req.body.TXNID,
      }
    );
  }

  res.redirect(`/order?id=${order._id}&clearCart=1`, 200);
};

export default connectDb(handler);

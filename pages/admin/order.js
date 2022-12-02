import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme/theme";
import FullLayout from "./src/layouts/FullLayout";
import Order from "../../models/Order";
import mongoose from "mongoose";
import { Grid } from "@mui/material";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "./src/components/baseCard/BaseCard";
import Link from "next/link";
import Moment from "react-moment";
import "moment-timezone"; // require
import VisibilityIcon from "@mui/icons-material/Visibility";

const OrderDetails = ({ order, subTotal }) => {
  const products = order.products;
  const [date, setDate] = useState();
  useEffect(() => {
    console.log(order);
    const d = new Date(order.createdAt);
    setDate(d);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>
        {`
          footer {
            display: none;
          }
        `}
      </style>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                TRENDBEAT
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id: {order.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Your order has been successfully placed. Your Payment status is{" "}
                <span className="font-semibold text-blue-600">
                  {order.status}
                </span>
              </p>

              <p className="leading-relaxed mb-4">
                Order placed on:{" "}
                {date &&
                  date.toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </p>

              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{
                  mt: 0,
                  whiteSpace: "nowrap",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography color="textSecondary" variant="h5">
                        Product name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h5">
                        Quantity
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h5">
                        Total
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(products).map((key) => {
                    return (
                      <TableRow key={key}>
                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {products[key].name} ({products[key].size}/{" "}
                            {products[key].variant})
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {products[key].qty}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            ₹{products[key].price} X {products[key].qty} = ₹
                            {products[key].price * products[key].qty}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="flex flex-col mt-4">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal: ₹{order.amount}
                </span>
              </div>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default OrderDetails;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

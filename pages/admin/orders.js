import React, { useEffect } from "react";
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

const Orders = ({ orders }) => {
  useEffect(() => {
    console.log(orders);
  });

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
            <BaseCard title="All Orders">
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
                        #Order Id
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h5">
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h5">
                        Amount
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h5">
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h5">
                        Details
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {order.orderId}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {order.email}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {order.amount}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          <Moment format="DD-MM-YYYY HH:mm">
                            {order.updatedAt}
                          </Moment>
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          <Link href={"/admin/order?id=" + order._id}>
                            <VisibilityIcon />
                          </Link>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find().sort({
    createdAt: -1,
  });
  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) },
  };
}

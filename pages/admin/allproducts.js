import React, { useEffect } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme/theme";
import FullLayout from "./src/layouts/FullLayout"
import Product from '../../models/Product';
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
import BaseCard from './src/components/baseCard/BaseCard';


const AllProducts = ({ products }) => {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>
                {`
            footer{
                display:none;
            }
        `}
            </style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="All Products">
                            <Table
                                stickyHeader aria-label="sticky table"
                                sx={{
                                    mt: 0,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <TableHead>
                                    <TableRow>

                                        <TableCell>
                                            <Typography color="textSecondary" variant="h5">
                                                Image
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography color="textSecondary" variant="h5">
                                                Title
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h5">
                                                Category
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h5">
                                                Color
                                            </Typography>
                                        </TableCell>
                                        <TableCell >
                                            <Typography color="textSecondary" variant="h5">
                                                Size
                                            </Typography>
                                        </TableCell>
                                        <TableCell >
                                            <Typography color="textSecondary" variant="h5">
                                                Price
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h5">
                                                Available Qty
                                            </Typography>
                                        </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product._id}>


                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    <img
                                                        src={product.img}
                                                        alt={product.img}
                                                        width="30"
                                                        height="30"
                                                        className="roundedCircle"
                                                    />

                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {product.title}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {product.category}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {product.color}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {product.size}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {product.price}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {product.availableQty}
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
    )
}

export default AllProducts

export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let products = await Product.find();
    return {
        props: { products: JSON.parse(JSON.stringify(products)) }
    }
}
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme/theme";
import FullLayout from "./src/layouts/FullLayout";
import { Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "./src/components/baseCard/BaseCard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Add = () => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Request to add a product using fetch Api

    const data = { ...form };

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    console.log(response);

    setForm({
      title: "",
      slug: "",
      category: "",
      size: "",
      color: "",
      img: "",
      price: "",
      availableQty: "",
      desc: "",
    });
    toast.success("Product has been added!", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
        <ToastContainer
          position="top-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add a Product">
              <Stack spacing={3}>
                <TextField
                  onChange={handleChange}
                  value={form.title ? form.title : ""}
                  name="title"
                  label="Title"
                  variant="outlined"
                />
                <TextField
                  onChange={handleChange}
                  value={form.slug ? form.slug : ""}
                  name="slug"
                  label="Slug"
                  variant="outlined"
                />
                <TextField
                  onChange={handleChange}
                  value={form.desc ? form.desc : ""}
                  name="desc"
                  label="Description"
                  multiline
                  rows={4}
                />
                <TextField
                  onChange={handleChange}
                  value={form.img ? form.img : ""}
                  name="img"
                  label="Image"
                  variant="outlined"
                />
                <TextField
                  onChange={handleChange}
                  value={form.category ? form.category : ""}
                  name="category"
                  label="Category"
                  variant="outlined"
                />
                <TextField
                  onChange={handleChange}
                  value={form.size ? form.size : ""}
                  name="size"
                  label="Size"
                  variant="outlined"
                />
                <TextField
                  onChange={handleChange}
                  value={form.color ? form.color : ""}
                  name="color"
                  label="Color"
                  variant="outlined"
                />
                <TextField
                  onChange={handleChange}
                  value={form.price ? form.price : ""}
                  name="price"
                  label="Price"
                  variant="outlined"
                />
                <TextField
                  onChange={handleChange}
                  value={form.availableQty ? form.availableQty : ""}
                  name="availableQty"
                  label="Available Quantity"
                  variant="outlined"
                />
              </Stack>
              <br />
              <Button onClick={submitForm} variant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Add;

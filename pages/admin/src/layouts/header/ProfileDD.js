import React from "react";

import { Box, Typography } from "@mui/material";
const ProfileDD = () => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Hi,
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            Anand
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDD;

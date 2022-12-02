import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme/theme";
import FullLayout from "./src/layouts/FullLayout";

export default function Index() {
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
        <Grid container spacing={0}></Grid>
      </FullLayout>
    </ThemeProvider>
  );
}

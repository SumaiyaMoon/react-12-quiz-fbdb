import { useState } from "react";
import SMButton from "../components/SMButton";
import SMInput from "../components/SMInput";
import { fbLogin } from "../config/firebase/firebase-methods";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Box, Paper, Grid } from "@mui/material";

export default function Login() {
  const [model, setModel] = useState<any>({});

  const fillModel = (key: string, val: any) => {
    model[key] = val;
    setModel({ ...model });
  };

  const navigate = useNavigate();
  let LoginUser = () => {
    console.log(model);
    fbLogin(model)
      .then((res) => {
        console.log(res);
        navigate("/Quiz");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      className="bg_img_login"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper className="paperColor" elevation={3} sx={{ p: 4, maxWidth: 400 }}>
        <Typography variant="h6" className="fw-bold" gutterBottom>
          Login
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SMInput
                value={model.email}
                textFieldId="email"
                textFieldLabel="Email"
                textFieldVariant="outlined"
                type="email"
                onChange={(e: any) => fillModel("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <SMInput
                value={model.password}
                textFieldId="password"
                textFieldLabel="Password"
                textFieldVariant="outlined"
                type="password"
                onChange={(e: any) => fillModel("password", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <SMButton
                btnType="button"
                onClick={LoginUser}
                btnValue="Login"
              />
              <Typography>
                Don't have an account?{" "}
                <Link to="/SignUp" className="text-light">
                  SingUp
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

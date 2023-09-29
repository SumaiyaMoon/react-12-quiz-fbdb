import { Box, Typography, Paper, Grid } from "@mui/material";
import SMInput from "../components/SMInput";
import SMButton from "../components/SMButton";
import { useState } from "react";
import { fbSignUp } from "../config/firebase/firebase-methods";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [model, setModel] = useState<any>({});
  const fillModel = (key: string, val: string) => {
    model[key] = val;
    setModel({ ...model });
  };

  const navigate = useNavigate();

  let signUpUser = () => {
    model.role ="user"
    console.log(model);
    fbSignUp(model)
      .then((res: any) => {
        if(res.role == "admin"){
          navigate("/AdminPanel");
        } else{
          navigate("/Quiz");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper className="paperColor" elevation={3} sx={{ p: 3, maxWidth: 400 }}>
        <Typography variant="h6" className="fw-bold" gutterBottom>
          SignUp
        </Typography>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <SMInput
                value={model.username}
                textFieldId="username"
                textFieldLabel="User Name"
                textFieldVariant="outlined"
                type="text"
                onChange={(e: any) => fillModel("username", e.target.value)}
              />
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
              <SMInput
                textFieldId="password"
                textFieldLabel="Confirm Password"
                textFieldVariant="outlined"
                type="password"
              />
            </Grid>
            <Grid
              item
              xs={12}
              className="d-flex justigy-content-between align-items-center gap-5"
            >
              <SMButton
                btnType="button"
                btnValue="SignUp"
                onClick={signUpUser}
              />
              <Typography>
                Already Signed Up? <Link to="/">Login</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

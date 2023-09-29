import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Route, Routes, useNavigate } from "react-router-dom";
import ADMessage from "./admin_pages/Message";
import ADNotification from "./admin_pages/Notification";
import ADSettings from "./admin_pages/Settings";
import ADPost from "./admin_pages/Post";
import ADSinglePost from "./admin_pages/SinglePost";
import SMButton from "../components/SMButton";
import SMInput from "../components/SMInput";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { fbAdd, fbGet} from "../config/firebase/firebase-methods";

const drawerWidth = 240;

function AdminPanel(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [model, setModel] = useState<any>({});
  const [isDisabled, setIsDisabled] = useState(false); 
  const [quizList, setQuizList] = useState<any>({});
  const fillModel = (key: string, val: string) => {
    model[key] = val;
    setModel({ ...model });
  };
  let AddQuiz = () => {
    console.log(model);
    fbAdd("quiz", model)
    .then((res) => {
      console.log(res);
      setModel({});
      getQuiz();
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const getQuiz = () => {
    fbGet("quiz")
      .then((res: any) => {
        console.log(res);
        setQuizList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getQuiz();
  }, []);

  let LockQuiz = () => {
    setIsDisabled(!isDisabled); 
  };
  let AddOption = () => {};
  const navigate = useNavigate();
  let LogOut = () => {
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List> 
            {quizList &&
            quizList.length > 0 &&
            quizList.map((x: any) => (
          <ListItem key={x.id}>
              <ListItemText primary={x.quizname} />
          </ListItem>
        ))}
      </List>
      <div className="text-center">
        <SMButton btnType={"button"} btnValue={"Logout"} onClick={LogOut} />
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <div>
          <div className="row">
            <div className="col-6 text-start">Quiz App Admin</div>
            <div className="col-6 text-end">
              <SMButton
                btnType={"button"}
                btnValue={"Save"}
                onClick={AddQuiz}
              />
            </div>
          </div>
          <div className="row m-2 p-2">
            <div className="col-3 m-2 ">
              <SMInput
                value={model.quizname}
                onChange={(e: any) => fillModel("quizname", e.target.value)}
                textFieldId="option"
                textFieldLabel="Quiz Name"
                textFieldVariant={"outlined"}
                type="text"
                disabled={isDisabled}
              />
            </div>
            <div className="col-3 m-2 ">
              <SMInput
                value={model.duration}
                onChange={(e: any) => fillModel("duration", e.target.value)}
                textFieldId="option"
                textFieldLabel="Quiz Duration in minutes"
                textFieldVariant={"outlined"}
                type="text"
                disabled={isDisabled}
              />
            </div>
            <div className="col-3 m-2 ">
              
              <SMInput
                value={model.secretkey}
                onChange={(e: any) => fillModel("secretkey", e.target.value)}
                textFieldId="option"
                textFieldLabel="Secret Key"
                textFieldVariant={"outlined"}
                type="text"
                disabled={isDisabled}
              />
            </div>

            <div className="col-3 m-2 ">
              <SMInput
                value={model.isOpen}
                onChange={(e: any) => fillModel("isOpen", e.target.value)}
                textFieldId="option"
                textFieldLabel="Quiz Open"
                textFieldVariant={"outlined"}
                type="text"
                disabled={isDisabled}
              />
            </div>
            <div className="col-6 m-2 ">
              <SMInput
                value={model.description}
                onChange={(e: any) => fillModel("description", e.target.value)}
                textFieldId="option"
                textFieldLabel="Description"
                textFieldVariant={"outlined"}
                type="text"
                disabled={isDisabled}
              />
            </div>
          </div>
          <div>
          <SMButton
           btnType="button"
           onClick={LockQuiz}
           btnValue={isDisabled ? "Unlock Quiz" : "Lock Quiz"}
            />  
          </div>
          <div>
            {" "}
            <SMInput
              textFieldId="question"
              textFieldLabel="Type Question"
              textFieldVariant={"outlined"}
              type="text"
            />
          </div>
          <div className="row">
            <div className="col-8">
              <SMInput
                textFieldId="option"
                textFieldLabel="Options Here"
                textFieldVariant={"outlined"}
                type="text"
              />
            </div>
            <div className="col-2 text-center mt-3">
              <SMButton
                btnType={"button"}
                btnValue={"Add"}
                onClick={AddOption}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <ul id="RenderList" className="list-unstyled">
                <li className="m-2 p-2 border bg-info-subtle">Opt 1</li>
                <li className="m-2 p-2 border bg-info-subtle">Opt 2</li>
                <li className="m-2 p-2 border bg-info-subtle">Opt 3</li>
              </ul>
            </div>
            <div className="col-3 m-5">
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Correct: Opt 2"
                variant="outlined"
              />
            </div>
          </div>
          
        </div>

        <Routes>
          <Route path="Message" element={<ADMessage />} />
          <Route path="Notification" element={<ADNotification />} />
          <Route path="Settings" element={<ADSettings />} />
          <Route path="Post" element={<ADPost />} />
          <Route path="SinglePost/:id" element={<ADSinglePost />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Box>
    </Box>
  );
}

AdminPanel.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminPanel;
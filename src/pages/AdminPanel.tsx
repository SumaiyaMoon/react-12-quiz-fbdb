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
import { TextField, Button, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { fbAdd, fbGet} from "../config/firebase/firebase-methods";

const drawerWidth = 240;

function AdminPanel(props: any) {
  const { window } = props; // mui 
  const navigate = useNavigate(); //navigation
  const [mobileOpen, setMobileOpen] = React.useState(false); // mui 
  const [model, setModel] = useState<any>({}); // complete quiz model
  const [isDisabled, setIsDisabled] = useState(false); //lock unlock
  const [quizList, setQuizList] = useState<any>({}); //list of quizes in sidebar
  const [quizQuestions, setQuizQuestions] = useState<any>([]);
  const [question, setQuestion] = useState<any>(""); // a question
  const [option, setOption] = useState<any>(""); //setting option
  const [optionsList, setOptionsList ] = useState<any>([]); //options list of a question
  const [correctOption, setCorrectOption] = useState<any>(); // setting correct option from options list of a question
  const [questionModel, setQuestionModel] = useState<any>({}) //  question, correctanswer, optionsList

  const fillModel = (key: string, val: string) => { 
    //filling complete model
    model[key] = val;
    setModel({ ...model });
  };

  const fillQuestionModel = (key: string, val: string) => { 
    //filling complete QuestionModel
    questionModel[key] = val;
    setQuestionModel({ ...questionModel });
  };

  let SaveQuiz = () => {
    //adding quiz in database
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
    //getting quizList from  database
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
    //used to run function getQuiz()
    getQuiz();
  }, []);

  let LockQuiz = () => {
    //lock unlock
    setIsDisabled(!isDisabled); 
  };

  let AddOptionsList = () => {
    // Use the previous state to ensure you're updating correctly
    setOptionsList((prevOptionsList: any) => {
      const updatedOptionsList = [...prevOptionsList, option];
      // console.log(updatedOptionsList); // Log the updated state

      return updatedOptionsList;
    });
    
    setOption(""); 
  };
  
  let LogOut = () => {
    //logging out
    navigate("/");
  };

  let AddQuizQuestioninModel = () => {
   questionModel.question = question
   questionModel.options = [...optionsList]
   questionModel.answer = correctOption
   console.log(questionModel)
   setQuestionModel({
    ...questionModel, 
  });
  setQuizQuestions([...quizQuestions, questionModel]);
   model.quiz = quizQuestions
   setQuestion("");
   setOptionsList([])
   setCorrectOption("")
  };
  
  
  


  const handleDrawerToggle = () => {
    // mui handling
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    //sidebar mui
    <div>
      <div className="container d-flex align-items-center justify-content-center">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJFiKHbkBQTYhaU1x1TGreeVViDrWp3pPQEf-zcX9Smb80kGgEUkTPeGp95adj2PrIYSI&usqp=CAU" className="rounded-circle w-50 m-5" />
      </div>

      <List> 
        {/* quizList rendering list of all quiz names after getting from getQuiz(); */}
            {quizList &&
            quizList.length > 0 &&
            quizList.map((x: any) => (
          <ListItem key={x.id}>
              <ListItemText primary={x.quizname} />
          </ListItem>
        ))}
      </List>
      <div className="text-center">
        <Button className='position-absolute bottom-0 start-50 translate-middle-x mb-3' type="button" onClick={LogOut} variant='contained'>Log Out</Button>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined; //mui handling

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
            Admin Panel
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
                onClick={SaveQuiz}
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
            <SMInput
               value={question}
               onChange={(e: any) => setQuestion(e.target.value)} // Make sure onChange is set to update the state
               textFieldId="option"
               textFieldLabel="Question"
               textFieldVariant="outlined"
               type="text"
               disabled={!isDisabled} // Check if isDisabled is set to true
            />
          </div>
          <div className="row">
            <div className="col-8">
            <SMInput
  value={option}
  onChange={(e: any) => setOption(e.target.value)} // Make sure onChange is set to update the state
  textFieldId="option"
  textFieldLabel="Options Here"
  textFieldVariant="outlined"
  type="text"
  disabled={!isDisabled} // Check if isDisabled is set to true
/>

            </div>
            <div className="col-2 text-center mt-3">
              <SMButton
                btnType={"button"}
                btnValue={"Add"}
                onClick={AddOptionsList}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
            <ul id="RenderList" className="list-unstyled">
  {optionsList.map((option: any, index: any) => (
    <li
      key={index} // Provide a unique key
      onClick={() => setCorrectOption(option)}
      className="m-2 p-2 border bg-info-subtle"
    >
      {option}
    </li>
  ))}
</ul>


            </div>
            <div className="col-3 m-5">
              {correctOption && (
              <TextField
                fullWidth={true}
                id="outlined-disabled"
                disabled
                label={correctOption}
                variant="outlined"
                value={questionModel.answer}
                onChange={(e: any)=>{fillQuestionModel("answer",e.target.value)}}
              />
              )}
            </div>
          </div>
          <div>

          <button className="btn btn-info p-2" onClick={() => { AddQuizQuestioninModel() }}>Add Question</button>
         
          </div>
        
          <div>
          <div>
  {/* Render questions from quizQuestions array */}
  {quizQuestions.map((questionData: any, index: any) => (
    <Paper key={index}>
      <h4>Question {index + 1}: {questionData.question}</h4>
      <p>Options:</p>
      <ul>
        {questionData.options.map((option: any, optionIndex: any) => (
          <li key={optionIndex}>{option}</li>
        ))}
      </ul>
      <p>Correct Answer: {questionData.answer}</p>
    </Paper>
  ))}
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
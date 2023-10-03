import { useEffect, useState } from "react";
import { fbGet } from "../config/firebase/firebase-methods";
import { Button, Typography, CssBaseline, Container, Box, Grid, Paper } from "@mui/material";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { styled } from "@mui/material/styles";

export default function Quiz() {
  const [questionList, setquestionList] = useState<any[]>([]); //rendering questions of quiz
  const [isActive, setisActive] = useState<boolean>(true); //checking model.isOpen ?
  const [marks, setMarks] = useState<number>(0); //result

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const getQuiz = () => {
    fbGet("quiz")
      .then((res: any) => {
        console.log(res);
        setquestionList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const quizSecretKeys: string[] = questionList.map((x) => x.secretkey);

  const SubmitQuiz = () => {
    const key = prompt("Enter Secret Key to Submit Quiz", "XXXX");
  
    if (key !== null) {
      console.log("Entered Key:", key);
      console.log("Secret Keys:", quizSecretKeys);
      if (quizSecretKeys.includes(key.trim())) {
        alert("Quiz Submitted")
      } else {
        alert("Invalid Secret Key. Please try again.");
      }
    } else {
      alert("Operation canceled.");
    }
  };
  
//  let checkAnswer = ()=>{

//  }
// create a radio btn store value and check the the anwer also increase marks+1 if true then after this disable the checkbox? : " " and on submit display marks
  
  useEffect(() => {
    getQuiz();
  }, []);
  if(isActive==true){

  return (
    
    <div>
      {questionList.map((quiz, index) => (
        <div key={index}>
          {/* Random Functionalities */}
          <h1 className="text-center fst-italic my-2">{quiz.quizname}</h1>
          {quiz.quiz.map((question: any, i: number) => (
            <div key={i}>
              {/* Question */}
              <CssBaseline />
              <Container maxWidth="md">
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12} sm={12}>
                      <Item className="bg-info shadow-lg rounded border border-1 border-dark my-3">
                        <Typography variant="body2" gutterBottom className="p-2 text-start">
                      {[i+1]} : {question.question}
                        </Typography>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
  
              {/* Options */}
              <CssBaseline />
              <Container maxWidth="md">
                <Box>
                  <Grid container spacing={2}>
                  {question.options.map((option: string, index: number) => (
                      <Grid key={index} item xs={12} md={6} lg={6} sm={12}>
                        <Item className="bg-light shadow-sm border border-dark border-1 rounded">
                          <Button
                            fullWidth={true}
                            sx={{
                              textTransform: "none",
                            }}
                            className="text-body-secondary "
                          >
                           {option.toLowerCase()}
                          </Button>
                        </Item>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Container>
            </div>
            
            ))}
        </div>
      ))}
      {/* Submit Quiz */}
      <Button className="btn btn-info" onClick={SubmitQuiz}>Submit Quiz</Button>
    </div>
  );
}else {
  return(
    <h1>Quiz not Launched yet.</h1>
  )
}

}

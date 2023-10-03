import { useEffect, useState } from "react";
import { fbGet } from "../config/firebase/firebase-methods";
import { Button, Typography, CssBaseline, Container, Box, Grid, Paper } from "@mui/material";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { styled } from "@mui/material/styles";

export default function Quiz() {
  const [quizList, setQuizList] = useState<any[]>([]); //rendering quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //setting index
  const [userAnswers, setUserAnswers] = useState<string[]>([]); //checking answer
  const [isActive, setisActive] = useState<boolean>(); //checking model.isOpen ?
  const [userVerification, setUserVerification] = useState<any>(); //checking model.secretKey ?

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
        setQuizList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuiz();
  }, []);


  return (
    
    <div>
      {quizList.map((quiz, index) => (
        <div key={index}>
          {/* Random Functionalities */}
          <h1 className="text-center fst-italic my-2">{quiz.quizname}</h1>
          <CssBaseline />
          <Container maxWidth="md">
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} sm={12}>
                  <Item className="bg-warning-subtle">
                    <CollectionsBookmarkIcon sx={{ fontSize: "medium" }} />
                    <Typography marginLeft={0.5} variant="overline" display="block" gutterBottom>
                      Question Length {quiz.quiz.length}
                    </Typography>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Container>

          {quiz.quiz.map((question: any, i: number) => (
            <div key={i}>
              {/* Question */}
              <CssBaseline />
              <Container maxWidth="md">
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12} sm={12}>
                      <Item className="bg-danger-subtle my-3">
                        <Typography variant="body2" gutterBottom className="p-2">
                        {quizList[currentQuestionIndex].quiz[currentQuestionIndex].question}
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
                  {quizList[currentQuestionIndex].quiz[currentQuestionIndex].options.map((option: string, index: number) => (
                      <Grid key={index} item xs={12} md={6} lg={6} sm={12}>
                        <Item className="bg-info-subtle">
                          <Button
                            fullWidth={true}
                            sx={{
                              textTransform: "none",
                            }}
                            className="text-body-secondary"
                          >
                            {option}
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
    </div>
  );
}

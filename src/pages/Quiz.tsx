import React, { useEffect, useState } from "react";
import { fbGet } from "../config/firebase/firebase-methods";
import SMButton from "../components/SMButton";
import SMInput from "../components/SMInput";
import { Button, Typography } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { LegendToggleRounded } from '@mui/icons-material';


export default function Quiz() {
  const [quizList, setQuizList] = useState<any>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  let [marks, setMarks] = useState<number>(0);

  const getQuiz = () => {
    // getting quizList from the database
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
    // used to run the function getQuiz()
    getQuiz();
  }, []);

  //from mui
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));




  const handlingUpcomingQuestion = () => {
    if (currentQuestionIndex < quizList.quiz.question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }
  
  //checing answer
  let checkAnswer = function (a: any, b: any) {

    if (!answeredQuestions.includes(currentQuestionIndex + 1)) {
      if (a == b) {
       
        setMarks((prevMarks) => prevMarks + 1);
    }
    setAnsweredQuestions((prevAnswered) => [...prevAnswered, currentQuestionIndex]);
  


      if (currentQuestionIndex + 1 == quizList.quiz.question.length) {
        alert("Your marks are" + marks + "out of" + quizList.quiz.question.length)
      }

    }
  }

  return (
//learning to render
    // <>
    //   {quizList && quizList.length > 0 ? (
    //     quizList.map((quiz: any, i: any) => {
    //       return (
    //         <div key={i}>
    //           <h2>{quiz.description}</h2>
    //           <p>Duration: {quiz.duration} minutes</p>

    //           <h3>Quiz Questions:</h3>
    //           <ul>
    //             {quiz.quiz &&
    //               quiz.quiz.map((questionData: any, index: any) => (
    //                 <li key={index}>
    //                   <p>Question {index + 1}: {questionData.question}</p>
    //                   <ul>
    //                     {questionData.options.map(
    //                       (option: any, optionIndex: any) => (
    //                         <li key={optionIndex}>{option}</li>
    //                       )
    //                     )}
    //                   </ul>
    //                   <p>Answer: {questionData.answer}</p>
    //                 </li>
    //               ))}
    //           </ul>
    //         </div>
    //       );
    //     })
    //   ) : (
    //     <p>No quizzes available.</p>
    //   )}
    // </>
//successfully rendered
    <>
     <>
      <div>

        {/* Random Functionalities */}
        <h1 className='text-center fst-italic my-2'>| Quiz App |</h1>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Box>
              <Grid container spacing={2}>
                <Grid xs={12} md={12} lg={12} sm={12}>
                  <Item className='bg-warning-subtle'>

                    <CollectionsBookmarkIcon sx={{
                      fontSize: "medium"
                    }} />
                    <Typography marginLeft={0.5} variant="overline" display="block" gutterBottom>
                      Question No.


                      &nbsp;

                      <span>1 / 10</span>
                    </Typography>
                  </Item>
                </Grid>

              
              </Grid>
            </Box>
          </Container>
        </React.Fragment>

        {/* Question */}


        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Box>
              <Grid container spacing={2} >
                <Grid xs={12} md={12} lg={12} sm={12}>
                  <Item className='bg-danger-subtle my-3'>
                    <Typography variant="body2" gutterBottom className='p-2'>
                      Question
                    </Typography>
                  </Item>
                </Grid>

              </Grid>
            </Box>
          </Container>
        </React.Fragment>


        {/* Options */}
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Box>
              <Grid container spacing={2} >
                {/* {quizQuestions[currentQuestionIndex].options.map((option, index) => ( */}
                  <Grid
                  //  key={index}
                    xs={12} md={6} lg={6} sm={12}>
                    <Item className='bg-info-subtle'>
                      <Button
                        fullWidth={true}
                        // onClick={() => {
                        //   handlingUpcomingQuestion(); 
                        //   checkAnswer(option, quizQuestions[currentQuestionIndex].answer); 
                        // }}
                        sx={{
                          textTransform: 'none'
                        }}
                        className='text-body-secondary'
                      >
                        {/* {option} */} options
                      </Button>
                    </Item>
                  </Grid>
                  <Grid
                  //  key={index}
                    xs={12} md={6} lg={6} sm={12}>
                    <Item className='bg-info-subtle'>
                      <Button
                        fullWidth={true}
                        // onClick={() => {
                        //   handlingUpcomingQuestion(); 
                        //   checkAnswer(option, quizQuestions[currentQuestionIndex].answer); 
                        // }}
                        sx={{
                          textTransform: 'none'
                        }}
                        className='text-body-secondary'
                      >
                        {/* {option} */} options
                      </Button>
                    </Item>
                  </Grid>
                  <Grid
                  //  key={index}
                    xs={12} md={6} lg={6} sm={12}>
                    <Item className='bg-info-subtle'>
                      <Button
                        fullWidth={true}
                        // onClick={() => {
                        //   handlingUpcomingQuestion(); 
                        //   checkAnswer(option, quizQuestions[currentQuestionIndex].answer); 
                        // }}
                        sx={{
                          textTransform: 'none'
                        }}
                        className='text-body-secondary'
                      >
                        {/* {option} */} options
                      </Button>
                    </Item>
                  </Grid>
                  <Grid
                  //  key={index}
                    xs={12} md={6} lg={6} sm={12}>
                    <Item className='bg-info-subtle'>
                      <Button
                        fullWidth={true}
                        // onClick={() => {
                        //   handlingUpcomingQuestion(); 
                        //   checkAnswer(option, quizQuestions[currentQuestionIndex].answer); 
                        // }}
                        sx={{
                          textTransform: 'none'
                        }}
                        className='text-body-secondary'
                      >
                        {/* {option} */} options
                      </Button>
                    </Item>
                  </Grid>
                 {/* ))} */}
              </Grid>
            </Box>
          </Container>
        </React.Fragment>
      </div>
    </>
    </>
  );
}

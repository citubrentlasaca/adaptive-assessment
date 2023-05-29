import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function AdditionMathProblems() {
var data = [
        ["1 + 1", 2, "Easy"],
        ["2 + 3", 5, "Easy"],
        ["4 + 7", 11, "Medium"],
        ["6 + 2", 8, "Easy"],
        ["9 + 5", 14, "Medium"],
        ["3 + 8", 11, "Easy"],
        ["12 + 9", 21, "Hard"],
        ["5 + 4", 9, "Easy"],
        ["7 + 6", 13, "Medium"],
        ["10 + 3", 13, "Easy"],
        ["15 + 8", 23, "Hard"],
        ["2 + 6", 8, "Easy"],
        ["13 + 7", 20, "Medium"],
        ["9 + 2", 11, "Easy"],
        ["11 + 4", 15, "Medium"],
        ["6 + 9", 15, "Medium"],
        ["8 + 5", 13, "Easy"],
        ["3 + 5", 8, "Easy"],
        ["16 + 11", 27, "Hard"],
        ["7 + 3", 10, "Easy"],
        ["18 + 6", 24, "Medium"],
        ["4 + 9", 13, "Medium"],
        ["14 + 5", 19, "Easy"],
        ["10 + 7", 17, "Medium"],
        ["5 + 2", 7, "Easy"],
        ["12 + 6", 18, "Medium"],
        ["9 + 3", 12, "Easy"],
        ["17 + 8", 25, "Medium"],
        ["6 + 4", 10, "Easy"],
        ["20 + 15", 35, "Hard"],
        ["8 + 2", 10, "Easy"]
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [randomRow, setRandomRow] = useState(null);
    const [timer, setTimer] = useState(0);
    const [answerTime, setAnswerTime] = useState(0);
    const [correct, setCorrect] = useState(false);
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomRow(data[randomIndex]);
      }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const getNextProblem = (difficulty) => {
        const filteredRows = data.filter(row => row[2] === difficulty);
        const nextIndex = (currentIndex + 1) % filteredRows.length;
        const selectedRow = filteredRows[nextIndex];
        setCurrentIndex(nextIndex);
        setRandomRow(selectedRow);
        setTimer(0); // Reset the timer when getting the next problem
        setCorrect(false);
        setAnswerSubmitted(false);
    };      

    useEffect(() => {
        if (randomRow && answerSubmitted) {
          axios
            .post('https://localhost:25539/predict', {
              correct_Incorrect_Answer: correct,
              time__seconds_: answerTime,
              current_Difficulty: randomRow[2]
            })
            .then(response => {
              console.log(response.data);
              console.log(answerTime);
              console.log(correct);
              getNextProblem(response.data.predictedLabel);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }, [answerSubmitted]);
    
      const handleSubmitAnswer = () => {
        const answerInput = document.getElementById('answerInput');
        const answer = answerInput.value;
    
        const isAnswerCorrect = answer === String(randomRow[1]);
    
        setCorrect(isAnswerCorrect);
        setAnswerTime(timer);
        setAnswerSubmitted(true);
    
        answerInput.value = '';
      };

    return (
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} marginTop="80px">
            <Typography variant="h1" fontFamily="Montserrat Black" color="#0077b6">
                {timer}
            </Typography>
            <Box
                sx={{
                    width: "500px",
                    height: "auto",
                    backgroundColor: "#0077b6",
                    borderRadius: "10px"
                }}
            >
                <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}
                    sx={{
                        padding: "20px"
                    }}
                >
                    <Typography variant="h2" fontFamily="Montserrat Black" color="#caf0f8">
                        {randomRow && randomRow[2].toUpperCase()}
                    </Typography>
                    <Typography variant="h2" fontFamily="Montserrat Black" color="#caf0f8">
                        {randomRow && randomRow[0]}
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                    <input type="text" id="answerInput"
                        style={{
                            backgroundColor: "#caf0f8",
                            border: "transparent",
                            width: "100%",
                            height: "100px",
                            borderRadius: "10px",
                            textAlign: "center",
                            fontSize: "60px",
                            fontFamily: "Montserrat Black",
                            color: "#0077b6",
                        }}
                    />
                        <IconButton onClick={handleSubmitAnswer}>
                            <Box
                                sx={{
                                    backgroundColor: "#caf0f8",
                                    width: "100px",
                                    height: "100px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "10px"
                                }}
                            >
                                <SendIcon
                                    sx={{
                                        color: "#0077b6",
                                        width: "50px",
                                        height: "50px"
                                    }}
                                />          
                            </Box>
                        </IconButton>             
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
}

export default AdditionMathProblems;
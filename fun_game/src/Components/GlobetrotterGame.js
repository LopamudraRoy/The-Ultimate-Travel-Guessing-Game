import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Button, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import ChallengeFriend from "./ChallengeFriend";

export default function GlobetrotterGame() {
  const [destination, setDestination] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [username, setUsername] = useState("");
  const [showPlayAgain, setShowPlayAgain] = useState(false); // New state

  useEffect(() => {
    fetchNewDestination();
  }, []);

  const fetchNewDestination = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/destination");
      const data = response.data;

      setDestination(data);
      setOptions(shuffleOptions(data.correctName));
      setFeedback(null);
      setShowConfetti(false);
      setShowPlayAgain(false); // Hide play again when fetching a new destination
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  const shuffleOptions = (correctAnswer) => {
    const randomOptions = [
      "London",
      "Sydney",
      "Rome",
      "Tokyo",
      "Paris",
      "New York",
      "Berlin",
      "Dubai",
      "Los Angeles",
      "Toronto",
      "Singapore",
      "Moscow",
      "Beijing",
      "Mumbai",
      "Cairo",
      "Istanbul",
      "Bangkok",
      "Rio de Janeiro",
      "Cape Town",
      "Seoul",
      "Madrid",
      "Buenos Aires",
      "Mexico City",
      "Athens",
      "Lisbon",
    ];

    const filteredOptions = randomOptions.filter(
      (city) => city !== correctAnswer
    );
    const selectedOptions = filteredOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    selectedOptions.push(correctAnswer);

    return selectedOptions.sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelection = async (answer) => {
    setSelectedAnswer(answer);
    setShowPlayAgain(true); // Show play again button when an answer is selected

    try {
      const response = await axios.post(
        "http://localhost:5000/api/check-answer",
        {
          alias: destination?.alias,
          answer,
        }
      );

      if (response.data.correct) {
        setFeedback("🎉 Correct! " + response.data.funFact);
        setShowConfetti(true);
        setScore(score + 1);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setFeedback("😢 Incorrect! " + response.data.funFact);
        setIncorrectAnswers(incorrectAnswers + 1);
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti />}
      {destination && (
        <div className=" mt-6 p-4 shadow-lg rounded-xl text-center shadow-blue-500/30 backdrop-blur-lg w-[90%]">
          <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
            Your clue : {destination.clues[0]}
          </Typography>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Button
                variant="outlined"
                size="large"
                key={index}
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          {feedback && (
            <Typography
              variant="h6"
              sx={{ color: "yellow", paddingTop: "16px" }}
            >
              {feedback}
            </Typography>
          )}
          {showPlayAgain && (
            <Button
              className="mt-4"
              onClick={fetchNewDestination}
              variant="contained"
              color="success"
              size="medium"
              sx={{ marginTop: "12px" }}
            >
              Play Again
            </Button>
          )}
        </div>
      )}
      <Card
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: "16px",
          textAlign: "center",
          backdropFilter: "blur(10px)",
          marginTop: "16px",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            Game Stats
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Score: {score}
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Correct Answers: {correctAnswers}
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Incorrect Answers: {incorrectAnswers}
          </Typography>
        </CardContent>
      </Card>

      <ChallengeFriend username={username} score={score} />
    </div>
  );
}

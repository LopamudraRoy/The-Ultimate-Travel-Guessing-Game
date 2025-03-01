import { useState } from "react";
import GlobetrotterGame from "./Components/GlobetrotterGame";
import bgImage from "./assets/background-2.jpg";
import { Typography, Button, Box } from "@mui/material";

function App() {
  const appStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Responsive height
    width: "100vw", // Ensure full width
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
  };

  const contentStyle = {
    width: "90%",
    maxWidth: "1200px", // Prevent content from becoming too wide on large screens
    textAlign: "center",
    background: "rgba(0, 0, 0, 0.6)", // Optional: Adds slight opacity for better readability
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  };

  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App" style={appStyle}>
      <Box sx={contentStyle}>
        {!gameStarted ? (
          <>
            <Typography
              align="center"
              variant="h4"
              gutterBottom
              sx={{ color: "white" }}
            >
              The Globetrotter Challenge – The Ultimate Travel Guessing Game!
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ m: 2 }}
              onClick={() => setGameStarted(true)}
            >
              Let's Begin 🎮
            </Button>
          </>
        ) : (
          <Box sx={{ width: "100%" }}>
            <GlobetrotterGame />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;

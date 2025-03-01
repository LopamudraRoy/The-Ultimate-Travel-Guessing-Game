import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";

export default function ChallengeFriend({ score }) {
  const [username, setUsername] = useState("");
  const [inviteLink, setInviteLink] = useState("");

  const generateInviteLink = () => {
    if (!username.trim()) {
      alert("Please enter a username.");
      return;
    }
    const link = `${window.location.origin}/invite?user=${encodeURIComponent(
      username
    )}&score=${score}`;
    setInviteLink(link);
  };

  const shareOnWhatsApp = () => {
    if (!inviteLink) {
      alert("Generate an invite link first!");
      return;
    }
    const message = `Join me in The Globetrotter Challenge! 🌍\nI scored ${score} points!\nTry to beat my score!\nPlay now: ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="mt-6 p-4 shadow-lg rounded-xl text-center">
      <Typography sx={{ color: "yellow", fontSize: "20px", padding: "10px" }}>
        Challenge a Friend
      </Typography>

      <TextField
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-2 p-2 border rounded-lg w-full"
        sx={{
          input: { color: "white" },
          "& label": { color: "white" },
          "& label.Mui-focused": { color: "#76e3ea" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "#76e3ea" },
            "&.Mui-focused fieldset": { borderColor: "#76e3ea" },
          },
        }}
      />
      <Button
        onClick={generateInviteLink}
        sx={{ fontWeight: "bold", fontSize: "20px", margin: "6px" }}
      >
        Generate Invite Link
      </Button>
      {inviteLink && (
        <div className="mt-4">
          <Typography sx={{ color: "white" }}>{inviteLink}</Typography>
          <Button
            variant="contained"
            color="success"
            size="medium"
            sx={{ margin: "10px" }}
            onClick={shareOnWhatsApp}
            endIcon={<MobileScreenShareIcon />}
          >
            Share
          </Button>
        </div>
      )}
    </div>
  );
}

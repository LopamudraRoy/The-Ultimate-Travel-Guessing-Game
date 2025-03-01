import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import GlobetrotterGame from "./GlobetrotterGame";

jest.mock("axios");

describe("GlobetrotterGame Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders game input and score board", () => {
    render(<GlobetrotterGame />);

    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
  });

  test("fetches and displays a new destination on mount", async () => {
    axios.get.mockResolvedValue({
      data: {
        alias: "paris",
        clues: ["This city has the Eiffel Tower"],
        correctName: "Paris",
      },
    });

    render(<GlobetrotterGame />);

    await waitFor(() => {
      expect(
        screen.getByText("This city has the Eiffel Tower")
      ).toBeInTheDocument();
    });
  });

  test("updates feedback and score on correct answer selection", async () => {
    axios.get.mockResolvedValue({
      data: {
        alias: "paris",
        clues: ["This city has the Eiffel Tower"],
        correctName: "Paris",
      },
    });

    axios.post.mockResolvedValue({
      data: { correct: true, funFact: "The Eiffel Tower was built in 1889!" },
    });

    render(<GlobetrotterGame />);

    await waitFor(() => {
      expect(
        screen.getByText("This city has the Eiffel Tower")
      ).toBeInTheDocument();
    });

    const correctButton = screen.getByText("Paris");
    fireEvent.click(correctButton);

    await waitFor(() => {
      expect(screen.getByText(/🎉 Correct!/)).toBeInTheDocument();
    });

    expect(screen.getByText(/Score: 1/)).toBeInTheDocument();
  });

  test("updates feedback on incorrect answer selection", async () => {
    axios.get.mockResolvedValue({
      data: {
        alias: "paris",
        clues: ["This city has the Eiffel Tower"],
        correctName: "Paris",
      },
    });

    axios.post.mockResolvedValue({
      data: { correct: false, funFact: "The Eiffel Tower was built in 1889!" },
    });

    render(<GlobetrotterGame />);

    await waitFor(() => {
      expect(
        screen.getByText("This city has the Eiffel Tower")
      ).toBeInTheDocument();
    });

    const wrongButton = screen.getByText(/Tokyo|Rome|Sydney/);
    fireEvent.click(wrongButton);

    await waitFor(() => {
      expect(screen.getByText(/😢 Incorrect!/)).toBeInTheDocument();
    });
  });

  test("Play Again button fetches new destination", async () => {
    axios.get.mockResolvedValue({
      data: {
        alias: "paris",
        clues: ["This city has the Eiffel Tower"],
        correctName: "Paris",
      },
    });

    render(<GlobetrotterGame />);

    await waitFor(() => {
      expect(
        screen.getByText("This city has the Eiffel Tower")
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Play Again"));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2); // Ensures new destination is fetched
    });
  });
});

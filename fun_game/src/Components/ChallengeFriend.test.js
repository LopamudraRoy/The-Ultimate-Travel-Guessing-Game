jest.mock("axios");
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChallengeFriend from "./ChallengeFriend";

describe("ChallengeFriend Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test("renders input and generate button", () => {
    render(<ChallengeFriend score={10} />);
    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
    expect(screen.getByText("Generate Invite Link")).toBeInTheDocument();
  });

  test("shows alert when trying to generate invite link without username", () => {
    window.alert = jest.fn();
    render(<ChallengeFriend score={10} />);

    fireEvent.click(screen.getByText("Generate Invite Link"));

    expect(window.alert).toHaveBeenCalledWith("Please enter a username.");
  });

  test("generates invite link with username", async () => {
    render(<ChallengeFriend score={10} />);

    const input = screen.getByPlaceholderText("Enter your username");
    fireEvent.change(input, { target: { value: "Lopa" } });

    fireEvent.click(screen.getByText("Generate Invite Link"));

    await waitFor(() =>
      expect(
        screen.getByText(/Join me in The Globetrotter Challenge!/)
      ).toBeInTheDocument()
    );
  });

  test("shows alert when trying to share on WhatsApp without generating invite", () => {
    window.alert = jest.fn();
    render(<ChallengeFriend score={10} />);

    fireEvent.click(screen.getByText("Share on WhatsApp"));

    expect(window.alert).toHaveBeenCalledWith("Generate an invite link first!");
  });

  test("opens WhatsApp when clicking share button after generating link", async () => {
    window.open = jest.fn();

    render(<ChallengeFriend score={10} />);
    const input = screen.getByPlaceholderText("Enter your username");
    fireEvent.change(input, { target: { value: "Lopa" } });

    fireEvent.click(screen.getByText("Generate Invite Link"));

    await waitFor(() =>
      expect(
        screen.getByText(/Join me in The Globetrotter Challenge!/)
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Share on WhatsApp"));

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining("https://wa.me/"),
      "_blank"
    );
  });
});

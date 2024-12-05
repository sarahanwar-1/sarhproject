import { handleFormSubmit } from "../src/client/js/serverCommunicator";

// Mock the API fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      polarity: "positive",
      subjectivity: "subjective",
      text: "Example article title",
    }),
  })
);

describe("Testing the form submission and server communication", () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() };
  });

  test("should call preventDefault on form submit", () => {
    handleFormSubmit(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  test("should call the sendUrlToServer function with valid input", () => {
    // Mock input field value
    const mockValue = "https://www.example.com";
    document.getElementById = jest.fn().mockReturnValue({ value: mockValue });

    // Test the handleFormSubmit function
    handleFormSubmit(mockEvent);

    // Assert fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/processData",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: mockValue }),
      })
    );
  });

  test("should handle response and update DOM with results", async () => {
    // Simulate calling the function and updating the DOM
    document.body.innerHTML = "<div id='results'></div>";
    await handleFormSubmit(mockEvent);

    // Check if the results were displayed in the DOM
    const resultSection = document.getElementById('results');
    expect(resultSection.innerHTML).toContain("Sentiment:");
    expect(resultSection.innerHTML).toContain("positive");
  });
});

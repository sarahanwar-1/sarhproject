// Function to validate URLs entered by the user
export const isValidLink = (inputUrl) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlPattern.test(inputUrl);
};

import { summarizeText } from "./summarize.js";

const testNews = `
India successfully launched its latest weather satellite to improve monsoon forecasting and disaster management.
`;

summarizeText(testNews).then(console.log).catch(console.error);

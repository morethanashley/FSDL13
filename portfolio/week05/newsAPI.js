// newsAPI.js
const apiKey = '576985d0608041edbe811bc6f0ab7f36'; // Replace with your own API key

export async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
}

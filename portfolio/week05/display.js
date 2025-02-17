// display.js
export function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) {
        console.error('News container not found');
        return;
    }
    
    newsContainer.innerHTML = ''; // Clear previous news

    // Check if articles exist and are valid
    if (!articles || articles.length === 0) {
        console.log('No news articles found');
        newsContainer.innerHTML = '<p>No news articles available.</p>';
        return;
    }

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        const title = document.createElement('h3');
        title.textContent = article.title;
        newsCard.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available';
        newsCard.appendChild(description);

        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.textContent = 'Read more';
        newsCard.appendChild(link);

        newsContainer.appendChild(newsCard);
    });
}

interface Article {
    id: number;
    title: string;
    imageUrl: string;
}

function getArticleIdFromUrl(): number {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id') || '0', 10);
}

async function fetchArticleDetails(id: number): Promise<Article | undefined> {
    const response = await fetch('../api/db.json');
    const data = await response.json();
    const article = data.articles.find((article: Article) => article.id === id);
    return article;
}

async function renderArticleDetails() {
    const articleId = getArticleIdFromUrl();
    const article = await fetchArticleDetails(articleId);

    if (article) {
        const articleImage = document.getElementById('articleImage') as HTMLImageElement;
        const articleTitle = document.getElementById('articleTitle') as HTMLHeadingElement;

        articleImage.src = article.imageUrl;
        articleTitle.textContent = article.title;
    } else {
        console.error('Article not found.');
    }
}

document.addEventListener('DOMContentLoaded', renderArticleDetails);

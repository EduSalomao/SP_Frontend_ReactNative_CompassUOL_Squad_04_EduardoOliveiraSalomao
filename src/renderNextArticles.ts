interface Article {
    id: number;
    title: string;
    imageUrl: string;
}

function getArticleIdFromUrl2(): number {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id') || '0', 10);
}

function createNextImageElement(imageUrl: string): HTMLImageElement {
    const img = document.createElement("img");
    img.src = imageUrl;
    return img;
}

function createNextHeadingElement(title: string): HTMLHeadingElement {
    const h2 = document.createElement("h2");
    h2.textContent = title;
    return h2;
}

async function renderNextArticles() {
    const articleContainer = document.querySelector(".articleContainer");

    if (!articleContainer) {
        return;
    }

    try {
        const response = await fetch('../api/db.json');
        const data = await response.json();
        const articleId = getArticleIdFromUrl2();

        const mockData: Article[] = data.articles;

        mockData.forEach(article => {
            if (article.id !== articleId && article.id !== 0) {
                const articleLink = document.createElement("a");
                articleLink.href = `article.html?id=${article.id}`; // Adjust the path to the "article.html" file
                articleLink.className = "article";

                const img = createNextImageElement(article.imageUrl);
                const h2 = createNextHeadingElement(article.title);

                articleLink.appendChild(img);
                articleLink.appendChild(h2);

                articleContainer.appendChild(articleLink);
            } else {
                return;
            }
        });
    } catch (error) {
        console.error("Error fetching and rendering articles:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderNextArticles();
});

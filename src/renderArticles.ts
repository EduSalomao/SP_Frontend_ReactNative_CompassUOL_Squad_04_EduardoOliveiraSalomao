interface Article {
    id: number;
    title: string;
    imageUrl: string;
}

function createImageElement(imageUrl: string): HTMLImageElement {
    const img = document.createElement("img");
    img.src = imageUrl;
    return img;
}

function createHeadingElement(title: string): HTMLHeadingElement {
    const h2 = document.createElement("h2");
    h2.textContent = title;
    return h2;
}

async function renderArticles() {
    const articleContainer = document.querySelector(".articleContainer");

    if (!articleContainer) {
        return;
    }

    try {
        const response = await fetch('../api/db.json');
        const data = await response.json();

        const mockData: Article[] = data.articles;

        mockData.forEach(article => {
            const articleLink = document.createElement("a");
            articleLink.href = `templates/article.html?id=${article.id}`;
            articleLink.className = "article";

            const img = createImageElement(article.imageUrl);
            const h2 = createHeadingElement(article.title);

            articleLink.appendChild(img);
            articleLink.appendChild(h2);

            articleContainer.appendChild(articleLink);
        });
    } catch (error) {
        console.error("Error fetching and rendering articles:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
});


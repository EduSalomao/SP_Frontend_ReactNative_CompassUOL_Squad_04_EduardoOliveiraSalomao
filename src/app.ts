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

    const response = await fetch('../api/db.json');
    const mockData = await response.json() as { articles: Article[] };

    mockData.articles.forEach(article => {
        const articleP = document.createElement("p");
        articleP.className = "article";

        const img = createImageElement(article.imageUrl);
        const h2 = createHeadingElement(article.title);

        articleP.appendChild(img);
        articleP.appendChild(h2);

        articleContainer.appendChild(articleP);
    });
}

document.addEventListener("DOMContentLoaded", renderArticles);

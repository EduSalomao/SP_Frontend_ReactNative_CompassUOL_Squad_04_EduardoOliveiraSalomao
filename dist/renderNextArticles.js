"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getArticleIdFromUrl2() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id') || '0', 10);
}
function createNextImageElement(imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    return img;
}
function createNextHeadingElement(title) {
    const h2 = document.createElement("h2");
    h2.textContent = title;
    return h2;
}
function renderNextArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        const articleContainer = document.querySelector(".articleContainer");
        if (!articleContainer) {
            return;
        }
        try {
            const response = yield fetch('../api/db.json');
            const data = yield response.json();
            const articleId = getArticleIdFromUrl2();
            const mockData = data.articles;
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
                }
                else {
                    return;
                }
            });
        }
        catch (error) {
            console.error("Error fetching and rendering articles:", error);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    renderNextArticles();
});

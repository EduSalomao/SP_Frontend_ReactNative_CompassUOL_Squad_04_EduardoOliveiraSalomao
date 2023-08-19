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
function getArticleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id') || '0', 10);
}
function fetchArticleDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('../api/db.json');
        const data = yield response.json();
        const article = data.articles.find((article) => article.id === id);
        return article;
    });
}
function fetchCommentDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('../api/db.json');
        const data = yield response.json();
        const comment = data.comments.find((comment) => comment.id === id);
        return comment;
    });
}
function renderArticleDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const articleId = getArticleIdFromUrl();
        const article = yield fetchArticleDetails(articleId);
        const comments = yield fetchCommentDetails(articleId);
        if (article) {
            const articleImage = document.getElementById('articleImage');
            const articleTitle = document.getElementById('articleTitle');
            articleImage.src = article.imageUrl;
            articleTitle.textContent = article.title;
        }
        else {
            console.error('Article not found.');
        }
        if (comments) {
            const authorName = document.getElementById('authorName');
            const authorDate = document.getElementById('authorDate');
            const authorImageUrl = document.getElementById('authorImage');
            const authorImageUrl2 = document.getElementById('authorImage2');
            const authorFacebook = document.getElementById('facebook');
            const authorTwitter = document.getElementById('twitter');
            const authorWhatsapp = document.getElementById('whatsapp');
            const authorComment = document.getElementById('authorComment');
            const authorInfo = document.getElementById('authorInfo');
            authorName.textContent = comments.name;
            authorDate.textContent = comments.date;
            authorImageUrl.src = comments.authorImageUrl;
            authorFacebook.href = comments.socialmedia.facebookUrl;
            authorTwitter.href = comments.socialmedia.twitterUrl;
            authorWhatsapp.href = comments.socialmedia.whatsappUrl;
            authorComment.textContent = comments.comment;
            authorImageUrl2.src = comments.authorImageUrl;
            authorInfo.textContent = comments.name + comments.info;
        }
        else {
            console.error('Comments not found.');
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    renderArticleDetails();
});

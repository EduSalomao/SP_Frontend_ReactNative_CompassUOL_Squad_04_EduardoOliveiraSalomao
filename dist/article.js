var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getArticleIdFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id') || '0', 10);
}
function fetchArticleDetails(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, article;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('../api/db.json')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    article = data.articles.find(function (article) { return article.id === id; });
                    return [2 /*return*/, article];
            }
        });
    });
}
function fetchCommentDetails(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('../api/db.json')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    comment = data.comments.find(function (comment) { return comment.id === id; });
                    return [2 /*return*/, comment];
            }
        });
    });
}
function renderArticleDetails() {
    return __awaiter(this, void 0, void 0, function () {
        var articleId, article, comments, articleImage, articleTitle, authorName, authorDate, authorImageUrl, authorFacebook, authorTwitter, authorWhatsapp, authorComment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    articleId = getArticleIdFromUrl();
                    return [4 /*yield*/, fetchArticleDetails(articleId)];
                case 1:
                    article = _a.sent();
                    return [4 /*yield*/, fetchCommentDetails(articleId)];
                case 2:
                    comments = _a.sent();
                    if (article) {
                        articleImage = document.getElementById('articleImage');
                        articleTitle = document.getElementById('articleTitle');
                        articleImage.src = article.imageUrl;
                        articleTitle.textContent = article.title;
                    }
                    else {
                        console.error('Article not found.');
                    }
                    if (comments) {
                        authorName = document.getElementById('authorName');
                        authorDate = document.getElementById('authorDate');
                        authorImageUrl = document.getElementById('authorImage');
                        authorFacebook = document.getElementById('facebook');
                        authorTwitter = document.getElementById('twitter');
                        authorWhatsapp = document.getElementById('whatsapp');
                        authorComment = document.getElementById('authorComment');
                        authorName.textContent = comments.name;
                        authorDate.textContent = comments.date;
                        authorImageUrl.src = comments.authorImageUrl;
                        authorFacebook.href = comments.socialmedia.facebookUrl;
                        authorTwitter.href = comments.socialmedia.twitterUrl;
                        authorWhatsapp.href = comments.socialmedia.whatsappUrl;
                        authorComment.textContent = comments.comment;
                    }
                    else {
                        console.error('Comments not found.');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    renderArticleDetails();
});

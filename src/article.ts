interface Article {
    id: number;
    title: string;
    imageUrl: string;
}

interface Comment {
    id: number;
    authorImageUrl: string;
    name: string;
    date: string;
    comment: string;
    socialmedia: {
        facebookUrl: string;
        twitterUrl: string;
        whatsappUrl: string;
    };
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

async function fetchCommentDetails(id: number): Promise<Comment | undefined> { 
    const response = await fetch('../api/db.json');
    const data = await response.json();
    const comment = data.comments.find((comment: Comment) => comment.id === id); 
    return comment;
}

async function renderArticleDetails() {
    const articleId = getArticleIdFromUrl();
    const article = await fetchArticleDetails(articleId);
    const comments = await fetchCommentDetails(articleId);  

    if (article) {
        const articleImage = document.getElementById('articleImage') as HTMLImageElement;
        const articleTitle = document.getElementById('articleTitle') as HTMLHeadingElement;

        articleImage.src = article.imageUrl;
        articleTitle.textContent = article.title;
    } else {
        console.error('Article not found.');
    }
    
    if (comments) { 
        const authorName = document.getElementById('authorName') as HTMLBodyElement;
        const authorDate = document.getElementById('authorDate') as HTMLBodyElement;
        const authorImageUrl = document.getElementById('authorImage') as HTMLImageElement;
        const authorFacebook = document.getElementById('facebook') as HTMLAnchorElement;
        const authorTwitter = document.getElementById('twitter') as HTMLAnchorElement;
        const authorWhatsapp = document.getElementById('whatsapp') as HTMLAnchorElement;
        const authorComment = document.getElementById('authorComment') as HTMLBodyElement;

        authorName.textContent = comments.name;  
        authorDate.textContent = comments.date;  
        authorImageUrl.src = comments.authorImageUrl;  
        authorFacebook.href = comments.socialmedia.facebookUrl;  
        authorTwitter.href = comments.socialmedia.twitterUrl;  
        authorWhatsapp.href = comments.socialmedia.whatsappUrl; 
        authorComment.textContent = comments.comment;

    } else {
        console.error('Comments not found.');  
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderArticleDetails();
});

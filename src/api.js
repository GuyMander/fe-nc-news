import axios from "axios";

const baseURL = "https://nc-news-project-qeuz.onrender.com/api";
const nc_news_API = axios.create({baseURL});

export async function getArticles(){ //array of articles
    const response = await nc_news_API.get('/articles');
    const articles = response.data.articles;
    return articles;
}

export async function getArticleById(id){
    const response = await nc_news_API.get(`/articles/${id}`);
    const article = response.data.article;
    return article;
}

export async function getCommentsById(id){
    const response = await nc_news_API.get(`/articles/${id}/comments`);
    const comments = response.data.comments;
    return comments;
}

export async function patchVotesByArticleId(id, voteObj){
    const response = await nc_news_API.patch(`/articles/${id}`, voteObj);
    const updated_article = response.data.updated_article;
    return updated_article;
}
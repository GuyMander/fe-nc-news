import axios from "axios";

const baseURL = "https://nc-news-project-qeuz.onrender.com/api";
const nc_news_API = axios.create({baseURL});

export async function getArticles(){ //array of articles
    const response = await nc_news_API.get('/articles')
    const articles = response.data.articles
    return articles
}

export async function getArticleById(id){
    const response = await nc_news_API.get(`/articles/${id}`)
    const article = response.data.article
    return article
}
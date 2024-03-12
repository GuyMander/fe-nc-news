import "./Articles.css"
import { getArticles } from "../../api"
import { useState } from "react"

function Articles() {

    const [articles, setArticles] = useState([]);

    getArticles().then((fetchedArticles)=> {
        setArticles(fetchedArticles)
    })


    return (
        <>
        <section>
            <ul>

            {articles.map((article) => {
            return (
                <div className="articleCard" key={article.article_id}>
                <p>article_id: {article.article_id}</p>
                <p>Author: {article.author}</p>
                <p>Title: {article.title}</p>
                <p>Topic: {article.topic}</p>
                <p>Created_at: {article.created_at}</p>
                <p>article_img_url: {article.article_img_url}</p>
                <p>Votes: {article.votes}</p>
                <p>Comment_count: {article.comment_count}</p>
                <img src={article.article_img_url} />
                </div>
            )   
            })}

            </ul>
        </section>
        </>
    )
}

export default Articles
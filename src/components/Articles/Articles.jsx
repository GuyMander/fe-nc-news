import "./Articles.css"
import { getArticles } from "../../api"
import { useState, useEffect } from "react"
import { Routes, Route, Link, useParams, useSearchParams } from "react-router-dom"

function Articles() {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const sortByTopic = searchParams.get('topic');

    useEffect(() => {
        getArticles()
        .then((fetchedArticles)=> {
            if(sortByTopic){
                const sortedArticles = fetchedArticles.filter((article) => article.topic === sortByTopic )
                setArticles(sortedArticles)
                setIsLoading(false)
            }
            else{
                setArticles(fetchedArticles);
                setIsLoading(false)
            }
        })
        .catch((error)=> {
            console.log(error);
        })
    }, [])

    if(isLoading) return <><p>Loading...</p></>

    const articlesOutput = articles.map((article) => {
        const d = new Date(article.created_at)
        const formattedDate = d.toUTCString()

        return (
            <div className="articleCard" key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                    <p>article_id: {article.article_id}</p>
                    <p>Author: {article.author}</p>
                    <p>Title: {article.title}</p>
                    <p>Topic: {article.topic}</p>
                    <p>Created_at: {formattedDate} </p>
                    <p>article_img_url: {article.article_img_url}</p>
                    <p>Votes: {article.votes}</p>
                    <p>Comment_count: {article.comment_count}</p>
                    <img src={article.article_img_url} />
                </Link>
            </div>
        )
    })

    return (
        <>
        <br />         
        {articlesOutput}        
        </>
    )
}

export default Articles
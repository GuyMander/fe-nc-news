import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getArticleById } from '../../api';
import './ArticleById.css'
import CommentsById from '../CommentsById/CommentsById';

function ArticleById(){
    
    const id = useParams().article_id;
    const [isLoading, setIsLoading] = useState(true);
    const [currArticle, setCurrArticle] = useState();

    useEffect(() => {
        getArticleById(id)
        .then((fetchedArticle)=> {
            setCurrArticle(fetchedArticle);
            setIsLoading(false)
        })
        .catch((error)=> {
            console.log(error);
        })
    }, [])

    if(isLoading) return <><p>Loading...</p></>

    if(currArticle === undefined){
        return <></>
    }

    else{
        const d = new Date(currArticle.created_at)
        const formattedDate = d.toUTCString()
        

      return (
            <>
                <br />
                <section>
                    <div className="articleView" key={id}>
                        <img src={currArticle.article_img_url} />
                        <p>article_id: {currArticle.article_id}</p>
                        <p>Title: {currArticle.title}</p>
                        <p>Topic: {currArticle.topic}</p>
                        <p>Author: {currArticle.author}</p>
                        <p>Created_at: {formattedDate}</p>
                        <p>Votes: {currArticle.votes}</p>
                        <p>Comment_count: {currArticle.comment_count}</p>
                        <p>Body: {currArticle.body}</p>
                    </div>
                </section>
                <CommentsById article_id={currArticle.article_id}/>
            </>
        )  
    }
}
export default ArticleById
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getArticleById, patchVotesByArticleId } from '../../api';
import './ArticleById.css'
import CommentsById from '../CommentsById/CommentsById';
import PostComment from '../PostComment/PostComment';

function ArticleById(){
    
    const id = useParams().article_id;
    const [isLoading, setIsLoading] = useState(true);
    const [currArticle, setCurrArticle] = useState();
    const [isPostShowing, setIsPostShowing] = useState(false);
    const [isError, setIsError] = useState(false);
    
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

    function handleVote(e, numOfVotes){
        const voteObj = { inc_votes: numOfVotes };

        setCurrArticle((prevArticle)=>{
            const copyOfArticle = {...prevArticle};
            copyOfArticle.votes += numOfVotes;
            return copyOfArticle;
        })
        
        patchVotesByArticleId(id, voteObj)
        .catch((error) => {
            setIsError(true);
            setCurrArticle((prevArticle)=>{
                const copyOfArticle = {...prevArticle};
                copyOfArticle.votes -= numOfVotes;
                return copyOfArticle;
            })
        })
        return null
    }

    function handleShowPostComment(){
        return setIsPostShowing((prevState)=> !prevState)
    }
    
    if(isLoading) return <><p>Loading...</p></>

    if(!currArticle === undefined) return null

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
                        <p id="votes">Votes: {currArticle.votes}</p>
                        <p>Comment_count: {currArticle.comment_count}</p>
                        <p>Body: {currArticle.body}</p>
                        <br />
                        <p>Vote below with a: Mega Up Vote, Up Vote, Down Vote or a Mega Down Vote (Mega Votes = &plusmn;10)</p>
                        <button type='button' onClick={(e) => handleVote(e, 10)} ><img src='/src/assets/so-gold.svg' width="50" /></button>
                        <button type='button' onClick={(e) => handleVote(e, 1)} ><img src='/src/assets/thumbs-up.svg' width="50" /></button>
                        <button type='button' onClick={(e) => handleVote(e, -1)} ><img src='/src/assets/thumbs-down.svg' width="50" /></button>
                        <button type='button' onClick={(e) => handleVote(e, -10)} ><img src='/src/assets/poop.svg' width="50" /></button>
                        <div id="voteApiError">{isError? "ERROR WITH VOTE UPDATE REQUEST": null}</div>
                        <button type='button' id="postCommentButton" onClick={handleShowPostComment}>Post Comment</button>
                        <PostComment isPostShowing={isPostShowing} />
                    </div>
                </section>
                <CommentsById article_id={currArticle.article_id}/>
            </>
        )  
    }
}
export default ArticleById
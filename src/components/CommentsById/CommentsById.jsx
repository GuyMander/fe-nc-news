import './CommentsById.css'
import { getCommentsById } from '../../api'
import { useState, useEffect } from 'react';


function CommentsById(props){
    
    function handleShowComments(){
        setIsShowing((currState) => !currState)
    }

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isShowing, setIsShowing] = useState(false);
    const id = props.article_id;

    useEffect(() => {
        getCommentsById(id).then((fetchedComments)=> {
            setComments(fetchedComments)
            setIsLoading(false)
        })
    },[])

    if(isLoading) return <p>Loading...</p>
    if(comments.length === 0) return <p>No Comments available for this article!</p>

    const commentsOutput = comments.map((comment) => {
        const d = new Date(comment.created_at)
        const formattedDate = d.toUTCString()
        return (
            <div className='comment' key={comment.comment_id}>
                <p>article_id: {comment.article_id}</p>
                <p>comment_id: {comment.comment_id}</p>
                <p>author: {comment.author}</p>
                <p>created_at: {formattedDate}</p>
                <p>body: {comment.body}</p>
            </div>
        )
    })

    return(
        <>
        <button type='button' onClick={handleShowComments}>SHOW COMMENTS</button>
            { isShowing ? 
            <div className='commentsContainer' id='commentsContainer'>
            {commentsOutput}
            </div>
            : null
            }
        </>
    )
}
export default CommentsById
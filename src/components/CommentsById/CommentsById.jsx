import './CommentsById.css'
import { getCommentsById } from '../../api'
import { useState, useEffect } from 'react';
import { deleteCommentById } from '../../api';


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

    useEffect(()=> {
        if(props.newPostedComment){
        setComments((prevComments) => [{...props.newPostedComment}, ...prevComments])
        }
    }, [props.newPostedComment])

    if(isLoading) return <p>Loading...</p>
    if(comments.length === 0) return <p>No Comments available for this article!</p>

    function handleDeleteComment (commentId, user = 'jessjelly'){
        let isDeleteAllowed = false;
        comments.forEach((comment) => {
            if(comment.comment_id === commentId && comment.author === user){
                isDeleteAllowed = true;
            }
        })
        if(!isDeleteAllowed) {
            console.log('delete not allowed');
            return;
        }

        //remove from the state
        setComments((currComments) => {
            return currComments.filter((comment) => !(comment.comment_id === commentId && comment.author === user))
        });

        // Send API request to delete comment
        deleteCommentById(commentId).then((returnValue)=> {
            returnValue?console.log('comment deleted successfully'):console.log('problem with comment deletion')
        })
        .catch((error)=> {
            console.log('error with comment deletion')
        });
    };

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
                <button onClick={() => handleDeleteComment(comment.comment_id)}>Delete</button>
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
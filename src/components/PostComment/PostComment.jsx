import "./PostComment.css"
import { useState, useRef } from "react";
import { postNewComment } from "../../api";
import { useParams } from "react-router-dom";

function PostComment(props){
    const [currComment, setCurrComment] = useState('');
    const {article_id} = useParams();
    const textareaRef = useRef(null);

    const [isPostEmpty, setIsPostEmpty] = useState(false);
    const [isPostSent, setIsPostSent] = useState(false);
    const [isPostSuccessful, setIsPostSuccessful] = useState(false);
    const [isPostFailed, setIsPostFailed] = useState(false);

   
    
    //stop if button not pressed
    if(!props.isPostShowing){
        return null;
    }

    function formValidator(e, user="jessjelly"){
        e.preventDefault();

        setIsPostFailed(false)
        setIsPostSuccessful(false)
        setIsPostEmpty(false)
        //edge case, states still need to be reset
        if(isPostSent || isPostSuccessful || isPostFailed){
            return;
        }
        //edge case, no text
        if(currComment === ""){
            setIsPostEmpty(true);
            return
        }

        const commentForSubmitting = e.target[0].value;
        const commentObj = {
            username: user,
            body: commentForSubmitting
        }
        
        setIsPostSent(true);

        postNewComment(article_id, commentObj)
        .then((posted_article) => {
            setCurrComment('');//stops repeated comment posting

            setIsPostSent(false)
            setIsPostFailed(false)
            setIsPostSuccessful(true);
            props.setNewPostedComment(posted_article);
        })
        .catch((error) => {
            setIsPostSent(false);
            setIsPostFailed(true);
        })

    }

    function typingHandler(e){
        setCurrComment(e.target.value);
        adjustTextareaHeight();
    }

    function adjustTextareaHeight() {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }

    return (
        <>
            <form onSubmit={formValidator} method="post">
                <label htmlFor="commentBox">Enter Comment Here: </label>
                <br />
                <textarea ref={textareaRef} name="commentBox" id="commentBox" onChange={typingHandler} value={currComment} rows={3}/>
                <button id="submitCommentButton" type="submit">POST</button>
            </form>
            <div>
                {isPostEmpty ? <p id="red">Cannot post an empty comment!</p> : null}
                {isPostSent ? <p id="yellow">Comment Sent</p> : null}
                {isPostSuccessful ? <p id="green">Posted Successfully</p> : null}
                {isPostFailed ? <p id="red">Comment post unsuccessful</p> : null}
            </div>
        </>
    )
}

export default PostComment;
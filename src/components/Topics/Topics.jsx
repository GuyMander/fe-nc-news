import "./Topics.css"
import { useEffect, useState } from "react"
import { getTopics } from "../../api";
import { Link } from "react-router-dom";

function Topics(){
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTopics()
        .then((topics)=>{
            setTopics(topics);
            setIsLoading(false);
        })
    }, [])

    if(isLoading) return (<p>Loading...</p>)
    if(topics.length === 0) return (<p>There are currently no topics</p>)
    
    const topicsOutput = topics.map((topic)=> {
        const title = topic.slug;
        const description = topic.description;
        const output = (
            <Link to={`/articles?topic=${title}`}>
            <div className="topicContainer" key={title}>
                <p>Title: {title.toUpperCase()}<br/>
                Description: {description}</p>
            </div>
            </Link>
            )
        return output;
    })

    return (
        <>
        <section className="topics">
        <p>This is Topics</p>
        {topicsOutput}
        </section>
        </>
    )
}

export default Topics
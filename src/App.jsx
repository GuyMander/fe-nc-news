import { Routes, Route, Link } from "react-router-dom"
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import "./App.css";
import Topics from "./components/Topics/Topics";
import Articles from "./components/Articles/Articles";
import PostArticle from "./components/PostArticle/PostArticle";
import ArticleById from "./components/ArticleById/ArticleById";

function App() {
  return (
    <>
      <Header />  
      <Routes>
        <Route path="/" element= {<HomePage/>}/>
        <Route path="/topics" element= {<Topics/>}/>
        <Route path="/articles" element= {<Articles/>}/>
        <Route path="/articles/:article_id" element={<ArticleById/>}/>
        <Route path="/post_article" element= {<PostArticle/>}/>
      </Routes>
    </>
  );
}

export default App;

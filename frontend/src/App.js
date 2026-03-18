import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import TopicPage from "./pages/TopicPage"
import Write from "./pages/Write"
import PostDetail from "./pages/PostDetail"
import EditPost from "./pages/EditPost"

function App(){
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:topic" element={<TopicPage />} />
          <Route path="/write" element={<Write />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
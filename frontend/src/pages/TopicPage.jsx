import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPosts } from "../api/api";
import PostCard from "../components/PostCard";

function TopicPage() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const decodedTopic = decodeURIComponent(topic);

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((res) => {
        const filtered = res.data.filter(
          (post) => (post.topic || "Chung").trim() === decodedTopic.trim()
        );
        setPosts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải danh sách chương");
        setLoading(false);
      });
  }, [decodedTopic]);

  return (
    <main>
      <div className="page-container">
        <header className="book-header">
          <h1 className="book-title">{decodedTopic}</h1>
          <p className="book-subtitle">{posts.length} {posts.length === 1 ? 'bài viết' : 'bài viết'} trong chủ đề này</p>
        </header>

        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
            ← Quay lại
          </button>
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#666' }}>Đang tải...</p>}
        {error && <p style={{ textAlign: 'center', color: '#ff5252' }}>{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', fontSize: '1.05rem' }}>Chưa có bài viết nào trong chủ đề này.</p>
        )}

        <div className="book">
          {posts.map((post, idx) => (
            <PostCard key={post._id} post={post} chapter={idx + 1} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default TopicPage;

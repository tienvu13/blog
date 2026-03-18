import { Link } from "react-router-dom";

function PostCard({ post, chapter }) {
  return (
    <div className="book-chapter mb-4">
      <div className="chapter-cover">
        <div className="chapter-label">Chương {chapter}</div>
        <h3 className="chapter-title">{post.title}</h3>
        <p className="chapter-excerpt">{post.content.substring(0, 120)}...</p>
      </div>
      <div className="chapter-actions">
        <Link to={`/post/${post._id}`} className="btn btn-outline-primary btn-sm">
          Tiếp tục đọc
        </Link>
      </div>
    </div>
  );
}

export default PostCard
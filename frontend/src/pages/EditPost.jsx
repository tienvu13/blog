import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("Chung");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    setLoading(true);
    getPost(id)
      .then((res) => {
        const post = res.data;
        setTitle(post.title || "");
        setContent(post.content || "");
        setTopic(post.topic || "Chung");
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải bài viết để sửa");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: 'success' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, content, topic });
      setToast({ show: true, message: 'Cập nhật bài viết thành công!', type: 'success' });
      setTimeout(() => {
        navigate(`/post/${id}`, { state: { fromEdit: true } });
      }, 2000);
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: 'Có lỗi khi cập nhật bài viết', type: 'error' });
    }
  };

  if (loading) return <main><div className="page-container"><p style={{ textAlign: 'center' }}>Đang tải...</p></div></main>;
  if (error) return <main><div className="page-container"><p style={{ textAlign: 'center', color: '#ff5252' }}>{error}</p></div></main>;

  return (
    <main>
      <div className="page-container">
        <div className="form-container">
          <h1 className="form-title">✏️ Chỉnh sửa bài viết</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="topic" className="form-label">Chủ đề / Series</label>
              <input
                type="text"
                className="form-control"
                id="topic"
                placeholder="Ví dụ: JavaScript, React, Cuộc sống..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Tiêu đề bài viết</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Nhập tiêu đề bài viết..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content" className="form-label">Nội dung bài viết</label>
              <textarea
                className="form-control form-textarea"
                id="content"
                placeholder="Chỉnh sửa nội dung bài viết..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="12"
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                💾 Lưu thay đổi
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                style={{ flex: 1 }}
                onClick={() => navigate(-1)}
              >
                ✕ Hủy
              </button>
            </div>
          </form>
        </div>
        {toast.show && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: toast.type === 'success' ? '#4CAF50' : '#f44336',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
            animation: 'slideIn 0.3s ease-out'
          }}>
            {toast.message}
          </div>
        )}
      </div>
    </main>
  );
}

export default EditPost;

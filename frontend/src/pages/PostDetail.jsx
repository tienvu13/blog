import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api/api";
import PageFlip from "../components/PageFlip";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPost(id)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải bài viết");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        await deletePost(id);
        alert("Bài viết đã được xóa thành công!");
        navigate("/");
      } catch (err) {
        alert("Có lỗi xảy ra khi xóa bài viết");
        console.log(err);
      }
    }
  };

  if (loading) return <div className="container mt-4"><p>Đang tải...</p></div>;
  if (error) return <div className="container mt-4"><p>{error}</p></div>;
  if (!post) return <div className="container mt-4"><p>Bài viết không tồn tại</p></div>;

  return (
    <main>
      <div className="page-container" style={{ position: 'relative', minHeight: 'calc(100vh - 72px)', width: '100%' }}>
        <PageFlip content={post.content} title={post.title} />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1001 }}>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)} style={{ marginRight: '0.5rem' }}>
            Quay lại
          </button>
          <button className="btn btn-outline-primary" onClick={() => navigate(`/post/${id}/edit`)} style={{ marginRight: '0.5rem' }}>
            Chỉnh sửa
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Xóa bài viết
          </button>
        </div>
      </div>
    </main>
  );
}

export default PostDetail;
import { useState, useEffect } from "react"
import { createPost } from "../api/api"

function Write(){
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [topic, setTopic] = useState("Chung")
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: 'success' })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast.show])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setToast({ show: true, message: 'Vui lòng điền đủ thông tin bài viết', type: 'error' })
      return
    }
    const newPost = {
      title: title,
      content: content,
      author: "admin",
      topic: topic
    }
    try {
      await createPost(newPost)
      setToast({ show: true, message: 'Đăng bài thành công!', type: 'success' })
      setTitle("")
      setContent("")
      setTopic("Chung")
    } catch (err) {
      console.log(err)
      setToast({ show: true, message: 'Có lỗi khi đăng bài', type: 'error' })
    }
  }

  return (
    <main>
      <div className="page-container">
        <div className="form-container">
          <h1 className="form-title">✍️ Viết bài mới</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Tiêu đề bài viết</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Nhập tiêu đề bài viết của bạn..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
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
              <label htmlFor="content" className="form-label">Nội dung bài viết</label>
              <textarea
                className="form-control form-textarea"
                id="content"
                placeholder="Bắt đầu viết bài của bạn tại đây..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="12"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              📤 Đăng bài
            </button>
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
            fontSize: '14px'
          }}>
            {toast.message}
          </div>
        )}
      </div>
    </main>
  )
}

export default Write
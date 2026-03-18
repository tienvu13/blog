import { useState } from "react"
import { createPost } from "../api/api"

function Write(){
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [topic, setTopic] = useState("Chung")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert("Vui lòng điền đủ thông tin bài viết")
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
      alert("Đăng bài thành công!")
      setTitle("")
      setContent("")
      setTopic("Chung")
    } catch (err) {
      console.log(err)
      alert("Có lỗi khi đăng bài")
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
      </div>
    </main>
  )
}

export default Write
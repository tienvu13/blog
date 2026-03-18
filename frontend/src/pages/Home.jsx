import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPosts } from "../api/api"

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res.data)
    })
  }, [])

  const topics = posts.reduce((map, post) => {
    const topic = (post.topic || "Chung").trim() || "Chung";
    if (!map[topic]) map[topic] = { topic, count: 0 };
    map[topic].count += 1;
    return map;
  }, {});

  const topicList = Object.values(topics);

  return (
    <main>
      <div className="page-container">
        <header className="book-header">
          <h1 className="book-title">Thư viện bài viết</h1>
          <p className="book-subtitle">Chọn chủ đề để khám phá những chương thú vị</p>
        </header>

        <div className="book">
          {topicList.map((topicItem) => (
            <div key={topicItem.topic} className="book-chapter">
              <div className="chapter-cover">
                <div className="chapter-label">Chủ đề</div>
                <h3 className="chapter-title">{topicItem.topic}</h3>
                <p className="chapter-excerpt">
                  {topicItem.count} {topicItem.count === 1 ? 'bài viết' : 'bài viết'}
                </p>
              </div>
              <div className="chapter-actions">
                <Link
                  to={`/topic/${encodeURIComponent(topicItem.topic)}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  Mở chủ đề
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Home
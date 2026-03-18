/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import './PageFlip.css';

function PageFlip({ content, title }) {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Chia nội dung thành các trang dựa trên số dòng (khoảng 18 dòng/trang)
    const lines = content.split('\n');
    const linesPerPage = 18;
    const newPages = [];
    for (let i = 0; i < lines.length; i += linesPerPage) {
      newPages.push(lines.slice(i, i + linesPerPage).join('\n'));
    }
    setPages(newPages);
    // Mở sách mượt mà sau khi tải nội dung
    setTimeout(() => setIsOpen(true), 200);
  }, [content]);

  const nextPage = () => {
    if (currentPage + 2 < pages.length && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 2);
        setIsFlipping(false);
      }, 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 2);
        setIsFlipping(false);
      }, 800);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevPage();
      } else if (e.key === 'ArrowRight') {
        nextPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, pages.length, isFlipping]);

  return (
    <div className="pageflip-container">
      <div className={`pageflip-book ${!isOpen ? 'closed' : ''}`}>
        <div className={`page page-left ${isFlipping ? 'flipped' : ''}`} onClick={prevPage}>
          {pages[currentPage] && (
            <>
              <div className="page-content">
                <h2>{title}</h2>
                <p>{pages[currentPage]}</p>
              </div>
              <div className="page-footer">— {currentPage + 1} —</div>
            </>
          )}
        </div>
        <div className={`page page-right ${isFlipping ? 'flipped' : ''}`} onClick={nextPage}>
          {pages[currentPage + 1] && (
            <>
              <div className="page-content">
                <h2>{title}</h2>
                <p>{pages[currentPage + 1]}</p>
              </div>
              <div className="page-footer">— {currentPage + 2} —</div>
            </>
          )}
        </div>
      </div>
      <div className="controls">
        <button onClick={prevPage} disabled={currentPage === 0 || isFlipping}>Trang trước</button>
        <span>Trang {currentPage + 1}-{currentPage + 2} / {pages.length}</span>
        <button onClick={nextPage} disabled={currentPage + 2 >= pages.length || isFlipping}>Trang sau</button>
      </div>
      <div className="instructions">
        Sử dụng mũi tên trái/phải hoặc click vào trang để lật
      </div>
    </div>
  );
}

export default PageFlip;
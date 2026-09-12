import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi';
import './Pages.css';

function NewsDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`/api/news/${id}`);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `/api/news/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setLiked(response.data.liked);
    } catch (error) {
      console.error('Error liking news:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `/api/news/${id}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setComment('');
      fetchNews();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `/api/user/save-news/${id}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSaved(!saved);
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  if (loading) return <div className="loading">লোড হচ্ছে...</div>;
  if (!news) return <div className="error">সংবাদ পাওয়া যাইনি।</div>;

  return (
    <main className="news-detail-page">
      <div className="container">
        <button onClick={() => navigate('/')} className="back-btn">
          <FiArrowLeft /> ফিরে যান
        </button>

        <article className="news-detail">
          <header className="news-header">
            <div className="news-meta-header">
              <span className="category-badge" style={{
                backgroundColor: news.category?.color || '#3b82f6'
              }}>
                {news.category?.name}
              </span>
              <span className="published-date">
                {new Date(news.createdAt).toLocaleDateString('bn-BD', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <h1>{news.title}</h1>
            <p className="news-lead">{news.description}</p>

            <div className="author-section">
              <img
                src={news.author?.profileImage || 'https://via.placeholder.com/50'}
                alt={news.author?.name}
                className="author-avatar"
              />
              <div>
                <p className="author-name">{news.author?.name}</p>
                <p className="author-email">{news.author?.email}</p>
              </div>
            </div>
          </header>

          <img src={news.image} alt={news.title} className="news-featured-image" />

          <div className="news-body">
            {news.content}
          </div>

          {news.tags && news.tags.length > 0 && (
            <div className="news-tags">
              {news.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}

          <div className="news-actions">
            <button
              onClick={handleLike}
              className={`action-btn ${liked ? 'liked' : ''}`}
            >
              <FiHeart /> পছন্দ ({news.likes?.length || 0})
            </button>
            <button onClick={handleSave} className={`action-btn ${saved ? 'saved' : ''}`}>
              সংরক্ষণ করুন
            </button>
            <button className="action-btn">
              <FiShare2 /> শেয়ার করুন
            </button>
          </div>
        </article>

        {/* Comments Section */}
        <section className="comments-section">
          <h2>
            <FiMessageCircle /> মন্তব্য ({news.comments?.length || 0})
          </h2>

          {user && (
            <form onSubmit={handleComment} className="comment-form">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="আপনার মন্তব্য লিখুন..."
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">
                মন্তব্য করুন
              </button>
            </form>
          )}

          {!user && (
            <p className="login-prompt">
              মন্তব্য করতে <a href="/login">লগইন করুন</a>
            </p>
          )}

          <div className="comments-list">
            {news.comments && news.comments.length > 0 ? (
              news.comments.map((c, index) => (
                <div key={index} className="comment">
                  <img
                    src={c.user?.profileImage || 'https://via.placeholder.com/40'}
                    alt={c.user?.name}
                    className="comment-avatar"
                  />
                  <div className="comment-content">
                    <p className="comment-author">{c.user?.name}</p>
                    <p className="comment-text">{c.text}</p>
                    <small className="comment-date">
                      {new Date(c.createdAt).toLocaleDateString('bn-BD')}
                    </small>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-comments">এখনো কোনো মন্তব্য নেই।</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default NewsDetail;
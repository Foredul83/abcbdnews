import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiHeart, FiShare2 } from 'react-icons/fi';
import './NewsCard.css';

function NewsCard({ news }) {
  return (
    <article className="news-card card">
      <div className="news-image-container">
        <img src={news.image} alt={news.title} className="news-image" />
        {news.category && (
          <span
            className="news-category"
            style={{ backgroundColor: news.category.color || '#3b82f6' }}
          >
            {news.category.name}
          </span>
        )}
      </div>

      <div className="news-content">
        <Link to={`/news/${news._id}`}>
          <h3 className="news-title">{news.title}</h3>
        </Link>

        <p className="news-description">{news.description}</p>

        <div className="news-meta">
          <div className="author-info">
            <img
              src={news.author?.profileImage || 'https://via.placeholder.com/40'}
              alt={news.author?.name}
              className="author-avatar"
            />
            <div>
              <p className="author-name">{news.author?.name}</p>
              <p className="news-date">
                {new Date(news.createdAt).toLocaleDateString('bn-BD')}
              </p>
            </div>
          </div>

          <div className="news-stats">
            <span className="stat">
              <FiEye /> {news.views}
            </span>
            <span className="stat">
              <FiHeart /> {news.likes?.length || 0}
            </span>
          </div>
        </div>

        <div className="news-footer">
          <Link to={`/news/${news._id}`} className="btn btn-secondary">
            সম্পূর্ণ পড়ুন
          </Link>
          <button className="share-btn" title="শেয়ার করুন">
            <FiShare2 />
          </button>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;

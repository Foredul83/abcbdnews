import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import './Pages.css';

function Category() {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryNews();
  }, [slug]);

  const fetchCategoryNews = async () => {
    try {
      const categoriesRes = await axios.get('/api/category');
      const cat = categoriesRes.data.find((c) => c.slug === slug);
      setCategory(cat);

      if (cat) {
        const newsRes = await axios.get('/api/news', {
          params: { category: cat._id, limit: 100 }
        });
        setNews(newsRes.data.news);
      }
    } catch (error) {
      console.error('Error fetching category news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">লোড হচ্ছে...</div>;
  if (!category) return <div className="error">ক্যাটাগরি খুঁজে পাওয়া যাইনি।</div>;

  return (
    <main className="category-page">
      <div className="container">
        <div className="category-header" style={{
          borderTopColor: category.color,
          borderTopWidth: '4px'
        }}>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
          <small>{news.length} টি সংবাদ</small>
        </div>

        {news.length > 0 ? (
          <div className="news-grid">
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>
        ) : (
          <p className="no-results">এই ক্যাটাগরিতে কোনো সংবাদ পাওয়া যাইনি।</p>
        )}
      </div>
    </main>
  );
}

export default Category;
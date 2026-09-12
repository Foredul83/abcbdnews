import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import './Pages.css';

function Home() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [newsRes, categoriesRes, featuredRes] = await Promise.all([
        axios.get('/api/news', { params: { page, limit: 12, search } }),
        axios.get('/api/category'),
        axios.get('/api/news/featured')
      ]);

      setNews(newsRes.data.news);
      setCategories(categoriesRes.data);
      setFeatured(featuredRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="home-page">
      <div className="container">
        {/* Featured Section */}
        {featured.length > 0 && (
          <section className="featured-section">
            <h2>বৈশিষ্ট্যযুক্ত সংবাদ</h2>
            <div className="featured-grid">
              {featured.map((item) => (
                <article key={item._id} className="featured-card">
                  <img src={item.image} alt={item.title} />
                  <div className="featured-content">
                    <Link to={`/news/${item._id}`}>
                      <h3>{item.title}</h3>
                    </Link>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section className="categories-section" id="categories">
            <h2>ক্যাটাগরি</h2>
            <div className="categories-grid">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className="category-card"
                  style={{ borderTopColor: category.color }}
                >
                  <span className="category-name">{category.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Latest News */}
        <section className="news-section">
          <h2>সর্বশেষ সংবাদ</h2>
          {loading ? (
            <div className="loading">লোড হচ্ছে...</div>
          ) : news.length > 0 ? (
            <>
              <div className="news-grid">
                {news.map((item) => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="btn btn-outline"
                >
                  পূর্ববর্তী
                </button>
                <span className="page-number">{page}</span>
                <button
                  onClick={() => setPage(page + 1)}
                  className="btn btn-outline"
                >
                  পরবর্তী
                </button>
              </div>
            </>
          ) : (
            <p className="no-results">কোনো সংবাদ পাওয়া যাইনি।</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import './Pages.css';

function Profile({ user }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/user/profile', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <div className="loading">লোড হচ্ছে...</div>;
  if (!profile) return <div className="error">প্রোফাইল খুঁজে পাওয়া যায়নি</div>;

  return (
    <main className="profile-page">
      <div className="container">
        <div className="profile-header">
          <img
            src={profile.profileImage || 'https://via.placeholder.com/150'}
            alt={profile.name}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <p>{profile.email}</p>
            <button
              onClick={() => setEditing(!editing)}
              className="btn btn-secondary"
            >
              {editing ? 'বাতিল' : 'সম্পাদনা করুন'}
            </button>
          </div>
        </div>

        {editing && (
          <form onSubmit={handleSubmit} className="edit-form card">
            <div className="form-group">
              <label>নাম</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>জীবনী</label>
              <textarea
                name="bio"
                value={formData.bio || ''}
                onChange={handleChange}
                placeholder="আপনার সম্পর্কে লিখুন..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              সংরক্ষণ করুন
            </button>
          </form>
        )}

        <section className="saved-news-section">
          <h2>সংরক্ষিত সংবাদ</h2>
          {profile.savedNews && profile.savedNews.length > 0 ? (
            <div className="news-grid">
              {profile.savedNews.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          ) : (
            <p className="no-results">এখনো কোনো সংবাদ সংরক্ষণ করা হয়নি।</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default Profile;
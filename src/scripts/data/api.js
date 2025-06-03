import CONFIG from '../config.js';

const BASE_URL = CONFIG.BASE_URL;
const StoryApi = {
  async getAllStories() {
    const token = localStorage.getItem('token');

    const url = token
      ? `${BASE_URL}/stories?location=1`
      : `${BASE_URL}/stories/guest?location=1`; 

    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error('Gagal fetch data stories');
    return await res.json();
  },

  async getStoryDetail(id) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/stories/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    return data.story;
  },

  async login(email, password) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  },

  async register(name, email, password) {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return await res.json();
  },

  async addStory(description, photo, lat, lon) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    if (lat && lon) {
      formData.append('lat', lat);
      formData.append('lon', lon);
    }

    const res = await fetch(`${BASE_URL}/stories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    });
    return await res.json();
  },

  async addStoryGuest(description, photo, lat, lon) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    if (lat && lon) {
      formData.append('lat', lat);
      formData.append('lon', lon);
    }

    const res = await fetch(`${BASE_URL}/stories/guest`, {
      method: 'POST',
      body: formData,
    });
    return await res.json();
  },
};

export default StoryApi;
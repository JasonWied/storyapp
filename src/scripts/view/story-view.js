/*
import L from 'leaflet';

const StoryView = {
  renderLoginPrompt(container) {
    container.innerHTML = '<p>Login dulu untuk melihat story.</p>';
  },

  renderError(container, message = 'Gagal memuat data stories.') {
    container.innerHTML = `<p>${message}</p>`;
  },

  renderEmpty(container) {
    container.innerHTML = '<p>Tidak ada cerita untuk ditampilkan.</p>';
  },

  renderStories(container, stories) {
    container.innerHTML = '';
    stories.forEach((s) => {
      const createdDate = new Date(s.createdAt);
      const storyItem = document.createElement('article');
      storyItem.classList.add('story-card');
      storyItem.innerHTML = `
        <img src="${s.photoUrl}" alt="Foto oleh ${s.name}" />
        <div class="story-content">
          <div class="story-title">${s.name}</div>
          <div class="story-meta">
            ${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}<br/>
            Oleh: ${s.name}
          </div>
          <button class="detail-btn" onclick="location.hash = '/detail/${s.id}'" aria-label="Lihat detail untuk ${s.name}">
            Lihat Detail
          </button>
          <button class="bookmark-btn" data-id="${s.id}" aria-label="Bookmark untuk ${s.name}">
          Bookmark
        </button>
        </div>
      `;
      container.appendChild(storyItem);
    });
  },


  renderMap(mapContainer, stories) {
    const map = L.map(mapContainer).setView([-6.2, 106.8], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    stories.forEach((s) => {
      if (s.lat && s.lon) {
        L.marker([s.lat, s.lon])
          .addTo(map)
          .bindPopup(`<b>${s.name}</b><br><i>${new Date(s.createdAt).toLocaleString()}</i>`);
      }
    });
  },
};

export default StoryView;
*/
import L from 'leaflet';

const StoryView = {
  renderLoginPrompt(container) {
    container.innerHTML = '<p>Login dulu untuk melihat story.</p>';
  },

  renderError(container, message = 'Gagal memuat data stories.') {
    container.innerHTML = `<p>${message}</p>`;
  },

  renderEmpty(container) {
    container.innerHTML = '<p>Tidak ada cerita untuk ditampilkan.</p>';
  },

  renderStories(container, stories, options = {}) {
    container.innerHTML = '';
    stories.forEach((s) => {
      const createdDate = new Date(s.createdAt);
      const storyItem = document.createElement('article');
      storyItem.classList.add('story-card');

      // Tombol kustom, default tombol bookmark + detail
      const buttonHTML = options.customButton
        ? options.customButton(s)
        : `
          <button class="detail-btn" onclick="location.hash = '/detail/${s.id}'" aria-label="Lihat detail untuk ${s.name}">
            Lihat Detail
          </button>
          <button class="bookmark-btn" data-id="${s.id}" aria-label="Bookmark untuk ${s.name}">
            Bookmark
          </button>
        `;

      storyItem.innerHTML = `
        <img src="${s.photoUrl}" alt="Foto oleh ${s.name}" />
        <div class="story-content">
          <div class="story-title">${s.name}</div>
          <div class="story-meta">
            ${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}<br/>
            Oleh: ${s.name}
          </div>
          ${buttonHTML}
        </div>
      `;
      container.appendChild(storyItem);
    });
  },

  renderMap(mapContainer, stories) {
    const map = L.map(mapContainer).setView([-6.2, 106.8], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    stories.forEach((s) => {
      if (s.lat && s.lon) {
        L.marker([s.lat, s.lon])
          .addTo(map)
          .bindPopup(`<b>${s.name}</b><br><i>${new Date(s.createdAt).toLocaleString()}</i>`);
      }
    });
  },
};

export default StoryView;

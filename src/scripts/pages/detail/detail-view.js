const DetailView = {
  getTemplate() {
    return `
      <div id="main-content" tabindex="-1" aria-label="Halaman detail">
        <section id="detail" class="detail-container" aria-label="Detail cerita"></section>
        <div id="detail-map" class="detail-map-container" style="height: 300px; margin-top: 1em;"></div>
      </div>
    `;
  },  
  

  renderStoryDetail(container, story) {
    container.innerHTML = `
      <article class="story-article">
        <h2 class="story-title">${story.name}</h2>
        <img src="${story.photoUrl}" alt="Foto cerita dari ${story.name}" class="story-image" />
        <p class="story-description">${story.description}</p>
        <p class="story-date"><em>${new Date(story.createdAt).toLocaleString()}</em></p>
      </article>
    `;
  },

  renderMap(story) {
    const map = L.map('detail-map').setView([story.lat, story.lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([story.lat, story.lon])
      .addTo(map)
      .bindPopup(`<b>${story.name}</b><br>${story.description}`)
      .openPopup();
  },

  renderMapFallback() {
    document.querySelector('#detail-map').innerHTML = '<p>Tidak ada lokasi tersedia untuk cerita ini.</p>';
  }
};

export default DetailView;

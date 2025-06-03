const HomeView = {
    getTemplate() {
      return `
        <div id="main-content" tabindex="-1" aria-label="Halaman Home">
        <section id="story-list" aria-label="Daftar cerita"></section>
        <section id="map" style="height: 400px;"></section>
        </div>
      `;
    },
  
    getStoryContainer() {
      return document.querySelector('#story-list');
    },
  
    getMapContainer() {
      return document.querySelector('#map');
    },
  };
  
  export default HomeView;
  
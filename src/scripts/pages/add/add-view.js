const AddView = {
  getTemplate() {
    return `
      <div id="main-content" tabindex="-1" aria-label="Halaman Tambah Cerita">
        <h2>Tambah Cerita</h2>
        <form id="addForm" aria-label="Form tambah cerita">
          <div>
            <label for="description">Deskripsi</label>
            <textarea id="description" name="description" placeholder="Deskripsi" required></textarea>
          </div>

          <div>
            <label>Ambil Gambar</label>
            <div>
              <video id="video" autoplay playsinline width="300" style="display:none;"></video>
              <canvas id="canvas" style="display:none; max-width: 300px; margin-top: 10px;"></canvas>
              <img id="previewImage" alt="Preview gambar" style="max-width: 300px; display: none; margin-top: 10px;" />
              <div style="margin-top: 10px;">
                <button type="button" id="startCamera">Gunakan Kamera</button>
                <button type="button" id="capture" style="display:none;">Ambil Foto</button>
              </div>
            </div>
            <div style="margin-top: 1rem;">
              <label for="imageFile">Ambil dari galeri</label>
              <input type="file" id="imageFile" name="imageFile" accept="image/*" />
            </div>
          </div>

          <div>
            <label for="map">Pilih Lokasi</label>
            <div id="map" style="height: 300px; margin-top: 0.5rem;" aria-label="Peta untuk memilih lokasi"></div>
          </div>

          <input type="hidden" id="lat" name="lat" />
          <input type="hidden" id="lon" name="lon" />

          <button type="submit">Upload</button>
        </form>
      </div>
    `;
  }
};

export default AddView;

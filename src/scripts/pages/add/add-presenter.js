import StoryApi from '../../data/api.js';
import Auth from '../../data/auth.js';
import L from 'leaflet';

const AddPresenter = {
  photoBlob: null,
  stream: null,
  descriptionInput: null,

  init({ form, descriptionInput, video, canvas, previewImage, startCameraBtn, captureBtn, imageFileInput, latInput, lonInput, mapContainer }) {
    this.photoBlob = null;
    this.descriptionInput = descriptionInput;

    this.setupCamera(video, canvas, previewImage, startCameraBtn, captureBtn, imageFileInput);
    this.setupMap(mapContainer, latInput, lonInput);
    this.setupFormSubmit(form, latInput, lonInput, imageFileInput);
  },

  setupCamera(video, canvas, previewImage, startCameraBtn, captureBtn, imageFileInput) {
    startCameraBtn.addEventListener('click', async () => {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = this.stream;
        video.style.display = 'block';
        captureBtn.style.display = 'inline-block';
        startCameraBtn.style.display = 'none';
        imageFileInput.disabled = true;
      } catch {
        alert('Kamera tidak tersedia atau ditolak.');
      }
    });

    captureBtn.addEventListener('click', () => {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      canvas.toBlob(blob => {
        this.photoBlob = blob;
        this.stream.getTracks().forEach(track => track.stop());
        video.style.display = 'none';
        canvas.style.display = 'block';
        previewImage.style.display = 'none';
        captureBtn.style.display = 'none';
        imageFileInput.disabled = true;
        startCameraBtn.disabled = true;
        alert('Foto berhasil diambil!');
      }, 'image/jpeg');
    });

    imageFileInput.addEventListener('change', () => {
      const file = imageFileInput.files[0];
      if (file) {
        this.photoBlob = null;
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImage.src = e.target.result;
          previewImage.style.display = 'block';
          canvas.style.display = 'none';
          video.style.display = 'none';
          captureBtn.style.display = 'none';
          startCameraBtn.disabled = true;
        };
        reader.readAsDataURL(file);
      }
    });
  },

  setupMap(mapContainerId, latInput, lonInput) {
    const map = L.map(mapContainerId).setView([-6.2, 106.816666], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let marker;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        latInput.value = latitude;
        lonInput.value = longitude;
        map.setView([latitude, longitude], 15);
        marker = L.marker([latitude, longitude]).addTo(map)
          .bindPopup("Lokasi Anda").openPopup();
      });
    }

    map.on('click', function (e) {
      const { lat, lng } = e.latlng;
      latInput.value = lat;
      lonInput.value = lng;

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }

      marker.bindPopup(`Lokasi dipilih: ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
    });
  },

  async setupFormSubmit(form, latInput, lonInput, imageFileInput) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const description = this.descriptionInput.value;
      const lat = latInput.value;
      const lon = lonInput.value;
      const image = this.photoBlob || imageFileInput.files[0];

      if (!image) {
        alert('Harap ambil atau pilih gambar terlebih dahulu.');
        return;
      }

      const token = Auth.getToken();
      const result = token
        ? await StoryApi.addStory(description, image, lat, lon)
        : await StoryApi.addStoryGuest(description, image, lat, lon);

      if (!result.error) {
        alert('Berhasil tambah story');
        location.hash = '/';
      } else {
        alert('Gagal tambah story');
      }
    });
  },

  destroy() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
};

export default AddPresenter;
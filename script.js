document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-button');
  const startScreen = document.getElementById('start-screen');
  const content = document.getElementById('content');
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('play-pause');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const timeCounter = document.getElementById('time-counter');

  // 🎇 Brilhinhos ao clicar
  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${x - 5}px`;
    sparkle.style.top = `${y - 5}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }

  document.body.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
  });

  // 🎬 Iniciar site ao clicar no botão inicial
  startBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede brilho duplo
    createSparkle(e.clientX, e.clientY);

    setTimeout(() => {
      startScreen.style.display = 'none';
      content.classList.remove('hidden');
      content.style.display = 'block';

      // Começa a música automaticamente
      audio.load();
      audio.play().then(() => {
        playPauseBtn.textContent = '⏸️';
      }).catch(() => {
        playPauseBtn.textContent = '▶️';
      });
    }, 300);
  });

  // 🎵 Player de música
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = '⏸️';
    } else {
      audio.pause();
      playPauseBtn.textContent = '▶️';
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  });

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // ⏱️ Contador desde 30/06/2025 às 00:00 (horário de Brasília)
const startDate = new Date("2025-06-30T00:00:00-03:00");


  function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timeCounter.textContent = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;
  }

  setInterval(updateCounter, 1000);
  updateCounter();

  // 🖼️ Galeria de fotos com setas (agora com 5 fotos)
  const photoList = [
    'fotos/foto1.png',
    'fotos/foto2.png',
    'fotos/foto3.png',
    'fotos/foto4.png',
    'fotos/foto5.png'
  ];

  let currentPhotoIndex = 0;
  const currentPhoto = document.getElementById('current-photo');
  const prevBtn = document.getElementById('prev-photo');
  const nextBtn = document.getElementById('next-photo');

  function showPhoto(index) {
    currentPhoto.src = photoList[index];
  }

  prevBtn.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + photoList.length) % photoList.length;
    showPhoto(currentPhotoIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoList.length;
    showPhoto(currentPhotoIndex);
  });

  showPhoto(currentPhotoIndex); // Inicializa
});

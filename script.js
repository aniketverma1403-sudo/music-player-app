const songImage = document.querySelector('#songImage');
const songTitle = document.querySelector('#songTitle');
const songArtist = document.querySelector('#artistName');
const audioPlayer = document.querySelector('#audio');
const playButton = document.querySelector('#playButton');
const nextButton = document.querySelector('#nextButton');
const prevButton = document.querySelector('#previousButton');

const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');

const songs = [
  {
    title: "NATTI NATASHA - Criminal",
    artist: "PARMISH VERMA",
    audioSrc: "./music/sigmamusicart-football-football-music-551346.mp3",
    coverSrc: "./images/clay-banks-sqggboKNcjU-unsplash.jpg"
  },
  {
    title: "ANIMALS",
    artist: "JUSTIN BIEBER",
    audioSrc: "./music/SoundHelix-Song-1.mp3",
    coverSrc: "./images/eugene-golovesov-nfy-m_naXmc-unsplash.jpg"
  },
  {
    title: "SOMEONE YOU LOVED",
    artist: "LEWIS CAPALDI",
    audioSrc: "./music/SoundHelix-Song-2.mp3",
    coverSrc: "./images/karsten-winegeart-VxzgdCxv7_g-unsplash.jpg"
  }
];

let songIndex = 0;
let isPlaying = false;




function loadSong(song) {
  songTitle.innerText = song.title;
  songArtist.innerText = song.artist;
  audioPlayer.src = song.audioSrc;
  songImage.src = song.coverSrc;
}

function playSong() {
  isPlaying = true;
  audioPlayer.play();
  const icon = playButton.querySelector('i');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-pause');
}

function pauseSong() {
  isPlaying = false;
  audioPlayer.pause();
  const icon = playButton.querySelector('i');
  icon.classList.remove('fa-pause');
  icon.classList.add('fa-play');
}


function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}



// Toggle Play/Pause on click
playButton.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Skip forward & backward
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

// Load the first song into the UI on startup
loadSong(songs[songIndex]);



function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}


audioPlayer.addEventListener('timeupdate', () => {
  const { currentTime, duration } = audioPlayer;

  if (duration) {
    // 1. Calculate percentage for the slider (0 to 100)
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    // 2. Update current timestamp display
    currentTimeEl.innerText = formatTime(currentTime);

    // 3. Update total duration display
    durationEl.innerText = formatTime(duration);
  }
});

progress.addEventListener('input', () => {
  const seekTime = (progress.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});


audioPlayer.addEventListener('ended', nextSong);
const songs = [
    { 
        title: "Faded", 
        artist: "Alan Walker", 
        src: "redventdigitalmedia.co.za - Alan Walker - Faded (320 KBps) (1).mp3",
        cover: "cover.jpg"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volumeControl = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;

        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime % 60);
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration % 60);

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        durationEl.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// Load the first song
loadSong(songs[currentSongIndex]);

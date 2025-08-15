const songs = [
    { title: "Song One", artist: "Artist A", src: "songs/song1.mp3" },
    { title: "Song Two", artist: "Artist B", src: "songs/song2.mp3" },
    { title: "Song Three", artist: "Artist C", src: "songs/song3.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volumeControl = document.getElementById("volume");

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
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
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// Load first song
loadSong(songs[currentSongIndex]);

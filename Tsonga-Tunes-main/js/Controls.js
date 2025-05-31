let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let volume = document.getElementById("vol");
let ctrlmute = document.getElementById("ctrlmute");
let songTitle = document.getElementById("songTitle");
let repeatIcon = document.getElementById("repeatIcon");

let currentIndex = 0;
let repeat = false; // Repeat state
let progressUpdateInterval;

function updateSong() {
    song.src = songs[currentIndex].src;
    songTitle.textContent = songs[currentIndex].name;
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    console.log("Now playing:", songs[currentIndex].name);
}

song.addEventListener("loadedmetadata", function() {
    progress.max = song.duration;
});

song.addEventListener("timeupdate", function() {
    progress.value = song.currentTime;

    if (song.currentTime >= song.duration - 0.5) { // Allowing a slight buffer
        if (repeat) {
            song.currentTime = 0; // Restart the song
        } else {
            next(); // Move to the next song
        }
    }
});

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

song.addEventListener('play', function() {
    progressUpdateInterval = setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
});

song.addEventListener('pause', function() {
    clearInterval(progressUpdateInterval);
});

progress.oninput = function() {
    song.currentTime = progress.value;
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

volume.oninput = function() {
    song.volume = volume.value / 100;
}

function mute() {
    if (ctrlmute.classList.contains("fa-volume-xmark")) {
        song.muted = true;
        ctrlmute.classList.remove("fa-volume-xmark");
        ctrlmute.classList.add("fa-volume-high");
    } else {
        song.muted = false;
        ctrlmute.classList.add("fa-volume-xmark");
        ctrlmute.classList.remove("fa-volume-high");
    }
}

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}
function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('active');
}

function openTracklist() {
    const Tracklist = document.querySelector('.Tracklist');
    Tracklist.classList.toggle('active');
}
function closeTracklist() {
    const Tracklist = document.querySelector('.Tracklist');
    Tracklist.classList.remove('active');
}

function openHomeSidebar() {
    const homesidebar = document.querySelector('.homesidebar');
    homesidebar.classList.remove('active');
}

function next() {
    currentIndex = (currentIndex + 1) % songs.length;
    updateSong();
}

function previous() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    updateSong();
}

function toggleRepeat() {
    repeat = !repeat;
    repeatIcon.classList.toggle("fa-repeat", !repeat);
    repeatIcon.classList.toggle("fa-repeat-1", repeat); // Toggle to indicate repeat is active
}

// Set initial song
updateSong();
import { playList } from "../script/playlist.mjs";
console.log(playList);

let currentIndex = null;
const audio = new Audio();


const queue = document.querySelector(".playlist");

for (let i = 0; i < playList.length; i++) {
        let title = playList[i].Judul;
        let sing = playList[i].Penyanyi;

        const card = document.createElement("div");
        card.className = "pl";
        card.dataset.index = i;
        const judul = document.createElement("h3");
        judul.textContent = title;
        const penyanyi = document.createElement("p");
        penyanyi.textContent = sing;

        card.appendChild(judul);
        card.appendChild(penyanyi);
        queue.appendChild(card);
}

const musicCard = document.querySelectorAll(".pl")
musicCard.forEach(musicCards => {
        musicCards.addEventListener("click", () => {
                const index = musicCards.dataset.index;
                const audioPlayed = playList[index].src;

                if (currentIndex == index) {
                        if (audio.paused) {
                                audio.play();
                        } else {
                                audio.currentTime = 0;
                        }
                        return;
                };

                audio.pause();
                // durasi musik
                audio.currentTime = 0;
                // src audionya dari mana
                audio.src = audioPlayed;
                audio.play();


                console.log("audio sedang diputar.");

                currentIndex = index;
                console.log(currentIndex);
        }); currentIndex;
});

const pauseIcon = `
<i class="bi bi-pause-circle-fill"></i>
`;

const playIcon = `
<i class="bi bi-play-circle-fill"></i>
`;
const toggle = document.querySelectorAll(".toggle");

function setPlayIcon() {
        toggle.forEach(e => {
                e.innerHTML = playIcon;
        });
}

function setPauseIcon() {
        toggle.forEach(e => {
                e.innerHTML = pauseIcon;
        });
};

audio.addEventListener("pause", () => {
        console.log("pause");
        setPlayIcon();
});
audio.addEventListener("play", () => {
        console.log("play");
        setPauseIcon();
});

// toggle play stop
toggle.forEach(toggles => {
        toggles.addEventListener("click", () => {
                if (!audio.paused) {
                        audio.pause();
                } else {
                        if (currentIndex === null) {
                                const randomIndex = Math.floor(Math.random() * playList.length);

                                audio.src = playList[randomIndex].src;
                                audio.play();

                                currentIndex = randomIndex;
                                console.log(currentIndex)
                        } else {
                                audio.play();
                        }
                }
                return;
        });
});


// auto play after ended music
audio.addEventListener("ended", () => {
        currentIndex++;
        audio.src = playList[currentIndex].src;
        audio.play();
        console.log("audio sedang diputar.");
        console.log(currentIndex);
});

const backward = document.getElementById("backward");
const forward = document.getElementById("forward");

function next() {
        if (currentIndex == playList.length-1) {
                currentIndex = playList.length - playList.length;
                audio.src = playList[0].src;
                audio.play();
                console.log(currentIndex);
        } else {
                currentIndex++;
                audio.src = playList[currentIndex].src;
                audio.play();
                console.log(currentIndex);
        }
}

function back() {
        if (currentIndex === null || currentIndex === 0) {
                if (playList.length - 1) {
                        currentIndex = playList.length - 1;
                        audio.src = playList[currentIndex].src;
                        audio.play();
                        console.log("audio sedang diputar.");
                        console.log(currentIndex);
                } return currentIndex
        } else {
                audio.src = playList[--currentIndex].src;
                audio.play();
                console.log(currentIndex);
        }
};

forward.onclick = () => {
        next();
};
backward.onclick = () => {
        back();
};

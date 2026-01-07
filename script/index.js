import { playList } from "../script/playlist.mjs";

let currentIndex = null;
const audio = new Audio();


const queue = document.querySelector(".playlist");

for (let i = 0; i < playList.length; i++) {
        let title = playList[i].Judul;
        let sing = playList[i].Penyanyi;
        let music = playList[i].src;

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
        });
});

const pauseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
</svg>
`;

const playIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                </svg>
`;
const toggle = document.querySelector(".toggle");

audio.addEventListener("pause", () => {
        console.log("pause");
        toggle.innerHTML = playIcon;
});
audio.addEventListener("play", () => {
        console.log("play");
        toggle.innerHTML = pauseIcon;
});

// toggle play stop
toggle.addEventListener("click", () => {
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

// auto play after ended music
audio.addEventListener("ended", () => {
        currentIndex++;

        audio.src = playList[currentIndex].src;
        audio.play();
        console.log("audio sedang diputar.");
        console.log(currentIndex);
});


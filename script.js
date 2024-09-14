const base = [
    {src: 'songs/burning.mp3', name: 'Burning', author: 'Hitsujibungaku', imageSrc: 'images/songsImages/burning.jpg'},
    {src: 'songs/fein.mp3', name: 'FE!N', author: 'Travis Scott', imageSrc: 'images/songsImages/utopia.jpg'},
    {src: 'songs/honeypie.mp3', name: 'Honey pie', author: 'JAWNY', imageSrc: 'images/songsImages/honey.jpg'},
    {src: 'songs/fenebut2.0.mp3', name: 'Фенебут 2.0', author: 'maptOv', imageSrc: 'images/songsImages/fenebut.webp'},
    {src: 'songs/ne_dishi.mp3', name: 'Ну и не дыши', author: 'кирюша неспал, Beamerlight', imageSrc: 'images/songsImages/ne_dishi.webp'},
]


const img = document.querySelector('.songImage');
const h1 = document.getElementsByTagName('h1')[0];
const h2 = document.getElementsByTagName('h2')[0];
const range = document.getElementById('radius');
const timeNow = document.getElementById('timeNow');
const timeAll = document.getElementById('timeAll');
const playButton = document.getElementById('playButton');
const repeatBut = document.getElementsByClassName('repeat')[0];
const randomBut = document.getElementsByClassName('random')[0];

let k = 100;
let isPlay = false;
let audio = new Audio(base[k%5].src);
audio.currentTime = "0.01";


//изменение порядка треков
let isRandom = false;
const randomSong = () => {
    isRandom = !isRandom;
    randomBut.classList.toggle('active')
}

//переключалка
const changeSong = x => {
   range.value = '0';
   if (isRandom) x *= 2;
   k += x;
   let n = k % base.length;

   audio.src = base[n].src;
   
   h1.innerHTML = base[n].name;
   h2.innerHTML = base[n].author;
   img.src = base[n].imageSrc;
   setTimeout(() => {
    timeNow.innerHTML = `${Math.trunc(audio.currentTime / 60).toString().length < 2 ? `0${Math.trunc(audio.currentTime / 60).toString()}` : Math.trunc(audio.currentTime / 60)}:${Math.trunc(audio.currentTime % 60).toString().length < 2 ? `0${Math.trunc(audio.currentTime % 60).toString()}`: Math.trunc(audio.currentTime % 60).toString()}`;
   }, 100);
   audio.onloadeddata = () => {
    timeAll.innerHTML = `${Math.trunc(audio.duration / 60).toString().length < 2 ? `0${Math.trunc(audio.duration / 60).toString()}` : Math.trunc(audio.duration / 60)}:${Math.trunc(audio.duration % 60).toString().length < 2 ? `0${Math.trunc(audio.duration % 60).toString()}`: Math.trunc(audio.duration % 60).toString()}`;
   }
   
   if (!isPlay) {
      audio.pause();
   } else {
      audio.play();
   }
   
   audio.currentTime = "0.01";
}

//включалка & выключалка
const playMusic = () => {
    if (isPlay) {
        audio.pause();
    } else {
        audio.play();
    }
}

//отслежание проигрывания
audio.addEventListener('pause', () => {
    playButton.src = 'images/icons/play.png';
    playButton.style.marginLeft = '0.5vw';
    isPlay = false;
})

audio.addEventListener('play', () => {
    playButton.src = 'images/icons/pause.png'
    playButton.style.marginLeft = '0';
    isPlay = true;
});

//повтор треков
let isRepeat = false;
const repeatSong = () => {
    isRepeat = !isRepeat;
    repeatBut.classList.toggle('active');
}

//когда закончилось
audio.onended = () => {
    if (isRepeat) changeSong(0);
    if (!isRepeat) changeSong(1);
    audio.play();
};

//ползунок и время
audio.ontimeupdate = () => {
    timeNow.innerHTML = `${Math.trunc(audio.currentTime / 60).toString().length < 2 ? `0${Math.trunc(audio.currentTime / 60).toString()}` : Math.trunc(audio.currentTime / 60)}:${Math.trunc(audio.currentTime % 60).toString().length < 2 ? `0${Math.trunc(audio.currentTime % 60).toString()}`: Math.trunc(audio.currentTime % 60).toString()}`;
    setTimeout(()=>{
     range.value = `${Math.floor(audio.currentTime/audio.duration * 10000)}`
    }, 50)
}

range.addEventListener('pointerdown', ()=>{
    audio.pause();
    audio.addEventListener('pause', rangeChange);
    audio.play();
})

range.addEventListener('change', () => {
    audio.pause();
    audio.addEventListener('pause', rangeChange);
    audio.play();
});

const rangeChange = () => {
    audio.currentTime = range.value / 10000 * audio.duration;
}

changeSong(0);



let index = 0;
const body = document.getElementsByTagName('body')[0];
window.addEventListener('dblclick', () => {
    index++;
    setTimeout(() => {
        body.style.backgroundImage = `url(images/${index%3}.png)`;
    }, 5)
  }
)
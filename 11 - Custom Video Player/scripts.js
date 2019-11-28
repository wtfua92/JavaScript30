const videoElement = document.querySelector('video');
const playButton = document.querySelector('.toggle');
const progressElement = document.querySelector('.progress');
const progressElementFilled = document.querySelector('.progress__filled');
const playbackSpeedElement = document.querySelector('input[name="playbackRate"]');
const volumeElement = document.querySelector('input[name="volume"]');
const playerButtons = document.querySelectorAll('.player__button');
let mousedown = false;

const playPauseHandler = function (videoElement) {
    videoElement.paused ? videoElement.play() : videoElement.pause();
};

const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const totalDuration = e.target.duration;
    const width = 100 * currentTime / totalDuration;
    progressElementFilled.style.width = `${width}%`;
    progressElementFilled.style.flexBasis = `${width}%`;
};

const changeCurrentTimeHandler = (e) => {
    const changeTimeValue = parseFloat(e.target.dataset.skip);
    videoElement.currentTime += changeTimeValue;
};

const progressBarChangeHandler = (e) => {
    videoElement.currentTime = (e.offsetX / progressElement.offsetWidth) * videoElement.duration;
};

videoElement.addEventListener('click', () => playPauseHandler(videoElement));
videoElement.addEventListener('timeupdate', timeUpdateHandler);

playButton.addEventListener('click', () => playPauseHandler(videoElement));

playbackSpeedElement.addEventListener('input', (e) => {
    videoElement.playbackRate = e.target.value;
});

volumeElement.addEventListener('input', (e) => {
    videoElement.volume = e.target.value;
});

playerButtons.forEach((pb) => {
   pb.addEventListener('click', changeCurrentTimeHandler)
});


progressElement.addEventListener('mousedown', () => mousedown = true);
progressElement.addEventListener('mouseup', () => mousedown = false);
progressElement.addEventListener('click', progressBarChangeHandler);
progressElement.addEventListener('mousemove', (e) => mousedown && progressBarChangeHandler(e));
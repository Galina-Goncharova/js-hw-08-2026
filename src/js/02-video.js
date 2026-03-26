import '../css/common.css';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const key = 'videoplayer-current-time';

player.on('timeupdate', throttle(onSaveCurrentTime, 1000));
player.on('play', onStartPlay);

function onStartPlay() {
  const savedTime = localStorage.getItem(key);
  if (savedTime) {
    player
      .setCurrentTime(parseFloat(savedTime))
      .then(function (seconds) {})
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            console.log('Error!');
            break;

          default:
            // some other error occurred
            break;
        }
      });
  }
}

function onSaveCurrentTime() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      // seconds = the current playback position
      localStorage.setItem(key, seconds);
    })
    .catch(function (error) {
      // an error occurred
      console.log('Error!');
    });
}

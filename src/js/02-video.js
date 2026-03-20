import '../css/common.css';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

    const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);
    const keyLocalStorage = 'videoplayer-current-time';

    const onPlay = function (data) {
    const stringData = JSON.stringify(data);
    localStorage.setItem(keyLocalStorage, stringData);
};

player.on('timeupdate', throttle(onPlay, 1000));

function reload() {
  if (JSON.parse(localStorage.getItem(keyLocalStorage)) === null) {
    return;
  }
  const timePause = JSON.parse(localStorage.getItem(keyLocalStorage));
  player.setCurrentTime(timePause.seconds);
}
reload();
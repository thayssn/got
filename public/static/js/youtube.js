"use strict";

function createPlayer(player, callbackFn) {
  return new YT.Player(player, {
    videoId: player.dataset.yt,
    playerVars: {
      'autoplay': 0,
      'controls': 0
    },
    events: {
      'onReady': callbackFn
    }
  });
}
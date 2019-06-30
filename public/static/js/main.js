"use strict";

window.addEventListener('load', function () {
  console.log('all loaded');
  var themeSong = document.querySelector('#themesong');
  var iPs = document.querySelectorAll('#scene .container'); // Create the interactive points

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var point = _step.value;
      var iP = new InteractivePoint(point);
      var video = point.querySelector('.video');
      var player = video.querySelector('.player'); // Create YT iframe for the current IP, binding click event after the video is ready

      video.yt = createPlayer(player, function () {
        iP.click(function () {
          var audio = document.querySelector('#buttonSound');
          closeAllVideos();
          audio.play();
          changeVolume(themeSong, true);
          video.yt.playVideo();
          video.toggleClass('open');
        });
      });
    };

    for (var _iterator = iPs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ; // Close videos when clicking outside a container

  document.addEventListener('click', function (e) {
    var container = e.target.closest('.container');
    var hasContainerClass = e.target.classList.contains('container');

    if (!container && !hasContainerClass) {
      closeAllVideos();
      changeVolume(themeSong, false);
    }
  }); // Start the page

  openCourtains();

  function openCourtains() {
    themeSong.play();
  }

  function closeAllVideos() {
    var videos = document.querySelectorAll('.video');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = videos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var video = _step2.value;
        video.yt.stopVideo();
        video.classList.remove('open');
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  function changeVolume(audio, mute) {
    var duration = 1000;
    var start = null;

    if (mute && audio.volume > 0 || !mute && audio.volume < 1) {
      var change = function change(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var currentVolume = mute ? 1 - progress / duration : progress / duration;
        audio.volume = currentVolume.toFixed(1);

        if (progress < duration) {
          window.requestAnimationFrame(change);
        }
      };

      window.requestAnimationFrame(change);
    }
  }
});
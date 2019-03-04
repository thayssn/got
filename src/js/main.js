window.addEventListener('load', () => {
  console.log('all loaded');

  const themeSong = document.querySelector('#themesong');
  const iPs = document.querySelectorAll('#scene .container');

  // Create the interactive points
  for ( let point of iPs) {
    const iP = new InteractivePoint(point);
    const video = point.querySelector('.video');
    const player = video.querySelector('.player');

    // Create YT iframe for the current IP, binding click event after the video is ready
    video.yt = createPlayer(player, () => {
      iP.click( function() {
        let audio = document.querySelector('#buttonSound');
        closeAllVideos();
        audio.play();
        changeVolume(themeSong, true);
        video.yt.playVideo();
        video.toggleClass('open');
      })
    });
  };

  // Close videos when clicking outside a container
  document.addEventListener('click', (e) => {
    let container = e.target.closest('.container');
    let hasContainerClass = e.target.classList.contains('container');

    if(!container && !hasContainerClass){
      closeAllVideos();
      changeVolume(themeSong, false)
    }
  });

  // Start the page
  openCourtains();


  function openCourtains(){
    themeSong.play();
  }

  function closeAllVideos(){
    const videos = document.querySelectorAll('.video');

    for (let video of videos){
      video.yt.stopVideo();
      video.classList.remove('open');
    }
  }

  function changeVolume(audio, mute){
    const duration = 1000;
    let start = null;

    if(mute && audio.volume > 0 || !mute && audio.volume < 1){
      function change(timestamp){
        if(!start) start = timestamp;
        let progress = timestamp - start;

        let currentVolume = (mute) ? 1 - (progress/duration) : (progress/duration);
        audio.volume = currentVolume.toFixed(1);
        if(progress < duration){
          window.requestAnimationFrame(change)
        }
      }
      window.requestAnimationFrame(change);
    }
  }
})

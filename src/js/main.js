window.addEventListener('load', () => {
  console.log('all loaded');

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
    }
  });

  openCourtains();
})

function openCourtains(){
  let themeSong = document.querySelector('#themesong');
  themeSong.play();
}

function closeAllVideos(){
  const videos = document.querySelectorAll('.video');

  for (let video of videos){
    video.yt.stopVideo();
    video.classList.remove('open');
  }
}
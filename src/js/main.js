window.addEventListener('load', () => {
  console.log('all loaded');
  openCourtains();
})

function openCourtains(){
  let themeSong = document.querySelector('#themesong');

  themeSong.play();
}
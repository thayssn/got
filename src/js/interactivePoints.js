const iPs = document.querySelectorAll('#scene .container');
const allVideos = document.querySelectorAll('.video');

function InteractivePoint(selector){
  const element = (typeof selector === 'string')
    ? document.querySelector(selector)
    : selector
  const click = (fn) => {
    if(element){
      element.addEventListener('click', function(e) {
        fn.apply(this);
      })
    }else{
      console.error('No element found with provided selector', selector)
    }
  };

  return {
    click,
    element
  };
}

function closeVideos(){
  for (let video of allVideos){
    video.classList.remove('open');
  }
}

for ( let point of iPs) {
  let iP = new InteractivePoint(point);

  iP.click( function() {
    let sibling = this.querySelector('.video')
    closeVideos();
    let audio = document.querySelector('#buttonSound');
    audio.play();
    sibling.toggleClass('open');
  })
};

document.addEventListener('click', e => {
  let container = e.target.closest('.container');
  let hasContainerClass = e.target.classList.contains('container');

  if(!container && !hasContainerClass){
    closeVideos();
  }
})

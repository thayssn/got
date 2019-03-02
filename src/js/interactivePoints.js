const iPs = document.querySelectorAll('#scene .element');
const allVideos = document.querySelectorAll('.tvshow');

function interactivePoint(selector){
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
  let iP = new interactivePoint(point);

  iP.click( function() {
    let sibling = this.nextElementSibling
    closeVideos();
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

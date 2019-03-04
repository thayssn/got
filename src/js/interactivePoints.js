
function InteractivePoint(selector){
  this.element = (typeof selector === 'string')
    ? document.querySelector(selector)
    : selector
  this.click = (fn) => {
    if(this.element){
      this.element.addEventListener('click', function(e) {
        fn.apply(this);
      })
    }else{
      console.error('No element found with provided selector', selector)
    }
  };

  return this;
}
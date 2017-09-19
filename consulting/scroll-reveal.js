
var animated_objects = document.querySelectorAll('[data-visible-animation]');

function checkElm(elm){
  var top = elm.getBoundingClientRect().top;
  var middle = elm.offsetHeight + top;
  var isVisible = (middle > 0) && (middle < window.innerHeight)

  if (isVisible) {
    var animationClasses = elm.getAttribute('data-visible-animation');
    if (elm.className.indexOf('hidden') !== -1) {
      elm.className = elm.className.replace(/\bhidden\b/,'');
      elm.className += (" " + animationClasses);
    }
  }
}

function didScroll() {
  for (var idx = 0; idx < animated_objects.length ; idx++ ) {
    checkElm(animated_objects[idx]);
  }
}

document.addEventListener("scroll", didScroll);
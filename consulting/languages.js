var engButton = document.getElementById("choose-eng");
var sweButton = document.getElementById("choose-swe");
var zhButton = document.getElementById("choose-zh");

var activeClass = 'active-button';

function setdisplay(classname, value) {
  var elms = document.getElementsByClassName(classname);
  for (var i = 0 ; i < elms.length ; i++) {
      elms[i].style.display = value;
  }
}

function toggleActive(activated, deactivated1, deactivated2) {
  var regex = new RegExp(activeClass, "g");
  activated.className += ( " " + activeClass );
  deactivated1.className = deactivated1.className.replace(regex, '');
  deactivated2.className = deactivated2.className.replace(regex, '');
}

engButton.addEventListener("click", function () {
  toggleActive(engButton, sweButton, zhButton);
  setdisplay("lang-eng","block");
  setdisplay("lang-swe","none")
  setdisplay("lang-zh","none");
});

sweButton.addEventListener("click", function () {
  toggleActive(sweButton, engButton, zhButton);
  setdisplay("lang-eng","none");
  setdisplay("lang-swe","block");
  setdisplay("lang-zh","none");
});

zhButton.addEventListener("click", function () {
  toggleActive(zhButton, engButton, sweButton);
  setdisplay("lang-eng","none");
  setdisplay("lang-swe","none");
  setdisplay("lang-zh","block");
});
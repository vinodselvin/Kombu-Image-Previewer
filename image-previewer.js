function _closePreviewer(){
	var _img_previewer = document.getElementById("_img_previewer");
	document.getElementById("img-prev").style.transform = "rotate(0deg)";
	document.getElementById("img-prev").style.width = "100vh";
	_img_previewer.style.display = "none";
	_img_previewer.classList.remove("_opened");
}

var _imagePreview = document.getElementsByClassName('_img_tb_previewed');

for (var i = 0; i < _imagePreview.length; i++) {
    _imagePreview[i].addEventListener('click', function() {
	
	var _img_previewer = document.getElementById("_img_previewer");

	document.getElementById("img-prev").src = this.src;
	_img_previewer.classList.add("_opened");
	_updateFileName(this.src);
	document.getElementById("_img_previewer").style.display = "block";
    });
}

var _nextImage = document.getElementById('_right');

_nextImage.addEventListener('click', function(){
	showNextImage();
});


function _getNextImage(_current_src, _nav){
	
	var _imagePreview = document.getElementsByClassName('_img_tb_previewed');
	
	var _n = _imagePreview.length;
	for (var i = 0; i < _n; i++) {
		
		if(_imagePreview[i].src == _current_src){
			
			var pointer;			

			if(_nav == "next"){
				pointer = (i+1)%_n;
			}
			else{
				pointer = (i-1) < 0 ? _n - 1 : i-1;
			}
			
			document.getElementById('_resolution_').innerHTML = "";
			document.getElementById("img-prev").style.transform = "rotate(0deg)";
			document.getElementById("img-prev").style.width = "100vh";
			return _imagePreview[pointer].src;
		}
	}
}

var _prevImage = document.getElementById('_left');

_prevImage.addEventListener('click', function(){
	showPreviousImage();
});

function showPreviousImage(){
	var _img_src = document.getElementById("img-prev").src;
	var _prev_src = _getNextImage(_img_src, "previous");
	document.getElementById("img-prev").src = _prev_src;
	_updateFileName(_prev_src);
}

function showNextImage(){
	var _img_src = document.getElementById("img-prev").src;
	var _next_src = _getNextImage(_img_src, 'next');
	document.getElementById("img-prev").src = _next_src;
	_updateFileName(_next_src);
}

document.onkeydown = function(e) {
	
	var _imagePreview = document.getElementById("_img_previewer");
	
	if(_imagePreview.classList.contains("_opened")){
		e = e || window.event;

        	if (e.keyCode == '37') {
            		document.getElementById('_left').click();
        	} else if (e.keyCode == '39') {
            		document.getElementById('_right').click();
        	}
	}
        
    }

function _showImagePixels(_inst){
	var width = _inst.naturalWidth;
	var height = _inst.naturalHeight;

	var _resolutions = width + " x " + height;
	document.getElementById('_resolution_').innerHTML = _resolutions;
}

function _rotateRight(){
	var _img_previewer = document.getElementById("img-prev");
	
	var _rotate_string = _img_previewer.style.transform;

	var numberPattern = /\d+/g;

	var _deg = _rotate_string.match(numberPattern);

	if(_deg == null){
		_deg  = 90;
	}
	else{
		_deg = parseInt(_deg);
		_deg = (_deg == 360) ? 0 : _deg;
		_deg += 90;
	}

	if(_deg == 270 || _deg == 90){
		_img_previewer.style.width = "90vh";
	}
	else{
		_img_previewer.style.width = "100vh";
	}
	
	_img_previewer.style.transform = "rotate(" + _deg + "deg)";
}

function _updateFileName(_url){
	var _filename = _url.substring(_url.lastIndexOf('/')+1);
	document.getElementById("_file_name_").innerHTML = _filename;
}

/*
 * Detect swipe
 */
var _img_previewer_elem = document.getElementById("img-prev");

_img_previewer_elem.addEventListener("touchstart", startTouch, false);
_img_previewer_elem.addEventListener("touchmove", moveTouch, false);
 
// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
 
function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};
 
function moveTouch(e) {
  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;
 
  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
	  // swiped left
	  showNextImage();
    } else {
	  // swiped right
      showPreviousImage();
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
    //   console.log("swiped up");
    } else {
      // swiped down
    //   console.log("swiped down");
    }  
  }
 
  initialX = null;
  initialY = null;
   
  e.preventDefault();
};

document.getElementById("_img_previewer").addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === "Escape") {
        _closePreviewer();
    }
});

document.getElementById("_img_previewer").addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 82) {
        _rotateRight();
    }
});

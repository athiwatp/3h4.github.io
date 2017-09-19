
Vue.component('add-button', {
  template: '<div id="add-button noselect">+</div>'
});

Vue.component('remove-postit-button', {
	methods: {
		removeNote: function() {
			this.$emit('removeNote');
		}
	},
  template: '<div class="remove-postit-button noselect" @click="removeNote" contenteditable="false">x</div>'
});

Vue.component('postit-note', {
  props: ['mousePosition', 'deleteMode', 'color'],
  data: function (){
  	return {
      pos: {x: 0, y: 0, startx: 0, starty: 0, currentx: 0, currenty: 0}, 
      isMoving: false,
  	}
  },
  computed: {
    style: function () {
      return { left: this.pos.currentx + 'px', top: this.pos.currenty + 'px', background:this.color }
    }
  },
  created: function () {
    window.addEventListener("mouseup", this.mouseUp);
    window.addEventListener("scroll", this.mouseUp);
    this.pos.currentx = Math.floor(Math.random() * ( document.body.offsetWidth - 100 ));
    this.pos.currenty = Math.floor( (Math.random() * 700) );
    this.pos.x = this.pos.currentx;
    this.pos.y = this.pos.currenty;
  },
  destroyed: function() {
  	window.removeEventListener("mouseup", this.mouseUp);
  	window.removeEventListener("scroll", this.mouseUp);
  },
  watch: {
  	isMoving: function(val) {
  		if (val === false) {
  			this.pos.x = this.pos.currentx;
  			this.pos.y = this.pos.currenty;
  		}
  	},
    mousePosition: {
    	handler: function (val) {
    		if (this.isMoving) {
  				var dx = this.mousePosition.x - this.pos.startx;
	  			var dy = this.mousePosition.y - this.pos.starty;
	  			this.pos.currentx = dx + this.pos.x;
	  			this.pos.currenty = dy + this.pos.y;
  			}
  		},
  		deep: true,
  	},
  },
  methods: {
  	mouseDown: function(evt) {
  		this.pos.startx = this.mousePosition.x;
  		this.pos.starty = this.mousePosition.y;
  		this.isMoving = true;
  	},
  	mouseUp: function(evt) {
  		if( this.isMoving = true ) {
  			this.isMoving = false;
  		}
  	},
  	removeNote: function() {
		  this.$emit('removeNote');
  	},
  },
  template: 
  '<div contenteditable="true" class="postit-note" @mousedown="mouseDown" :style="style"><slot></slot>' +
    '<transition enter-active-class="animated bounceIn" leave-active-class="animated zoomOut">' +
      '<remove-postit-button v-if="deleteMode" @removeNote="removeNote"></remove-postit-button>' +
    '</transition>' +
  '</div>',
})

var app = new Vue({
  el: '#postit-app',
  data: {
    postitList: [],
    mousePosition:{x:0, y:0}, 
    deleteMode:false
  },
  methods: {
  	addNote: function() {
		var colors = ['#ffff09', '#ff1471', '#f514ff', '#9414ff', '#14efff', '#14ff6c', '#cbff14', '#ffd114', '#ff5a14', '#f3e3dc'];
    var coloridx =	this.postitList.length % colors.length;
		var messages = ['Postit notes...', 'are a good way...', 'to keep track of...', 'what you need to remember!',  'You can...', 'drag me around!'];
		var msgid =	this.postitList.length % messages.length;
  	this.postitList.push({msg:messages[msgid], color:colors[coloridx]});
	},
  	mouseMoved: function(evt){
      this.mousePosition.x = evt.screenX;
      this.mousePosition.y = evt.screenY
  	},
  	removeNote: function(index) {
  		console.log(index);
		  this.postitList.splice(index, 1);
  	}
  },
  template: 
  '<div class="sample" @mousemove="mouseMoved">' + 
    '<div class="add-remove-button noselect" @click="addNote">+</div>' +
    '<div v-if="postitList.length" :class="{ \'remove-active\': deleteMode }" id="remove-button" class="add-remove-button noselect" @click="deleteMode=!deleteMode">-</div>' +
    '<transition-group enter-active-class="animated tada" leave-active-class="animated zoomOut">' +
      '<postit-note v-for="(post, index) in postitList" @removeNote="removeNote(index)" :key="post" :delete-mode="deleteMode" :color="post.color" :mouse-position="mousePosition">{{post.msg}}</postit-note>' +
    '</transition-group>' +
    '<template v-if="!postitList.length">' +
      '<span class="postit-message">Postit Notes App</span>' +
        '<span class="postit-submessage">Written in vueJS sourch available <a href="https://github.com/3h4/3h4.github.io/consulting/postit-app.js">here</a></span>' +
    '</template>' +
  '</div>'
})





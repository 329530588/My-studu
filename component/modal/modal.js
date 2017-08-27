const ele = new WeakMap();
const mask = new WeakMap();

class Modal {
  
  constructor(id, config) {
    //private
    ele.set(this, document.querySelector('#'+id));
    mask.set(this, document.querySelector('.mask'));
    
    this._id = id;
    this._isShow = config.show ? config.show : false; //弹窗默认状态
    var self = this;
    window.onload = function() {
      self.init();
    }
  }
  init() {
    var self = this;
    ele.get(self).style.display = 'none';
    mask.get(self).style.display = 'none';
    var triggers = document.querySelectorAll('[target="'+this._id+'"]');
    
    triggers = Array.of(...triggers);
    triggers.forEach(trigger => {
      trigger.addEventListener('click', function(event) {
        self.toggle();
      });
    });
    
    ele.get(self).querySelector('.close').onclick = this.hide.bind(this);
    ele.get(self).querySelector('.cancel').onclick = this.hide.bind(this);
    ele.get(self).querySelector('.ok').onclick = this.hide.bind(this);
    window.onclick = function(event) {
      if(event.target == mask.get(self)) {
        self.hide();
      }
    }
  }
  toggle() {
    let self = this;
    self._isShow = !self._isShow;
    return self._isShow ? self.show() : self.hide();
  }
  show() {
    let self = this;
    ele.get(self).style.display = 'block';
    mask.get(self).style.display = 'block';
    self._isShow = true;
  }
  hide() {
    let self = this;
    ele.get(self).style.display = 'none';
    mask.get(self).style.display = 'none';
    self._isShow = false;
  }
}

// test
var config = {};
var m = new Modal('example', config);
console.log(m);

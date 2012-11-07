var CSSShader = function(){
  this.boundAnimate = this.animate.bind(this);
};

CSSShader.prototype = {

  paused: false,

  vertexShader: '',

  fragmentShader: '',

  renderTarget: null,

  shaderArgs: null,

  // http://www.w3.org/TR/compositing/#blend-mode
  blendMode: 'normal',

  // http://www.w3.org/TR/compositing/#alpha-compositing
  alphaCompositing: 'source-atop',

  // http://www.w3.org/TR/filter-effects/#vertexMesh-attribute
  vertexMesh: '40 40',

  setVertexShaderByNode: function(nodeOrId){
    this._setShader('vertex', this._getNode(nodeOrId).innerHTML);
  },

  setVertexShader: function(shaderString){
    this._setShader('vertex', shaderString);
  },

  setFragmentShaderByNode: function(nodeOrId){
    this._setShader('fragment', this._getNode(nodeOrId).innerHTML);
  },

  setFragmentShader: function(shaderString){
    this._setShader('fragment', shaderString);
  },

  _setShader: function(type, shaderString){
    this[type + 'Shader'] = 'url(data:text/plain;charset=utf-8;base64,' + btoa(shaderString) + ')';
  },

  setShaderArgs: function(args){
    this.shaderArgs = args;
  },

  setShaderArg: function(id, value){
    this.shaderArgs[id] = value;
  },

  setRenderTarget: function(nodeOrId){
    this.renderTarget = this._getNode(nodeOrId);
  },

  render: function(time){

    var shaderString = this.vertexShader +
      ' mix(' +
        this.fragmentShader + ' ' +
        this.blendMode + ' ' +
        this.alphaCompositing +
    ')';

    var cssString = 'custom( ' +
      shaderString + ', ' +
      this.vertexMesh;

    this.shaderArgs || (this.shaderArgs = {});
    this.shaderArgs.time = 0.1 + (time || 0);

    for(var key in this.shaderArgs){
      cssString += ', ' + key + ' ' + this.shaderArgs[key];
    }

    cssString += ')';

    this.renderTarget.style.webkitFilter = cssString;
  },

  animate: function(time){
    if(this.paused){
      return;
    }
    requestAnimationFrame(this.boundAnimate);
    this.render(time);
  },

  pause: function(){
    this.paused = true;
  },

  resume: function(){
    this.paused = false;
    this.animate();
  },

  _getNode: function(nodeOrId){
    return typeof nodeOrId == 'string' ? document.getElementById(nodeOrId) : nodeOrId;
  }
};

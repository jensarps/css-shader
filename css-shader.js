/*jshint expr:true */
/*global window:false, console:false, define:false, module:false */

/**
 * @license CSSShader - A JavaScript wrapper for Custom CSS GLSL Shaders
 * Copyright (c) 2012 - 2013 Jens Arps
 * http://jensarps.de/
 *
 * Licensed under the MIT (X11) license
 */

(function (name, definition, global) {
  if (typeof define === 'function') {
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = definition();
  } else {
    global[name] = definition();
  }
})('CSSShader', function () {


  /**
   * The CSSShader constructor
   *
   * @constructor
   * @name CSSShader
   */
  var CSSShader = function(){
    this.boundAnimate = this.animate.bind(this);
  };

  CSSShader.prototype = /** @lends CSSShader */ {

    /**
     * Whether animation is paused
     *
     * @type Boolean
     */
    paused: false,

    /**
     * The vertex shader to be applied
     *
     * @type String
     */
    vertexShader: '',

    /**
     * The fragment shader to be applied
     *
     * @type String
     */
    fragmentShader: '',

    /**
     * The render target for the shaders
     *
     * @type HTMLElement
     */
    renderTarget: null,

    /**
     * The optional user args for the shaders
     *
     * @type Object
     */
    shaderArgs: null,

    /**
     * The blend mode to use
     *
     * @see http://www.w3.org/TR/compositing/#blend-mode
     * @type String
     */
    blendMode: 'normal',

    /**
     * The alpha compositing mode to use
     *
     * @see http://www.w3.org/TR/compositing/#alpha-compositing
     * @type String
     */
    alphaCompositing: 'source-atop',

    /**
     * The vertex mesh to use. Defined as a string containing the number of
     * rows, a space and the number of columns.
     *
     * @see http://www.w3.org/TR/filter-effects/#vertexMesh-attribute
     * @type String
     */
    vertexMesh: '40 40',

    /**
     * Takes a node by reference or it's id, and takes it's innerHTML as
     * vertex shader.
     *
     * @param {HTMLElement|String} nodeOrId A node reference or a node id
     */
    setVertexShaderByNode: function(nodeOrId){
      this._setShader('vertex', this._getNode(nodeOrId).innerHTML);
    },

    /**
     * Sets the vertex shader
     *
     * @param {String} shaderString
     */
    setVertexShader: function(shaderString){
      this._setShader('vertex', shaderString);
    },


    /**
     * Takes a node by reference or it's id, and takes it's innerHTML as
     * fragment shader.
     *
     * @param {HTMLElement|String} nodeOrId A node reference or a node id
     */
    setFragmentShaderByNode: function(nodeOrId){
      this._setShader('fragment', this._getNode(nodeOrId).innerHTML);
    },

    /**
     * Sets the fragment shader.
     *
     * @param {String} shaderString
     */
    setFragmentShader: function(shaderString){
      this._setShader('fragment', shaderString);
    },

    /**
     * Sets a shader.
     *
     * @param {String} type The shader type to set, 'vertex' or 'fragment'
     * @param {String} shaderString The shader code
     * @private
     */
    _setShader: function(type, shaderString){
      this[type + 'Shader'] = 'url(data:text/plain;charset=utf-8;base64,' + btoa(shaderString) + ')';
    },

    /**
     * Sets the shader args. Note: will overwrite all current shader args.
     *
     * @param {Object} args A key-value map of shader args
     */
    setShaderArgs: function(args){
      this.shaderArgs = args;
    },

    /**
     * Sets a single shader arg
     *
     * @param {*} id The id (key) of the shader arg
     * @param {*} value The value of the shader arg
     */
    setShaderArg: function(id, value){
      this.shaderArgs[id] = value;
    },

    /**
     * Takes a node by reference or id and uses it to apply the shaders to.
     *
     * @param {HTMLElement|String} nodeOrId A node reference or node id
     */
    setRenderTarget: function(nodeOrId){
      this.renderTarget = this._getNode(nodeOrId);
    },

    /**
     * Renders the shaders on the render target.
     *
     * @param {Number} [time] The time arg to pass to the shaders
     */
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

    /**
     * Uses RAF to animate the shaders on the render target.
     *
     * @param {Number} [time] The time arg to pass to the shaders
     */
    animate: function(time){
      if(this.paused){
        return;
      }
      requestAnimationFrame(this.boundAnimate);
      this.render(time);
    },

    /**
     * Pauses an ongoing animation.
     */
    pause: function(){
      this.paused = true;
    },

    /**
     * Resumes a paused animation.
     */
    resume: function(){
      this.paused = false;
      this.animate();
    },

    /**
     * Takes a node reference or id and returns the node.
     *
     * @param {HTMLElement|String} nodeOrId A node reference or node id
     * @returns {HTMLElement} The node
     * @private
     */
    _getNode: function(nodeOrId){
      return typeof nodeOrId == 'string' ? document.getElementById(nodeOrId) : nodeOrId;
    }
  };

  return CSSShader;

}, this);

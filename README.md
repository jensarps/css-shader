#About

CSS-Shader is a wrapper that allows to easily set CSS shaders via JavaScript.

It allows you to set and modify shader properties convieniently, without having to forge that complicated CSS String yourself.

This, it enables to easily build tools like the CSS-Shader Playground.

In addition, it provides an animate() method, wich executes the shaders in a loop using requestAnimationFrame.

#Demo

For a demo, visit the [CSS-Shader Playground](http://jensarps.github.com/css-shader/playground/).

#Usage

Include the css-shader.js file in your page, and create a new instance:

~~~javascript
var shader = new CSSShader();
~~~

##Properties

`blendMode`

The blend mode. Defaults to 'normal'. See http://www.w3.org/TR/compositing/#blend-mode for details.
  
`alphaCompositing`

The composition method. Defaults to 'source-atop'. See http://www.w3.org/TR/compositing/#alpha-compositing for details

`vertexMesh`

The vertex mesh setup. Defaults to '40 40'. See http://www.w3.org/TR/filter-effects/#vertexMesh-attribute for details.

##Methods

`setVertexShaderByNode(nodeOrId)`

Pass a node reference or a node id, and CSS-Shader will take the node's innerHTML and use it as vertex shader.

`setVertexShader(shaderString)`

Uses the passed string as vertex shader.

`setFragmentShaderByNode(nodeOrId)`

Pass a node reference or a node id, and CSS-Shader will take the node's innerHTML and use it as fragment shader.

`setFragmentShader(shaderString)`

Uses the passed string as fragment shader.

`setShaderArgs(args)`

Takes the passed Object and uses them as shader args.

Example:

~~~javascript
shader.setShaderArgs({
  lighting: 0.4,
  pos: '0.1 0.0 -0.9'
});
~~~

`setShaderArg(name, value)`

Sets one shader arg.

Example:

~~~javascript
shader.setShaderArg('lighting', 0.4);
~~~

`setRenderTarget(nodeOrId)`

Sets the passed node reference or the node given by id as render target; i.e. sets the node to which the CSS shaders will be applied.

`render()`

Executes the shaders on the the render target.

`animate()`

Starts running an animation; this means CSS-Shader will execute render() in a loop using requestAnimationFrame.

In addition to your custom shader args, a variable called `time` of type `float` will be passed to your shaders, containing the elapsed time in ms.

`pause()`

Pauses the animation.

`resume()`

Resumes the animation.

#Browser Support

Currently, only Chrome 25+ supports CSS Shaders.

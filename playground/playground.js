(function(){

  var shader;
  var nodes = {};
  var styleNode;
  var loadSelect;
  var shaderArgsNodes;

  var props = ['fs', 'vs','blendMode', 'alphaCompositing', 'vertexMesh', 'css'];

  var currentSettings;
  var presets = {
    lines: '%7B%22fs%22%3A%22%2F*%20this%20is%20a%20fork%20of%20http%3A%2F%2Fglsl.heroku.com%2Fe%234681.0%20*%2F%5Cnprecision%20mediump%20float%3B%5Cn%5Cnuniform%20float%20time%3B%5Cn%5Cnvarying%20vec3%20v_colorMod%3B%5Cnvarying%20vec2%20v_coords%3B%5Cn%5Cnvoid%20main()%20%7B%5Cn%5Cn%20%20vec3%20color%20%3D%20vec3(0.0)%3B%5Cn%20%20float%20vertColor%20%3D%200.0%3B%5Cn%20%20vec2%20uPos%20%3D%20v_coords%3B%5Cn%20%20uPos%20-%3D%20.5%3B%5Cn%5Cn%20%20for(%20float%20i%20%3D%200.%3B%20i%20%3C%208.%3B%20%2B%2Bi%20)%20%7B%5Cn%20%20%20%20uPos.y%20%2B%3D%20sin(%20uPos.x*(i)%20%2B%20(time%2F5000.0%20*%20i%20*%20i%20*%200.3)%20)%20*%200.15%3B%5Cn%20%20%20%20float%20fTemp%20%3D%20abs(0.5%20%2F%20uPos.y%20%2F%2050.0)%3B%5Cn%20%20%20%20vertColor%20%2B%3D%20fTemp%3B%5Cn%20%20%20%20color%20%2B%3D%20vec3(fTemp*(7.0-i)%2F7.0%2C%20fTemp*i%2F10.0%2C%20pow(fTemp%2C0.9)*1.5)%3B%5Cn%20%20%7D%5Cn%5Cn%20%20css_ColorMatrix%20%3D%20mat4(%20%5Cn%20%20%20%20color.x%2C%200.0%2C%200.0%2C%200.0%2C%5Cn%20%20%20%200.0%2C%20color.y%2C%200.0%2C%200.0%2C%5Cn%20%20%20%200.0%2C%200.0%2C%20color.z%2C%200.0%2C%5Cn%20%20%20%200.0%2C%200.0%2C%200.0%2C%201.0%20%5Cn%20%20)%3B%5Cn%7D%5Cn%20%20%20%20%20%20%22%2C%22vs%22%3A%22%2F*%20this%20is%20a%20fork%20of%20http%3A%2F%2Fglsl.heroku.com%2Fe%234681.0%20*%2F%5Cnprecision%20mediump%20float%3B%5Cn%5Cnuniform%20float%20time%3B%5Cn%5Cnattribute%20vec4%20a_position%3B%5Cnuniform%20mat4%20u_projectionMatrix%3B%5Cn%5Cnvarying%20vec2%20v_coords%3B%5Cn%5Cnvoid%20main()%20%7B%5Cn%5Cn%20%20gl_Position%20%3D%20u_projectionMatrix%20*%20a_position%3B%5Cn%5Cn%20%20v_coords%20%3D%20a_position.xy%3B%5Cn%20%20v_coords%20%2B%3D%20.5%3B%5Cn%5Cn%7D%5Cn%20%20%20%20%20%20%22%2C%22blendMode%22%3A%22normal%22%2C%22alphaCompositing%22%3A%22source-atop%22%2C%22vertexMesh%22%3A%221%201%22%2C%22css%22%3A%22background%3A%20white%3B%22%2C%22shaderArgs%22%3A%7B%7D%7D',
    colorChange: '%7B%22fs%22%3A%22precision%20mediump%20float%3B%5Cn%5Cnuniform%20float%20time%3B%5Cnuniform%20float%20lightness%3B%5Cn%5Cnvoid%20main()%20%7B%5Cn%5Cn%20%20float%20timeFrag%20%3D%20time%20%2F%201000.0%3B%5Cn%20%20float%20red%20%3D%20(%20sin(timeFrag)%20%2B%201.0%20)%20%2F%202.0%3B%5Cn%20%20float%20green%20%3D%20(%20sin(timeFrag%20%2B%201.0)%20%2B%201.0%20)%20%2F%202.0%3B%5Cn%20%20float%20blue%20%3D%20(%20sin(timeFrag%20%2B%202.0)%20%2B%201.0%20)%20%2F%202.0%3B%5Cn%5Cn%20%20float%20a%20%3D%20lightness%3B%5Cn%5Cn%20%20css_ColorMatrix%20%3D%20mat4(%20red%2C%200.0%2C%200.0%2C%200.0%2C%5Cn%20%20%20%200.0%2C%20green%2C%200.0%2C%200.0%2C%5Cn%20%20%20%200.0%2C%200.0%2C%20blue%2C%200.0%2C%5Cn%20%20%20%200.0%2C%200.0%2C%200.0%2C%20lightness%20)%3B%5Cn%7D%5Cn%20%20%20%20%20%20%22%2C%22vs%22%3A%22precision%20mediump%20float%3B%5Cn%5Cnattribute%20vec4%20a_position%3B%5Cnuniform%20mat4%20u_projectionMatrix%3B%5Cn%5Cnvoid%20main()%20%7B%5Cn%5Cn%20%20gl_Position%20%3D%20u_projectionMatrix%20*%20a_position%3B%5Cn%5Cn%7D%5Cn%20%20%20%20%20%20%22%2C%22blendMode%22%3A%22normal%22%2C%22alphaCompositing%22%3A%22source-atop%22%2C%22vertexMesh%22%3A%221%201%22%2C%22css%22%3A%22background%3A%20white%3B%5Cn%20%20%20%20%20%20%22%2C%22shaderArgs%22%3A%7B%22lightness%22%3A%220.7%22%7D%7D',
    noop: '%7B%22fs%22%3A%22precision%20mediump%20float%3B%5Cn%5Cnuniform%20float%20time%3B%5Cn%5Cnvoid%20main()%20%7B%5Cn%5Cn%20%20%20%20float%20r%20%3D%201.0%3B%5Cn%20%20%20%20float%20g%20%3D%201.0%3B%5Cn%20%20%20%20float%20b%20%3D%201.0%3B%5Cn%20%20%20%20float%20a%20%3D%201.0%3B%5Cn%5Cn%20%20%20%20css_ColorMatrix%20%3D%20mat4(%20r%2C%200.0%2C%200.0%2C%200.0%2C%5Cn%20%20%20%20%20%200.0%2C%20g%2C%200.0%2C%200.0%2C%5Cn%20%20%20%20%20%200.0%2C%200.0%2C%20b%2C%200.0%2C%5Cn%20%20%20%20%20%200.0%2C%200.0%2C%200.0%2C%20a%20)%3B%5Cn%7D%5Cn%20%20%20%20%20%20%22%2C%22vs%22%3A%22precision%20mediump%20float%3B%5Cn%5Cnattribute%20vec4%20a_position%3B%5Cnuniform%20mat4%20u_projectionMatrix%3B%5Cn%5Cnvoid%20main()%20%7B%5Cn%5Cn%20%20%20%20gl_Position%20%3D%20u_projectionMatrix%20*%20a_position%3B%5Cn%5Cn%7D%5Cn%20%20%20%20%20%20%22%2C%22blendMode%22%3A%22normal%22%2C%22alphaCompositing%22%3A%22source-atop%22%2C%22vertexMesh%22%3A%2240%2040%22%2C%22css%22%3A%22background%3A%20white%3B%22%7D',
    sphere: '%7B%22fs%22%3A%22%2F%2F%20Shader%20code%20by%20AlteredQualia%5Cn%2F%2F%20http%3A%2F%2Falteredqualia.com%2Fcss-shaders%2Farticle%2F%5Cn%5Cnprecision%20mediump%20float%3B%5Cn%5Cn%2F%2F%20Varyings%5Cn%5Cnvarying%20float%20v_light%3B%5Cn%5Cn%2F%2F%20Main%5Cn%5Cnvoid%20main()%20%7B%5Cn%5Cn%20%20float%20r%2C%20g%2C%20b%3B%5Cn%20%20r%20%3D%20g%20%3D%20b%20%3D%20v_light%3B%5Cn%20%20%5Cn%20%20css_ColorMatrix%20%3D%20mat4(%20r%2C%200.0%2C%200.0%2C%200.0%2C%5Cn%20%20%20%200.0%2C%20g%2C%200.0%2C%200.0%2C%5Cn%20%20%20%200.0%2C%200.0%2C%20b%2C%200.0%2C%5Cn%20%20%20%200.0%2C%200.0%2C%200.0%2C%201.0%20)%3B%5Cn%7D%22%2C%22vs%22%3A%22%2F%2F%20Shader%20code%20by%20AlteredQualia%5Cn%2F%2F%20http%3A%2F%2Falteredqualia.com%2Fcss-shaders%2Farticle%2F%5Cn%5Cnprecision%20mediump%20float%3B%5Cn%5Cn%2F%2F%20Built-in%20attributes%5Cn%5Cnattribute%20vec4%20a_position%3B%5Cnattribute%20vec2%20a_texCoord%3B%5Cn%5Cn%2F%2F%20Built-in%20uniforms%5Cn%5Cnuniform%20mat4%20u_projectionMatrix%3B%5Cn%5Cn%2F%2F%20Uniforms%20passed%20in%20from%20CSS%5Cn%5Cnuniform%20float%20amount%3B%5Cnuniform%20float%20sphereRadius%3B%5Cnuniform%20vec3%20lightPosition%3B%5Cn%5Cn%2F%2F%20Varyings%5Cn%5Cnvarying%20float%20v_light%3B%5Cn%5Cn%2F%2F%20Constants%5Cn%5Cnconst%20float%20PI%20%3D%203.1415%3B%5Cn%5Cn%2F%2F%20Construct%20perspective%20matrix%5Cn%5Cnvec3%20computeSpherePosition(%20vec2%20uv%2C%20float%20r%20)%20%7B%5Cn%5Cn%20%20vec3%20p%3B%5Cn%5Cn%20%20float%20fi%20%3D%20uv.x%20*%20PI%20*%202.0%3B%5Cn%20%20float%20th%20%3D%20uv.y%20*%20PI%3B%5Cn%5Cn%20%20p.x%20%3D%20r%20*%20sin(%20th%20)%20*%20cos(%20fi%20)%3B%5Cn%20%20p.y%20%3D%20r%20*%20sin(%20th%20)%20*%20sin(%20fi%20)%3B%5Cn%20%20p.z%20%3D%20r%20*%20cos(%20th%20)%3B%5Cn%5Cn%20%20return%20p%3B%5Cn%5Cn%7D%5Cn%5Cn%2F%2F%20Main%5Cn%5Cnvoid%20main()%20%7B%5Cn%5Cn%20%20%20%20vec4%20position%20%3D%20a_position%3B%5Cn%5Cn%20%20%2F%2F%20Map%20plane%20to%20sphere%20using%20UV%20coordinates%5Cn%5Cn%20%20vec3%20sphere%20%3D%20computeSpherePosition(%20a_texCoord%2C%20sphereRadius%20)%3B%5Cn%5Cn%20%20%2F%2F%20Blend%20plane%20and%20sphere%5Cn%5Cn%20%20position.xyz%20%3D%20mix(%20position.xyz%2C%20sphere%2C%20amount%20)%3B%5Cn%5Cn%20%20%2F%2F%20Set%20vertex%20position%5Cn%5Cn%20%20gl_Position%20%3D%20u_projectionMatrix%20*%20position%3B%5Cn%5Cn%20%20%2F%2F%20Compute%20lighting%5Cn%5Cn%20%20vec3%20lightPositionNormalized%20%3D%20normalize(%20lightPosition%20)%3B%5Cn%5Cn%20%20vec3%20planeNormal%20%3D%20lightPositionNormalized%3B%5Cn%20%20vec3%20sphereNormal%20%3D%20normalize(%20position.xyz%20)%3B%5Cn%5Cn%20%20vec3%20normal%20%3D%20normalize(%20mix(%20planeNormal%2C%20sphereNormal%2C%20amount%20)%20)%3B%5Cn%5Cn%20%20float%20light%20%3D%20max(%20dot(%20normal%2C%20lightPositionNormalized%20)%2C%200.0%20)%3B%5Cn%5Cn%20%20%2F%2F%20Pass%20in%20varyings%5Cn%5Cn%20%20v_light%20%3D%20light%3B%5Cn%5Cn%7D%22%2C%22blendMode%22%3A%22normal%22%2C%22alphaCompositing%22%3A%22source-atop%22%2C%22vertexMesh%22%3A%2264%2064%22%2C%22css%22%3A%22%2F*%20Image%20from%3A%5Cnhttp%3A%2F%2Ftextures.forrest.cz%2Findex.php%3FspgmGal%3Dmaps%26spgmPic%3D4%23%3F%20%5Cn*%2F%5Cn%5Cnbackground%3A%20url(earth.jpg)%20center%3B%5Cnbackground-size%3A%20cover%3B%22%2C%22shaderArgs%22%3A%7B%22amount%22%3A%221%22%2C%22sphereRadius%22%3A%220.4%22%2C%22lightPosition%22%3A%220.8%20-0.8%201.0%22%7D%7D'
  };

  function init(){

    shader = window.shader = new CSSShader();
    shader.setRenderTarget('playground');

    props.forEach(function(id){
      nodes[id] = document.getElementById(id);
      nodes[id].addEventListener('keyup', function(evt){
        currentSettings = readSettings();
        recompile();
      });
    });

    styleNode = document.getElementById('playgroundStyle');
    loadSelect = document.getElementById('load');
    shaderArgsNodes = [].slice.call(document.querySelectorAll('#shaderArgs input'), 0);

    shaderArgsNodes.forEach(function(node){
      node.addEventListener('keyup', function(evt){
        currentSettings = readSettings();
        recompile();
      });
    });

    document.getElementById('play').addEventListener('click', function(evt){
      document.documentElement.classList.remove('paused');
      shader.resume();
    });

    document.getElementById('pause').addEventListener('click', function(evt){
      document.documentElement.classList.add('paused');
      shader.pause();
    });

    loadSelect.addEventListener('change', function(evt){
      loadSettings(presets[loadSelect.value]);
    });

    var hash = location.hash;
    if(hash.length > 1){
      loadSettings(hash.slice(1));
    } else {
      loadSettings(presets.lines);
    }

    shader.animate();
  }

  function recompile(){
    shader.setVertexShader(currentSettings.vs);
    shader.setFragmentShader(currentSettings.fs);

    shader.blendMode = currentSettings.blendMode;
    shader.alphaCompositing = currentSettings.alphaCompositing;
    shader.vertexMesh = currentSettings.vertexMesh;

    shader.setShaderArgs(currentSettings.shaderArgs);

    styleNode.textContent = '#playground { ' + currentSettings.css + ' }';

    if(shader.paused){
      // still render one frame
      shader.render();
    }

    serializeSettings();
  }

  function gatherShaderArgs(){
    var shaderArgs = {};
    for(var i= 0, m = shaderArgsNodes.length - 1; i<m; i+=2){
      var key = shaderArgsNodes[i].value.trim();
      var value = shaderArgsNodes[i + 1].value.trim();

      if(key.length && value.length){
        shaderArgs[key] = value;
      }
    }

    return shaderArgs;
  }

  function readSettings () {
    var settings = {};
    props.forEach(function (prop) {
      settings[prop] = nodes[prop].value;
    });

    var shaderArgs = gatherShaderArgs();
    settings.shaderArgs = shaderArgs;

    return settings;
  }

  function serializeSettings(){
    var settingsString = encodeURIComponent(JSON.stringify(currentSettings));
    location.hash = settingsString;
  }

  function loadSettings(settings){
    settings = JSON.parse(decodeURIComponent(settings));

    currentSettings = settings;

    props.forEach(function(prop){
      nodes[prop].value = settings[prop];
    });

    shaderArgsNodes.forEach(function(node){
      node.value = '';
    });
    var shaderArgs = settings.shaderArgs;
    var index = 0;
    for(var key in shaderArgs){
      shaderArgsNodes[index].value = key;
      shaderArgsNodes[index + 1].value = shaderArgs[key];
      index += 2;
    }

    recompile();
    shader.render();
  }

  window.addEventListener('DOMContentLoaded', init, false);

})();

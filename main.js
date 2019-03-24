var planeDimension  = 50;
var cubeRotation    = [20,-100];
var zoom            = -2;
var textureData;
var colorData;
var wave = 0;

var gl;
var buffers;

main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  gl = canvas.getContext('webgl');
  

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    
    uniform float uTime;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    
    varying highp vec3 vNormal;

    uniform sampler2D uSampler;

    void main(void) {
      vTextureCoord = aTextureCoord;

      float y = texture2D(uSampler, vTextureCoord).r * 0.5;
      float h = 0.0;
      if(y == 0.0){
        float freq = 30.0;
        float amp = 0.01;
        float angle = (uTime + aVertexPosition.x + aVertexPosition.y )*freq;
        h= sin(angle)*amp;
        y = 0.02;
      } 

      vec4 newVertexPos = aVertexPosition + vec4(0,y,0,0) +vec4(0,h,0,0) ;
      gl_Position = uProjectionMatrix * uModelViewMatrix * newVertexPos;
      
      vNormal = mat3(uNormalMatrix) * vec3(0,1,0);//aVertexNormal;

      // Apply lighting effect
      highp vec3 ambientLight = vec3(0.1, 0.1, 0.1);
      highp vec3 directionalLightColor = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalVector = normalize(vec3(0.0, 1.0, 0.0));
      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    varying highp vec3 vNormal;
    uniform sampler2D uColorSampler;
    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uColorSampler, vTextureCoord)*0.5;

      
      highp vec3 ambientLight = vec3(0.1, 0.1, 0.1);
      highp vec3 directionalLightColor = vec3(0.2, 0.2, 0.2);
      highp vec3 directionalVector = normalize(vec3(0, 1, 0));
      highp vec3 normal = normalize(vNormal);
      highp float light = max(dot(normal, directionalVector),0.0);
      highp vec3 lighting = ambientLight + (directionalLightColor * light);

      highp vec4 texelHeight = texture2D(uSampler, vTextureCoord);
      if(texelHeight == vec4(0.0,0.0,0.0,1.0)){
        gl_FragColor = vec4(vec3(0.3,0.5,1.0) , 1.0);
      }
      else if(texelHeight.r < 0.03 && texelHeight.g < 0.03 && texelHeight.b < 0.03){
        gl_FragColor = vec4(vec3(0.4,0.6,1.0), 1.0);
        
      }
      else{
        gl_FragColor = vec4(texelColor.rgb + texelHeight.rgb, texelHeight.a);
        //gl_FragColor = vec4(vec3(0,0,1), texelHeight.a);
      }
      gl_FragColor.rgb += lighting;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVertexNormal, aTextureCoord,
  // and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
      uColorSampler: gl.getUniformLocation(shaderProgram, 'uColorSampler'),
      uTime: gl.getUniformLocation(shaderProgram, 'uTime'),
    }
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers = initPlaneBuffers(gl,3,3);
  buffers = initPlaneBuffers(gl, planeDimension, planeDimension);
  //buffers.vertexNormals = calculateNormals(buffers);
  //console.log(buffers.normal.length);
  
  //console.log('Buffers: ', buffers);
  //const texture = loadTexture(gl, 'heightmap.png');
  // var textureData = new Uint8Array([
  //   25,  64, 128,
  //   200,  64, 128,
  //   128,  190, 128,
  //   128,  64, 128,
  //   128,  64, 128,
  //   128,  12, 128,
  //   12,  64, 128,
  //   128,  64, 128,
  //   128,  6, 208,
  //   28,  64, 228
  // ]);

  
  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001  // convert to seconds
    const deltaTime = now - then
    then = now

    const texture = createTexture(gl,textureData)
    
    if(textureData != null){
      
       //buffers.vertexNormals = initNormals(gl, planeDimension, planeDimension)
      buffers.vertexNormals = initNormals(gl, planeDimension, planeDimension, textureData)
      
    }
    
    //const buffers = initPlaneBuffers(gl, planeDimension, planeDimension);
    const colorTexture = createTexture(gl,colorData)
    
    
    drawScene(gl, programInfo, buffers, texture, colorTexture, deltaTime);
    
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}



  //console.log(calcNormals);
  
 




function setHeightmap(heightMapData){
  textureData = heightMapData;
  
}
function setColorData(data){
  colorData = data;
}


function createTexture(gl, heightmapData) {
 var texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

const alignment = 1;
gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
// Fill the texture with a 1x1 blue pixel.
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 320, 320, 0, gl.RGBA, gl.UNSIGNED_BYTE,
             heightmapData );

 
  // set the filtering so we don't need mips and it's not filtered
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  return texture;
}
//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn of mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers, texture, colorTexture, deltaTime, date) {
  gl.clearColor(0.0, 1.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  
  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [0, 0.0, zoom]);  // amount to translate
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation[1],// amount to rotate in radians
              [1,0, 0]);       // axis to rotate around (X)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation[0],// amount to rotate in radians
              [0,1, 0]);       // axis to rotate around (X)
    
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoordinates);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }

    
  // Tell WebGL how to pull out the normals from
  // the normal buffer into the vertexNormal attribute.
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormals);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normalMatrix);

  // Specify the texture to map onto the faces.

  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.activeTexture(gl.TEXTURE1);
  // Bind the colorTexture to texture unit 1
  gl.bindTexture(gl.TEXTURE_2D, colorTexture);

  // Tell the shader we bound the texture to texture unit 0
  
  wave += deltaTime*0.1;
  
  gl.uniform1f(programInfo.uniformLocations.uTime, wave);
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  gl.uniform1i(programInfo.uniformLocations.uColorSampler, 1);

  {
    const vertexCount = ((planeDimension -1)*(planeDimension -1)) * 6;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
  
  // Update the rotation for the next draw
  //cubeRotation += 1 * deltaTime;
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function setCubeRotation(rotation){
  cubeRotation = rotation;
}


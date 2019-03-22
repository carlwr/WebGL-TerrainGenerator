
// console.log(arraysEqual(createCorrectBuffers_4_4(3,3)[0], createBuffers(4,4)[0]));

//printBuffers(createCorrectBuffers(3,3));


//printBuffers(createBuffers(4,4));

function printBuffers( buffers){
    if(!buffers){
        console.log("NO BUFFERS");
        
    }
    
    position = buffers[0];
    normals = buffers[1];
    textureCoord = buffers[2];
    indices = buffers[3];

    console.log("pos length: " + position.length + " normals length: " + normals.length +
                " textCoords length" + textureCoord.length + " indices length: " + indices.length );
    

    console.log("\nposition buffer: ");
    

    for(i = 0; i < position.length; i += 3){
        console.log(position[i] + " " + position[i + 1] + " " + position[i + 2]);
    }
    
    console.log("\nnormals buffer: ");
    for(i = 0; i < normals.length; i += 3){
        console.log(normals[i] + " " + normals[i + 1] + " " + normals[i + 2]);
    }

    console.log("\ntexture buffer: ");
    for(i = 0; i < textureCoord.length; i += 2){
        console.log(textureCoord[i] + " " + textureCoord[i + 1]);
    }
    
    console.log("\nindices buffer: ");
    
    for(i = 0; i < indices.length; i += 3){
        console.log(indices[i] + " " + indices[i + 1]+ " " + indices[i + 2]);
    }
}
function createCorrectBuffers_3_3(width,height){
    const positions = [
      
      0, 0,  0,
      0.5, 0,  0,
      1.0,  0, 0,
  
      0, 0,  0.5,
      0.5, 0,  0.5,
      1.0, 0,  0.5,
  
      0, 0,  1.0,
      0.5, 0,  1.0,
      1.0, 0,  1.0,
    ];
  
    const normals = [
      
      0.0,  1,  0.0,
      0.0,  1,  0.0,
      0.0,  1,  0.0,
      0.0,  1,  0.0,
      0.0,  1,  0.0,
      0.0,  1,  0.0,
      0.0,  1,  0.0,
      0.0,  1,  0.0,
      0.0,  1,  0.0,
       ];
  
       const textureCoord = [
        // Front
        0,  0,
        0.5,  0.0,
        1.0,  0.0,
        0.0,  0.5,
        0.5,  0.5,
        1.0,  0.5,
        0.0,  1.0,
        0.5,  1.0,
        1.0,  1.0,
      ];
  
      
    const indices = [
      0,  1,  3,
      1,  3,  4,
      1,  2,  4,
      2,  4,  5,
      3,  4,  6,
      4,  6,  7,
      4,  5,  7,
      5,  7,  8,
    ];
  
    
    return [ positions,normals, textureCoord, indices];
}

function createCorrectBuffers_4_4(width,height){
  const positions = [
    
    0, 0, 0,
    0.3333333333333333, 0, 0,
    0.6666666666666666, 0, 0,
    1, 0, 0,
    0, 0, 0.3333333333333333,
    0.3333333333333333, 0 ,0.3333333333333333,
    0.6666666666666666, 0, 0.3333333333333333,
    1, 0, 0.3333333333333333,
    0, 0, 0.6666666666666666,
    0.3333333333333333, 0, 0.6666666666666666,
    0.6666666666666666, 0, 0.6666666666666666,
    1 ,0, 0.6666666666666666,
    0, 0, 1,
    0.3333333333333333, 0, 1,
    0.6666666666666666, 0, 1,
    1, 0, 1,
    
  ];

  const normals = [
    
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
    0.0,  1,  0.0,
      ];

      const textureCoord = [
      0, 0,
      0.3333333333333333, 0,
      0.6666666666666666 ,0,
      1, 0,
      0, 0.3333333333333333,
      0.3333333333333333, 0.3333333333333333,
      0.6666666666666666, 0.3333333333333333,
      1, 0.3333333333333333,
      0, 0.6666666666666666,
      0.3333333333333333, 0.6666666666666666,
      0.6666666666666666, 0.6666666666666666,
      1, 0.6666666666666666,
      0, 1,
      0.3333333333333333, 1,
      0.6666666666666666, 1,
      1, 1,
      
    ];

    
  const indices = [
    0, 1, 4,
    1, 4, 5,
    1, 2, 5,
    2, 5, 6,
    2, 3, 6,
    3, 6, 7,
    4, 5, 8,
    5, 8, 9,
    5, 6, 9,
    6, 9, 10,
    6, 7, 10,
    7, 10, 11,
    8, 9, 12,
    9, 12, 13,
    9, 10, 13,
    10, 13, 14,
    10, 11, 14,
    11, 14, 15,
    
  ];

  
  return [ positions,normals, textureCoord, indices];
}
  
// function createBuffers(width , height){
//     width = width -1;
//     height = height - 1;
//     const positions = [];
//     const indices = [];
//     const textureCoord = [];
//     const normals = [];
//
//     bufferPos = 0;
//     indicesPos = 0;
//     normalPos = 0;
//     texturePos = 0;
//     for(i = 0.0; i<= width; i += 1.0){
//
//         for(j = 0.0; j<= height; j += 1.0){
//
//             //create vertex coords
//             positions[bufferPos] = 1./width * j;
//             bufferPos++;
//             positions[bufferPos] = 0.;
//             bufferPos++;
//             positions[bufferPos] = 1./height * i;
//             bufferPos++;
//
//             //create texture coords
//             textureCoord[texturePos] = 1./width * j;
//             texturePos++;
//             textureCoord[texturePos] = 1./height * i;
//             texturePos++;
//
//             //create normals
//             normals[normalPos] = 0.;
//             normalPos++;
//             normals[normalPos] = 1.;
//             normalPos++;
//             normals[normalPos] = 0.;
//             normalPos++;
//
//             //calculate number of vertices
//             indicesPos++;
//         }
//     }
//
//     pos = 0;
//     //calculate vertices
//     for(i = 0; i < indicesPos - (width + 1); i++){
//         if(i %  (width+1) == width){
//
//             continue;
//         }
//         //first triangle
//         indices[pos] = i;
//         pos ++;
//         indices[pos] = i + 1;
//         pos++;
//         indices[pos] = i + width + 1;
//         pos ++
//         //fill in square
//         indices[pos] = i + 1;
//         pos ++;
//         indices[pos] = i + width + 1;
//         pos++;
//         indices[pos] = i + width + 2;
//         pos ++;
//     }
//
//     return [ positions,normals, textureCoord, indices];
// }
  

function arraysEqual(_arr1, _arr2) {

    if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length)
      return false;


    for (var i = 0; i < _arr1.length; i++) {

        if (_arr1[i] !== _arr2[i])
            return false;

    }

    return true;

}

function createBuffers(width , height){
    console.log("Inside create buffers");
    width = width -1;
    height = height - 1;
    const positions = [];           // Vertex buffer
    const indices = [];             // Triangle buffer
    const textureCoord = [];        // UV coords buffer
    const normals = [];             // Normals

    var bufferPos = 0;              // Current position within vertex buffer
    var indicesPos = 0;             // Counter for how many indices/triangles
    var normalPos = 0;
    var texturePos = 0;
    var multiplier = 1;             // Plane size

    for(var i = 0.0; i<= height; i += 1.0){
        for(var j = 0.0; j<= width; j += 1.0){

            //create vertex coords
            positions[bufferPos] = (1./width * j - 0.5) * multiplier;
            bufferPos++;
            positions[bufferPos] = 0.;
            bufferPos++;
            positions[bufferPos] = (1./height * i- 0.5) * multiplier;
            bufferPos++;

            //create texture coords
            //if( i >1 && i < height -1 && j > 1 && j < width -1){

            textureCoord[texturePos] = 1./width * j;
            texturePos++;
            textureCoord[texturePos] = 1./height * i;
            texturePos++;
            //}

            //create normals
            normals[normalPos] = 0.;
            normalPos++;
            normals[normalPos] = 1.;
            normalPos++;
            normals[normalPos] = 0.;
            normalPos++;

            //calculate number of vertices
            indicesPos++;
        }
    }

    var pos = 0;
    //calculate vertices
    for(i = 0; i < indicesPos - (width + 1); i++){
        if(i %  (width+1) == width){

            continue;
        }
        //first triangle
        indices[pos] = i;
        pos ++;
        indices[pos] = i + 1;
        pos++;
        indices[pos] = i + width + 1;
        pos ++;
        //fill in square
        indices[pos] = i + 1;
        pos ++;
        indices[pos] = i + width + 1;
        pos++;
        indices[pos] = i + width + 2;
        pos ++;
    }

    console.log('Returning from create buffers');
    return [ positions,normals, textureCoord, indices];
}

function initPlaneBuffers(gl, width, height) {
    console.log('inside init plane buffers');

    //get buffers
    const buffers = createBuffers(width, height);

    // Create a buffer for the cube's vertex positions.

    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the cube.


    const positions = buffers[0];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Set up the normals for the vertices, so that we can compute lighting.

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    const vertexNormals = buffers[1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
        gl.STATIC_DRAW);

    // Now set up the texture coordinates for the faces.

    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

    const textureCoordinates = buffers[2];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
        gl.STATIC_DRAW);

    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    const indices = buffers[3];

    // Now send the element array to GL

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);

    console.log('Returning');
    return {
        position: positionBuffer,
        normal: normalBuffer,
        textureCoord: textureCoordBuffer,
        indices: indexBuffer
    };
}

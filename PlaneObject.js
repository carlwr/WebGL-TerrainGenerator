
// console.log(arraysEqual(createCorrectBuffers_4_4(3,3)[0], createBuffers(4,4)[0]));

//printBuffers(createCorrectBuffers(3,3));


//printBuffers(createBuffers(4,4));
var indices = [];
var positions = []; 
var textureCoord = []; 
var normalBuffer

main();
function main(){

  indices = [0,1,3,
             1,4,3,
             1,2,4,
             2,5,4,
             4,5,7,
             5,8,7,
             5,6,8,
             6,9,8
            ]

  positions = [0,0,0,
              0.5,0,0,
              1,0,0,
              0,0,0.5,
              0.5,0,0.5,
              1,0,0.5,
              0,0,1,
              0.5,0,1,
              1,0,1
            ]
  textureCoord = [
                  0,0,
                  0.5,0,
                  1,0,
                  0,0.5,
                  0.5,0.5,
                  1,0.5,
                  0,1,
                  0.5,1,
                  1,1

                  ]
    var textureData = [
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0
    ]
    console.log("Lengthes: position: " + positions.length + 
              " indices: " + indices.length + 
                " texCoords" + textureCoord.length +
                 " height: " + textureData.length)
    norm = calculateNormals(3,3, textureData);
   // console.log(norm);
    
}



function printBuffers( buffers){
    if(!buffers){
        
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
    width = width -1;
    height = height - 1;
             // Vertex buffer
               // Triangle buffer
            // UV coords buffer
    var normals = [];             // Normals

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
        indices[pos] = i + width + 2;
        pos++;
        indices[pos] = i + width + 1;
        pos ++;
    }
    
    return [ positions,normals, textureCoord, indices];
}

function calculateTexturePos(indice, distanceBetweenVertices){
  var pixeldist;
  var u = textureCoord[indices[indice]*2]
  var v = textureCoord[indices[indice]*2 + 1]
  if(v == 0){
    pixeldist =  distanceBetweenVertices *u 
    
  }
  else{
    pixeldist =   (distanceBetweenVertices)*(distanceBetweenVertices-2)/4 + distanceBetweenVertices *u
  }

  //console.log(u + " " + v + " " +pixeldist);
  
  off = 0;
  
  if(u == 0){
    pixeldist += off;
  }
  else if(u == 1){
    pixeldist -= off;
  }
  
  //console.log(indices[indice] + " " + pixeldist);
  
  texturePos = Math.floor(pixeldist);
  return texturePos;
}

function calculateNormals(width, height, updatedTextureData){
  
  var calcNormals = []
  var count = 0;
  
  var distanceBetweenVertices = (updatedTextureData.length/(indices.length)) * (width-1);
  //console.log(distanceBetweenVertices);
  
  for(var i = 0; i < indices.length; i += 3){
    // console.log("Now working on " + i);
    
    texturePos1 = calculateTexturePos(i, distanceBetweenVertices);
    
    texturePos2 = calculateTexturePos(i+1, distanceBetweenVertices);
    
    texturePos3 = calculateTexturePos(i+2, distanceBetweenVertices);
    //console.log(indices[i] + " : " + pixeldist1,indices[i+1] + " : " + pixeldist2,indices[i+2] + " : " + pixeldist3);
    

    var offset1 = updatedTextureData[texturePos1] /(255 * 2)
    var offset2 = updatedTextureData[texturePos2] /(255 * 2)
    var offset3 = updatedTextureData[texturePos3] /(255 * 2)
    //console.log(indices[i] + " " + indices[i+1] + " " + indices[i+2]);
    //console.log(updatedTextureData);
    
    //console.log(indices.length + "   " +updatedTextureData.length + "      " +texturePos1 + " " + texturePos2 + " " + texturePos3);
      //console.log(indices[i], offset1,indices[i+1] ,offset2,indices[i+2], offset3)
    
    
    var pos1 = [positions[indices[i] * 3],positions[indices[i] * 3 + 1 ] + offset1,positions[indices[i] * 3+2]];
    var pos2 = [positions[indices[i+1] * 3],positions[indices[i+1] * 3 + 1] + offset2,positions[indices[i+1] * 3 + 2]];
    var pos3 = [positions[indices[i+2] * 3],positions[indices[i+2]* 3 + 1] + offset3,positions[indices[i+2]* 3 +2]];
    //console.log(pos1 + " " + pos2 + " " + pos3);
    
    var tangent = [pos2[0] - pos1[0],pos2[1] - pos1[1],pos2[2] - pos1[2]]
    var bitangent = [pos3[0] - pos1[0],pos3[1] - pos1[1],pos3[2] - pos1[2]]
    tangent = normalize(tangent)
    bitangent = normalize(bitangent)

    var normalvector = normalize(cross(bitangent, tangent))
    
    
    calcNormals[count] = normalvector[0];
    count ++;
    calcNormals[count] = normalvector[1];
    count ++;
    calcNormals[count] = normalvector[2];
    count ++;
    
    
    var pos3 = [positions[indices[i] * 3],positions[indices[i] * 3+1] + offset1,positions[indices[i] * 3+2]];
    var pos1 = [positions[indices[i+1] * 3],positions[indices[i+1] * 3 + 1] + offset2,positions[indices[i+1] * 3 + 2]];
    var pos2 = [positions[indices[i+2] * 3],positions[indices[i+2]* 3 + 1] + offset3,positions[indices[i+2]* 3 +2]];
    //console.log(pos1 + " " + pos2 + " " + pos3);
    var tangent = [pos2[0] - pos1[0],pos2[1] - pos1[1],pos2[2] - pos1[2]]
    
    var bitangent = [pos3[0] - pos1[0],pos3[1] - pos1[1],pos3[2] - pos1[2]]
    tangent = normalize(tangent)
    bitangent = normalize(bitangent)

    var normalvector = normalize(cross(bitangent, tangent))

    calcNormals[count] = normalvector[0];
    count ++;
    calcNormals[count] = normalvector[1];
    count ++;
    calcNormals[count] = normalvector[2];
    count ++;
    
    var pos2 = [positions[indices[i] * 3],positions[indices[i] * 3+1] + offset1,positions[indices[i] * 3+2]];
    var pos3 = [positions[indices[i+1] * 3],positions[indices[i+1] * 3 + 1] + offset2,positions[indices[i+1] * 3 + 2]];
    var pos1 = [positions[indices[i+2] * 3],positions[indices[i+2]* 3 + 1] + offset3,positions[indices[i+2]* 3 +2]];
    //console.log(pos1 + " " + pos2 + " " + pos3);
    var tangent = [pos2[0] - pos1[0],pos2[1] - pos1[1],pos2[2] - pos1[2]]
    
    var bitangent = [pos3[0] - pos1[0],pos3[1] - pos1[1],pos3[2] - pos1[2]]
    tangent = normalize(tangent)
    bitangent = normalize(bitangent)

    var normalvector = normalize(cross(bitangent, tangent))
    
    calcNormals[count] = normalvector[0];
    count ++;
    calcNormals[count] = normalvector[1];
    count ++;
    calcNormals[count] = normalvector[2];
    count ++;
  }
  //console.log(calcNormals);
  return calcNormals;
}

function cross(vec1, vec2){
  return [vec1[1] * vec2[2] - vec1[2] * vec2[1],
          vec1[2] * vec2[0] - vec1[0] * vec2[2],
          vec1[0] * vec2[1] - vec1[1] * vec2[0]
        ]
}

function normalize(vector){
  normal = vector;
  var len = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2]);
  normal[0] /= len;
  normal[1] /= len;
  normal[2] /= len;
  return normal;
}

function initNormals(gl, width, height, updatedTextureData){
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  var vertexNormals = calculateNormals(width, height, updatedTextureData);
  for(var i = 0; i < vertexNormals.length; i+=3){
    
    
    
 // console.log(vertexNormals[i] + " "  + vertexNormals[i+1] + " " + vertexNormals[i + 2]);
  }
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
        gl.STATIC_DRAW);
  return normalBuffer
}

function initPlaneBuffers(gl, width, height) {

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

    normalBuffer = gl.createBuffer();
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

    return {
        positions: positionBuffer,
        vertexNormals: normalBuffer,
        textureCoordinates: textureCoordBuffer,
        indices: indexBuffer
    };
}

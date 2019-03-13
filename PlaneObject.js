
//console.log(arraysEqual(createCorrectBuffers(3,3)[1], createBuffers(3,3)[1]));

//printBuffers(createCorrectBuffers(3,3));

printBuffers(createBuffers(2,2));

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
  
function createBuffers(width , height){
    width = width -1;
    height = height - 1;
    const positions = [];
    const indices = [];
    const textureCoord = [];
    const normals = [];
  
    bufferPos = 0;
    indicesPos = 0;
    normalPos = 0;
    texturePos = 0;
    for(i = 0.0; i<= width; i += 1.0){
        
        for(j = 0.0; j<= height; j += 1.0){
            
            //create vertex coords
            positions[bufferPos] = 1./width * j;
            bufferPos++;
            positions[bufferPos] = 0.;
            bufferPos++;
            positions[bufferPos] = 1./height * i;
            bufferPos++;
  
            //create texture coords
            textureCoord[texturePos] = 1./width * j;
            texturePos++;
            textureCoord[texturePos] = 1./height * i;
            texturePos++;
  
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
  
    pos = 0;
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
        pos ++
        //fill in square
        indices[pos] = i + 1;
        pos ++;
        indices[pos] = i + width + 1;
        pos++;
        indices[pos] = i + width + 2;
        pos ++;
    }
  
    return [ positions,normals, textureCoord, indices];
  }
  

  function arraysEqual(_arr1, _arr2) {

    if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length)
      return false;


    for (var i = 0; i < _arr1.length; i++) {

        if (_arr1[i] !== _arr2[i])
            return false;

    }

    return true;

}
document.addEventListener("DOMContentLoaded", init, false);

var drawing = false;
var canvas;
var context;

// Array for X and Y coordinate
var clickX = [];
var clickY = [];
var weight = [];
var clickDrag = [];

// Sliders
var weightSlider;
var opacitySlider;


function init()
{
    testfunction("Edda");
    // Mouse movements
    canvas = document.getElementById("heightmap");
    canvas.addEventListener("mousedown", startDrawing, false);
    canvas.addEventListener("mouseup", stopDrawing, false);
    canvas.addEventListener("mousemove", draw, false);

    context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);


    document.getElementById("clearButton").onclick = clear;
    document.getElementById("printButton").onclick = print;

    // WeightSlider
    weightSlider = document.getElementById("weightSlider");
    context.lineWidth = weightSlider.value;                         // Size Initialize value as weight slider
    weightSlider.oninput = function(){
        console.log('slider', this.value);
        context.lineWidth = weightSlider.value;                         // Size Initialize value as weight slider
    };


    opacitySlider = document.getElementById("opacitySlider");
    opacitySlider.oninput = function(){
        console.log('slider', this.value);
        context.strokeStyle = "hsl(0, 0, 50)";        // Color
    };




    // Draw initialization
    context.strokeStyle = "#df4b26";        // Color
    context.lineJoin = "round";             // Style


}



function startDrawing(e){
    console.log("draw!");
    drawing = true;
    draw(e);

}

function stopDrawing(e){
    drawing = false;
}

function draw(e){
    if(drawing){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        addClick(mouseX, mouseY, true);
        redraw();
        // if(drawing){
        //     addSingle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        //     // context.stroke();
        //     redraw();
        // }
    }
}
//
// function addSingle(x, y)
// {
//     clickX.push(x);
//     clickY.push(y);
//     context.lineTo(x, y);
//     context.closePath();
//     context.stroke();
// }


function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    weight.push(context.lineWidth);
    clickDrag.push(dragging);
    // context.lineTo(x, y);
}


function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    console.log('Redrawing!');

    for(var i = 0; i < clickX.length; i++) {
        context.lineWidth = weight[i];
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

function clear(){
    console.log('Clearing!');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    clickX = [];
    clickY = [];
    clickDrag = [];
}

function print(){
    console.log(context);
}





function getPosition(event)
{
    var x;
    var y;
    var canvas = document.getElementById("heightmap");

    if (event.x && event.y)
    {
        x = event.x;
        y = event.y;
    }
    else // Firefox method to get the position
    {
        x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    posX = x;
    posY = y;
    setCubeRotation(posX);

    console.log('X: ', x);
    console.log('Y: ', y);
}

function getX(){
    return posX;
}

function getY(){
    return posY;
}


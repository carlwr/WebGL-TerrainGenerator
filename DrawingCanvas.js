/**
 * Created by edda on 14.3.2019.
 */
document.addEventListener("DOMContentLoaded", init, false);

var drawing = false;
var canvas;
var context;
var color;

// Array for X and Y coordinate
var clickX = [];
var clickY = [];
var weight = [];    // Pencil weight
var stroke = [];    // Opacity/color
// var colorArr = [];
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
    // canvas.addEventListener("mouseleave", stopDrawing, false);

    context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    document.getElementById("clearButton").onclick = clear;

    // WeightSlider
    weightSlider = document.getElementById("weightSlider");
    context.lineWidth = weightSlider.value;                         // Size Initialize value as weight slider
    // context.lineWidth = 400;
    weightSlider.oninput = function(){
        console.log('slider', this.value);
        context.lineWidth = this.value;                         // Size Initialize value as weight slider
    };

    // Opacity
    opacitySlider = document.getElementById("opacitySlider");
    opacitySlider.oninput = function(){
        console.log('slider', this.value);
        color = this.value * 2.55;
        context.strokeStyle = 'rgb(' + color + ','  + color + ', '  + color + ', ' + 0.1 + ')';
        context.shadowColor = 'rgb(' + color + ','  + color + ', '  + color + ')';
    };

    color = opacitySlider.value * 2.55;
    context.strokeStyle = 'rgb(' + color + ','  + color + ', '  + color + ', ' + 0.1 + ')';
    context.lineWidth = weightSlider.value;                         // Size Initialize value as weight slider
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


function addClick(x, y, dragging)
{

    // var grd = context.createRadialGradient(x, y, 4, 90, 60, 100);
    // grd.addColorStop(0, "red");
    // grd.addColorStop(1, "white");
    // context.strokeStyle = grd;

    // var maxWidth = context.lineWidth;
    clickX.push(x);
    clickY.push(y);
    weight.push(context.lineWidth);
    stroke.push(context.strokeStyle);
    clickDrag.push(dragging);
    // context.lineTo(x, y);
    // var x0 = (x - 10);
    // var y0 = (y - 10);
    // var x1 = (x + 10);
    // var y1 = (y + 10);

    // var grd = context.createRadialGradient(x0, y0, 0, x1, y1, 30);
    // grd.addColorStop(0, "red");
    // grd.addColorStop(1, "green");
    // context.strokeStyle = grd;
    // stroke.push(grd);
}


function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    console.log('Redrawing!');


    for(var i = 0; i < clickX.length; i++) {
        context.lineWidth = weight[i];
        context.strokeStyle = stroke[i];
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
    generate();
}

function clear(){
    console.log('Clearing!');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    // opacitySlider.value = 50;
    clickX = [];
    clickY = [];
    clickDrag = [];
    generate();
}

function generate(){
    var imageData = context.getImageData(0, 0, 250, 250);
    console.log(imageData);
    var array = new Uint8Array(imageData.data.buffer);
    setHeightmap(array);
}



/**
 * Created by edda on 20.3.2019.
 */

document.addEventListener("DOMContentLoaded", init, false);

var weightSlider2;
var colorCanvas;
var colorCtx;
// var color;
var redSlider;
var greenSlider;
var blueSlider;

// Array for X and Y coordinate
var drawX = [];
var drawY = [];
var drawWeight = [];    // Pencil weight
var drawStroke = [];    // Opacity/color

var red;
var green;
var blue;



function init(){
    colorCanvas = document.getElementById("colormap");
    colorCanvas.addEventListener("mousedown", startColoring, false);
    colorCanvas.addEventListener("mouseup", stopColoring, false);
    colorCanvas.addEventListener("mousemove", colorDraw, false);
    // canvas.addEventListener("mouseleave", stopDrawing, false);

    colorCtx = colorCanvas.getContext("2d");
    colorCtx.fillStyle = "black";
    colorCtx.fillRect(0, 0, context.canvas.width, context.canvas.height);

    weightSlider2 = document.getElementById("weightSlider2");
    context.lineWidth = weightSlider.value;                         // Size Initialize value as weight slider
    // context.lineWidth = 400;
    weightSlider2.oninput = function(){
        console.log('slider', this.value);
        colorCtx.lineWidth = this.value;                         // Size Initialize value as weight slider
    };


    redSlider = document.getElementById("redSlider");
    redSlider.oninput = function(){
      red = this.value;
      changeColor();
    };

    greenSlider = document.getElementById("greenSlider");
    greenSlider.oninput = function(){
        green = this.value;
        changeColor();
    };

    blueSlider = document.getElementById("blueSlider");
    blueSlider.oninput = function(){
        blue = this.value;
        changeColor();
    };

    red = redSlider.value;
    green = greenSlider.value;
    blue = blueSlider.value;
    changeColor();

    colorCtx.lineWidth = weightSlider2.value;
    colorCtx.lineJoin = "round";             // Style
}

function changeColor(){
    colorCtx.strokeStyle = 'rgb(' + red + ','  + green + ', '  + blue + ')';
}


function startColoring(e){
    console.log("color!");
    drawing = true;
    draw(e);

}


function stopColoring(e){
    drawing = false;
}

function colorDraw(e){
    if(drawing){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        addDrawClick(mouseX, mouseY, true);
        // redraw();
        // if(drawing){
        //     addSingle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        //     // context.stroke();
        //     redraw();
        // }

        // var grd = context.createRadialGradient(x, y, 4, 90, 60, 100);
        // grd.addColorStop(0, "red");
        // grd.addColorStop(1, "white");
        // context.strokeStyle = grd;

        // var maxWidth = context.lineWidth;

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
}

function addDrawClick(x, y, dragging)
{
    drawX.push(x);
    drawY.push(y);
    drawWeight.push(colorCtx.lineWidth);
    drawStroke.push(colorCtx.strokeStyle);
    clickDrag.push(dragging);
}

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    console.log('Redrawing!');


    for(var i = 0; i < clickX.length; i++) {
        colorCtx.lineWidth = drawWeight[i];
        colorCtx.strokeStyle = drawStroke[i];
        colorCtx.beginPath();
        if(clickDrag[i] && i){
            colorCtx.moveTo(drawX[i-1], drawY[i-1]);
        }else{
            colorCtx.moveTo(drawX[i]-1, drawY[i]);
        }
        colorCtx.lineTo(drawX[i], drawY[i]);
        colorCtx.closePath();
        colorCtx.stroke();
    }
    // generate();
}


/**
 * Created by edda on 14.3.2019.
 */
document.addEventListener("DOMContentLoaded", init, false);

var drawing = false;
var heightCanvas;
var colorCanvas;
var hmContext;
var cmContext;

var color;
var red;
var green;
var blue;

// Arrays for heightmap properties
var maps = {
    'heightmap': {
        X: [],
        Y: [],
        weight: [],
        stroke: [],
        clickDrag: [],
        context: ''
    },
    'colormap': {
        X: [],
        Y: [],
        weight: [],
        stroke: [],
        clickDrag: [],
        context: ''
    }
};

// Sliders
var weightSlider;
var opacitySlider;
var weightSlider2;  // Color canvas
var redSlider;
var greenSlider;
var blueSlider;


function init()
{
    // Get canvas for height
    heightCanvas = document.getElementById("heightmap");
    maps.heightmap.context = heightCanvas.getContext("2d");
    setEventListeners(heightCanvas);
    weightSlider = document.getElementById("weightSlider");
    setWeightSlider(maps.heightmap.context, weightSlider);
    setOpacitySlider(maps.heightmap.context);


    hmContext = maps.heightmap.context;
    setBlackBackground(hmContext);

    color = opacitySlider.value * 2.55;
    setHeightStrokeStyle(color);

    colorCanvas = document.getElementById("colormap");
    maps.colormap.context = colorCanvas.getContext("2d");
    cmContext = maps.colormap.context;
    setBlackBackground(cmContext);

    setEventListeners(colorCanvas);
    weightSlider2 = document.getElementById("weightSlider2");
    setWeightSlider(maps.colormap.context, weightSlider2);



    // Clear buttons
    document.getElementById("clearHeightmap").onclick = clearHeightmap;
    document.getElementById("clearColormap").onclick = clearColormap;

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

    cmContext.lineJoin = "round";


}


function setEventListeners(canvas){
    canvas.addEventListener("mousedown", startDrawing, false);
    canvas.addEventListener("mouseup", stopDrawing, false);
    canvas.addEventListener("mousemove", draw, false);
}

function setWeightSlider(ctx, slider){
    ctx.lineWidth = slider.value;                         // Size Initialize value as weight slider
    slider.oninput = function(){
        ctx.lineWidth = this.value
    };
}

function setOpacitySlider(ctx){
    opacitySlider = document.getElementById("opacitySlider");
    opacitySlider.oninput = function(){
        // console.log('slider', this.value);
        color = this.value * 2.55;
        ctx.strokeStyle = 'rgb(' + color + ','  + color + ', '  + color + ', ' + 0.1 + ')';
        ctx.shadowColor = 'rgb(' + color + ','  + color + ', '  + color + ')';
    };
}

function setBlackBackground(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function setHeightStrokeStyle(color){
    hmContext.strokeStyle = 'rgb(' + color + ','  + color + ', '  + color + ', ' + 0.1 + ')';
    hmContext.lineWidth = weightSlider.value;                         // Size Initialize value as weight slider
    hmContext.lineJoin = "round";             // Style
    // context.shadowColor = 'rgb(255, 255, 255)';
    hmContext.shadowColor = 'rgb(' + color + ','  + color + ', '  + color + ')';
    hmContext.shadowBlur  = 100;
}


function changeColor(){
    cmContext.strokeStyle = 'rgb(' + red + ','  + green + ', '  + blue + ')';
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
    console.log("Draw: ", e.target.id);
    var map = e.target.id;
    if(drawing){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        addClick(mouseX, mouseY, map, true);
        redraw(map);
        // if(drawing){
        //     addSingle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        //     // context.stroke();
        //     redraw();
        // }
    }
}


function addClick(x, y, map, dragging)
{
    console.log('Map: ', map);
    maps[map].X.push(x);
    maps[map].Y.push(y);
    maps[map].weight.push(maps[map].context.lineWidth);
    maps[map].stroke.push(maps[map].context.strokeStyle);
    maps[map].clickDrag.push(dragging);
}


function redraw(map){
    var context = maps[map].context;
    var weight = maps[map].weight;
    var stroke = maps[map].stroke;
    var clickX = maps[map].X;
    var clickY =  maps[map].Y;
    var clickDrag = maps[map].clickDrag;


    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

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
    generate(map);
}

function clearHeightmap(){
    clearMap('heightmap');
}

function clearColormap(){
    clearMap('colormap');
}

function clearMap(map){
    console.log('Clearing: ', map);
    var ctx = maps[map].context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    maps[map].X = [];           // X coordinates
    maps[map].Y = [];           // Y coordinates
    maps[map].clickDrag = [];
    generate(map);
}


function generate(map){
    var imageData = maps[map].context.getImageData(0, 0, 320, 320);
    console.log(imageData);
    var array = new Uint8Array(imageData.data.buffer);
    if(map == 'heightmap'){
        setHeightmap(array);
    } else if (map == 'colormap'){
        setColorData(array);
    }
}



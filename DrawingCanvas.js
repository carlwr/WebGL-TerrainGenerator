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
        strokeStyle: [],
        // lineWidth: '',
        clickDrag: [],
        shadowColor: [],
        shadowBlur: '',
        context: ''
    },
    'colormap': {
        X: [],
        Y: [],
        weight: [],
        strokeStyle: [],
        // lineWidth: '',
        clickDrag: [],
        shadowColor: [],
        shadowBlur: '',
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
    generate('heightmap');

    color = opacitySlider.value;
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
    cmContext.shadowBlur  = 50;

}


function setEventListeners(canvas){
    canvas.addEventListener("mousedown", startDrawing, false);
    canvas.addEventListener("mouseup", stopDrawing, false);
    canvas.addEventListener("mousemove", draw, false);
}

function setWeightSlider(ctx, slider){
    ctx.lineWidth = slider.value;                         // Size Initialize value as weight slider
    slider.oninput = function(){
        ctx.lineWidth = this.value;
        // ctx.shadowBlur = this.value * 0.4;
    };
}

function setOpacitySlider(ctx){
    opacitySlider = document.getElementById("opacitySlider");
    opacitySlider.oninput = function(){
        // console.log('slider', this.value);
        color = this.value;
        ctx.strokeStyle = 'rgba(' + color + ','  + color + ', '  + color + ', ' + 0.1 + ')';
        ctx.shadowColor = 'rgba(' + color + ','  + color + ', '  + color + ', ' + 0.1 + ')';
    };
}

function setBlackBackground(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function setHeightStrokeStyle(color){
    hmContext.strokeStyle = 'rgba(' + color + ','  + color + ', '  + color + ', ' + 0.1 + ')';
    hmContext.lineWidth = weightSlider.value;                         // Size Initialize value as weight slider
    hmContext.lineJoin = "round";             // Style
    // context.shadowColor = 'rgb(255, 255, 255)';
    hmContext.shadowColor = 'rgba(' + color + ','  + color + ', '  + color + ', ' + 0.1 + ')';
    hmContext.shadowBlur  = 20;
}


function changeColor(){
    cmContext.strokeStyle = 'rgba(' + red + ','  + green + ', '  + blue + ', ' + 0.1 +  ')';
    cmContext.shadowColor = 'rgba(' + red + ','  + green + ', '  + blue + ', ' + 0.1 +  ')';
}

function startDrawing(e){
    drawing = true;
    draw(e);
}


function stopDrawing(e){
    drawing = false;
}

function draw(e){
    var map = e.target.id;
    if(drawing){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        addClick(mouseX, mouseY, map, true);
        redraw(map);
    }
}


function addClick(x, y, map, dragging)
{
    var ctx = maps[map].context;
    maps[map].X.push(x);
    maps[map].Y.push(y);
    maps[map].weight.push(ctx.lineWidth);
    maps[map].strokeStyle.push(ctx.strokeStyle);
    // maps[map].lineWidth.push(ctx.lineWidth);
    maps[map].clickDrag.push(dragging);
    // maps[map].shadowBlur.push(ctx.shadowBlur);
    maps[map].shadowColor.push(ctx.shadowColor);
}


function redraw(map){
    // console.log("Redraw: ", maps[map].context);
    var context = maps[map].context;
    var weight = maps[map].weight;
    var stroke = maps[map].strokeStyle;
    var clickX = maps[map].X;
    var clickY =  maps[map].Y;
    var clickDrag = maps[map].clickDrag;
    // var shadowBlur = maps[map].shadowBlur;
    var shadowColor = maps[map].shadowColor;
    // var lineWidth = maps[map].lineWidth;


    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for(var i = 0; i < clickX.length; i++) {
        context.lineWidth = weight[i];
        context.strokeStyle = stroke[i];
        context.shadowColor = shadowColor[i];
        // context.shadowBlur = shadowBlur[i];
        // context.lineWidth = lineWidth[i];
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
    var ctx = maps[map].context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    maps[map].X = [];           // X coordinates
    maps[map].Y = [];           // Y coordinates
    maps[map].weight = [];
    maps[map].strokeStyle = [];
    maps[map].clickDrag = [];
    maps[map].lineWidth = [];
    maps[map].clickDrag = [];
    maps[map].shadowColor = [];
    maps[map].shadowBlur = '';
    generate(map);
}


function generate(map){
    var imageData = maps[map].context.getImageData(0, 0, 320, 320);
    var array = new Uint8Array(imageData.data.buffer);
    if(map == 'heightmap'){
        setHeightmap(array);
    } else if (map == 'colormap'){
        setColorData(array);
    }
}



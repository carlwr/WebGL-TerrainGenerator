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


function init()
{
    // Get canvas for height
    heightCanvas = document.getElementById("heightmap");
    maps.heightmap.context = heightCanvas.getContext("2d");
    setEventListeners(heightCanvas);
    weightSlider = document.getElementById("weightSlider");
    setWeightSlider(maps.heightmap.context, weightSlider);
    setOpacitySlider(maps.heightmap.context);

    colorCanvas = document.getElementById("colormap");
    maps.colormap.context = colorCanvas.getContext("2d");
    setEventListeners(colorCanvas);
    weightSlider2 = document.getElementById("weightSlider2");
    setWeightSlider(maps.colormap.context, weightSlider);


    hmContext = maps.heightmap.context;
    hmContext.fillStyle = "black";
    hmContext.fillRect(0, 0, hmContext.canvas.width, hmContext.canvas.height);


    // Clear buttons
    document.getElementById("clearHeightmap").onclick = clearMap('heightmap');
    document.getElementById("clearColormap").onclick = clearMap('colormap');



    color = opacitySlider.value * 2.55;
    setHeightStrokeStyle(color);
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

function setHeightStrokeStyle(color){
    hmContext.strokeStyle = 'rgb(' + color + ','  + color + ', '  + color + ', ' + 0.1 + ')';
    hmContext.lineWidth = weightSlider.value;                         // Size Initialize value as weight slider
    hmContext.lineJoin = "round";             // Style
    // context.shadowColor = 'rgb(255, 255, 255)';
    hmContext.shadowColor = 'rgb(' + color + ','  + color + ', '  + color + ')';
    hmContext.shadowBlur  = 100;
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
    // map.weight.push(map.context.lineWidth);
    // map.stroke.push(map.context.strokeStyle);
    // map.clickDrag.push(dragging);
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

function clearMap(map){
    var ctx = maps[map].context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    maps[map].X = [];           // X coordinates
    maps[map].Y = [];           // Y coordinates
    maps[map].lickDrag = [];
    generate(map);
}


function generate(map){
    var imageData = maps[map].context.getImageData(0, 0, 320, 320);
    console.log(imageData);
    var array = new Uint8Array(imageData.data.buffer);
    if(map == 'heightmap'){
        setHeightmap(array);
    } else if (map == 'colormap'){


    }
}



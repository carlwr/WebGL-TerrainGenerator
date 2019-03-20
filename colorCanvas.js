/**
 * Created by edda on 20.3.2019.
 */

document.addEventListener("DOMContentLoaded", init, false);

var weightSlider2;
var colorCanvas;
var color;


function init(){
    colorCanvas = document.getElementById("colormap");
    colorCanvas.addEventListener("mousedown", startColoring, false);
    colorCanvas.addEventListener("mouseup", stopColoring, false);
    colorCanvas.addEventListener("mousemove", colorDraw, false);
    // canvas.addEventListener("mouseleave", stopDrawing, false);

    context = colorCanvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

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
    // if(drawing){
    //     var mouseX = e.pageX - this.offsetLeft;
    //     var mouseY = e.pageY - this.offsetTop;
    //
    //     addClick(mouseX, mouseY, true);
    //     redraw();
    //     // if(drawing){
    //     //     addSingle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    //     //     // context.stroke();
    //     //     redraw();
    //     // }
    // }
}





function setColor(colorHex){
    console.log('Setting color: ', colorHex);
}



/**
 * Created by edda on 20.3.2019.
 */

document.addEventListener("DOMContentLoaded", init, false);

var weightSlider2;
var colorCanvas;
var colorCtx;
// var color;


$(".type").click(function(){
    $(".type").removeClass("active");
    $(this).addClass("active");
});


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

    colorCtx.lineWidth = weightSlider2.value;
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



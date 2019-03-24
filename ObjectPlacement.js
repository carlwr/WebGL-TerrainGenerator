
var mousePosition = [250,250];
var mouseRadius = 10;
var currentAngle = [0,0]; // [x-axis, y-axis] degrees

var lastX = -1;
var lastY = -1;
var dragging = false;

var canvas = document.querySelector('#glcanvas');

canvas.addEventListener('mousedown', function(event) {
    var x = event.clientX;
    var y = event.clientY;

    var rect = event.target.getBoundingClientRect();
    if(rect.left <= x 
    && x <= rect.right 
    && rect.top <= y 
    && y <= rect.bottom
    ) {
    lastX = x; 
    lastY = y;
    mousePosition[0] = x;
    mousePosition[1] = canvas.height - y;
    dragging = true;
    
    }
}, false);


canvas.addEventListener('mouseup', function(event) {
    
    dragging = false;
    
}, false);

this.canvas.addEventListener('mousewheel', function(event) {
    zoom += event.wheelDelta * 0.001
 }, false);

canvas.addEventListener('mousemove', function(event) {
     var x = event.clientX;
     var y = event.clientY;
     if(dragging) {
       //put some kind of dragging logic in here
       //Here is a roation example
       var factor = 1/canvas.height;
       var dx = factor * (x - lastX);
       var dy = factor * (y - lastY);
       
       //Limit x-axis roation angle to -90 to 90 degrees
       currentAngle[0] = dx; //Math.max(Math.min(currentAngle[0] + dy, 90), -90);
       currentAngle[1] = dy;//currentAngle[1] + dx;
 
       mousePosition[0] = x;
       mousePosition[1] = canvas.height - y;
        
        cubeRotation[0] += currentAngle[0];
        cubeRotation[1] += currentAngle[1];
     }
     lastX = x;
     lastY = y;
   
}, false);



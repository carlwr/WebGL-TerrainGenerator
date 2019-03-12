document.addEventListener("DOMContentLoaded", init, false);

var posX = 20;
var posY = 20;

function init()
{
  var canvas = document.getElementById("glcanvas");
  canvas.addEventListener("mousedown", getPosition, false);
}

function getPosition(event)
{
  var x = new Number();
  var y = new Number();
  var canvas = document.getElementById("glcanvas");

  if (event.x != undefined && event.y != undefined)
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

  
}

function getX(){
    return posX;
}

function getY(){
    return posY;
}
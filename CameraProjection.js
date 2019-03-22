

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
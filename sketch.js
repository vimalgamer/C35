var ball;
var database;

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    mycar = createSprite(250,250,20,20);
    mycar.shapeColor = "green";

    var ballPos = database.ref('ball/position');
    ballPos.on("value",readPosition, showError);
}

function draw(){
    background("brown");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){

    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    })
}

function showError(){
    console.log("error in database");
}

function readPosition(data){
    position = data.val();
    
    console.log(position.x);
    console.log(position.y);

    mycar.x = position.x;
    mycar.y = position.y;
}

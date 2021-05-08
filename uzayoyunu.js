var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var astronot = new Image();
var bg = new Image();
var fg = new Image();
var wall = new Image();
var wall2 = new Image();
var wall3 = new Image();
var oksijen =new Image();

astronot.src = "astronot.png";
bg.src = "uzay.jpg";
fg.src = "yuzey.png";
wall.src = "wall.png";
wall2.src = "wall.png";
wall3.src = "wall.png";

oksijen.src = "oksijen.png";


// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 1500;
var passed=0;

// audio files

var soundtrack = new Audio();
var scor = new Audio();
var overgame =new Audio();

soundtrack.src = "soundtrack.mp3";
scor.src = "sounds_score.mp3";
overgame.src= "over.mp3";


// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    soundtrack.play();
}


// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 25
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);

    
    for(var i = 0; i < pipe.length; i++){
        
        constant = wall.height+gap;
        ctx.drawImage(wall,pipe[i].x,pipe[i].y);
        ctx.drawImage(wall2,pipe[i].x,pipe[i].y+constant);
        ctx.drawImage(oksijen,pipe[i].x,pipe[i].y+(constant/2));

        ctx.drawImage(wall3,pipe[i].x,pipe[i].y+constant+160);
       
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*wall.height)-wall.height
            }); 
        }


        if( bX + astronot.width >= pipe[i].x && bX <= pipe[i].x + wall.width 
            
            &&

            ((bY >= wall.height && bY <= pipe[i].y + wall.height ) 
                ||( bY+astronot.height >= pipe[i].y+constant) && bY+astronot.height <= pipe[i].y+constant+wall.height
                ||( bY+astronot.height >= pipe[i].y+constant+160) && bY+astronot.height <= pipe[i].y+constant+wall.height+160)
                || (score == 0)
                || bY + astronot.height >=  cvs.height - fg.height){ 
            //overgame.play();
            location.reload();
            //setTimeout(location.reload(),10000);
           // location.reload(); // reload the page
        }


        if(     (bX >= pipe[i].x && bX + astronot.width <= pipe[i].x + oksijen.width )
                &&
                (bY >= pipe[i].y+wall.height && bY+astronot.height <= pipe[i].y+wall.height+constant))
            {
                scor.play();
                score+=200;
                passed+=1;
                oksijen.remove();
            }
        
    }

    setInterval( scored(), 1000);
    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(astronot,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "30px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-25);
    ctx.fillText("Passed : "+passed,10,cvs.height-3);
    
    requestAnimationFrame(draw);
    
}

function scored()
{
    score-=1;
}


draw();


// Implementation of classic arcade game Pong

//Selects the canvas
var box = document.getElementById("myCanvas");
var ctx = box.getContext("2d");

// initialize globals - pos and vel encode vertical info for paddles
var WIDTH = 300;
var HEIGHT = 200;
var BALL_RADIUS = 10;
var PAD_WIDTH = 4;
var PAD_HEIGHT = 40;
var HALF_PAD_WIDTH = PAD_WIDTH / 2;
var HALF_PAD_HEIGHT = PAD_HEIGHT / 2;
var LEFT = false;
var RIGHT = true;

// initialize ball_pos and ball_vel for new bal in middle of table
var ball_pos = [300,200];
var ball_vel = [Math.random() * 3,-5];

// if direction is RIGHT, the ball's velocity is upper right, else upper left
function spawn_ball(direction){
    ball_pos = [WIDTH/2,HEIGHT/2];
    if (direction == LEFT){
        ball_vel[0] = Math.random() * (5-2) + 2;
        ball_vel[1] = -Math.random() * (5-2) + 2;
    }
    else{   
        ball_vel[0] = -Math.random() * (5-2) + 2;
        ball_vel[1] = Math.random() * (5-2) + 2;
    }
}

// define event handlers
function new_game(){
    paddle1_pos = [0,50];
    paddle1_vel = 0;
    paddle2_pos = [296,50]
    paddle2_vel = 0;;
    score1 = 0;
    score2 = 0;
    if (Math.random() * (30) > 15)
        spawn_ball(LEFT);
    else
        spawn_ball(RIGHT);
}

function draw_handler(canvas){
    //Clears the screen on refresh
    canvas.clearRect(0, 0, box.width, box.height);

    // draw mid line and gutters
    //draw mid line
    canvas.beginPath();
    canvas.moveTo(WIDTH/2, 0);
    canvas.lineTo(WIDTH/2, HEIGHT);
    canvas.strokeStyle = '#FFFFFF';
    canvas.lineWidth = 1;
    canvas.stroke();
    //draw left gutter
    canvas.beginPath();
    canvas.moveTo(PAD_WIDTH/2 + 2, 0);
    canvas.lineTo(PAD_WIDTH/2 + 2, HEIGHT);
    canvas.strokeStyle = '#FFFFFF';
    canvas.lineWidth = 1;
    canvas.stroke();    
    //draw right gutter
    canvas.beginPath();
    canvas.moveTo(WIDTH - PAD_WIDTH, 0);
    canvas.lineTo(WIDTH - PAD_WIDTH, HEIGHT);
    canvas.strokeStyle = '#FFFFFF';
    canvas.lineWidth = 1;
    canvas.stroke();
        
    // update ball and bounce back
    ball_pos[0] += ball_vel[0];
    ball_pos[1] += ball_vel[1];
    
    if(ball_pos[0] + BALL_RADIUS <= paddle1_pos[0] + PAD_WIDTH){   
        if(ball_pos[1] + BALL_RADIUS <= paddle1_pos[1] + PAD_HEIGHT){
            if(ball_pos[1] + BALL_RADIUS >= paddle1_pos[1])
                ball_vel[0] = -1.1 * ball_vel[0];
        }
        else if(ball_pos[0] <= BALL_RADIUS){   
            score2 += 1;
            spawn_ball(LEFT);
        }
    }
    else if(ball_pos[0] >= paddle2_pos[0] - BALL_RADIUS - PAD_WIDTH){
        if(ball_pos[1] + BALL_RADIUS <= paddle2_pos[1] + PAD_HEIGHT){
            if(ball_pos[1] >= paddle2_pos[1])
                ball_vel[0] = -1.1 * ball_vel[0];
        }
        else if(ball_pos[0] >= WIDTH - BALL_RADIUS){   
            score1 += 1 ;
            spawn_ball(RIGHT);
        }
    }
    
    if(ball_pos[1] <= BALL_RADIUS)
        ball_vel[1] = - ball_vel[1];
    else if(ball_pos[1] >= HEIGHT - BALL_RADIUS)
         ball_vel[1] = - ball_vel[1];
    
    // draw ball
    canvas.beginPath();
    canvas.arc(ball_pos[0], ball_pos[1], BALL_RADIUS, 0, 2 * Math.PI, false);
    canvas.fillStyle = 'white';
    canvas.fill();
    canvas.lineWidth = 5;
    canvas.strokeStyle = 'white';
    canvas.stroke();

    // update paddle's vertical position, keep paddle on the screen
    if(paddle1_pos[1] <= 0){   
        paddle1_pos[1] = 0;
        paddle1_pos[1] += paddle1_vel;
    }
    else if(paddle1_pos[1] + PAD_HEIGHT >= 410){   
        paddle1_pos[1] = 325;
        paddle1_pos[1] -= paddle1_vel;
    }
    else
        paddle1_pos[1] += paddle1_vel;
    
    if(paddle2_pos[1] <= 0){   
        paddle2_pos[1] = 0;
        paddle2_pos[1] += paddle2_vel;
    }
    else if(paddle2_pos[1] + PAD_HEIGHT >= 410){   
        paddle2_pos[1] = 325;
        paddle2_pos[1] -= paddle2_vel;
    }
    else
        paddle2_pos[1] += paddle2_vel;

    //draw paddles
    //Paddle 1
    canvas.beginPath();
    canvas.lineWidth = '10';
    canvas.fillStyle = 'white';
    canvas.rect(paddle1_pos[0], paddle1_pos[1], PAD_WIDTH, PAD_HEIGHT);
    canvas.fill();
    //Paddle 2
    canvas.beginPath();
    canvas.lineWidth = '10';
    canvas.fillStyle = 'white';
    canvas.rect(paddle2_pos[0], paddle2_pos[1], PAD_WIDTH, PAD_HEIGHT);
    canvas.fill();
     
    // draw scores
    canvas.fillStyle = "white";
    canvas.font = '10px Comic Sans MS';
    canvas.fillText(score1,123,15);
    canvas.fillText('|',148,15);
    canvas.fillText(score2,173,15);
    canvas.fill();
}  
      
      /*  
function keydown(key){
    if key == simplegui.KEY_MAP["w"]:
        paddle1_vel -= 5
    if key == simplegui.KEY_MAP["up"]:
        paddle2_vel -= 5
    if key == simplegui.KEY_MAP["s"]:
        paddle1_vel += 5
    if key == simplegui.KEY_MAP["down"]:
        paddle2_vel += 5
}
        
function keyup(key){
    if key==simplegui.KEY_MAP["w"]:
        paddle1_vel = 0
    if key==simplegui.KEY_MAP["up"]:
        paddle2_vel = 0
    if key == simplegui.KEY_MAP["s"]:
        paddle1_vel = 0
    if key == simplegui.KEY_MAP["down"]:
        paddle2_vel = 0
}
*/
// create frame
var draw = setInterval(function(){draw_handler(ctx)},15);

// start frame
new_game();

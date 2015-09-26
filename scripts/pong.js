//Implements a stopwatch mini game which allows the user to start/stop the stopwatch and gain a point whenever it is stopped ona full second


// define global variables
var cTime = 0;
var x = 0; //successful stop
var y = 0; //total stop
var running = true;

//Selects the canvas
var box = document.getElementById("myCanvas");
var ctx = box.getContext("2d");


// define helper function format that converts time
// in tenths of seconds into formatted Stringing A:BC.D
function format(t){  
    var d = t % 10;
    var c = Math.round(((t - d) % 100) /10);
    var b = Math.round((((t / 100) % 6) * 10) * 10)/10;
    var a = Math.floor(t/600);
    return(String(a) + ':' + String(b));
}
    
// define event handlers for buttons; "Start", "Stop", "Reset"
function start_handler(){   
    if(running != true){
        running = true;
        timer = setInterval(function(){timer_handler()}, 100);
    }
}

function stop_handler(){
    if(running == true){
        if(cTime %10 == 0){
            x+= 1;
        }
        y += 1;
        running = false;
    }
    clearInterval(timer);
}

function reset_handler(){
    cTime = 0;
    x = 0;
    y = 0;
}

// define event handler for timer with 0.1 sec interval
function timer_handler(){
    cTime += 1
}

// define draw handler
function draw_handler(canvas){
    canvas.clearRect(0, 0, box.width, box.height);
    canvas.fillStyle = "black";
    canvas.font = '20px Comic Sans MS';
    canvas.fillText(format(cTime), 150,100);
    canvas.fillText('Success: '+ String(x),10,40);
    canvas.fillText('Total: ' + String(y),10,20);
}
        
// create time/drawing handlers
var timer = setInterval(function(){timer_handler()}, 100);
var draw = setInterval(function(){draw_handler(ctx)},10);



// Implementation of classic arcade game Pong

// initialize globals - pos and vel encode vertical info for paddles
var WIDTH = 600;
var HEIGHT = 400;
var BALL_RADIUS = 20;
var PAD_WIDTH = 8;
var PAD_HEIGHT = 80;
var HALF_PAD_WIDTH = PAD_WIDTH / 2;
var HALF_PAD_HEIGHT = PAD_HEIGHT / 2;
var LEFT = false;
var RIGHT = true;

// initialize ball_pos and ball_vel for new bal in middle of table
var ball_pos = [300,200];
var ball_vel = [7,-5];

// if direction is RIGHT, the ball's velocity is upper right, else upper left
function spawn_ball(direction){

    ball_pos = [WIDTH/2,HEIGHT/2];
    if (direction == LEFT){
        ball_vel[0] = random.randrange(2,5);
        ball_vel[1] = -random.randrange(2,5);
    }
    else{   
        ball_vel[0] = -random.randrange(2,5);
        ball_vel[1] = random.randrange(2,5);
    }
}

// define event handlers
function new_game(){
    paddle1_pos = [0,175];
    paddle1_vel = 0;
    paddle2_pos = [591,175]
    paddle2_vel = 0;;
    score1 = 0;
    score2 = 0;
    if (random.randrange(0,30) > 15)
        spawn_ball(LEFT);
    else
        spawn_ball(RIGHT);
}

function draw(canvas){
    // draw mid line and gutters
    canvas.draw_line([WIDTH / 2, 0],[WIDTH / 2, HEIGHT], 1, "White");
    canvas.draw_line([PAD_WIDTH, 0],[PAD_WIDTH, HEIGHT], 1, "White");
    canvas.draw_line([WIDTH - PAD_WIDTH, 0],[WIDTH - PAD_WIDTH, HEIGHT], 1, "White");
        
    // update ball and bounce back
    ball_pos[0] += ball_vel[0];
    ball_pos[1] += ball_vel[1];
    
    if(ball_pos[0] + BALL_RADIUS <= paddle1_pos[0] + PAD_WIDTH){   
        if(ball_pos[1] + BALL_RADIUS <= paddle1_pos[1] + PAD_HEIGHT){
            if(ball_pos[1] + BALL_RADIUS >= paddle1_pos[1]):
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
    canvas.draw_circle(ball_pos, BALL_RADIUS, 5, 'White', 'White')
    
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
    else:
        paddle2_pos[1] += paddle2_vel;

         
    //draw paddles
    canvas.draw_polygon([paddle1_pos, [paddle1_pos[0], paddle1_pos[1]+PAD_HEIGHT],[paddle1_pos[0] + PAD_WIDTH, paddle1_pos[1]] , [paddle1_pos[0] + PAD_WIDTH, paddle1_pos[1]+PAD_HEIGHT]], 10, 'white', 'white');
    canvas.draw_polygon([paddle2_pos, [paddle2_pos[0], paddle2_pos[1]+PAD_HEIGHT],[paddle2_pos[0] + PAD_WIDTH, paddle2_pos[1]] , [paddle2_pos[0] + PAD_WIDTH, paddle2_pos[1]+PAD_HEIGHT]], 10, 'white', 'white');
      
    // draw scores
    canvas.draw_text(str(score1),(150,50),50,"white");
    canvas.draw_text(str(score2),(400,50),50,"white");
}  
        
function keydown(key){

    global paddle1_vel, paddle2_vel
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

    global paddle1_vel, paddle2_vel
    if key==simplegui.KEY_MAP["w"]:
        paddle1_vel = 0
    if key==simplegui.KEY_MAP["up"]:
        paddle2_vel = 0
    if key == simplegui.KEY_MAP["s"]:
        paddle1_vel = 0
    if key == simplegui.KEY_MAP["down"]:
        paddle2_vel = 0
}

// create frame
frame = simplegui.create_frame("Pong", WIDTH, HEIGHT)
frame.set_draw_handler(draw)
frame.set_keydown_handler(keydown)
frame.set_keyup_handler(keyup)
frame.add_button("Restart",new_game)

// start frame
new_game()
frame.start()

var resp_keys = ['e','i'];

var welcome = `Welcome to the task!<br>
    We will now ask you to judge which of two images contains more dots, before asking you to rate your confidence in your judgement.<br>
    At the beginning of each trial, you will be presented with a black cross in the middle of the screen. Focus your attention on it. Then, two black boxes with a number of white dots will be flashed and you will be asked to judge which box had a higher number of dots.<br><br>
    If the box on the <strong>left</strong> had more dots, <strong>press ${resp_keys[0]}</strong>.<br> If the box on the <strong>right</strong> had more dots, <strong>press ${resp_keys[1]}</strong>.<br><br>
    Please respond quickly and to the best of your ability.<br>
    You will then rate your confidence in your judgement on a scale with the mouse.<br>
    Please do your best to rate your confidence accurately and do take advantage of the whole rating scale.<br><br>
    Press any key to continue.`

var instr_text = `We will now ask you to carry out some practice trials. Please respond only when the dots have disappeared.<br>
    In this practice phase we will tell you whether your judgements are right or wrong.<br><br>
    If you are <strong>correct</strong>, the box that you selected will be outlined in <font color="green"><strong>green</strong></font>.<br>
    If you are <strong>incorrect</strong>, the box that you selected will be outlined in <font color="red"><strong>red</strong></font>.<br><br>
    You will not need to rate your confidence of your judgements on these trials.<br><br>
    Press spacebar to continue.`

var fixation = '<div style="font-size:60px;">+</div>'


document.getElementById("instructions").innerHTML = welcome
document.addEventListener('keydown', document.getElementById("instructions").innerHTML = instr_text, true);

function eventHandler(e){
    //if(document.getElementById("instructions").innerHTML == welcome){
        //if(pressed spacebar){
            //document.getElementById("instructions").innerHTML = instr_text
        //}
    //} else if(document.getElementById("instructions").innerHTML == instr_text & e.key=' '){
        //move to practice trials
    //} else {break}
    
    
    //if(input_ready = true){
        //if(input=resp_key[0]){}
    //}
}


//CALC & DRAW STIMULI/////
function staircase(current_dots, back_1, back_2, trial_num_stair){
    var step_size;
    if (trial_num_stair < 7){ 
        step_size = .4;
    } else if (trial_num_stair > 6 && trial_num_stair < 12){
        step_size = .2
    } else if (trial_num_stair > 11){
        step_size = .1};

    if (back_1 == true && back_2 == true){
        current_dots -= step_size
    } else if (back_1 == false){
        current_dots += step_size};
    
    if (current_dots < 0){ current_dots = 0
    } else if (current_dots > 5.743){ current_dots = 5.743 } //exp(5.743) = 311.999, so box would be full
    
    return(current_dots)
}

function drawDots(ctx, squareWidth, x_coord, y_co, nDots_dots){
    //dot array shuffler
    let dot_array = [...Array(625).keys()];
    let currentIndex = dot_array.length,  randomIndex;
    while (currentIndex != 0) { 
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [dot_array[currentIndex], dot_array[randomIndex]] = [dot_array[randomIndex], dot_array[currentIndex]];
    }

    //draw dots in cells
    let cell_size = squareWidth/25;
    let dot_size = cell_size/5;
    let mat_no = 0;
    for (let x = x_coord ; x < x_coord + squareWidth; x += cell_size){
        for (let y = y_co ; y < y_co + squareWidth - cell_size; y += cell_size){
            if (dot_array[mat_no] < (312 + nDots_dots)){
               ctx.beginPath() // stops tearing of the graphics
               ctx.fillStyle = "white";
               ctx.arc(x + (cell_size/2) , y + (cell_size/2), dot_size, 0, Math.PI*2);
               ctx.fill();
            };
            mat_no++;
        }
    }
}

function drawStim(c,type,target,nDots_stim,correct){
    //empty stim boxes
    let squareWidth = Math.round(ppcm*6) //5cm in the Pixel/cm calculated above
    let ctx = c.getContext("2d")
    let y_co = c.height/4
    var x_co_r = c.width-squareWidth
        //if(Math.random() < 0.5){}
    ctx.fillStyle = "black"
    ctx.fillRect(0, y_co, squareWidth, squareWidth);
    ctx.fillRect(x_co_r, y_co, squareWidth, squareWidth);

    if(type=="feedback"){ //feedback
        if (trial_num <= num_prac){
            if(correct){ ctx.fillStyle = '#00ff00'
            } else { ctx.fillStyle = '#ff0000'}
        } else {ctx.fillStyle = '#0000ff'}
        if(target==resp_keys[0]){
            ctx.fillRect(0, y_co, squareWidth, squareWidth);
        } else {ctx.fillRect(x_co_r, y_co, squareWidth, squareWidth);}

    } else if(type=="dots"){ //dots
        var left_dots = 0;
        var right_dots = 0;
        if(target == "left"){ left_dots = nDots_stim
        } else { right_dots = nDots_stim }
        drawDots(ctx, squareWidth, 0, y_co, nDots_dots=left_dots);
        drawDots(ctx, squareWidth, x_co_r, y_co, nDots_dots=right_dots)
    }
}
Qualtrics.SurveyEngine.addOnload(function(){
    var qthis = this;
    qthis.hideNextButton();
    
    var jslib_url = "https://max-lovell.github.io/jspsych-6.3.1/"
    var requiredResources = [
        jslib_url + "jspsych.js",
        jslib_url + "plugins/jspsych-html-keyboard-response.js",
        jslib_url + "plugins/jspsych-html-slider-response.js",
        jslib_url + "plugins/jspsych-canvas-keyboard-response.js",
        jslib_url + "plugins/jspsych-fullscreen.js",
        jslib_url + "plugins/jspsych-instructions.js",
        jslib_url + "plugins/jspsych-resize.js"
    ];
    
    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');

    sbj_id = "${e://Field/Random_ID}";

    function save_data_json(dataset, data_length){
        jQuery.ajax({
            method: 'POST',
            cache: false,
            url: "PHP_URL.php",
            data: {
                file_name: "dots_" + sbj_id + data_length + ".json",
                exp_data: dataset
            }
            //success : function(data) {window.alert("Success: "+data);},
            //error : function(request,error){window.alert("Request: "+JSON.stringify(request));}
        });
    }

    function save_data_csv(dataset, data_length){
        jQuery.ajax({
            method: 'POST',
            cache: false,
            url: "PHP_URL.php",
            data: {
                file_name: "dots_" + sbj_id + data_length + ".csv",
                exp_data: dataset
            }
        });
    }

    function initExp() {
        var timeline = [];
        var resp_keys = ['e','i'];

        var ppcm = Math.round(Math.sqrt(Math.pow(1920,2)+Math.pow(1080,2))/35.56) //i.e. 1cm of pixels on my FHD(1920*1080) 14"(35.56cm) screen 
        var stim_canv = [Math.round(9*ppcm), Math.round(14*ppcm)];

        var nDots = 4.25;
        var block_num = 1;
        var num_block = 4;

        var trial_num = 1;
        var num_prac = 26; //26 if testing, note trials 6 and 11 are used by staircase changes
        var num_trial = 168; //168 if testing, must be multiple of 5 as 5 blocks are used
        var num_total = num_prac+num_trial; 


        //WELCOME SCREEN/////
        var resize = {
            type: 'resize',
            item_width: 8.56, //size of credit card in cm
            item_height: 5.398,
            starting_size: ppcm*5.398, //close enough if anyone just skips it
            prompt: `<p>We require the stimuli in this experiment to all be the same size, regardless of the devices they are viewed on.<br>
                    In order to achieve this, we need the measurements of something that is always the same, so we'll use a credit card.<br>
                    Click and drag the lower right corner of the box until the box is <u><i>exactly</i></u> the same size as a credit/debit card held up to the screen.</p>`,
            pixels_per_unit: ppcm
        };

        var intro = {
            type: 'html-keyboard-response',
            stimulus: `<p style="font-size:25px;">Welcome to the task!<br><br>
            We will now ask you to judge which of two images contains more dots, before asking you to rate your confidence in your judgement.<br>
            At the beginning of each trial, you will be presented with a black cross in the middle of the screen. Focus your attention on it. Then, two black boxes with a number of white dots will be flashed and you will be asked to judge which box had a higher number of dots.<br><br>
            If the box on the <strong>left</strong> had more dots, <strong>press ` + resp_keys[0] + ` </strong>.<br> If the box on the <strong>right</strong> had more dots, <strong>press ` + resp_keys[1] + ` </strong>.<br><br>
            Please respond quickly and to the best of your ability.<br>
            You will then rate your confidence in your judgement on a scale with the mouse.<br>
            Please do your best to rate your confidence accurately and do take advantage of the whole rating scale.
            <br><br>Press spacebar to continue.</p>`,
            choices: [' ']
        };

        var prac_intro = {
            type: 'html-keyboard-response',
            stimulus: `<p style="font-size:25px;">We will now ask you to carry out some practice trials. Please respond only when the dots have disappeared.<br><br>
            In this practice phase we will tell you whether your judgements are right or wrong.<br><br>
            If you are <strong>correct</strong>, the box that you selected will be outlined in <font color="green"><strong>green</strong></font>.<br>
            If you are <strong>incorrect</strong>, the box that you selected will be outlined in <font color="red"><strong>red</strong></font>.<br><br>
            You will not need to rate your confidence of your judgements on these trials.
            <br><br>Press spacebar to continue.</p>`,
            choices: [' ']
        };

        //END PRACTICE, INTRODUCE EXPERIMENT/////
        var conf_intro = {
            type: 'html-keyboard-response',
            stimulus: `<p style="font-size:25px;">In the task proper, you will not be provided accuracy feedback on your judgements, but the box you selected will be outlined in <font color="blue"><strong>blue</strong></font>.<br><br>
            You will be asked to rate your confidence in your judgement on a rating scale after each trial, which will be explained next.
            <br><br>Press spacebar to continue.</p>`,
            choices: [' ']
        };

        var conf_prac = {
            type: 'html-slider-response',
            stimulus:`A rating scale as shown below is used throughout the task.<br>You will be able to rate your confidence of your judgements by choosing any point along the rating scale with your mouse.<br><br>`,
            prompt: `Choose any point on the rating scale and click Submit to continue.<br><br>`,
            min: 1, max: 6, slider_start: 1, slider_width: 800,
            labels: ['1<br>Guessing','2','3','4','5','6<br>Certainly correct'],
            button_label: 'Submit',
        };

        var exp_intro = {
            type: 'html-keyboard-response',
            stimulus: `<p style="font-size:25px;">You will now continue directly to the experiment. The dots will presented only for a short period of time. 
            You will be asked to rate your confidence in your judgement after each trial.<br><br>
            The task proper is divided into 4 blocks of 42 trials each, where you 
            can pause for a break before every block. There are no time limits on your responses to the dots and on your confidence ratings. <br><br>
            As a reminder: If the box on the left had more dots, <strong>press  ` + resp_keys[0] + 
            `</strong>. If the box on the right had more dots, <strong>press  ` + resp_keys[1] + `</strong>.<br><br>
            <br><br>Press spacebar to continue.</p>`,
            choices: [' ']
        };



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



        //CREATE TRIALS/////
        var fixation = {
            type: 'html-keyboard-response',
            stimulus: '<div style="font-size:60px;">+</div>',
            choices: jsPsych.NO_KEYS,
            trial_duration: 1000
        };

        var dots = {
            type: 'canvas-keyboard-response',
            canvas_size: stim_canv,
            choices: jsPsych.NO_KEYS, //no response allowed
            trial_duration: 150,
            stimulus: function(c){
                //https://github.com/jspsych/jsPsych/issues/1536
                if (trial_num > 2){ // if statement stops error being thrown with .correct property
                    var two_trial_ago = jsPsych.data.get().filter({task: 'choice'}).last(2).values()[0].correct
                };
                if (trial_num > 1){
                    var one_trial_ago = jsPsych.data.get().filter({task: 'choice'}).last(1).values()[0].correct
                };
                nDots = staircase(nDots, one_trial_ago, two_trial_ago, trial_num);
                var target = jsPsych.timelineVariable('stimulus');
                //if(Math.random() < 0.5){ target = "left"} else { target = "right"}
                drawStim(c,"dots",target, nDots_stim = Math.round(Math.exp(nDots)));
            },
            prompt: `<p style="font-size:20px;"><strong>Press  `+resp_keys[0]+` </strong> if the box on the left had more dots.<br><strong>Press  `+resp_keys[1]+` </strong> if the box on the right had more dots.</p>`,
            data: {task: 'dots'},
            on_finish: function(data) {data.number_dots = nDots} //run in on_finish as functions are called before trial otherwise
        }

        var dots_rep = {
            type: 'canvas-keyboard-response',
            canvas_size: stim_canv,
            choices: jsPsych.NO_KEYS,
            trial_duration: 150,
            stimulus: function(c){
                var target = jsPsych.timelineVariable('stimulus');
                let nDots_trial = Math.round(Math.exp(nDots))
                drawStim(c,"dots", target, nDots_stim = nDots_trial);
            },
            prompt: `<p style="font-size:20px;"><strong>Press  `+resp_keys[0]+` </strong> if the box on the left had more dots.<br><strong>Press  `+resp_keys[1]+` </strong> if the box on the right had more dots.</p>`
        };

        var choice = {
            type: 'canvas-keyboard-response',
            canvas_size: stim_canv,
            choices: resp_keys,
            stimulus: function (c){
                drawStim(c)
            },
            prompt: `<p style="font-size:20px;"><strong>Press  `+resp_keys[0]+` </strong> if the box on the left had more dots.<br><strong>Press  `+resp_keys[1]+` </strong> if the box on the right had more dots.</p>`,
            data: {
                task: 'choice',
                target_side: jsPsych.timelineVariable('stimulus'),
                correct_response: jsPsych.timelineVariable('correct_response')
            },
            on_finish: function(data){
                data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
                data.trial_number = trial_num;
                data.n_dots = nDots;
                //note: if statements can't be used in data:{}
                if(trial_num <= num_prac){ data.trial_type = 'practice'
                } else { data.trial_type = 'experimental'}
            }
        }

        var feedback = {
            type: 'canvas-keyboard-response',
            canvas_size: stim_canv,
            choices: jsPsych.NO_KEYS,
            trial_duration: 500,
            stimulus: function (c){
                let target = jsPsych.data.get().last(1).values()[0].response
                let correct = jsPsych.data.get().last(1).values()[0].correct
                drawStim(c,"feedback",target,0,correct)
            },
            prompt: `<p style="font-size:20px;"><strong>Press  `+resp_keys[0]+` </strong> if the box on the left had more dots.<br><strong>Press  `+resp_keys[1]+` </strong> if the box on the right had more dots.</p>`,
            on_finish: function(){trial_num++}
        }

        var confidence = {
            type: 'html-slider-response',
            stimulus:'Rate your confidence',
            min: 1, max: 6, slider_start: 1, slider_width: 800,
            labels: ['1<br>Guessing','2','3','4','5','6<br>Certainly correct'],
            prompt:'Please select a value to continue.<br>',
            button_label: 'Submit',
            require_movement: true,
            data: {task: 'confid'},
            on_finish: function() {
                var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
                jsPsych.setProgressBar(curr_progress_bar_value + (1/num_trial));
            }
        };

        var trial_break = {
            type: 'html-keyboard-response',
            stimulus: function(){ //must be a function to return the updated block_num
                 return `<p style="font-size:25px;">You can now pause for a break. You have completed `+block_num+
                 ` out of `+num_block+` blocks.<br>
                 If you leave full-screen, please return your browser to full-screen mode (F11) so the task can run properly.<br><br>
                 As a reminder:<br>If the box on the left had more dots, <strong>press  `+resp_keys[0]+
                 `</strong>.<br> If the box on the right had more dots, <strong>press  `+resp_keys[1]+`</strong>.
                 <br><br>Press spacebar to continue the task</p>`},
            choices: [' '],
            on_finish: function(){block_num++}
        };



        //TOGGLE PRACTICE TRIAL DIFFERENCES AND BREAKS/////
        var end_prac = {
            timeline: [conf_intro,conf_prac,exp_intro],
            conditional_function: function(){
                if(trial_num == num_prac+1) { return true
                } else { return false }
            }
        };

        var conf_toggle = {
            timeline: [confidence],
            conditional_function: function(){
                if(trial_num > num_prac+1){ return true
                } else { return false }
            }
        };

        var block = {
            timeline: [trial_break],
            conditional_function: function(){
                if(((trial_num-1)-num_prac)%(num_trial/num_block) == 0 && trial_num > (num_prac+1) && trial_num < num_total) {
                    return true
                } else {
                    return false}
            }
        };



        //CREATE TIMELINE
        var trial_procedure = {
            timeline: [end_prac, block, fixation, dots,dots_rep,dots_rep,dots_rep,dots_rep, choice, feedback, conf_toggle],
            timeline_variables: [{stimulus: 'left', correct_response: resp_keys[0]},
                                 {stimulus: 'right', correct_response: resp_keys[1]}],
            repetitions: num_total/2,
            randomize_order: true,
            type: 'with-replacement'
        };

        timeline.push({type: 'fullscreen', fullscreen_mode: true}, resize, intro, prac_intro, trial_procedure);

        jsPsych.init({
            timeline: timeline,
            show_progress_bar: true,
            auto_update_progress_bar: false,
            message_progress_bar: '% trials completed: ',
            display_element: 'display_stage',
            on_finish: function() {
                jsPsych.data.get().addToLast({participant: sbj_id});
                save_data_json(jsPsych.data.get().json(),"_full");
                save_data_csv(jsPsych.data.get().csv(),"_full");

                var relevant_data = jsPsych.data.get().filter([{task:'choice'},{task:'confid'}]);
                //only need rt, response from confid and
                    //from choice: trial_index, trial_number, task, trial_type, rt, target_side, correct_response, correct, response, number_dots
                relevant_data.addToLast({participant: sbj_id});
                save_data_csv(relevant_data.csv(),"_short");
                save_data_json(relevant_data.json(),"_short");
                
                save_data_csv(jsPsych.data.get().csv(),"_full")
                save_data_json(jsPsych.data.get().json(),"_full");

                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();
                qthis.clickNextButton();
                qthis.showNextButton();
                jQuery("#NextButton").click();
            }
        });
    }

});

Qualtrics.SurveyEngine.addOnReady(function(){});
Qualtrics.SurveyEngine.addOnUnload(function(){});
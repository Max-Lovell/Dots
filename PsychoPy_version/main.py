from psychopy import visual
from psychopy import event
from psychopy import data
from psychopy import core
from psychopy import tools
from stimuli import Stimuli, Fixation, Confidence, Feedback
from text import Text
import math
import random
event.globalKeys.add(key='q', func=core.quit)

#intervention length
num_prac = 2 #26 ; if testing, note trials 6 and 11 are used by staircase changes
num_trial =  15 #210 ; if testing, must be multiple of 5
num_total = num_prac+num_trial

#screen
WIDTH = 800
HEIGHT = 600
win = visual.Window([WIDTH,HEIGHT],color="white",winType='pyglet',fullscr=False,screen=0, monitor='testMonitor')
instructions = Text(win)
conf_scale = Confidence(win)

#timing
fix_time = 1
stim_time = fix_time + .3
feedback_time = .5
choice_time = .5
inter_trial_interval = .05
trial_timer = core.Clock()

staircase = data.StairHandler(startVal=4.25, #in log space this is 70 dots, NOTE original code a step is reduced on the first trial so is init at 4.65
    stepType='lin', stepSizes = [0.4]*2, #*2 is a hacky fix - you can only change stepSizes later if initialised with a list of 2 or more. 
    #see post here: https://discourse.psychopy.org/t/stairhandler-step-size-change-based-on-trial-number-dynamic-step-sizes/23565
    minVal=1, maxVal = 4.25, nUp=1, nDown=2, nTrials=num_total) #26 practice + 210 trials = 236 trials total.

#trial counter
trial_num = 0 
block_num = 0

#random side piars
stim_side = ['left','right'] * round(num_total+2/2) #just more than enough trials here considering there is a left/right pair
random.shuffle(stim_side)

#note: all carried out in single loop rather than using experimentHandler()
    #as the staircase values need to carry through every trial
for nDots in staircase: 
    #stim creation
    #randomise stim sides and initialise stim class
    s1 = Stimuli(stim_side[trial_num],round(math.exp(nDots))) 
    if stim_side[trial_num] == 'left':
        s2_side = 'right'
        correctResponse = 'z'
    elif stim_side[trial_num] == 'right':
        s2_side = 'left'
        correctResponse = 'x'
    s2 = Stimuli(s2_side,0)
    trial_num += 1 #so 1 and not 0 is the first trial
    #create stim
    stim1 = s1.stim_boxes(win)
    stim2 = s2.stim_boxes(win)
    s1_dots = s1.dots_stim(win)
    s2_dots = s2.dots_stim(win)

    #text---------------------------
    if trial_num == 1:
        wel = instructions.create_text('welcome') #Welcome page
        wel.height = .06
        wel.wrapWidth = 1.5
        wel.draw()
        win.flip()
        event.waitKeys(keyList = ['space'])
        prac = instructions.create_text('practice') #Practice Intro
        prac.height = .06
        prac.wrapWidth = 1.5
        prac.draw()
        win.flip()
        event.waitKeys(keyList = ['space'])
    #change staircase change based on trial num 
        #NOTE: changes only take effect after a change in direction - this is how stairHandler works. alt solution is using ._intensityDec()/._intensityInc() here to change direction on a specific trial
    elif trial_num == 6:
        staircase.stepSizes = [.2]
    elif trial_num == 11:
        staircase.stepSizes = [.1]
    elif trial_num == num_prac+1: #first non-practice trial
        end_prac = instructions.create_text('no_feedback') #states there is no feedback in actual task
        end_prac.draw()
        win.flip()
        event.waitKeys(keyList = ['space'])
        #introduce confidence
        conf_intro = instructions.create_text('conf_intro')
        conf_intro.pos = (0,.5)
        conf_intro.height = .06
        conf_intro.wrapWidth = 1.5
        conf_scale_prac = conf_scale.scale()
        while conf_scale_prac.noResponse:
            conf_intro.draw()
            conf_scale_prac.draw()
            win.flip()
        #introduce main experiment
        exp_cont = instructions.create_text('exp_cont')
        exp_cont.draw()
        win.flip()
        event.waitKeys(keyList = ['space'])
        exp_intro = instructions.create_text('exp_intro')
        exp_intro.draw()
        win.flip()
        event.waitKeys(keyList = ['space'])
    if trial_num > num_prac+1 and trial_num < num_total and not ((trial_num-1)-num_prac)%(num_trial/5): #Splits task into 5 blocks (every 42 trials for 210 trials total), missing the first and last ones
        block_num += 1
        break_text = instructions.create_text('break_text', block_num=block_num)
        break_text.draw()
        win.flip()
        event.waitKeys(keyList = ['space'])

#timer creation
    current_time = 0
    trial_still_running = True
    trial_timer.reset()

#task
    while trial_still_running:
        current_time = trial_timer.getTime()
        #fixation cross
        if current_time <= fix_time:
            Fixation(win)
            win.flip()
        #draw stim
        elif current_time >= fix_time and current_time <= stim_time:
            stim1.draw()
            stim2.draw()
            s1_dots.draw()
            s2_dots.draw()
            win.flip()
        #clear stim
        elif current_time >= stim_time:
            stim1.draw()
            stim2.draw()
            trial_count = instructions.create_text(trial_num)
            trial_count.draw()
            win.flip()
            stim1.draw()
            stim2.draw()
            #get responses and provide feedback
            responded = event.waitKeys(clearEvents = True, keyList = ['z','x'])
            if responded and responded[0]:
                accuracy = None
                if responded[0] == correctResponse: #if correct
                    staircase.addResponse(1)
                    if trial_num <= num_prac: #if practice
                        accuracy = 'correct'
                else: #if incorrect
                    staircase.addResponse(0)
                    if trial_num <= num_prac:
                        accuracy = 'incorrect'
                if responded[0] == 'z':
                    side = 'left'
                else:
                    side = 'right'
                Feedback(win,side,correct=accuracy)
                win.flip()
                core.wait(feedback_time)
                #confidence rating
                if trial_num > num_prac:
                    conf_rating = instructions.create_text('confidence')
                    conf_rating.pos = (0,.5)
                    conf_rating.height = .06
                    conf_rating.wrapWidth = 1.5
                    conf_scale_exp  = conf_scale.scale()
                    while conf_scale_exp.noResponse:
                        conf_rating.draw()
                        conf_scale_exp.draw()
                        win.flip()
                    rating = conf_scale_exp.getRating()
                    staircase.addOtherData('confidence', rating)
                else: 
                    staircase.addOtherData('confidence', 'practice')
            #next trial
            trial_still_running = False

instructions.create_text('Fin.').draw()
win.flip()

staircase.saveAsExcel('p_dat.csv', sheetName='data', fileCollisionMethod='rename')
event.waitKeys(keyList = ['q'])
win.close()

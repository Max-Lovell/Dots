# metacog
Javascript code for running an online metacognition task and integrating this with qualtrics and a web server, based on the original code by Marion Rouault here: https://github.com/metacoglab/metacognition-task-online. This task essentially shows two boxes of dots to participants and asks them to state which box has the higher number of dots - along with confidence judgements in order to calculate metacognitive efficiency.

Set up for testing, the code runs 2 practice trials and 10 experimental trials, this can be changed by updating the num_prac and num_trial variables at the beggining.

1. metacog_main.html will run on your local machine although won't save any data.
2. I've also uploaded a qualtrics and qualtrics html file for integration with a qualtrics survey, inline with the guide I have written here: https://users.sussex.ac.uk/mel29/online_experiments.html, largely in line with the original guide here: https://kywch.github.io/jsPsych-in-Qualtrics/ - if you'd like to get this to work, you'll need to set up your own webspace and php file as directed in those guides.
3. the python files are psyschoPy prototpye I started with - not quite st up right, but it works!
4. metacog_save is a prototype for saving to one's local machine based on the tutorial at https://kywch.github.io/jsPsych-in-Qualtrics/, although might not work for now!


For any questions, message me at m.lovell@sussex.ac.uk

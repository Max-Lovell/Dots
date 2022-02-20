# Dots task
JavaScript code for running an online metacognition task and integrating this with qualtrics and a web server, based on the original code by Marion Rouault here: https://github.com/metacoglab/metacognition-task-online. This task essentially shows two boxes of flickering patterns of dots to participants and asks them to state which box has the higher number of dots - along with confidence judgements in order to calculate metacognitive efficiency.

Several versions exist:
- Browser: Written in jsPsych 7.1, can be run from your local computer or uploaded to a server space
- Qualtrics: Written in jsPysch 6.3, for integration with a Qualtrics survey in line with the tutorial here: https://kywch.github.io/jsPsych-in-Qualtrics/
- Qualtrics iFrame: Pipe the 'browser' version into qualtrics with the attached code.
- DIY: This was an attempt at a vanilla JavaScript approach I hope to get round to finishing some day
- PsychoPy: Also unfinished - my first attempt as I was learning to code

Other Files
- Automated Emailer: This was done to get around Qualtric's restrictions on emails. It relies on a WebService task fired at the end of each survey which sends a URL with query strings embedded with information on the participant and survey, etc. The emailer.py then extracts the information and sends the correct survey (stored in emails.py) to that person if they have missed a survey day.
- Various PHP files which are placed in a public_html server space which check the recieved file and send it on to a private server space (which should contain the .htaccess file). Used for WebService data and recieving data from the Dots task itself.
- Windows Task Scheduler: After Qualtric's response export automation feature sends data to a server space each morning, the .bat file contains BASH code that will automatically to download that data to your local machine (ideally at a slightly later time). The XML file contains code to set up another scheduled task to run when the files are downloaded - i.e. sending emails to those who have missed a survey.

note all file paths have been removed from the code.
The code in this repository is free to use as you like.

For any questions, message me at m.lovell [at] sussex [dot] ac [dot] uk

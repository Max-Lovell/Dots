# Dots task

JavaScript code for running an online metacognition task and integrating this with qualtrics and a web server, based on the original code by Marion Rouault here: https://github.com/metacoglab/metacognition-task-online. This task essentially shows two boxes of flickering patterns of dots to participants and asks them to state which box has the higher number of dots - along with confidence judgements in order to calculate metacognitive efficiency. Integrated with Qualtrics with the help of https://kywch.github.io/jsPsych-in-Qualtrics/. When I get the time the full method for implementation I used will be found here: https://users.sussex.ac.uk/mel29/online_experiments/homepage.html

Associated with the following study:
- title: 'Minimal mindfulness of the world as an active control for a full mindfulness of mental states intervention: A Registered Report and Pilot study'
- Reference: Lovell, M., & Dienes, Z. (2022). Minimal mindfulness of the world as an active control for a full mindfulness of mental states intervention: A Registered Report and Pilot study, in principle acceptance of version 4 by Peer Community in Registered Reports. https://osf.io/tx54k
- Pre-print: https://psyarxiv.com/3umz7
- PCI RR Recommendation: https://rr.peercommunityin.org/articles/rec?id=45
- Data and analysis code: https://github.com/Max-Lovell/Mindfulness-of-Mental-States

Different versions in the respository:
- Browser: Written in jsPsych 7.1, can be run from your local computer or uploaded to a server space
- Qualtrics: Written in jsPysch 6.3, for integration with a Qualtrics survey
- Qualtrics iFrame: Pipe the 'browser' version into qualtrics with the attached code.
- DIY: This was an attempt at a vanilla JavaScript approach I hope to get round to finishing some day
- PsychoPy: Also unfinished - my first attempt as I was learning to code

Other Files:
- Automated Emailer: This was done to get around Qualtric's restrictions on emails. It relies on a WebService task fired at the end of each survey which sends a URL with query strings embedded with information on the participant and survey, etc. The emailer.py then extracts the information and sends the correct survey (stored in emails.py) to that person if they have missed a survey day.
- Various PHP files which are placed in a public_html server space which check the recieved file and send it on to a private server space (which should contain the .htaccess file). Used for WebService data and recieving data from the Dots task itself.
- Windows Task Scheduler: Qualtric's response export automation feature sends data to a server space each morning, and along with the webservice files, the .bat file contains BASH code that will automatically download that data to your local machine (ideally at a slightly later time). The XML file contains code to set up another scheduled task to run when the files are downloaded - i.e. sending emails to those who have missed a survey.

Try out the program: 
- Browser version: https://users.sussex.ac.uk/mel29/experiments/metacog_dots/dots_browser_test.html
- Qualtrics version: https://universityofsussex.eu.qualtrics.com/jfe/form/SV_aWTaRbGNGwf16lg
- iFrame version: https://universityofsussex.eu.qualtrics.com/jfe/form/SV_3I8ucrkhlP52GIC
- Qualtrics version with jsPsych v7 - if anyone can figure out why this isn't registering key presses, I'd love to know!: https://universityofsussex.eu.qualtrics.com/jfe/form/SV_3UXeLyDrOMusNi6

Note all file paths have been removed from the code.
The code in this repository is free to use as you like.

For any questions or suggestions feel free to message me at m.lovell [at] sussex [dot] ac [dot] uk

# Dots task

NOTE: Code updates coming soon.



JavaScript code for running an online metacognition task. This task shows two boxes with an array of dots for 150 ms each, 5 times, and so they appear to 'flicker'. User inputs can be keyboard, mouse, or touchscreen. The 'old' folder has versions in JSPsych 6 and 7, code for integration with Qualtrics, and PsychoPy. When I get the time the full method for implementation I used will be found here: https://users.sussex.ac.uk/mel29/online_experiments/homepage.html

Note this code won't work out of the box yet, as the code was intentded to work within a larger study, but should be easily adaptable. It's also designed to work with a query string for how many pixels per cm there are on the users screen, with my implementation of the JSPsych 'resize' function - 42 is a good enough estimate for a laptop, though. Also, all file paths have been removed from the code for security reasons and are indicated by square brackets.

try it out here: https://users.sussex.ac.uk/mel29/dots/dots.html?px_cm=42

Associated with the following study:
- title: 'Minimal mindfulness of the world as an active control for a full mindfulness of mental states intervention: A Registered Report and Pilot study'
- Reference: Lovell, M., & Dienes, Z. (2022). Minimal mindfulness of the world as an active control for a full mindfulness of mental states intervention: A Registered Report and Pilot study, in principle acceptance of version 4 by Peer Community in Registered Reports. https://osf.io/tx54k
- Pre-print: https://psyarxiv.com/3umz7
- PCI RR Recommendation: https://rr.peercommunityin.org/articles/rec?id=45
- OSF Supplementary Materials: https://osf.io/vu2dk/
- Data and analysis code: https://github.com/Max-Lovell/Mindfulness-of-Mental-States

The code in this repository is free to use as you like.

For any questions or suggestions feel free to message me at m [dot] lovell [at] sussex [dot] ac [dot] uk

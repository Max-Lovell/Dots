from psychopy import visual
from psychopy import event

class Text:
    def __init__(self, win):
        self.win = win

    def create_text(self,text,block_num=0):
        screen_text = visual.TextStim(self.win,text=None, alignText='center', color = 'black')
        
        if text == 'welcome':
            text = ('Welcome to the task!\n\n'
            'We will now ask you to judge which of two images contains' 
            'more dots, before asking you to rate your confidence in your judgement.\n\n'
            'At the beginning of each trial, you will be presented with a black ' 
            'cross in the middle of the screen. Focus your attention on it. Then, '
            'two black boxes with a number of white dots will be flashed and you '
            'will be asked to judge which box had a higher number of dots.\n\n'
            'If the box on the left had more dots, press Z.\n'
            'If the box on the right had more dots, press X.\n\n'
            'Please respond quickly and to the best of your ability.\n\n'
            'You will then rate your confidence in your judgement on a scale with the mouse.\n\n'
            'Please do your best to rate your confidence accurately and do take advantage of the '
            'whole rating scale.\n\nPress spacebar to continue.')

        elif text == 'practice':
            text = ('We will now ask you to carry out some practice trials. Please respond only when '
            'the dots have disappeared.\n\nIn this practice phase we will tell you whether your judgements '
            'are right or wrong.\n\nIf you are correct, the box that you selected will be '
            'outlined in green.\nIf you are incorrect, '
            'the box that you selected will be outlined in red.\n\n'
            'You will not need to rate your confidence of your judgements on these trials.\n\n'
            'Press spacebar to continue.\n\n')

        elif text == 'no_feedback':
            text = ('In the task proper, you will not be provided accuracy '
                        'feedback on your judgements, but the box you selected will '
                        'be outlined in blue. You will be asked to rate your confidence '
                        'in your judgement on a rating scale after each trial, which will '
                        'be explained next. \n\nPress spacebar to continue.')
        elif text == 'conf_intro':
            text = ('A rating scale as shown below is used throughout the task. You will be able to rate '
                        'your confidence of your judgements by choosing any point along the rating scale with '
                        'your mouse.\n\nChoose any point on the rating scale and press ''Enter'' to continue.')
        #elif text == 'conf_prac':
        #    text = ('During the task, if you are very sure that you made the correct judgement, where on the scale would you choose?')
        #elif text == 'conf_prac_b':
        #    text = ('If you are very unsure that you made the correct judgement, where on the scale would you choose?')
        #elif text == 'conf_prac_ans':
        #   text = ('If you are very sure that you made the correct judgement, you should have responded Certain.\n\n'
        #                'If you are very unsure you made the correct judgement, you should have responded Guessing.\n\n'
        #                'Press spacebar to continue.')
        #elif text == 'conf_prac3':
        #    text = ('If you are somewhat sure about being correct, you should select a rating between the two descriptions.\n\n'
        #                'If you understand how to use and take advantage of the whole rating scale, choose any point on the rating '
        #                'scale and click ‘Submit’ to continue.')

        elif text == 'exp_cont':
            text = ('You will now continue directly to the experiment. The dots will presented only for a short period of time.\n\n'
            'You will be asked to rate your confidence in your judgement after each trial.\n\n'
            'Press spacebar to continue.')

        elif text == 'exp_intro':
            text = ('The task proper is divided into 5 blocks of 42 trials, where you '
                        'can pause for a break before every block. There are no time limits '
                        'on your responses to the dots and on your confidence ratings. \n\nAs a '
                        'reminder: If the box on the left had more dots, press Z. If the box on '
                        'the right had more dots, press X. \n\nPress spacebar to begin!')

        elif text == 'response':
            text = ('Press Z if the box on the left had more dots. Press X if the box on the right had more dots.')

        elif text == 'confidence':
            text = ('Rate your confidence:')

        elif text == 'break_text':
            text = ('You can now pause for a break. You have completed ' + str(block_num) + ' out of ' 
                            '5 blocks. \n\nAs a reminder: If the box on the left had more dots, press Z. '
                            'If the box on the right had more dots, press X.' 
                            '\n\nPress spacebar to continue the task.')

        screen_text.setText(text)
        return(screen_text)

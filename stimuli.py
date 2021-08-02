from psychopy import visual
import random

class Fixation:
    def __init__(self, win):
        self.fix_v = visual.Line(win, start=(-10,0),end=(10,0), units='pix', lineWidth=5, lineColor='black')
        self.fix_h = visual.Line(win, start=(0,-10),end=(0,10), units='pix', lineWidth=5, lineColor='black')
        self.fix_h.draw()
        self.fix_v.draw()

class Stimuli:
    def __init__(self, side, nDots):
        self.side = side
        self.nDots = nDots
        self.size = 250
        self.WIDTH = 800
        self.pos = [(self.WIDTH/4),0]
        if self.side == 'left':
            self.pos[0] = self.pos[0]*-1

    def stim_boxes(self, win):
        stim_sq = visual.rect.Rect(win, units="pix", size=self.size, pos = self.pos,
        fillColor='black', lineColor='black')
        return(stim_sq)

    def dots_stim(self, win):
        dot_size = 10
        dot_offset = (self.size/2)-(dot_size/2)
        dot_index = list(range(625))
        random.shuffle(dot_index)
        dot_matrix = []
        dot_num = 0
        for dots in range(len(dot_index)):
            if dot_index[dot_num] < (312 + self.nDots):
                dot_matrix.append(1)
            else:
                dot_matrix.append(0)
            dot_num += 1
        dots_xy = []
        mat_no = 0
        bound_x = range(int(self.pos[0]-dot_offset),int(self.pos[0]+dot_offset+dot_size),dot_size)
        bound_y = range(int(dot_offset*-1),int(dot_offset+dot_size),dot_size)
        for x in bound_x:
            for y in bound_y:
                if dot_matrix[mat_no] == 1:
                    dots_xy.append([x,y])
                    mat_no += 1
                else:
                    mat_no += 1
        dots_stim = visual.ElementArrayStim(win,units="pix",nElements=len(dots_xy), elementTex=None,
            elementMask="circle",xys=dots_xy,sizes=10) #https://www.djmannion.net/psych_programming/vision/draw_dots/draw_dots.html
        return(dots_stim)

class Feedback:
    def __init__(self, win, side, correct = None):
        self.win = win
        self.side = side
        self.correct = correct
        self.size = 250
        self.WIDTH = 800
        self.pos = [(self.WIDTH/4),0]
        if self.side == 'left':
            self.pos[0] = self.pos[0]*-1
        if correct == None: #If correctness of trial not provided
            COLOUR = [0,0,255] #blue
        elif correct == 'correct': #If they were correct
            COLOUR = [0,255,0] #green
        elif correct == 'incorrect': #If they were incorrect
            COLOUR = [255,0,0] #red
        feed_sq = visual.rect.Rect(win, units="pix", size=self.size, pos = self.pos,
            fillColor=COLOUR, lineColor=COLOUR, colorSpace='rgb255')
        feed_sq.draw()

class Confidence:
    def __init__(self, win):
            self.win = win

    def scale(self):
            ratingScale = visual.RatingScale(self.win, scale=None,  showValue=False, skipKeys=None, showAccept=False,
                markerStart = 5, pos = (0,0), size = 1.5, stretch = 1.5, textSize = .4, lineColor = 'black', textColor = 'black', 
                choices = ['1\ncertainly wrong','2\n','3\nprobably wrong','4\n','5\nmaybe wrong',
                '6\n','7\nmaybe correct','8\n','9\nprobably correct','10\n','11\ncertainly correct'])
            return(ratingScale)









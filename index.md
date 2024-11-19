This is the webpage for the Honours/MSc course Online Experiments for Language Scientists, running in academic year 2024/2025. I will add links to materials (readings, code) to this page; you will need to use Learn for electronic submission of your assessed work, and to keep an eye on announcements.

**For non-Edinburgh people**: all the course materials are here and you are welcome to use them with attribution. If you would like us to run something like this for your students or research group, [contact Kenny](mailto:kenny.smith@ed.ac.uk).

## Course summary

Many areas in the language sciences rely on collecting data from human participants, from grammaticality judgments to behavioural responses (key presses, mouse clicks, spoken responses). While data collection traditionally takes place face-to-face, recent years have seen an explosion in the use of online data collection: participants take part remotely, providing responses through a survey tool or custom experimental software running in their web browser, with surveys or experiments often being advertised on crowdsourcing websites like Prolific and Amazon Mechanical Turk (MTurk). Online methods potentially allow rapid and low-effort collection of large samples; however, building and running these experiments poses challenges that differ from lab-based methods.

This course will provide a rapid tour of online experimental methods in the language sciences, covering a range of paradigms, from survey-like responses (e.g. as required for grammaticality judgments) through more standard psycholinguistic methods (button presses, mouse clicks) up to more ambitious and challenging techniques (e.g. voice recording, iterated learning, real-time interaction through text and/or streaming audio). Each week we will read a paper detailing a study using online methods, and look at code (written in javascript using jsPsych) to implement a similar experiment - the examples will skew towards the topics I am interested in (artificial language learning, communication, language evolution), but we'll cover more standard paradigms too (grammaticality judgments, self-paced reading) and the techniques are fairly general anyway. We'll also look at the main platforms for reaching paid participants, Prolific and MTurk, and discuss some of the challenges around data quality and the ethics of running on those platforms.

No prior experience in coding is assumed, but you have to be prepared to dive in and try things out; the assessment will involve elements of both literature review and coding.

## The teaching team

The course is co-taught by [Kenny Smith](http://www.lel.ed.ac.uk/~kenny/) and [Alisdair Tullo](https://www.ed.ac.uk/profile/alisdair-tullo/). Kenny (that's me) is the main lecturer and the course organiser; Alisdair is the PPLS javascript/jsPsych guru and delivers the lab sessions with Kenny. Best way to get in touch with us is in one of the live sessions, see below, or by email to [kenny.smith@ed.ac.uk](mailto:kenny.smith@ed.ac.uk) or [alisdair.tullo@ed.ac.uk](mailto:alisdair.tullo@ed.ac.uk).

We'll also be supported in lab classes by [Maisy Hallam](https://maisyhallam.github.io) and [Yajun Liu](https://yliu820.github.io/liuyajun/), who are doing their PhDs with me and use jsPsych to build online experiments for their own research.  

## Class times

Lectures take place on Monday mornings, 9am-9.50am, in room S1, on the second floor of [7 George Square](https://www.ed.ac.uk/maps/maps?building=0209). Labs are on Wednesday mornings, 9am-10.50am, in room M2 [Appleton Tower](https://www.ed.ac.uk/maps/maps?building=0201); this is an open-plan Teaching Studio on the mezzanine level. 

There will also be extra drop-in labs available in the run-up to the final assignment, see below.

Lectures and labs are both essential to doing well on the course - the assessment involves an understanding both of the literature on online experiments (covered in the readings and lectures) and the practicalities of how to build them (covered in your own work on the practicals, with support available in the labs). **Attendance will be taken in labs.**


## Assessment

There are different assessments for undergraduates and postgraduates. 

### Undergraduate assessment 

The undergraduate version of the course is worth 20 credits and there are two pieces of assessment, due on 7th November and 5th December. Assessment 1 is an annotated bibliography reviewing and evaluating 4 articles typically drawn from the course set readings. Assessment 2 is a project where you produce a working experiment implemented in jsPsych and an accompanying report explaining the motivation behind that experiment, justifying important design decisions you took in building the experiment, and appraising the experiment and ways it could be improved/extended. Full details are provided in the [undergraduate assignment brief](assessment/UGAssignmentBrief2024.pdf) and [the FAQ](assessment/oels_assignment_faq.md) (which also features examples of good assignments). Please also read the [policy on generative AI](assessment/GenerativeAIPolicy.pdf) for this course; if you use generative AI you need to complete and attach [the AI declaration](assessment/AI_declaration.docx) to your submission.

### Postgraduate assessment

The postgraduate version of the course is worth 10 credits and there is a single piece of assessment, due on 5th December. This assessment is a project where you produce a working experiment implemented in jsPsych and an accompanying report explaining the motivation behind that experiment, justifying important design decisions you took in building the experiment, and appraising the experiment and ways it could be improved/extended. Full details are provided in the [postgraduate assignment brief](assessment/PGAssignmentBrief2024.pdf) and [the FAQ](assessment/oels_assignment_faq.md) (which also features examples of good assignments). Please also read the [policy on generative AI](assessment/GenerativeAIPolicy.pdf) for this course; if you use generative AI you need to complete and attach [the AI declaration](assessment/AI_declaration.docx) to your submission.

## Course Materials

Course content will appear here as we work through the course.

Each week there will be a set reading and a programming assignment. The reading involves a blog post introducing a published paper, you read both the blog and the paper, the lecture then provides an additional brief overview and an opportunity to ask questions/discuss the reading. The programming assignment involves working through a section of the [Online Experiments with jsPsych](https://softdev.ppls.ed.ac.uk/online_experiments/index.html) tutorial and/or looking at (and editing) some code which implements a language-related experiment; you can use the lab classes as dedicated time to work on the programming task and get help with programming difficulties or questions you have.

### Week 1 (commencing 16th September): Introduction

- *Scientific content:* minimal (but I'll go over the practicalities of the course, assessments etc)
- *Technical content:* jsPsych basics
- [Reading](oels_reading_wk1.md)
- [Programming task](oels_practical_wk1.md)
- [Lecture slides](slides/oels_lecture_wk1.pdf)

### Week 2 (23rd September): Crowdsourcing experimental data

- *Scientific content:* lab vs online data collection
- *Technical content:* more jsPsych and javascript basics
- [Reading](oels_reading_wk2.md)
- [Programming task](oels_practical_wk2.md)
- [Lecture slides](slides/oels_lecture_wk2.pdf)

### Week 3 (30th September): Grammaticality judgements

- *Scientific content:* lab vs online grammaticality judgments; syntactic processing and acceptability
- *Technical content:* simple key- and button-press responses
- [Reading](oels_reading_wk3.md)
- [Programming task](oels_practical_wk3.md)
- [Lecture slides](slides/oels_lecture_wk3.pdf)

### Week 4 (7th October): Self-paced reading

- *Scientific content:* processing costs of syntactic dependencies
- *Technical content:* collecting reaction time data, more complex nested trials
- [Reading](oels_reading_wk4.md)
- [Programming task](oels_practical_wk4.md)
- [Lecture slides](slides/oels_lecture_wk4.pdf)


### Week 5 (13th October): Word learning / frequency learning

- *Scientific content:* probability matching and regularisation
- *Technical content:* using trial data for contingent trials, saving data
- [Reading](oels_reading_wk5.md)
- [Programming task](oels_practical_wk5.md)
- [Lecture slides](slides/oels_lecture_wk5.pdf)

### Week 6 (20th October): Audio stimuli

- *Scientific content:* speech perception, social influences on phonetic adaptation
- *Technical content:* Audio, trial data again, preloading stimuli, saving data trial by trial
- [Reading](oels_reading_wk6.md)
- [Programming task](oels_practical_wk6.md)
- [Lecture slides](slides/oels_lecture_wk6.pdf)

### Week 7 (27th October): Priming and overspecification

- *Scientific content:* Priming and overspecification
- *Technical content:*  Audio recording, custom preload lists, conditional timelines, reading trial lists from CSV
- [Reading](oels_reading_wk7.md)
- [Programming task](oels_practical_wk7.md)
- [Lecture slides](slides/oels_lecture_wk7.pdf)

### Week 8 (4th November): Iterated Learning

- *Scientific content:* iterated learning and the evolution of compositional structure
- *Technical content:* looping trials, reading trial lists from CSVs again, PHP scripts for iteration
- [Reading](oels_reading_wk8.md)
- [Programming task](oels_practical_wk8.md)
- [Lecture slides](slides/oels_lecture_wk8.pdf)

### Week 9 (11th November): Participant-to-participant interaction

- *Scientific content:* least effort and Zipf's Law of Abbreviation
- *Technical content:* web sockets, python servers, incrementally building a timeline
- [Reading](oels_reading_wk9.html)
- [Programming task](oels_practical_wk9.md)
- [Lecture slides](slides/oels_lecture_wk9.pdf)

### Week 10 (18th November): Interacting with MTurk

No lecture or lab in week 10, but there are some materials that will be useful for you to read if you are thinking of setting up a real experiment in the wild, e.g. for your dissertation project!

- *Scientific content:* None!
- *Technical content:* How to set up a server, launch and pay participants, manage qualifications, etc
- [How to get your experiment online](oels_wk10.md)


### Bonus content

I am sticking some extra documented experiments I have created here, in case they are useful for someone or provide inspiration.

- [Co-speech gesture experiment](bonus/cospeech_gesture.md), presenting a video and getting button/text responses.
- [Semantic extension experiment](https://github.com/kennysmithed/SemanticExtension). This is a more complex experiment looking at how participants extend the meaning of novel signals in a communication game. It is based on the dyadic interaction code from this course, but includes additional machinery to deal with a wider range of participant drop-outs, has on-screen trial counters, a warm-up with catch trials.
- [Custom html-button-response plugin with buttons laid out in a grid](https://github.com/aislinnkeogh/custom-jspysch-plugins/blob/main/plugin-html-button-response-grid.js), written by Aislinn Keogh - uses an html table to do that, the plugin provides 2 additional parameters, `rows` and `columns`, e.g. for a 3 row, 2 column grid you'd do ```{type: jsPsychHtmlButtonResponseGrid, rows: 3, columns: 2, choices: [6 choices here]}```

### Additional drop-in labs for coding help with the final assignment

We will provide some extra drop-in labs after the conclusion of the regular lectures and labs to give you an opportunity to get 
some help with your final assignment code. Obviously we won't write your code for you, but if you are having trouble interpreting 
an error message or finding a bug or want some tips on how to achieve a particular effect we can help you figure it out. 
Note that these are not compulsory, and they are drop-ins not extra labs - the idea is that you come along, ask a couple of 
questions, then go away. 
- Wednesday 20th November, 9am-11am, Appleton Tower room M2 (i.e. usual time and place), with Yajun.
- Wednesday 20th November, 1.30pm-3.00pm, DSB 1.08, with Kenny.
- Monday 25th November, 11am-12, DSB 1.08, with Kenny.
- Monday 25th November, 2pm-3pm, DSB 1.08, with Kenny.
- Wednesday 27th November, 9am-11am, Appleton Tower room M2 (i.e. usual time and place), with Yajun.
- Tuesday 3rd December, 1.30pm-3pm, DSB 1.08, with Kenny.
- Wednesday 4th December, 9am-11am, Appleton Tower room M2 (i.e. usual time and place), with Maisy.

## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

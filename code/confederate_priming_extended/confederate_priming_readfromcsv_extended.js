/******************************************************************************/
/*** Preamble *****************************************************************/
/******************************************************************************/

/*
Based on confederate_priming_readfromcsv.js, but includes two additions:

1. Random assignment to condition (using one of two available trial lists) - the 
code for this is right at the end.
2. A simple way of making the confederate speed up as the experiment progresses - 
the code for this is near the top (under "Random Waits").
*/

/******************************************************************************/
/*** Initialise jspsych *******************************************************/
/******************************************************************************/

var jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData("csv"); //dump the data to screen
  },
});

/******************************************************************************/
/*** Maintaining a list of images to preload **********************************/
/******************************************************************************/

var images_to_preload = ["mic"];



/******************************************************************************/
/*** Generate a random participant ID *****************************************/
/******************************************************************************/

var participant_id = jsPsych.randomization.randomID(10);


/******************************************************************************/
/*** Random waits *************************************************************/
/******************************************************************************/
/*
At several points in the code we want to generate a random wait, to simulate the
confederate participant pondering what to say or hunting for the correct image. We'd
like the length of this delay to be quite long at first, and then decline as the 
experiment progresses, representing a participant who becomes more familiar with the 
task. 

In order to do this we need to know how far we are into the experiment, so we can make 
the length of wait depend on progress. One very simple way to do this is to create a variable, 
wait_counter, which starts at 0 and increases by 1 every time we create a trial involving 
a random wait. We then have a simple if-statement that sets the random wait depending 
on the value of wait_counter.
*/

var wait_counter = 0;

function random_wait() {
  if (wait_counter<5) { //first few trials, very slow
    var wait = 5000 + Math.floor(Math.random() * 3000); //this will be a number between 5000 and 8000
  }
  else if (wait_counter<10) { //next few trials, bit faster
    var wait = 3000 + Math.floor(Math.random() * 2000); //3000-5000
  } 
  else {//all other trials, quite quick
    var wait = 1000 + Math.floor(Math.random() * 2000); //1000-3000
  }
  console.log(wait_counter); //so you can see it in the console
  console.log(wait); //so you can see it in the console
  wait_counter = wait_counter + 1; //increment the wait_counter
  return wait;
}


/******************************************************************************/
/*** Picture selection trials *************************************************/
/******************************************************************************/

function make_picture_selection_trial(sound, target_image, foil_image) {
  //add target_image and foil_image to our preload list
  images_to_preload.push(target_image);
  images_to_preload.push(foil_image);

  //create sound file name
  var sound_file = "sounds/" + sound + ".wav";

  //generate random wait and random order of images
  var wait_duration = random_wait();
  var shuffled_image_choices = jsPsych.randomization.shuffle([
    target_image,
    foil_image,
  ]);

  //trial for the delay before the partner starts speaking
  var waiting_for_partner = {
    type: jsPsychAudioButtonResponse,
    stimulus: "sounds/silence.wav",
    prompt: "<p><em>Click on the picture your partner described</em></p>",
    choices: shuffled_image_choices,
    trial_duration: wait_duration,
    response_ends_trial: false, //just ignore any clicks the participant makes here!
    button_html: function (choice) {
      return '<button class="jspsych-btn"> <img src="images/' + choice + '.png" style="width: 250px"></button>'
    }
  };

  //audio trial
  var selection_trial = {
    type: jsPsychAudioButtonResponse,
    stimulus: sound_file,
    prompt: "<p><em>Click on the picture your partner described</em></p>",
    choices: shuffled_image_choices,
    data: { participant_task: "picture_selection" }, //add a note that this is a picture selection trial
    save_trial_parameters: {choices: true}, //and we want to save the trial choices
    button_html: function (choice) {
      return '<button class="jspsych-btn"> <img src="images/' + choice + '.png" style="width: 250px"></button>'
    },
    post_trial_gap: 500, //a little pause after the participant makes their choice
    on_finish: function (data) {
      var button_number = data.response;
      data.button_selected = data.choices[button_number];
      save_confederate_priming_data(data); //save the trial data
    },
  };
  var full_trial = { timeline: [waiting_for_partner, selection_trial] };
  return full_trial;
}

/******************************************************************************/
/*** Infrastructure for recording audio ***************************************/
/******************************************************************************/

//A simple warning that they are going to have to grant access to the mic
var audio_permission_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>Permission to access your microphone</h3>\
  <p style='text-align:left'>In this experiment you will be interacting with another participant. \
  You will be recording audio descriptions using your microphone, and listening to \
  descriptions your partner has recorded.</p>\
  <p style='text-align:left'><b>On the next screen we will ask for permission to access your microphone</b>. \
  When the pop-up appears asking for permission to access your microphone, please grant \
  access, otherwise the experiment won't work. </p>\
  <p style='text-align:left'>We will only record when you click the record button - you are always in control.</p>",
  choices: ["Continue"]
};

//then have them select a mic
var initialize_mic = {
  type: jsPsychInitializeMicrophone
};


/******************************************************************************/
/*** Picture description trials ********************************************/
/******************************************************************************/

function make_picture_description_trial(target_image, foil_image) {
  //add target_image and foil_image to our preload list
  images_to_preload.push(target_image);
  images_to_preload.push(foil_image);

  //generate random wait 
  var wait_duration = random_wait();
  
  //need to highlight the target with a green border
  var target_image_as_html =
    "<img src=images/" +
    target_image +
    ".png style='border:5px solid green; width:250px'>";
  var foil_image_as_html =
    "<img src=images/" + foil_image + ".png style='width:250px'>";

  //shuffle and paste together into a composite bit of html
  var shuffled_images = jsPsych.randomization.shuffle([
    target_image_as_html,
    foil_image_as_html,
  ]);
  var composite_image = shuffled_images[0] + shuffled_images[1];
  var composite_image_with_prompt =
    composite_image + "<p><em>Describe the picture in the green box</em></p>";

  //html button response
  var picture_plus_white_mic = {
    type: jsPsychHtmlButtonResponse,
    stimulus: composite_image_with_prompt,
    choices: [
      '<img src="images/mic.png" style="background-color:white; width:75px">',
    ],
  };
  var record_audio = {
    type: jsPsychHtmlAudioResponse,
    stimulus: composite_image_with_prompt,
    recording_duration: 10000,
    done_button_label:
      '<img src="images/mic.png" style="background-color:Darkorange; width:75px">',
    data: { participant_task: "picture_description" , //add a note that this is a picture description trial
            target: target_image, //and record target and foil images
            foil: foil_image}, 

    on_finish: function (data) {      
      save_audio(data); //save the audio using the function in utilities.js
      save_confederate_priming_data(data);
    },
  };

  var waiting_for_partner = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "Waiting for partner to select",
    choices: [],
    trial_duration: wait_duration,
    post_trial_gap: 500, //short pause after the confederate makes their selection
  };

  var full_trial = {
    timeline: [picture_plus_white_mic, record_audio, waiting_for_partner],
  };
  return full_trial;
}


/******************************************************************************/
/*** Write headers for data file **********************************************/
/******************************************************************************/

var write_headers = {
  type: jsPsychCallFunction,
  func: function () {
    var this_participant_filename = "cp_" + participant_id + ".csv";
    save_data(
      this_participant_filename,
      "participant_id,trial_index,participant_task,time_elapsed,sound_file,target_image,foil_image,button_choice0,button_choice1,response,button_selected,rt\n"
    );
  },
};

/******************************************************************************/
/*** Native English check *****************************************************/
/******************************************************************************/

// A simple 2-choice question
var native_english_question = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "Are you a native speaker of English?",
      name: "NativeEnglish",
      options: ["Yes", "No"],
      required: true,
    },
  ],
};

var nonnative_english_exclusion_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<p style='text-align:left'>Sorry, but we can only use native speakers of English in this experiment.</p>",
  choices: [],
};

var native_english_check = {
  timeline: [nonnative_english_exclusion_screen],
  conditional_function: function () {
    // get the data from the last trial
    var data = jsPsych.data.get().last(1).values()[0];
    //retrieve their answer to the question - this will be Yes or No
    var answer = data.response.NativeEnglish;
    if (answer == "No") {
      //this means we *will* run the conditional timeline
      return true;
    } else {
      //this means we will not
      return false;
    }
  },
};

/******************************************************************************/
/*** Instruction trials *******************************************************/
/******************************************************************************/

var consent_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>Welcome to the experiment</h3> \
  <p style='text-align:left'>Experiments begin with an information sheet that explains to the participant \
  what they will be doing, how their data will be used, and how they will be \
  remunerated.</p> \
  <p style='text-align:left'>This is a placeholder for that information, which is normally reviewed \
  as part of the ethical review process.</p>",
  choices: ["Yes, I consent to participate"],
};

var pre_interaction_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>Instructions for interaction</h3>\
  <p style='text-align:left'>During the experiment, you will alternate between describing pictures \
  to your partner and matching pictures your partner describes to you.</p>\
  <p style='text-align:left'>When it is your turn to describe, you will see two pictures, one of which \
  will be highlighted with a green box. You should <u>describe the picture highlighted in the green box</u> to \
  your partner. Click the mic icon to start recording audio, then click again to stop. There are no rules \
  as to what you can or cannot say; you can name the object if you like. \
  Remember that your partner sees the same two pictures, but they may not be in the same positions \
  (left/right).</p>\
  <p style='text-align:left'>When it is your turn to match, simply click on the picture your partner \
  describes to you.</p>",
  choices: ["Continue"],
};

var final_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>Finished!</h3>\
  <p style='text-align:left'>Experiments often end with a final screen, e.g. that contains a completion\
  code so the participant can claim their payment.</p>\
  <p style='text-align:left'>Click Continue to finish the experiment and see your raw data. \
  Your trial was also saved to the server trial by trial.</p>",
  choices: ["Continue"],
};

/******************************************************************************/
/*** Saving data trial by trial ***********************************************/
/******************************************************************************/

function save_confederate_priming_data(data) {
  // choose the data we want to save - this will also determine the order of the columns
  if (data.participant_task == "picture_selection") {
    var data_to_save = [
      participant_id,
      data.trial_index,
      data.participant_task,
      data.time_elapsed,
      data.stimulus,
      "NA",
      "NA", //'missing' target and foil image
      data.choices,
      data.response,
      data.button_selected,
      data.rt,
    ];
  } else if (data.participant_task == "picture_description") {
    var data_to_save = [
      participant_id,
      data.trial_index,
      data.participant_task,
      data.time_elapsed,
      "NA", //'missing' sound file
      data.target,
      data.foil,
      "NA",
      "NA", //'missing' choices for description trials
      "NA", //'missing' data.response
      "NA", //'missing' button_selected
      data.rt,
    ];
  }
  // join these with commas and add a newline
  var line = data_to_save.join(",") + "\n";
  var this_participant_filename = "cp_" + participant_id + ".csv";
  save_data(this_participant_filename, line);
}

/******************************************************************************/
/*** Reading the trial list from a CSV file ***********************************/
/******************************************************************************/

async function read_trials_and_prepare_timeline(triallist_filename) {
  var trial_list = await read_trial_list(triallist_filename);
  console.log(trial_list)
  var interaction_trials = build_timeline(trial_list);
  var preload_trial = build_button_image_preload();
  var full_timeline = [].concat(
    consent_screen,
    native_english_question,
    native_english_check,
    audio_permission_instructions,
    initialize_mic,
    preload_trial,
    write_headers,
    pre_interaction_instructions,
    interaction_trials,
    final_screen
  );
  jsPsych.run(full_timeline);
}

function build_timeline(trial_list) {
  var interaction_trials = [];
  for (trial of trial_list) {
    if (trial.participantRole == "match") {
      var match_trial = make_picture_selection_trial(
        trial.soundFile,
        trial.targetImage,
        trial.distractorImage
      );
      interaction_trials.push(match_trial);
    } else if (trial.participantRole == "direct") {
      var direct_trial = make_picture_description_trial(
        trial.targetImage,
        trial.distractorImage
      );
      interaction_trials.push(direct_trial);
    }
  }
  return interaction_trials;
}


function build_button_image_preload() {
  var images_to_preload_with_path = [];
  for (image of images_to_preload) {
    var full_image_name = "images/" + image + ".png";
    images_to_preload_with_path.push(full_image_name);
  }

  var preload = {
    type: jsPsychPreload,
    auto_preload: true,
    images: images_to_preload_with_path,
  };

  return preload;
}

/******************************************************************************/
/*** Random assignment to conditions ******************************************/
/******************************************************************************/

/*
Random assignment to condition happens here.

We have two CSV files, overspecific_confederate.csv and minimal_confederate.csv,
which make up different conditions (where the confederate is overspecific or 
not overspecific). We can randomly assign to condition just by picking one of these at 
random.
*/

function random_condition() {
  var available_csvs = ["overspecific_confederate.csv","minimal_confederate.csv"];
  var selected_csv = jsPsych.randomization.shuffle(available_csvs)[0];
  return selected_csv;
}

var this_condition = random_condition();
console.log(this_condition); //logging it so you can see it in the console

read_trials_and_prepare_timeline(this_condition);

/******************************************************************************/
/*** Preamble *****************************************************************/
/******************************************************************************/

/*
Additions to handle the two harder optional questions in the practical. The additions are 
in:

- the on_finish of the social_network_questionnaire trial
- the new function save_questionnaire_data (at the end alongside the other functions for
  saving data)

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
/*** Social network questionnaire *********************************************/
/******************************************************************************/

var social_network_questionnaire = {
  type: jsPsychSurveyHtmlForm,
  preamble:
    "<p style='text-align:left'> <b>Social network questionnaire</b></p>\
              <p style='text-align:left'> In this questionnaire we would like to \
              gather information about your linguistic interactions. We realize \
              that some of the estimates are difficult to make. Please do your \
              best and be as accurate as possible.</p> \
              <p style='text-align:left'> Important: When providing estimates for \
              your exposure in a week, keep in mind that your habits may vary \
              considerably depending on the day of the week (e.g., weekday vs. weekend). \
              Please be as accurate as possible and do not simply multiply your \
              estimate for one day by 7.</p>",
  html: "<p style='text-align:left'>How old are you? <br> \
              <input required name='age' type='number'></p> \
         <p style='text-align:left'>With how many people do you converse orally \
         in a typical week? (Please only include people with whom you regularly \
           talk for longer than 5 minutes)<br> \
              <input required name='n_speak_to' type='number'></p> \
           <p style='text-align:left'>How many hours do you usually spend on \
           conversing orally with people in a typical week?<br>\
              <input required name='hours_speak_to' type='number'></p>",
  //when the trial finishes, take the data generated by the trial and save it
  on_finish: function (data) {
    save_questionnaire_data(data);
  }
};

/******************************************************************************/
/*** Picture selection trials *************************************************/
/******************************************************************************/

function make_picture_selection_trial(sound, target_image, foil_image) {
  var sound_file = "picture_selection_sounds/" + sound + ".mp3";
  var trial = {
    type: jsPsychAudioButtonResponse,
    stimulus: sound_file, //use the sound_file name we created above
    choices: [target_image, foil_image], //these will be shuffled on_start
    data: { block: "picture_selection" }, //add a note that this is a picture selection trial
    save_trial_parameters: {choices: true}, //and we want to save the trial choices
    button_html: function (choice) {
      return '<button class="jspsych-btn"> <img src="picture_selection_images/'+choice+'.jpg" style="width: 250px"></button>'
    },
    post_trial_gap: 500, //a little pause between trials

    //at the start of the trial, randomise the left-right order of the images
    //and note that randomisation in data as button_choices
    on_start: function (trial) {
      var shuffled_choices = jsPsych.randomization.shuffle(trial.choices);
      trial.choices = shuffled_choices; //set trial choices now
    },
    on_finish: function (data) {
      var button_number = data.response;
      data.button_selected = data.choices[button_number];
      save_perceptual_learning_data_line(data); //save the trial data
    },
  };
  return trial;
};

var selection_trials_unshuffled = [
  make_picture_selection_trial("fresh_dill_man", "fresh_dill", "dry_dill"),
  make_picture_selection_trial("orange_telephone","orange_telephone","black_telephone"),
  make_picture_selection_trial("angel_wing", "angel_wing", "airplane_wing"),
  make_picture_selection_trial("animal_ear", "animal_ear", "animal_nose"),
];

var selection_trials = jsPsych.randomization.shuffle(
  selection_trials_unshuffled
);

/******************************************************************************/
/*** Phoneme categorization trials ********************************************/
/******************************************************************************/

function make_categorization_trial(sound) {
  //add the path and file extension
  var sound_file = "phoneme_categorization_sounds/" + sound + ".mp3";
  var trial = {
    type: jsPsychAudioButtonResponse,
    stimulus: sound_file,
    choices: ["dean", "teen"],
    data: {block: "phoneme_categorization"},
    save_trial_parameters: {choices: true},
    post_trial_gap: 500,
    on_finish: function (data) {
      var button_number = data.response;
      data.button_selected = data.choices[button_number];
      save_perceptual_learning_data_line(data);
    },
  };
  return trial;
}

var categorization_trials_unshuffled = [
  make_categorization_trial("samespeaker_VOT5"),
  make_categorization_trial("samespeaker_VOT10"),
  make_categorization_trial("samespeaker_VOT15"),
  make_categorization_trial("samespeaker_VOT20"),
  make_categorization_trial("samespeaker_VOT25"),
  make_categorization_trial("samespeaker_VOT30"),
  make_categorization_trial("samespeaker_VOT50"),
  make_categorization_trial("samespeaker_VOT80"),
];

var categorization_trials = jsPsych.randomization.shuffle(
  categorization_trials_unshuffled
);

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

var instruction_screen_picture_selection = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>Picture Selection Instructions</h3>\
  <p style='text-align:left'>You will now see a series of picture pairs. At the same time, \
  you will hear the description of one of the pictures on the screen. \
  Please click on the picture that best matches the description you hear.</p>",
  choices: ["Continue"],
};

var instruction_screen_phoneme_categorization = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    '<h3>Phoneme Categorization Instructions</h3>\
  <p style=\'text-align:left\'>You will now hear a series of words. For each one, please \
  indicate whether you hear "teen" or "dean" by clicking on the appropriate box on \
  the screen. The task might seem repetitive but please listen carefully to each word.</p>',
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
/*** Preload stimuli **********************************************************/
/******************************************************************************/

/*
We need to manually specify a preload list to preload the images in the 
selection_trials. selection_trials looks like this (I will also console.log 
it so you can see):

  [{stimulus:sound_file1,choices:[left_image1,right_image1], ...},
   {stimulus:sound_file2,choices:[left_image2,right_image2], ...}]

(where ... covers some other trial parameters we don't need to care about here).
So basically we can loop through this, strip out the choices and then add then to 
a list of image stimuli to load. choices is itself a list, so I will iterate through 
that with a second embedded for-loop, adding each choice in turn. 

The only complication is that we have to add the path information for each image - 
e.g. left_image1 will be something like "fresh_dill", based on that we need to preload 
"picture_selection_images/fresh_dill.jpg". So before I add each choice to the 
building preload list I have to add that path info.
*/

//take a look at the selection_trials we are working from
console.log(selection_trials);

//start with an empty list of images to preload
var image_preload_list = [];

//first for-loop - build a list of plain image names (minus path)
for (var this_trial of selection_trials) {
  this_choices = this_trial.choices;
  //embedded for-loop - for each item in this_choices, add path info and push to image_preload_list
  for (var this_filename of this_choices) {
    var this_filename_with_path =
      "picture_selection_images/" + this_filename + ".jpg";
    image_preload_list.push(this_filename_with_path);
  }
}

//take a look at the resulting array
console.log(image_preload_list);

/*
Finally, we can plug this list of images to preload into the preload trial
*/
var preload = {
  type: jsPsychPreload,
  auto_preload: true,
  images: image_preload_list,
};

/******************************************************************************/
/*** Write headers for data file **********************************************/
/******************************************************************************/

var write_headers = {
  type: jsPsychCallFunction,
  func: function () {
    //write column headers to perceptuallearning_data.csv
    save_data(
      "perceptuallearning_data.csv",
      "block,trial_index,time_elapsed,stimulus,button_choice_1,button_choice_2,button_selected,response,rt\n"
    );
  },
};

/******************************************************************************/
/*** Build the timeline *******************************************************/
/******************************************************************************/

var full_timeline = [].concat(
  consent_screen,
  preload,
  write_headers,
  social_network_questionnaire,
  instruction_screen_picture_selection,
  selection_trials,
  instruction_screen_phoneme_categorization,
  categorization_trials,
  final_screen
);

/******************************************************************************/
/*** Saving data trial by trial ***********************************************/
/******************************************************************************/

function save_perceptual_learning_data_line(data) {
  console.log(data)
  // choose the data we want to save - this will also determine the order of the columns
  var data_to_save = [
    data.block,
    data.trial_index,
    data.time_elapsed,
    data.stimulus,
    data.choices,
    data.button_selected,
    data.response,
    data.rt,
  ];
  // join these with commas and add a newline
  var line = data_to_save.join(",") + "\n";
  save_data("perceptuallearning_data.csv", line);
}

/******************************************************************************/
/*** Saving questionnaire data ************************************************/
/******************************************************************************/

function save_questionnaire_data(data) {
  //console logging these so you can see what the
  //data generated by the survey trial looks like
  console.log(data);
  console.log(data.response);
  var questionnaire_data = data.response;
  var data_to_save = [
    questionnaire_data.age,
    questionnaire_data.n_speak_to,
    questionnaire_data.hours_speak_to,
  ];
  //headers - gives the names of the 3 columns
  var headers = "age,n_speak_to,hours_speak_to\n";
  // join these with commas and add a newline
  var line = headers + data_to_save.join(",") + "\n";
  save_data("perceptuallearning_questionnaire_data.csv", line);
}

/******************************************************************************/
/*** Run the timeline *******************************************************/
/******************************************************************************/

jsPsych.run(full_timeline);

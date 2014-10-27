#Qwizzer - The Quizz wizard!

Qwizzer is an plugin that you can add to your site that will implement a easy way of creating quizzes that users will have to complete before they can continue reading. This will force the user to stop for a moment and think about what he just read. Which will greatly improve the persons learning.

##How to implement

You need JQuery in order for this to work

##Files

`<link rel="stylesheet" href="qwizzer.css" type="text/css">
<script type="text/javascript" src="qwizzer.js"></script>`

##Script that fires the engine

`<script type="text/javascript">
$(document).ready(function(){
$(this).qwizzer({'duration':'slow','correct':0});
});
</script>`

##How you implement your quizzes
###Input

`<div class="qwizzer">
<h5>What planet do we live on?</h5>
<form action="post">
<label><input name="answer" type="hidden" value="earth:::gaia"></label>
<label><input type="text"></label>
<br>
<button>Submit</button>
</form>
</div>`

###Radio - single selection

`<div class="qwizzer">
<h5>What planet do we live on?</h5>
<form action="post">
<label><input name="answer" type="hidden" value="earth"></label>
<label>Gaia:<input type="radio" name="planet" value="earth"></label>
<label>Mars:<input type="radio" name="planet" value="mars"></label>
<label>Mars:<input type="radio" name="planet" value="neptune"></label>
<br>
<button>Submit</button>
</form>
</div>`

###Checkbox - multiple selection

`<div class="qwizzer">
<h5>Other names for the planet earth?</h5>
<form action="post">
<label><input name="answer" type="hidden" value="gaia;;;terra"></label>
<label>Mercury:<input type="checkbox" name="planet" value="mercery"></label>
<label>Gaia:<input type="checkbox" name="planet" value="gaia"></label>
<label>Neptune:<input type="checkbox" name="planet" value="neptune"></label>
<label>Terra:<input type="checkbox" name="planet" value="terra"></label>
<br>
<button>Submit</button>
</form>
</div>`

This is how you implement the challenges (read quizzes). The plugin will make it so that the user wont be able to scroll down more then to a certain point on the page.

The quiz section must have the qwizzer class for it to work. It must also have a form and every input-field must be inside a label.

The hidden input-field holds the answer(s) to the challenge. There can be many different correct answers to a question. For example Earth and Gaia are both correct answers to the question "What planet do we live on?". To add multiple correct answers; add them to the hidden input-fields value attribute and separate them with three colons (:::).

You can use radio buttons, checkboxes or a input-fields; which means that there are 3 different types of challenges.

In case of a checkbox quiz with multiple selections you'll need so separate the answers with 3 semicolons (;;;). The answers in the hidden input-field must be ordered in the order they are organized in the code. For example if the 1st and 3rd input-field holds the correct answer; then the 1st value must appear before the 3rd value as the hidden input-fields value e.g. "first;;;third".

##Options

`$(this).qwizzer({'duration':'slow','correct':0});`

duration: Controls the amount of time in which the animations will animate. Can either be slow or fast.

correct: Can be used to skip a number of challenges. Must be a non-negative number.


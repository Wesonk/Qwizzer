(function($) {

    $.fn.qwizzer = function(options) {

        options = $.extend({}, $.fn.qwizzer.defaults, options);
        var correct,
            scrollLimit;

        $.fn.qwizzer.defaults = {
            'duration': 'fast',
            'correct': 0
        }

        return this.each(function() {

            correct = options.correct;
            scrollLimit = 2000000000000000000;

            init();

            $(this).resize(function(){
                calcNewScrollLimit();
            });

            $(this).scroll(function(evt) {
                //console.log($(this).scrollTop());
                //console.log(scrollLimit);
                if($(window).scrollTop() >= scrollLimit){
                    $(window).scrollTop(scrollLimit);
                }
            });

            $('.qwizzer form').each(function(){

                $(this).submit(function(evt){

                    var answer = [],choices = [];
                    var correctAnswer = $(this).children().contents().filter('input[type="hidden"]').val();
                    //console.log($(this).children().contents());
                    //console.log(correctAnswer);

                    // ## Gets the values from the input fields and puts them in answer array
                    // Looks for radio, text and checkbox input fields and collects the input data
                    if($(this).children().contents().filter("input[type=radio]:checked").length)
                        answer.push($(this).children().contents().filter("input[type=radio]:checked").eq(0).val());

                    else if ($(this).children().contents().filter("input[type=text]").length === 1)
                        answer.push($(this).children().contents().filter("input[type=text]").eq(0).val());

                    else if ($(this).children().contents().filter("input[type=checkbox]:checked").length)
                    {
                        console.log("checkboxes!");
                        var checkedBoxes = $(this).children().contents().filter("input[type=checkbox]:checked");
                        var index =  0;
                        for(;index < checkedBoxes.length;index++)
                        {
                            answer.push(checkedBoxes.eq(index).val());
                        }
                    }

                    // ## Checks if the answer is correct
                    //console.log(answer);
                    if(checkIfCorrectAnswer(answer,correctAnswer))
                    {
                        //  console.log("You answered correct!");
                        correct++;
                        hideQuestions();
                        calcNewScrollLimit();
                        showQuestion();

                    }else{
                        alert("Wrong answer!");
                    }
                    evt.preventDefault();
                });
            });
        });

        function checkIfCorrectAnswer(guess,answer){
            var index = 0,
                correct = 0,
                correctAnswers = answer.split(";;;"),
                answers = [];
            for(;index < guess.length && index < correctAnswers.length;index++)
            {
                answers = correctAnswers[index].split(":::");
                if(isInArray(guess[index],answers))
                    correct++;
                else
                    return false;
            }
            return correct === correctAnswers.length && guess.length === correctAnswers.length;
        }

        function isInArray(val,arr){
            var i = 0;
            for(;i < arr.length;i++){
               if (arr[i].toLowerCase().trim() === val.toLowerCase().trim())
                return true;
            }
            return false;
        }

        // calculates how far the user will able to scroll
        function calcNewScrollLimit(){
            $('.qwizzer').each(function(index) {
                if(correct <= index) {
                    var prevElemExcludingQwizzer = $(this).prevAll().not(".qwizzer").first();
                    scrollLimit = prevElemExcludingQwizzer.offset().top
                        + prevElemExcludingQwizzer.height()
                        + $(this).height()
                        - $(window).height();

                    return false;
                }
            });
        }

        function showQuestion(){
            $('.qwizzer').eq(correct).fadeIn(options.duration);
            calcNewBottomPadding();
        }

        // Calculates and implements how much padding it takes to fill the rest of the screen
        function calcNewBottomPadding(){
            var scrollPadding = $(document).height() - (scrollLimit+ $(this).height());
            $('.qwizzer').eq(correct).css('padding-bottom',scrollPadding+"px");
        }

        function hideQuestions(){
            $('.qwizzer').each(function(index){
                if(index !== correct)
                    $(this).fadeOut(options.duration);
            });
        }

        function init(){
            calcNewScrollLimit();
            hideQuestions();
            showQuestion();
        }

    };

}) (jQuery);
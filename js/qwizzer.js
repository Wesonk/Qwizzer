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
                //console.log($(this).scrollTop());//
                //console.log(scrollLimit);
                if($(window).scrollTop() >= scrollLimit){
                    $(window).scrollTop(scrollLimit);
                }
            });

            $('.qwizzer form').each(function(){

                $(this).submit(function(evt){

                    var answer = "";
                    var correctAnswer = $(this).children().contents().filter('input[type="hidden"]').val();

                    //console.log($(this).children().contents());

                    //console.log(correctAnswer);

                    if($(this).children().contents().filter("input[type=radio]:checked").length)
                        answer = $(this).children().contents().filter("input[type=radio]:checked").eq(0).val();

                    else if ($(this).children().contents().filter("input[type=text]").length === 1)
                        answer = $(this).children().contents().filter("input[type=text]").eq(0).val();

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
            answers = answer.split(":::");
            return isInArray(guess,answers);
        }

        function isInArray(val,arr){
            var i = 0;
            for(;i < arr.length;i++){
               if (arr[i].toLowerCase().trim() === val.toLowerCase().trim())
                return true;
            }
            return false;
        }

        function calcNewScrollLimit(){
            $('.qwizzer').each(function(index) {
                if(correct <= index) {
                    scrollLimit = $(this).prev().offset().top + $(this).prev().height() + $(this).height() - $(window).height();
                    return false;
                }
            });
        }

        function showQuestion(){
            $('.qwizzer').eq(correct).fadeIn(options.duration);
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
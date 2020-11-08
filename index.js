//This file mainly focuses on jQuery/JavaScript
(function ( $ ) {
    $.fn.Fourcubed = function(){
    //Generate Dictionary
    var fs = require("fs");
    var text = fs.readFileSync("./mytext.txt", "utf-8");
    var dictionary = text.split(" ");
    alert(dictionary);

    //Helper Functions
    function calcscore(fullcount, censorecount, suscount, ishardcore){
        var result = 0;
        if(ishardcore){
            result += (4*fullcount);
            result += (1*censorecount);
            result += (2*suscount);
            return result;
        }
        result += (4*fullcount);
        result += (4*suscount);
        result += (1*censorecount);
        return result;
    }

    function counterer(){

    }


    //Gameplay Function
    $( function() {
      var myAudio;
      var countup = 0.0;
      var EasyMode = false;
      var time = Date.now();
      var timer, guessTime, guess;
      var resultscore = 0;
      var bestScore = 0;
      //Settings before game begins
      $("#dispname").text("Player Name: "+info[0]);
      $("#dispnum").text("Number of turns: "+info[1]);
      $("#dispcheck").text("Game Mode: Normal");

      $("#EasyMode").click(function(){
        if($('#EasyMode').is(":checked")){
          $("#dispcheck").text("Game Mode: Easy");
        }
        else{
          $("#dispcheck").text("Game Mode: Normal");
        }
      });
      //Start a new Game
      $("#get").click(function(){
        //Sound
        EasyMode = $('#EasyMode').is(":checked");

        /*if(!EasyMode){//Normal mode music
          myAudio = new Audio("Jeopardy-theme-song.mp3");
          myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
          }, false);
          myAudio.play();
        }
        else{//Easy mode music
          myAudio = new Audio("");
          myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
          }, false);
          myAudio.play();
        }*/
        //TIMER
        countup = 0.0;
        if(!EasyMode){//Normal gameplay
          timer = setInterval(function(){
           
            $("h1").text("Time Left: " + (20.0-countup).toFixed(1)); countup+=.1;
          
            if(countup >= 20.05){
              $("h1").text("Times Up!");
              clearInterval(timer);
              myAudio.pause();
              $("#get").css('display', 'block');
              $("#guess").css('display', 'none');
              $("#sett").css('display', 'block');
            };
            guessTime = Date.now(); 
            guess= guessTime - time;
          }, 100);
        }
        else{//Easy mode gameplay
          timer = setInterval(function(){
           
            $("h1").text("Time Left: " + (45.0-countup).toFixed(1)); countup+=.1;
          
            if(countup >= 45.05){
              $("h1").text("Times Up!");
              clearInterval(timer);
              myAudio.pause();
              $("#get").css('display', 'block');
              $("#guess").css('display', 'none');
              $("#sett").css('display', 'block');
            };
            guessTime = Date.now(); 
            guess= ((guessTime - time)*4/9).toFixed(1);
          }, 100);
        }

        time = Date.now()

        $("#get").css('display', 'none');
        $("#sett").css('display', 'none');
        $("#guess").css('display', 'block');
        var colorstr = genandloadcolors()[3];
        for (var i = 0; i < 3; i++){
          colorgot[i] = genandloadcolors()[i];
        }
        $("#colour").css('display', 'none');
        $("#color").css('background', colorstr);

      });

      //Reset to default grid and clear data if theres any
      $("#reset").click(function(){

        /*Implementation Alert:
          ALL game data will be CLEARED and the page will literally RELOAD, but
          if RESET button is pressed, there will be a prompt for confirm though.
          Also all the code after this implementation here will become useless.*/

        var confirm = prompt("Are you sure you want to RESET the entire game('Y' to confirm, anything else to cancel)?\n(Pro Tip: If you confirm, data will be gone for a loooooong time!)");
          if(confirm == "Y"){
            location.reload();
          }
          else{}

      });

      //Make the guess and output the result accordingly
      /*$("#submit").click(function(){
        
        //Sound
        var snd = new Audio("super-jump.mp3");
        
        if (numturns == 0){
          //Terminating current run
          snd = null;
          myAudio.pause();
          countup = 100;
          
        
        //Resetting buttons
        $("#get").css('display', 'block');
        $("#changeSettings").css('display', 'block');
        $("#guess").css('display', 'none');
        $("#colour").css('display', 'block');
        //Resetting colorboard
        $("#color").css('background', 'linear-gradient(45deg,#e66465, #9198e5)');
        //Resetting percentage off
        $("#rgbpercentoff").text("You've not made any guesses yet :(");
        $("#score").text("Final Score: ");
        
        //Resetting score calculation data
        colorgot = [0,0,0];
        colorguess = [0,0,0];
        resultarr = [0,0,0];
        //Resetting Turn Recorder
        n = info[1];
        //Resetting other settings
        $("#dispcheck").text("Game Mode: Normal");
        $("#sett").css('display', 'block');
        time = Date.now();

        //Resetting the sliders 
        $("#slider-horR").slider("value", 0);
        $("#slider-horG").slider("value", 0);
        $("#slider-horB").slider("value", 0);
        $( "#amountR" ).val( $( "#slider-horR" ).slider( "value" ) );
        $( "#amountG" ).val( $( "#slider-horR" ).slider( "value" ) );
        $( "#amountB" ).val( $( "#slider-horR" ).slider( "value" ) );

        //Restore turn values
        numturns = info[1];
        $("#dispnum").text("Number of turns: "+info[1]);
        }*/

        

        //Actual Gameplay starts here
        snd.play();
        numturns--;
        if (numturns == 0){$("#guess").html("Out of Guesses");}
        
        $("#dispnum").text("Number of turns: "+numturns);
        //Percent Off
        if($("#colour").css('display') == "block"){}
        else{
          colorguess[0] = $("#amountR").val();
          colorguess[1] = $("#amountG").val();
          colorguess[2] = $("#amountB").val();
          resultscore = dothescore(colorguess, colorgot, guess);
          
          if (resultscore > bestScore) {
            bestScore = resultscore;
            $("#best").text("Best Score: " + bestScore);
          }
          
          $("#score").text("Final Score: " + resultscore);
        }
      });

      $("#changeSettings").click(function(){
        $("#dispname").text("Player Name: "+$("#playerName").val());
        $("#dispnum").text("Number of turns: "+$("#numturns").val());
      });

    
    };

    
    return this;
    
}( jQuery ));
$("#game").Fourcubed();
let test_over = false;
let time_is_up = false;

$("#press").on("click", function(e){
e.preventDefault();
$.ajax({
    url:"http://localhost/Web%20Project/test.php",
    type:"GET",
    dataType:'json',
    success:function(obj){
        for(let i=0; i<obj.length; i++){
        let q = obj[i].question;
        let cans = obj[i].correct_answer;
        let ans2 = obj[i].answer2;
        let ans3 = obj[i].answer3;
        let choice1 = parseInt(Math.random()*50);
        let choice2 = parseInt(Math.random()*50);
        let choice3 = parseInt(Math.random()*50);

        let form = document.querySelector("#ans");
        let header_question = document.createElement("h3");
        header_question.id = "question";
        header_question.innerText = `Question ${i+1}: ${q}`;
        form.appendChild(header_question);

        let rad1 = document.createElement("input");
        let rad2 = document.createElement("input");
        let rad3 = document.createElement("input");
        rad1.type = "radio";
        rad2.type = "radio";
        rad3.type = "radio";
        rad1.name = rad2.name = rad3.name = i;
        rad1.id = `answer1_${i}`;
        rad2.id = `answer2_${i}`;
        rad3.id = `answer3_${i}`;
        for(let j=0; j<3; j++){
            if(choice1>choice2 && choice1>choice3){
                let answer = document.createElement("label");
                let br = document.createElement("br");
                answer.htmlFor=`answer1_${i}`;
                answer.innerText = cans;
                rad1.className = "correct"; // Changing the class name to correct to identify that this answer is the correct one
                form.appendChild(rad1);
                rad1.after(answer);
                answer.after(br);
                choice1 = -1;
            }

            else if(choice2>choice3){
                let answer = document.createElement("label");
                let br = document.createElement("br");
                answer.htmlFor=`answer2_${i}`;
                answer.innerText = ans2;
                form.appendChild(rad2);
                rad2.after(answer);
                answer.after(br);
                choice2 = -2;
            }

            else{
                let answer = document.createElement("label");
                let br = document.createElement("br");
                answer.htmlFor=`answer3_${i}`;
                answer.innerText = ans3;
                form.appendChild(rad3);
                rad3.after(answer);
                answer.after(br);
                choice3 = -3;
            }
        }
        document.querySelector("#ans").appendChild(document.createElement("br"));
    }

    let submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Submit";
    submit.id = "submit_btn"
    submit.style.display = "none";
    document.querySelector("#ans").appendChild(submit);
    countdown( "countdown", 15, 0); // Starting timer
    document.querySelector("#press").innerText = "Good Luck !";
    document.getElementById("press").style.backgroundColor = "lightgreen";
    $("#press").prop('disabled', true);
    document.getElementById("countdown").style.display = ""; // Making timer visible
    document.getElementById("countdown").style.visibility = "visible";
    document.getElementById("countdown").style.border = "5px solid #004853"; // Making timer border visible
    document.getElementById("countdown").style.display = "none"; // This is for the effect to work
    $("#countdown").fadeIn("slow");
    document.getElementById("sbmit_btn").style.display = ""; // Making submit button visible
    $("#press").fadeOut(2000);
    },
    error: function(errorObj,txt){
        alert(errorObj.status+" "+errorObj.statusText);
    }
})
});

$("#submit").on("click", function(){
    // This method will be called onece the user presses submit on the popup
    test_over = true;
    let score = getScore();
    let correct = getScoreWeight();
    
    //document.getElementById("submit_btn").click();
    if(score>=1){
        if(!time_is_up){
        document.querySelector("#myModalLabel").innerText = `Score: ${score}/${correct}`;
        }

        document.querySelector("#cancel_btn").innerHTML = "Close";
        document.getElementById("submit").style.display = "none";
        document.getElementById("p_check_submit").style.display = "none";
        document.getElementById("passed").style.display = "";
    }

    else{
        if(!time_is_up){
        document.querySelector("#myModalLabel").innerText = `Score: ${score}/${correct}`;
        }

        document.querySelector("#cancel_btn").innerHTML = "Close";
        document.getElementById("submit").style.display = "none";
        document.getElementById("p_check_submit").style.display = "none";
        document.getElementById("failed").style.display = "";

    }
});

$("#cancel_btn").on("click", function(){
    // This will be called on the cancel button of the popup to make sure that the test is not over and to not end the test
    if(test_over){
        document.getElementById("submit_btn").click();
    }
});

$("#btn_close_popup").on("click", function(){
    // This will be called on the cancel button of the popup to make sure that the test is not over and to not end the test
    if(test_over){
        document.getElementById("submit_btn").click();
    }
});

// Below is the timer functions
function countdown(elementName, minutes, seconds)
{
    // This is the main function that will be called on an empty div
    let element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        if(test_over){
            return;
        }

        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            // When time is up
            time_is_up = true;
            element.innerHTML = "Time is up!";
            let score = getScore();
            let correct = getScoreWeight();
            document.querySelector("#myModalLabel").innerText = `Time is up!\nScore: ${score}/${correct}`;
            document.getElementById("sbmit_btn").click();
            document.getElementById("submit").click(); // Pressing button submit
        } 
        
        else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
};

const getScore = ()=>{
    let score = 0;
    let correct = Array.from(document.querySelectorAll(".correct"));
    for(let i in correct){
        if(correct[i].checked==true){
            score++;
        }
    }
    return score;
}

const getScoreWeight = ()=>{
    let correct = Array.from(document.querySelectorAll(".correct"));
    
    return correct.length;
}
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
        header_question.innerText = q;
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
    }
    document.querySelector("#ans").appendChild(document.createElement("br"));
    let submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Submit";
    submit.id = "submit"
    document.querySelector("#ans").appendChild(submit);
    $("#press").remove();
    },
    error: function(errorObj,txt){
        alert(errorObj.status+" "+errorObj.statusText);
    }
})
});

$("body").on("click", "#submit" ,function(){
    let score = 0;
    let correct = Array.from(document.querySelectorAll(".correct"));
    for(let i in correct){
        if(correct[i].checked==true){
            score++;
        }
    }

    alert(`Your score is ${score}/${correct.length}`);
})
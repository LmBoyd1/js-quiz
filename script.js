var start=document.querySelector("#start")
var intro=document.querySelector(".intro")
var questions=document.querySelector(".questions")
var initials=document.querySelector(".initials")
var highscore=document.querySelector(".highscore")
var timer=document.querySelector("#timer")
var save=document.querySelector("#save")
var initialbox=document.querySelector("#initialbox")
var dashBoard=document.querySelector(".dashboard")
var highscoreArray=[]
if (localStorage.getItem("highscore")){
    highscoreArray=JSON.parse(localStorage.getItem("highscore"))
}
var goBack=document.querySelector("#goBack")
var clearHistory=document.querySelector("#clearHistory")
var quizData=[
    {
        title:"What's your favorite coding language?",
        choices:["Javascript","React","HTML","CSS"],
        answer:"Javascript"
    },
    {
        title:"What's the best way to code?",
        choices:["VSCODE","Terminal","Google","Youtube"],
        answer:"VSCODE"
    },
    {
        title:"Best computer to code on?",
        choices:["Mac","PC","Chromebook","Thinkpad"],
        answer:"Mac"
    },
    {
        title:"Was this quiz easy?",
        choices:["No","Yes","A little","tough"],
        answer:"No"
    }
]
var time=quizData.length*15
var timerId
var index=0
start.addEventListener("click",startQuiz)
function startQuiz(){
    intro.classList.add("hide")
    questions.classList.remove("hide")
    timerId=setInterval(startClock,1000)
    displayQuestions()
}
function startClock(){
timer.textContent=time
time--
}
function displayQuestions(){
    questions.innerHTML=
    `<h4>${quizData[index].title}</h4>
    <ul>
        <li><button class="choiceBtn">${quizData[index].choices[0]}</button></li>
        <li><button class="choiceBtn">${quizData[index].choices[1]}</button></li>
        <li><button class="choiceBtn">${quizData[index].choices[2]}</button></li>
        <li><button class="choiceBtn">${quizData[index].choices[3]}</button></li>
    </ul><p id="message"></p>`
    var choiceBtn=document.querySelectorAll(".choiceBtn")
    var message=document.querySelector("#message")
    for (let i = 0; i < choiceBtn.length; i++) {
        choiceBtn[i].addEventListener("click",function(){
            index++
            if(index<quizData.length){
                console.log(this.textContent,quizData[index-1].answer)
                if(this.textContent===quizData[index-1].answer){
                    message.textContent="Correct"
                }
                else{
                    message.textContent="Wrong"
                    time=time-15
                }
                setTimeout(displayQuestions,500)  
            }
            else{
                clearInterval(timerId)
                questions.classList.add("hide")
                initials.classList.remove("hide")
            }
        })
        
    }
}
save.addEventListener("click",function(){
    highscoreArray.push({
        initial:initialbox.value,
        score:time
    })
    localStorage.setItem("highscore",JSON.stringify(highscoreArray))
    initials.classList.add("hide")
    highscore.classList.remove("hide")
    showScore()
})
goBack.addEventListener("click",function(){
    location.replace("index.html")

})
clearHistory.addEventListener("click",function(){
    localStorage.clear()
})
function showScore(){
    dashBoard.innerHTML=""
    for (let i = 0; i < highscoreArray.length; i++) {
    dashBoard.innerHTML=dashBoard.innerHTML+highscoreArray[i].initial+" "+highscoreArray[i].score+"<br>"   
    }
}
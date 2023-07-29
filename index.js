var pattern = []
var userpattern = []
var colours = ["red","green","yellow","blue"]
var level = 0;
var start = false;

$(document).keypress(function()
{
    if(!start)
    {
        start = true;
        nextsequence();
        $("h1").text("Level "+level);
    }
})

$(".buton").click(function()
{
    var nameOfClass = this.classList.item(0);
    userpattern.push(nameOfClass);
    playSound(nameOfClass);
    animatebutton(nameOfClass);
    checkUserAns(userpattern.length-1);  
})

function checkUserAns(currlevel)
{
    if(pattern[currlevel]==userpattern[currlevel])
    {
        if(userpattern.length==pattern.length)
        {
            setTimeout(function () {
                nextsequence();
              }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 1000);
        $("h1").text("Game Over, Press Any Key To Restart");
        startover();
    }
}


function pattgenerate()
{
    var num = Math.floor(Math.random()*4);
    pattern.push(colours[num]);
}

function nextsequence()
{
    userpattern = [];
    level++;
    $("h1").text("Level "+level);
    pattgenerate();
    var temp = pattern[level-1];
    playSound(temp);
    classname = "."+temp;
    $(classname).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatebutton(word)
{
    var classname = "."+word;
    $(classname).addClass("pressed"); 
    setTimeout(function(){
        $(classname).removeClass("pressed");
    },100);
}

function playSound(word)
{
    var address = "./sounds/"+word+".mp3";
    var audio = new Audio(address);
    audio.play();
}

function startover()
{
    userpattern = [];
    pattern = [];
    start = false;
    level =0;
}





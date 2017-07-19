
$(function(){


let computer = [];
let player = [];
let start = false;
let strict = false;
let count = 0;
let score = 1;
let power = false;
document.getElementById('startButton').disabled = true;
document.getElementById('strict').disabled = true;


//****************Game Loop**************/
function playerClick(e){


// Only do something if power is on and start is enabled
    if(start === true && power === true){

    //get id, blink color and add chosen cell to player array 
    let id = '#' + e.target.id;
    blink(id);
    player.push(id);

        // if you score 20 you win and game ends .. then starts again from beginning after 2 secs
        if(score >= 20){
            alert('You Win!');
            computer = [];
            player = [];
            start = true;
            strict = false;
            count = 0;
            score = 1;
            generateNext(0,3);
             setTimeout(function(){
                        flash(computer);
                    },2000);
            return;
        }
        else{
            // compare computer array and player array.. if returned true (matched) ,add to count.
            if(compareArrays(computer,player)){
                    document.getElementById("rightWrong").innerHTML = '';
                    count++;
                    // compare array length match to make sure enough items have been clicked.
                    // if so reset player, count.. generate new number , wait 2 secs and flash to player...
                if(computer.length === player.length){
                    score++;
                    // document.getElementById('displayText').innerHTML = score;
                    player = [];
                    count = 0;
                    generateNext(0,3);
                        setTimeout(function(){
                        flash(computer);
                    },2000);
                    
                        return;
                }
                else{
                    return;
                }
            }
            // if arrays dont match.. display wrong message... reset count and player..then flash sequence to player again
                if(compareArrays(computer, player) === false){
                    document.getElementById("rightWrong").innerHTML = 'Wrong';
                    count = 0;
                    player = [];
                
                    if(strict){
                        computer = [computer[0]];
                        score = 1;
                    }

                    setTimeout(function(){
                        flash(computer);
                    },2000);
                }
        }

    
}
}
//******************Game Loop end*************************

function blink (id){
    // after 1 second add class then take take class off again...
    setTimeout(function(){
        // timeout to put flash class on 
        $(id).toggleClass('flash');
        playSound(id);
        // timeout to takeoff flash class
        setTimeout(function(){
            $(id).toggleClass('flash');
        },500);
    },250);

    }
    


function flash(array){

   

    let i=0;
    let x = setInterval(function(){
        
        if(i < computer.length ){
            blink(array[i]);
            i++;
        }
        else{
            clearInterval(x);
        }
    }, 700); // main speed
}

function playSound (id) {

    if(id === '#0'){
        document.getElementById('blue').play();
    }

       if(id === '#1'){
        document.getElementById('red').play();
    }

     if(id === '#2'){
        document.getElementById('orange').play();
    }
     if(id === '#3'){
        document.getElementById('green').play();
    }
    
}

// pushes random number between 0 and 3 to the ai array
function generateNext(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1) ) + min;
    num = '#'+num;
    computer.push(num);
    document.getElementById('displayText').innerHTML = score;
    return 
}

function compareArrays(computer, player){
    if(computer[count] === player[count]){
    return true;
    }
    else{
        return false;
    }
} 

function onOff(e){
    
     if(e.target.checked === true){
        document.getElementById("displayText").innerHTML = '--'
        power = true;
        document.getElementById('startButton').disabled = false;
        document.getElementById('strict').disabled = false;
        document.getElementById('strictLight').style.background = "pink";
     }
     if(e.target.checked === false){
         document.getElementById("displayText").innerHTML = '';
          computer = [];
          player = [];
          start = false;
          strict = false;
          score = 0;
          power = false;
          document.getElementById('startButton').disabled = true;
          document.getElementById('strict').disabled = true;
          document.getElementById('strictLight').style.background = "pink";
     }
}

function startGame(){
    generateNext(0,3);
    flash(computer);
    start = true;
    document.getElementById('startButton').disabled = true;
    document.getElementById('strict').disabled = true;
}

function strictFunc (){
    strict = true;
    document.getElementById('strict').disabled = true;
    document.getElementById('strictLight').style.background = "red";
}


// ********BOX CLICK EVENTS***********************************
document.getElementById("0").addEventListener("click", playerClick);
document.getElementById("1").addEventListener("click", playerClick);
document.getElementById("2").addEventListener("click", playerClick);
document.getElementById("3").addEventListener("click", playerClick);
// ********Power switch event******************************************
document.getElementById("checkbox").addEventListener("click", onOff );

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('strict').addEventListener('click', strictFunc);

});










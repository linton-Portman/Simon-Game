
$(function(){


let computer = [];
let player = [];
let start = false;
let strict = false;
let speed ;
let count = 0;
let score = 1;
let power = false;
document.getElementById('startButton').disabled = true;
document.getElementById('strict').disabled = true;


//****************Game Loop**************/
function playerClick(e){
    let id = '#' + e.target.id;
    blink(id);
    player.push(id);

    if(start === true && power === true){

        if(score === 20){
            console.log('You Win!');
            return;
        }
        else{
            if(compareArrays(computer,player)){
                    document.getElementById("rightWrong").innerHTML = '';
                    count++;

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
        },250);
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
    }, 500); // main speed
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
          speed ;
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










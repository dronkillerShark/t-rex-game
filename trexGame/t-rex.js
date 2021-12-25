const score = document.querySelector('.score');
const dino = document.querySelector('.dino');
const cloud = document.querySelector('.cloud');
const cactus = document.querySelector('.cactus');

let counter = 0;
let isUp = false;
let levelOfTheGame = 50;
let isDie = false;
const cactusY = 400;
let cactusX = 1500;


const newCactus = function(){
    const cactusInterval = setInterval(() => {
    if(dino.x < (cactus.x - 100) + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.height + dino.y > cactus.y){
        isDie = true;
        dino.src = "trexGame/trex.png";
        clearInterval(cactusInterval);
     }
    if(cactusX <= -100){
        levelOfTheGame += 2;
        cactusX = 1500;
        cactus.src = Math.trunc(Math.random() * 3) == 1? "trexGame/cactus.png":"trexGame/cactus2.png";
    }
    cactusX -= levelOfTheGame;
    cactus.style.left = cactusX + "px";
}, 100)
}

const newCloud = function(){
    let cloudX = 670;
    const cloudInterval = setInterval(() => {
        if(isDie){
            clearInterval(cloudInterval);
        }
        if(cloudX <= -100){
            cloudX = 1500;
            cloud.src = Math.trunc(Math.random() * 3) == 1? "trexGame/cloudy.png":"trexGame/cloud.png"
        }
        cloudX -= levelOfTheGame;
        cloud.style.left = cloudX + "px";
    }, 100)
}
newCactus();
newCloud();

const scoreInterval = setInterval(() => {
        if(isDie){
            clearInterval(scoreInterval);
        }
        counter += 1;
        score.textContent = `score: ${counter}`;
}, 100)

window.addEventListener("keydown", (e)=>{
    let y = 500;
    if(e.code == "Space" && !isUp && !isDie){
        isUp = true;
        const jumpInterval = setInterval(() => {
           if(y <= 300){
            const goDownInterval = setInterval(() => {
                if(y >= 500){
                    isUp = false;
                    clearInterval(goDownInterval);
                }
                y += 5;
                dino.style.top = y + "px";
             }, 10)
               clearInterval(jumpInterval);
           }
           y -= 5;
           dino.style.top = y + "px";
        }, 10)
    }
})
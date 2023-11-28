class UI {
    constructor () {
        this.rulesBtn = document.querySelector(".rules-btn btn");
        this.rulesPopup = document.querySelector(".popup");
        this.body = document.querySelector("body");
        this.closeBtn = document.querySelector(".close-popup");
        this.fightSpace = document.querySelector(".fight-space");
        this.fightStart = document.querySelector(".fight-start");
        this.images = ["images/icon-lizard.svg", "images/icon-paper.svg", "images/icon-rock.svg", "images/icon-scissors.svg", "images/icon-spock.svg"];
    }
    showRules() {
        this.body.classList.add("show-popup");
    }
    hideRules() {
        this.body.classList.remove("show-popup");
    }
    movingToStepTwo(pickedImage) {

        var housePick = this.fightStart.querySelector(".house-pick");
        var houseImg = document.createElement("img");
        houseImg.src = this.selectRandomImage();
        housePick.dataset.pick = this.fightSpace.querySelector(`.image[data-src="${houseImg.src.slice(houseImg.src.indexOf("images"))}"]`).dataset.pick;        
        this.fightSpace.classList.remove("stepOne");
        var userPick = this.fightStart.querySelector(".user-pick");
        userPick.dataset.pick = pickedImage.dataset.pick;
        
        var img = document.createElement("img");
        img.src = pickedImage.querySelector("img").src;
        userPick.appendChild(img);
        
        setTimeout(() => {
            housePick.appendChild(houseImg);
        }, 1000);
    }

    selectRandomImage() {
        return this.images[Math.floor(Math.random() * this.images.length)];
    }
}

class Game{
    constructor (pick) {
        this.pick = pick;
        this.map = {
            rock: ["scissors", "lizard"],
            scissors: ["paper", "lizard"],
            paper: ["rock", "spock"],
            lizard: ["spock", "paper"],
            spock: ["scissors", "rock"]
        }
    }
    determineWinner(housePick){
        return this.pick === housePick.pick ? "Draw" : this.map[this.pick].indexOf(housePick.pick) != -1 ? "Win" : "Lose";
    }
}

function eventListeners(e) {
    const rulesBtn = document.querySelector(".rules-btn .btn");
    const fightSpace = document.querySelector(".fight-space");
    const fightStart = document.querySelector(".fight-start");
    var currentScore = document.querySelector(".currentScore");

    const ui = new UI();

    if (!localStorage.getItem("score")){
        localStorage.setItem("score", "0");
    }
    currentScore.textContent = localStorage.getItem("score");

    document.addEventListener("click", function (e) {
        if (e.target.closest(".close-popup")){
            ui.hideRules();
        }
    });

    rulesBtn.addEventListener("click", function (e) {
        e.preventDefault();
        ui.showRules();
    });

    fightSpace.addEventListener("click", function (e) {
        if(e.target.closest(".image.first-step")){
            ui.movingToStepTwo(e.target.closest(".image"));
            var userPick = new Game(fightStart.querySelector(".user-pick").dataset.pick);
            var housePick = new Game(fightStart.querySelector(".house-pick").dataset.pick);
            var fightResult = userPick.determineWinner(housePick);
            
            setTimeout(() => {
                fightSpace.querySelector(".fight-result h2").textContent = fightResult === "Win" ? "You Win" : fightResult === "Draw" ? "Draw" : "You Lose";
                fightStart.classList.add("show-result");
                if (fightResult === "Win") {
                    currentScore.textContent = +currentScore.textContent + 1;
                    fightStart.querySelector(".user-pick").classList.add("winner");
                }else if (fightResult === "Lose") {
                    currentScore.textContent = +currentScore.textContent - 1;
                    fightStart.querySelector(".house-pick").classList.add("winner");
                }
                localStorage.setItem("score", currentScore.textContent);
            }, 1500);
        }
    });

    document.addEventListener("click", function (e) {
    
        if(e.target.classList.contains("replay")){
            fightStart.querySelectorAll(".image").forEach((image) => {
                image.removeAttribute("data-pick");
                image.querySelector("img").remove();
                image.classList.contains("winner") ? image.classList.remove("winner") : null;
            });
            
            fightStart.classList.remove("show-result");
            fightSpace.classList.add("stepOne");
        }
    });
}

document.addEventListener("DOMContentLoaded", eventListeners);


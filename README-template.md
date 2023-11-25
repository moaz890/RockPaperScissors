# Frontend Mentor - Rock, Paper, Scissors solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors against the computer
- Maintain the state of the score after refreshing the browser _(optional)_
- **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer _(optional)_


### Links

- Solution URL: [Add solution URL here](https://github.com/moaz890/RockPaperScissors)
- Live Site URL: [Add live site URL here](https://moaz890.github.io/RockPaperScissors/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

- Applying My OOP Knowldge
```js
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
        housePick.dataset.pick = this.fightSpace.querySelector(`.image[data-src="${houseImg.src.slice(22)}"]`).dataset.pick;
        
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

```

### Continued development

- Using APIs
- Applying OOP Conceptions


## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/moaz890)
- Twitter - [@yourusername](https://www.twitter.com/Prog_Abdelattey)
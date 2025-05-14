const dino = document.querySelector(".dino");
const obstacle = document.querySelector(".obstacle");
const score = document.querySelector(".score");
const button = document.querySelector("button");
let points = 0;
let isleft = false;
let left = parseInt(
  window.getComputedStyle(dino, null).getPropertyValue("left")
);

let music = new Audio('music.mp3');
let gameover = new Audio('gameover.mp3')


setTimeout(()=>{
    music.load()
    music.loop=true;
    music.play();
},1000)

let isPlaying = true;

if (isPlaying) {
  button.style.visibility = "hidden";
}

document.addEventListener("keydown", function (e) {
  if (!isPlaying) {
    return;
  }

  if (e.key === "ArrowUp") {
    dino.classList.add("animatedino");
    setTimeout(() => {
      dino.classList.remove("animatedino");
    }, 700);
  }
  if (e.key === "ArrowLeft") {
    dino.style.left =
      parseInt(window.getComputedStyle(dino, null).getPropertyValue("left")) -
      100 +
      "px";
  }
  if (e.key === "ArrowRight") {
    dino.style.left =
      parseInt(window.getComputedStyle(dino, null).getPropertyValue("left")) +
      100 +
      "px";
  }
});

setInterval(() => {
  const dx = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("left")
  );
  const dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("bottom")
  );

  const ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("bottom")
  );

  const diffX = Math.abs(dx - ox);
  const diffY = Math.abs(dy - oy);

  console.log(diffX, diffY);

  if (diffX < 50 && diffY < 50) {
    document.querySelector(".gameOver").textContent = "Game Over";
    document.querySelector(".gameOver").style.color = 'red';

    obstacle.classList.remove("animateobstacle");

    isPlaying = false;
    button.style.visibility = "visible";
    dino.style.visibility = "hidden";
    obstacle.style.visibility = "hidden";

    music.pause();
    gameover.play()

    setTimeout(() => {
      gameover.pause();
    }, 1000);
  } else {
    if (ox < dx && !isleft) {
      points += 1;
      updateScore(points);
      setTimeout(() => {
        const dur = parseFloat(
          window
            .getComputedStyle(obstacle, null)
            .getPropertyValue("animation-duration")
        );
        let newDur = Math.max(1.5, dur - 0.3);
        obstacle.style.animationDuration = newDur + "s";
      }, 1000);
      isleft = true;
    } else if (ox >= dx && isleft) {
      isleft = false;
    }
  }
}, 20);

function updateScore(points) {
  score.innerHTML = `Your score is ${points}`;
}

function restartGame() {
  button.style.visibility = "hidden";
  points = 0;
  isleft = false;
  isPlaying = true;
  dino.style.visibility = "visible";
  obstacle.style.visibility = "visible";
  obstacle.classList.add("animateobstacle");
  document.querySelector(".gameOver").textContent="Welcome to Dragon World - created by Punit";
  document.querySelector(".gameOver").style.color = 'black';
  obstacle.style.animationDuration = "7s";
  score.innerHTML = score.innerHTML = `Your score is ${points}`;
  dino.style.left = "10vw";
  dino.style.bottom = 0;
  music.play();
  music.loop=true;
}

button.addEventListener("click", () => {
  restartGame();
});

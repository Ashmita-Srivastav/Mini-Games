const bottlePositions = [50, 150, 250];
const buttonKeys = ['a', 's', 'd'];

let gameState = {
  status: "not-started",
  round: 0,
  maxRounds: 5,
  fallDuration: 2000,
  fallingBottleIndex: null,
  fallStartTime: null,
  reactionTimes: [],
  score: 0,
  roundOver: false
};

const startGame = (difficulty = "medium") => {
  const difficulties = {
    easy: 2000,
    medium: 1500,
    hard: 1000
  };
  gameState.fallDuration = difficulties[difficulty];
  gameState.status = "playing";
  gameState.round = 0;
  gameState.reactionTimes = [];
  gameState.score = 0;
  gameState.roundOver = false;

  document.getElementById("score").textContent = 0;
  document.getElementById("difficulty-buttons").style.display = "none";
  document.getElementById("game-status").textContent = "Game Started! Press A, S, or D!";
  document.getElementById("popup-modal").style.display = "none";

  nextRound();
};

const nextRound = () => {
  if (gameState.round >= gameState.maxRounds) {
    showPopup();
    return;
  }

  gameState.roundOver = false;
  gameState.round++;
  const index = Math.floor(Math.random() * 3);
  gameState.fallingBottleIndex = index;

  const bottle = document.getElementById(`bottle${index + 1}`);
  bottle.style.left = `${bottlePositions[index]}px`;
  bottle.style.top = "0px";
  bottle.style.transition = `top ${gameState.fallDuration}ms linear`;
  bottle.style.display = "block";

  setTimeout(() => {
    bottle.style.top = "360px";
    gameState.fallStartTime = Date.now();
  }, 50);

  setTimeout(() => {
    if (!gameState.roundOver) {
      document.getElementById("game-status").textContent = "❌ Missed!";
      gameState.reactionTimes.push(null);
      endRound(index);
    }
  }, gameState.fallDuration + 100);
};

const endRound = (index) => {
  const bottle = document.getElementById(`bottle${index + 1}`);
  bottle.style.display = "none";
  gameState.roundOver = true;

  setTimeout(nextRound, 1000);
};

function handleKeyPress(key) {
  if (gameState.status !== "playing" || gameState.roundOver) return;

  const pressedKey = key.toLowerCase();
  const expectedKey = buttonKeys[gameState.fallingBottleIndex];

  if (pressedKey === expectedKey) {
    const timeTaken = Date.now() - gameState.fallStartTime;
    gameState.score++;
    document.getElementById("score").textContent = gameState.score;
    gameState.reactionTimes.push(timeTaken);
    document.getElementById("game-status").textContent = `✅ ${timeTaken}ms`;
  } else {
    gameState.reactionTimes.push(null);
    document.getElementById("game-status").textContent = "❌ Wrong key!";
  }

  endRound(gameState.fallingBottleIndex);
}

// Keyboard support
document.addEventListener("keydown", (e) => handleKeyPress(e.key));

function showPopup() {
  const validTimes = gameState.reactionTimes.filter(t => typeof t === 'number');
  const average = validTimes.length
    ? Math.round(validTimes.reduce((a, b) => a + b, 0) / validTimes.length)
    : "N/A";
  const best = validTimes.length
    ? Math.min(...validTimes) + "ms"
    : "N/A";

  const popup = document.getElementById("popup-content");
  popup.innerHTML = `
    ${gameState.reactionTimes.map((t, i) =>
      `<div>Round ${i + 1}: ${t === null ? "❌ Missed" : `${t}ms`}</div>`
    ).join("")}
    <hr>
    <div><strong>Average Time:</strong> ${average === "N/A" ? average : average + "ms"}</div>
    <div><strong>Best Time:</strong> ${best}</div>
  `;

  document.getElementById("popup-modal").style.display = "flex";
}

function restartGame() {
  document.getElementById("difficulty-buttons").style.display = "flex";
  document.getElementById("popup-modal").style.display = "none";
  document.getElementById("game-status").textContent = "Choose difficulty to start";
}

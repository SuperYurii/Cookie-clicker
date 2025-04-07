console.log("This is connected correctly");

// We have to store some global values!You can store these values inside a neat and tidy object that contains all your game data!

let gameData = {
  cookieCount: 0,
  cookiesPerSecond: 1,
};
let counter = document.getElementById("count");
setInterval(function () {
  gameData.cookieCount += gameData.cookiesPerSecond;
  counter.innerText = "Cookies: " + gameData.cookieCount;
  saveCookies();
}, 1000);

let addCookieButton = document.getElementById("cookie-increment-button");

addCookieButton.onclick = function () {
  gameData.cookieCount += 1;
  counter.innerText = "Cookies: " + gameData.cookieCount;
  saveCookies();
};

//////Working with local storage////
// 1)loadCookies
function loadCookies() {
  const saved = localStorage.getItem("gamedata.cookieCount");
  if (saved !== null) {
    gameData.cookieCount = Number(saved);
    counter.innerText = "Cookies: " + gameData.cookieCount;
  }
}
loadCookies();
function loadCookiesPerSecond() {
  const saved = localStorage.getItem("gamedata.cookiesPerSecond");
  if (saved !== null) {
    gameData.cookiesPerSecond = Number(saved);
  }
}
loadCookiesPerSecond();
// 2)saveCookies
function saveCookies() {
  localStorage.setItem("gamedata.cookieCount", gameData.cookieCount);
}
saveCookies();
// 3)saveCookiesPerSecond
function saveCookiesPerSecond() {
  localStorage.setItem("gamedata.cookiesPerSecond", gameData.cookiesPerSecond);
}
saveCookiesPerSecond();
// 4)reset counter
let cleanStorage = document.getElementById("reset-button");
cleanStorage.onclick = function resetData() {
  localStorage.clear();
  location.reload();
};

const shopUpgradesArray = [];
// This is an empty array!  We should fill it with the upgrades from our API.(provided by Joe)
async function loadUpgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  //   console.log("HTTP Response:", response);
  const data = await response.json();
  //   console.log("This is Json  data:", data);
  shopUpgradesArray.push(...data);
  return data;
}

//Let's come up with a way to retrieve and display the upgrades from Joe's API!

const upgradesContainer = document.getElementById("upgrades-shop-container");

function createUpgrades(shopUpgradesArray) {
  for (let i = 0; i < shopUpgradesArray.length; i++) {
    const upgrade = shopUpgradesArray[i];

    const upgradeElement = document.createElement("p");
    upgradeElement.className = "upgrade";
    upgradeElement.innerText = ` ${upgrade.name}, Cost: ${upgrade.cost}, Increase: ${upgrade.increase}`;
    let button = document.createElement("button");
    button.innerText = `buy`;
    button.addEventListener("click", function () {
      buyUpgrade(upgrade);
    });
    upgradeElement.appendChild(button);

    upgradesContainer.appendChild(upgradeElement);
  }
}

async function init() {
  await loadUpgrades();
  createUpgrades(shopUpgradesArray);
}

init();
function buyUpgrade(upgrade) {
  if (gameData.cookieCount >= upgrade.cost) {
    gameData.cookieCount -= upgrade.cost;
    gameData.cookiesPerSecond += upgrade.increase;
    console.log("Upgrade bought:", upgrade.name);
    updateCPSDisplay();
  } else {
    console.log("Недостаточно печенек для:", upgrade.name);
  }
}
let cps = document.getElementById("current-cps");
function updateCPSDisplay() {
  cps.innerText = `You are currently earning ${gameData.cookiesPerSecond} cookie(s) per second`;
  saveCookies();
  saveCookiesPerSecond();
}

updateCPSDisplay();

// //This one is working but I want to try other way///////////////////////////////////////////
// async function getShopUpgrades() {
//   const upgrades = await loadUpgrades(); // получили апгрейды

//
//   for (let upgrade of upgrades) {
//     shopUpgradesArray.push(upgrade);
//   }

//
//   for (let upgrade of shopUpgradesArray) {
//     const div = document.createElement("div");
//     div.innerHTML = `
//         <p>ID: ${upgrade.id}</p>
//         <p>Name: ${upgrade.name}</p>
//         <p>Cost: ${upgrade.cost}</p>
//         <p>Increase: ${upgrade.increase}</p>
//       `;
//     upgradesContainer.appendChild(div);
//   }
// }

// getShopUpgrades();
// ///////////////////////////////////////////////////////////////////////

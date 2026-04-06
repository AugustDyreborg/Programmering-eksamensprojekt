const tileSize = 24;
const tileWide = 38;
const tileHigh = 38;

const GRASS = 0;
const ROAD = 1;
const BUILDING = 2;
const STOP = 3;

let map = []; //array til kortet

let græs1, græs2;
let bygning1, bygning2, bygning3;
let vejLodret, vejVandret;
let vejHjørneVO, vejHjørneHO, vejHjørneVN, vejHjørneHN;
let tVejO, tVejN, tVejV, tVejH;
let vejKryds;

class Tile { //en tile
  constructor(row, col, type) { //den gemmel rækken og kolonnen altså x og y, men også typen 
    this.row = row;
    this.col = col;
    this.type = type;
  }

  draw() {
    let x = this.col * tileSize;
    let y = this.row * tileSize; //fra atributter til pixels

    if (this.type === GRASS) { //tegnet græs men hvor det skifter mellem den ene og den anden
      if ((this.row + this.col) % 2 === 0) {
        image(græs1, x, y, tileSize, tileSize);
      } else {
        image(græs2, x, y, tileSize, tileSize);
      }
    }

    if (this.type === ROAD || this.type === STOP) { //tegner vej
      drawRoad(this.row, this.col, x, y);

      if (this.type === STOP) { //tegnet stoppested ovenpå vej
        fill("red");
        rect(x + 6, y + 6, 12, 12);
      }
    }

    if (this.type === BUILDING) {
      image(getBuildingImage(this.row, this.col), x, y, tileSize, tileSize);
    }
  }
}

function preload() {
  græs1 = loadImage("Billeder/Græs1.png");
  græs2 = loadImage("Billeder/Græs2.png");

  bygning1 = loadImage("Billeder/bygning1.png");
  bygning2 = loadImage("Billeder/bygning2.png");
  bygning3 = loadImage("Billeder/bygning3.png");

  vejLodret = loadImage("Billeder/Vej-lodret.png");
  vejVandret = loadImage("Billeder/Vej-vandret.png");

  vejHjørneVO = loadImage("Billeder/vej-venstre+op.png");
  vejHjørneHO = loadImage("Billeder/vej-højre+op.png");
  vejHjørneVN = loadImage("Billeder/vej-venstre+ned.png");
  vejHjørneHN = loadImage("Billeder/vej-højre+ned.png");

  tVejO = loadImage("Billeder/vej-vandret-og-op.png");
  tVejN = loadImage("Billeder/vej-vandret-og-ned.png");
  tVejV = loadImage("Billeder/vej-lodret-og-venstre.png");
  tVejH = loadImage("Billeder/vej-lodret-og-højre.png");

  vejKryds = loadImage("Billeder/fire-vejs-kryds.png");
}

function setup() {
  createCanvas(tileWide * tileSize, tileHigh * tileSize);
  noStroke();

  makeMap(); //laver et map kun med græs
  generateRandomMap(); //generere et map med huse og veje
}

function draw() {
  background(0);
  drawMap(); //tegner kortet
}

function makeMap() { //laver arrayet og objekterne
  map = [];

  for (let row = 0; row < tileHigh; row++) {
    let currentRow = [];

    for (let col = 0; col < tileWide; col++) {
      currentRow.push(new Tile(row, col, GRASS)); //alle tiles starter som græs
    }

    map.push(currentRow);
  }
}

function drawMap() {
  for (let row = 0; row < tileHigh; row++) {
    for (let col = 0; col < tileWide; col++) {
      map[row][col].draw();
    }
  }
}

function setRoad(row, col) {
  if (insideMap(row, col)) {
    map[row][col].type = ROAD;
  }
}

function setBuilding(row, col) {
  if (insideMap(row, col)) {
    map[row][col].type = BUILDING;
  }
} //laver typen af tile om

function setStop(row, col) {
  if (insideMap(row, col)) {
    map[row][col].type = STOP;
  }
}

function insideMap(row, col) {
  if (row < 0 || row >= tileHigh) return false;
  if (col < 0 || col >= tileWide) return false;
  return true; //tjekker om den er inden for mappet
}

function isRoad(row, col) {
  if (!insideMap(row, col)) {
    return false; 
  }

  return map[row][col].type === ROAD || map[row][col].type === STOP; //tjekker for vej eller stoppested
}

function drawRoad(row, col, x, y) { //bestemmer hvilket billede der skal bruges
  let op = isRoad(row - 1, col);
  let ned = isRoad(row + 1, col);
  let venstre = isRoad(row, col - 1);
  let højre = isRoad(row, col + 1);

  if (op && ned && venstre && højre) {
    image(vejKryds, x, y, tileSize, tileSize);
    return;
  }

  if (venstre && højre && op && !ned) {
    image(tVejO, x, y, tileSize, tileSize);
    return;
  }

  if (venstre && højre && ned && !op) {
    image(tVejN, x, y, tileSize, tileSize);
    return;
  }

  if (op && ned && venstre && !højre) {
    image(tVejV, x, y, tileSize, tileSize);
    return;
  }

  if (op && ned && højre && !venstre) {
    image(tVejH, x, y, tileSize, tileSize);
    return;
  }

  if (venstre && op && !højre && !ned) {
    image(vejHjørneVO, x, y, tileSize, tileSize);
    return;
  }

  if (højre && op && !venstre && !ned) {
    image(vejHjørneHO, x, y, tileSize, tileSize);
    return;
  }

  if (venstre && ned && !højre && !op) {
    image(vejHjørneVN, x, y, tileSize, tileSize);
    return;
  }

  if (højre && ned && !venstre && !op) {
    image(vejHjørneHN, x, y, tileSize, tileSize);
    return;
  }

  if (op && ned) {
    image(vejLodret, x, y, tileSize, tileSize);
    return;
  }

  if (venstre && højre) {
    image(vejVandret, x, y, tileSize, tileSize);
    return;
  }

  if (op || ned) {
    image(vejLodret, x, y, tileSize, tileSize);
    return;
  }

  image(vejVandret, x, y, tileSize, tileSize);
}

function getBuildingImage(row, col) { //vælger et af bygningsbillederne
  let tal = (row + col) % 3;

  if (tal === 0) {
    return bygning1;
  }
  if (tal === 1) {
    return bygning2;
  }
  return bygning3;
}

function randomInt(min, max) { //lavet et tilfædldigt tal, til retningen, længden og altal af veje
  return floor(random(min, max + 1));
}

function generateRandomMap() {
  // 1. hovedveje
  generateMainRoads();

  // 2. sideveje
  generateSideRoads();

  // 3. ekstra små forbindelser
  generateExtraConnections();

  // 4. bygninger
  generateBuildings();

  // 5. stoppesteder
  generateStops();
}

function generateMainRoads() {
  // nogle vandrette hovedveje
  let antalVandrette = randomInt(3, 5);

  for (let i = 0; i < antalVandrette; i++) {
    let row = randomInt(4, tileHigh - 5);

    for (let col = 2; col < tileWide - 2; col++) {
      setRoad(row, col);
    }
  }

  // nogle lodrette hovedveje
  let antalLodrette = randomInt(3, 5);

  for (let i = 0; i < antalLodrette; i++) {
    let col = randomInt(4, tileWide - 5);

    for (let row = 2; row < tileHigh - 2; row++) {
      setRoad(row, col);
    }
  }
}

function generateSideRoads() {
  let antalSideveje = randomInt(8, 14);

  for (let i = 0; i < antalSideveje; i++) {
    let startRow = randomInt(2, tileHigh - 3);
    let startCol = randomInt(2, tileWide - 3);

    if (!isRoad(startRow, startCol)) {
      continue;
    }

    let retning = randomInt(0, 3);
    let længde = randomInt(4, 10);

    if (retning === 0) {
      for (let j = 0; j < længde; j++) {
        setRoad(startRow - j, startCol);
      }
    }

    if (retning === 1) {
      for (let j = 0; j < længde; j++) {
        setRoad(startRow + j, startCol);
      }
    }

    if (retning === 2) {
      for (let j = 0; j < længde; j++) {
        setRoad(startRow, startCol - j);
      }
    }

    if (retning === 3) {
      for (let j = 0; j < længde; j++) {
        setRoad(startRow, startCol + j);
      }
    }
  }
}

function generateExtraConnections() {
  let antal = randomInt(10, 18);

  for (let i = 0; i < antal; i++) {
    let row = randomInt(2, tileHigh - 3);
    let col = randomInt(2, tileWide - 3);

    if (random(1) < 0.5) {
      for (let j = 0; j < randomInt(3, 6); j++) {
        setRoad(row, col + j);
      }
    } else {
      for (let j = 0; j < randomInt(3, 6); j++) {
        setRoad(row + j, col);
      }
    }
  }
}

function generateBuildings() {
  for (let row = 1; row < tileHigh - 1; row++) {
    for (let col = 1; col < tileWide - 1; col++) {
      if (map[row][col].type === GRASS) {
        let tætPåVej = false;

        if (isRoad(row - 1, col)) tætPåVej = true;
        if (isRoad(row + 1, col)) tætPåVej = true;
        if (isRoad(row, col - 1)) tætPåVej = true;
        if (isRoad(row, col + 1)) tætPåVej = true;

        if (!tætPåVej && random(1) < 0.35) {
          setBuilding(row, col);
        }
      }
    }
  }
}

function generateStops() {
  let stopCount = 0;
  let tries = 0;

  while (stopCount < 5 && tries < 500) {
    let row = randomInt(2, tileHigh - 3);
    let col = randomInt(2, tileWide - 3);

    if (map[row][col].type === ROAD) {
      let naboVeje = 0;

      if (isRoad(row - 1, col)) naboVeje++;
      if (isRoad(row + 1, col)) naboVeje++;
      if (isRoad(row, col - 1)) naboVeje++;
      if (isRoad(row, col + 1)) naboVeje++;

      if (naboVeje >= 1) {
        setStop(row, col);
        stopCount++;
      }
    }

    tries++;
  }
}

function keyPressed() {
  if (key === "r" || key === "R") {
    makeMap();
    generateRandomMap();
  }
}
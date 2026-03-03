const tileSize=24;
const tileWide=38;
const tileHigh=38;
let map;

let græs1, græs2
let bygning1, bygning2, bygning3
let vejLodret, vejVandret
let vejHjørneVO, vejHjørneHO, vejHjørneVN, vejHjørneHN
let tVejO, tVejN, tVejV, tVejH
let vejKryds

function preload() {
  græs1=loadImage("Billeder/Græs1.png");
  græs2=loadImage("Billeder/Græs2.png");
  bygning1=loadImage("Billeder/bygning1.png");
  bygning2=loadImage("Billeder/bygning2.png");
  bygning3=loadImage("Billeder/bygning3.png");
  vejLodret = loadImage("Billeder/Vej-lodret.png");
  vejVandret = loadImage("Billeder/Vej-vandret.png");
  vejHjorneVO = loadImage("Billeder/vej-venstre+op.png");
  vejHjorneHO = loadImage("Billeder/vej-højre+op.png");
  vejHjorneVN = loadImage("Billeder/vej-venstre+ned.png");
  vejHjorneHN = loadImage("Billeder/vej-højre+ned.png");
  tVejO = loadImage("Billeder/vej-vandret-og-op.png");
  tVejN = loadImage("Billeder/vej-vandret-og-ned.png");
  tVejV = loadImage("Billeder/vej-lodret-og-venstre.png");
  tVejH = loadImage("Billeder/vej-lodret-og-højre.png");
  vejKryds = loadImage("Billeder/fire-vejs-kryds.png");
}

function setup() {
  createCanvas(tileWide*tileSize, tileHigh*tileSize);

map = [];
//skal loade græs
for (let x=0; x<tileHigh; x++){
  let row = [];
  for (let y=0; y<tileWide; y++){
    row.push(0)
  }
  map.push(row);
}


}

function draw() {
  background("black");
}

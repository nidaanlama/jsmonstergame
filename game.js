// Oyun Alanını Oluşturma

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Arka Plan Resmini Ekleme
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  // Resmi Gösterme
  bgReady = true;
};
bgImage.src = "background.png";

// Karakteri Ekleme
var heroReady = false;
var heroImage = new Image ();
heroImage.onload = function () {
    // Karakteri Gösterme
    heroReady = true;
};
heroImage.src = "hero.png";

// Canavarı Ekleme
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    // Canavarı Gösterme
    monsterReady = true;
};
monsterImage.src = "monster.png";

// Oyun Nesnelerini Oluşturma
var hero = {
    speed: 256
};
var monster = {};
var monstersCaught = 0;

// Klavye Kontrolü
var keysDown = {};

// Tuşa basıldığınında kontrol
addEventListener("keydown", function (key) {
     keysDown[key.keyCode] = true;
}, false);

addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
}, false);
  

// Sıfırlama
var reset = function () {
    // Oyuncunun pozisyonunu sıfırlama
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Rastgele yerde canavar oluşturma
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.width - 64));
};

// Tuşa basıldığında oyuncunun yerini değiştir

var update = function (modifier) {
    if (38 in keysDown) {
        hero.y -= hero.speed * modifier; // Oyuncu yukarı tuşa bastığında
    }
    if (40 in keysDown){
        hero.y += hero.speed * modifier; // Oyuncu aşağı tuşa bastığında
    }
    if(37 in keysDown){
        hero.x -= hero.speed * modifier; // Oyuncu sol tuşa bastığında
    }
    if (39 in keysDown){
        hero.x += hero.speed * modifier; // Oyuncu sağ tuşa bastığında
    }

    // Oyuncunun canavara çarptığını kontrol etme
    if (
        hero.x <= (monster.x + 32) 
        && monster.x <= (hero.x + 32) 
        && hero.y <= (monster.y + 32) 
        && monster.y <= (hero.y + 32)
        ) {
        ++monstersCaught;
        reset();
    };
}

// Canvasda oyun sahnesinin tasarımı

var render = function () {
    if (bgReady){
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    
    // Skor ve Zaman
    ctx.fillStyle = "rgb(120, 255, 31)";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Yakalanan Canavarlar: " + monstersCaught, 20, 20);
    ctx.fillText("Süre: " + count, 20, 50);
    
    // Süre bitince şu mesajı ekranda göster
    
    if(finished==true){
        ctx.fillText("Oyun Bitti !", 200, 220);
    }

};

// Oyunun kaç saniye süreceği
// Süre 0 olunca zamanlayıcıyı temizle, canavarı ve kahramanı gizle oyunu bitir
var count = 30;
var finished = false;
var counter = function() {
count= count-1;
    if (count <= 0)
    {
        // Zamanlayıcıyı durdur
        clearInterval(counter);
        // Oyunu bitir
        finished=true;
        count=0;
        // Canavarı ve Kahramanı gizle
        monsterReady=false;
        heroReady=false;
    }
}

setInterval(counter, 1000);

// Oyun döngüsü
var main = function() {
    update(0.02);
    render();
    requestAnimationFrame(main);
};

//  Tarayıcı desteği

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Oyunu oynayalım
reset();
main();

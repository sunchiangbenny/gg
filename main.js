var FPS=100
var clock = 0;
var bgImg = document.createElement("img");
var enemyImg = document.createElement("img");
var btnImg = document.createElement("img");
var towerImg = document.createElement("img");
var HP = 100;
var crosshairImg = document.createElement("img");

// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

// 設定這個元素的要顯示的圖片
bgImg.src = "images/map4.png";
enemyImg.src = "images/tower.png";
btnImg.src = "images/tower-btn.png";
towerImg.src = "images/rukia.gif";
crosshairImg.src = "images/crosshair.png";
// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");

function draw(){
	clock++;
	if((clock%80) == 0){
		var newEnemy = new Enemy();
		enemies.push(newEnemy);
	}
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
	ctx.drawImage(bgImg,0,0);
	for(var i=0; i<enemies.length;i++){
		if(enemies[i].HP<=0){
			enemies.splice(i,1);
		}
		enemies[i].move();
		ctx.drawImage(enemyImg,enemies[i].x,enemies[i].y);
	}
	ctx.drawImage(btnImg,640-64,480-64,64,64);
	if(isBuilding == true){
		ctx.drawImage(towerImg,cursor.x-cursor.x%32,cursor.y-cursor.y%32)
     }else{
 	   ctx.drawImage(towerImg,tower.x,tower.y);
 	}
    ctx.fillText("HP:"+HP,10,32);
 	ctx.font="24px Arial"
 	ctx.fillStyle="white"
 	tower.searchEnemy();
    if(tower.aimingEnemyId != null){
    	var id = tower.aimingEnemyId;
        ctx.drawImage(crosshairImg,enemies[id].x,enemies[id].y);
    }
 	
 }
// 執行 draw 函式
setInterval(draw, 1000/FPS);

var enemyPath = [
{x:32,y:448},
{x:32,y:32},
{x:192,y:32},
{x:192,y:416},
{x:192,y:416},
{x:192,y:96},
{x:320,y:96},
{x:320,y:416},
{x:320,y:416},
{x:320,y:32},
{x:576,y:32},
{x:576,y:384},

]

function Enemy () {
	this.x = 32;
	this.y = 448;
	this.HP = 10;
	this.speedX = 0;
	this.speedY = -64;
	this.pathDes = 0;
	this.move = function(){
      if(isCollided( enemyPath[this.pathDes].x , enemyPath[this.pathDes].y , this.x ,this.y , 64/FPS , 64/FPS)){
      this.x = enemyPath[this.pathDes].x;
      this.y = enemyPath[this.pathDes].y;
      this.pathDes++;
      if(this.pathDes == enemyPath.length){
      	this.HP = 0;
      	HP -= 10;
      	return;
      }
      if( enemyPath[this.pathDes].y < this.y){
         this.speedX=0;
         this.speedY=-64;
      }else if( enemyPath[this.pathDes].x > this.x){
      	 this.speedX=64;
         this.speedY=0;
      }else if(enemyPath[this.pathDes].y > this.y){
      	 this.speedX=0;
      	 this.speedY=64;
      }else if(enemyPath[this.pathDes].x < this.x){
         this.speedX=-64;
         this.speedY=0;
      }
      }else{
          	this.x +=this.speedX/FPS;
            this.y +=this.speedY/FPS;

          }

	}
}	

var enemies = [];

var cursor = {
	x:100,
	y:200
}

var tower ={
	x:0,
	y:0,
	range:2000,
	aimingEnemyId: null,
	searchEnemy: function(){
		for(var i=0; i<enemies.length; i++){
			var distance = Math.sqrt(Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2));
			if (distance<=this.range) {
				this.aimingEnemyId = i;
				return;
			}
		}
		// 如果都沒找到，會進到這行，清除鎖定的目標
		this.aimingEnemyId = null;
	}
}


$("#game-canvas").on("mousemove",mousemove);
function mousemove(event){
	cursor.x = event.offsetX;
    cursor.y = event.offsetY;
}


var isBuilding = false;

$("#game-canvas").on("click",mouseclick);
function mouseclick(){
	if(cursor.x > 576 && cursor.y > 416){
		isBuilding = true;
	}else{
		if (isBuilding == true) {
			 tower.x=cursor.x-cursor.x%32;
			 tower.y=cursor.y-cursor.y%32;
		};
		isBuilding=false;
	}
}

function isCollided(pointX,pointY,targetX,targetY,targetWidth,targetHeight){
    if(targetX <= pointX &&
    	          pointX <= targetX + targetWidth &&
       targetY <= pointY &&
    	          pointY <= targetY + targetHeight){
    return true;
    }else{
    return false;
    }
    
}



var FPS=60
var bgImg = document.createElement("img");
var enemyImg = document.createElement("img");
var btnImg = document.createElement("img");
var towerImg = document.createElement("img");

// 設定這個元素的要顯示的圖片
bgImg.src = "images/map.png";
enemyImg.src = "images/slime.gif";
btnImg.src = "images/tower-btn.png";
towerImg.src = "images/tower.png";

// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");

function draw(){
	enemy.move()
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(enemyImg,enemy.x,enemy.y);
	ctx.drawImage(btnImg,640-64,480-64,64,64);
	if(isBuilding == true){
		ctx.drawImage(towerImg,cursor.x-cursor.x%32,cursor.y-cursor.y%32)
     }else{
 	   ctx.drawImage(towerImg,tower.x,tower.y);
 	}
 }
// 執行 draw 函式
setInterval(draw, 1000/FPS);

var enemyPath = [
{x:96,y:448},
{x:96,y:64},
{x:384,y:64},
{x:384,y:192},
{x:224,y:192},
{x:224,y:320},
{x:544,y:320},
{x:544,y:96},

]

var enemy = {
	x: 96,
	y: 448,
	speedX:0,
	speedY:-64,
	pathDes:0,
	move: function(){
      if(isCollided( enemyPath[this.pathDes].x , enemyPath[this.pathDes].y , this.x , this.y , 64/FPS , 64/FPS)){
      this.x = enemyPath[this.pathDes].x;
      this.y = enemyPath[this.pathDes].y;
      this.pathDes++;
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

var cursor = {
	x:100,
	y:200
}

var tower ={
	x:0,
	y:0
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




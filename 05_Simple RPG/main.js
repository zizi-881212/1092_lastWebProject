//全域變數宣告
let mapArray, ctx, currentImgMain;
let imgMoutain, ingMain, imgEnemy;
const gridLength = 200;



//網頁載入初始化動作
$(function(){
    //0可以走，1是障礙物，2是終點，3是敵人
    mapArray = [
        [0,1,1],
        [0,0,0],
        [3,1,2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "05_Simple RPG/images/spriteSheet.png";
    currentImgMain = {
        "x":0,
        "y":0
    };

    imgMain.onload = function(){
        //ctx.drawImage(imgMain,currentImgMain.x,currentImgMain.y);
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    };

    imgMoutain = new Image();
    imgMoutain.src = "05_Simple RPG/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "05_Simple RPG/images/Enemy.png";
    //可以加強，ˇ假如20個物件直接GG
    imgMoutain.onload = function(){
        imgEnemy.onload = function(){
            for(var x in mapArray){
                for(var y in mapArray[x]){
                    //繪製障礙物與敵人
                    if(mapArray[x][y]==1){             
                        ctx.drawImage(imgMoutain,32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==3){
                        ctx.drawImage(imgEnemy,7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                }
            }
        };
    };
    //
    //
    //
});



//處理使用者按下按鍵
$(document).on("keydown", function(event){
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        "x":-1,
        "y":-1
    };
    targetBlock= {
        "x":-1,
        "y":-1
    };

    event.preventDefault();
    //console.log(event);
    switch(event.key){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if(targetImg.x<=400 & targetImg.x>=0 && targetImg.y<=400 & targetImg.y>=0){
        targetBlock.x = targetImg.y/gridLength;
        targetBlock.y = targetImg.x/gridLength;
    }
    else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    //清空主角位置
    ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("一般道路");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2:
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3:
                $("#talkBox").text("有敵人，哈囉哈帥哥~");
                break;
        }
    }
    else{
        $("#talkBox").text("邊界");
    }
    //重新繪製主角
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);


    //
    //
    //
});
//RPG全域變數宣告
let mapArray, ctx;
let currentImgMain= {
    "x":0,
    "y":0
};

let imgMoutain, ingMain, imgEnemy;//地圖物件
let imgVideo6, imgVideo7, imgVideo8, imgVideo9;//影片照片
const gridLength = 200;

//網頁載入初始化動作
$(function(){
    //0可以走，1是山，2、3、4、5是說明員，6、7、8、9是影片
    mapArray = [
        [0,0,1,1,1,2,6],
        [0,0,0,0,0,0,0],
        [0,0,1,1,0,1,1],
        [1,0,3,7,0,0,0],
        [1,0,0,0,0,1,1],
        [0,0,0,1,0,0,4],
        [9,5,0,1,0,0,8]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "07_Simple RPG and YouTube_Lab/images/spriteSheet.png";


    imgMain.onload = function(){
        //ctx.drawImage(imgMain,currentImgMain.x,currentImgMain.y);
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    };

    imgMoutain = new Image();
    imgMoutain.src = "07_Simple RPG and YouTube_Lab/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "07_Simple RPG and YouTube_Lab/images/Enemy.png";
    imgVideo6 = new Image();
    imgVideo6.src = "07_Simple RPG and YouTube_Lab/images/6.jpg";
    imgVideo7 = new Image();
    imgVideo7.src = "07_Simple RPG and YouTube_Lab/images/7.jpg";
    imgVideo8 = new Image();
    imgVideo8.src = "07_Simple RPG and YouTube_Lab/images/8.jpg";
    imgVideo9 = new Image();
    imgVideo9.src = "07_Simple RPG and YouTube_Lab/images/9.jpg";

    //可以加強，假如20個物件直接GG
    imgMoutain.onload = function(){
        imgEnemy.onload = function(){
            for(var x in mapArray){
                for(var y in mapArray[x]){
                    //繪製障礙物與敵人
                    if(mapArray[x][y]==1)
                    {             
                        ctx.drawImage(imgMoutain,256,190,31,40,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==2)
                    {
                        ctx.drawImage(imgEnemy,622,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==3)
                    {
                        ctx.drawImage(imgEnemy,7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==4)
                    {
                        ctx.drawImage(imgEnemy,200,40,80,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==5)
                    {
                        ctx.drawImage(imgEnemy,554,40,70,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==6)
                    {
                        ctx.drawImage(imgVideo6,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==7)
                    {
                        ctx.drawImage(imgVideo7,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==8)
                    {
                        ctx.drawImage(imgVideo8,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    else if(mapArray[x][y]==9)
                    {
                        ctx.drawImage(imgVideo9,y*gridLength,x*gridLength,gridLength,gridLength);
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

    event.preventDefault();//讓網頁只會運作固定按鍵以防意外
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

    if(targetImg.x<=1200 & targetImg.x>=0 && targetImg.y<=1200 & targetImg.y>=0){
        targetBlock.x = targetImg.y/gridLength;
        targetBlock.y = targetImg.x/gridLength;
    }
    else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    //清空主角位置
    ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);

    //限制主角位置
    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("好好散步吧~");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                player.stopVideo();
                break;
            case 1:
                $("#talkBox").text("有樹幹擋住路囉");
                break;
            case 2:
                $("#talkBox").text("NPC：「諮諮在自我介紹捏！」");

                break;
            case 3:
                $("#talkBox").text("NPC：「珍珍在烏龜池清唱唷～」");
                break;
            case 4:
                $("#talkBox").text("NPC：「諮諮在廁所唱歌耍腦...」");
                break;
            case 5:
                $("#talkBox").text("NPC：「珍珍在裝逼...」");
                break;
            case 6:
                $("#talkBox").text("請看片，可以點連結看全片唷");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                player.loadVideoById(playList[1], playTime[1][0], "large");
                //player.playVideo();
                break;
            case 7:
                $("#talkBox").text("請看片，可以點連結看全片唷");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                player.loadVideoById(playList[2], playTime[2][0], "large");
                break;
            case 8:
                $("#talkBox").text("請看片，可以點連結看全片唷");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                player.loadVideoById(playList[3], playTime[3][0], "large");
                break;
            case 9:
                $("#talkBox").text("請看片，可以點連結看全片唷");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                player.loadVideoById(playList[4], playTime[4][0], "large");
                break;
        }
        
    }
    else{
        $("#talkBox").text("邊界");
    }
    console.log(`RPG裡的x_${currentImgMain.x}`);
    console.log(`RPG裡的y_${currentImgMain.y}`);

    //重新繪製圖片
    ctx.drawImage(imgVideo6,6*gridLength,0*gridLength,gridLength,gridLength);
    ctx.drawImage(imgVideo7,3*gridLength,3*gridLength,gridLength,gridLength);
    ctx.drawImage(imgVideo8,6*gridLength,6*gridLength,gridLength,gridLength);
    ctx.drawImage(imgVideo9,0*gridLength,6*gridLength,gridLength,gridLength);
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    
    //
    //
    //
});
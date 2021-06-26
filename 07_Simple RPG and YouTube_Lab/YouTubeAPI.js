//YouTube變數宣告
//console.log(`YouTube裡的x_${currentImgMain.x}`);
//console.log(`YouTube裡的y_${currentImgMain.y}`);
let player; 
let currentPlay = 0;

//YouTube API Ready
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player", {
        height:"540",
        width:"960",
        videoId:playList[currentPlay],
        playerVars:{
            autoplay:0, //是否自動撥放
            controls:0, //是否顯示控制項
            start:playTime[currentPlay][0],//開始秒數
            end:playTime[currentPlay][1],//結束秒數
            iv_load_policy:3
        },
        events:{
            'onReady':onPlayerReady//,
            //'onStateChange':onPlayerStateChange
        }
    });
}
function onPlayerReady() {
    player.playVideo();
}

/*function onPlayerStateChange(event) {
    //console.log(`YouTube裡的x_${currentImgMain.x}`);
    //console.log(`YouTube裡的y_${currentImgMain.y}`);
    if(currentImgMain.x == 0 && currentImgMain.y==6)
    {
        player.clearVideo();
        player.loadVideoById({
            videoId:playList[1],
            startSeconds:playTime[1][0],
            endSeconds:playTime[1][1],
            suggestedQuality:"large"
        });
    } 
    else if(currentImgMain.x == 3 && currentImgMain.y==3)
    {
        player.loadVideoById({
            videoId:playList[2],
            startSeconds:playTime[2][0],
            endSeconds:playTime[2][1],
            suggestedQuality:"large"
        });
    }
    else if(currentImgMain.x == 6 && currentImgMain.y==6)
    {
        player.loadVideoById({
            videoId:playList[2],
            startSeconds:playTime[2][0],
            endSeconds:playTime[2][1],
            suggestedQuality:"large"
        });
    }
    else if(currentImgMain.x == 6 && currentImgMain.y==0)
    {
        player.loadVideoById({
            videoId:playList[3],
            startSeconds:playTime[3][0],
            endSeconds:playTime[3][1],
            suggestedQuality:"large"
        });
    }
    else
    {
        player.pauseVideo();
    }
}
*/
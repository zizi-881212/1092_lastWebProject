let thisH1 = document.getElementById("status");
let thisP = document.getElementById("statusP");
let thisDiv = document.getElementById("gameRegion");

function mouseIn(){
    thisH1.innerHTML = "你進來了";
}

function mouseOut(){
    thisH1.innerHTML = "你出去了";
}

function mouseMove(e){
    thisH1.innerHTML = `你在裡面走來走去。位置：（${e.clientX},${e.clientY}）`;
}

thisDiv.addEventListener("mouseover",mouseIn);
thisDiv.addEventListener("mouseout",mouseOut);
thisDiv.addEventListener("mousemove",mouseMove);

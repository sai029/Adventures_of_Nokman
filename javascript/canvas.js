imageView();

function imageView(){
    let can = document.getElementById("game");
    let ctx = can.getContext("2d");

    const img = new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0);
    };
    img.src="./image/Map.png";
}
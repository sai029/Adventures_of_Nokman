(() => {
  $doc = document;

  $(".TOP").on('click' , function() {
    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_push').play(); //クリックしたら音を再生
    location = 'index.html';
    })

    
  for(i = 0; i < 6; i++){
    var str = sessionStorage.getItem(['V'+i]); 
    var arr = new Array();
    arr = str.split(",");//???/
    //alert(arr);

    const player_name = $doc.getElementById("player_name");
    player_name.textContent=arr[1];
    //alert(arr[0]);
    const img = $doc.getElementById("img");
    const src = arr[2];
    img.setAttribute("src",src);
    //img.textContent=arr[1];
    const point = $doc.getElementById("point");
    point.textContent=arr[0] + "pt";
    break;
  }

})();
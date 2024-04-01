(() => {
  
  $('.slider').slick({
    autoplay: false,//自動的に動き出すか。初期値はfalse。
    infinite: true,//スライドをループさせるかどうか。初期値はtrue。
    speed: 300,//スライドのスピード。初期値は300。
    slidesToShow: 3,//スライドを画面に3枚見せる
    slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
    prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
    centerMode: true,//要素を中央ぞろえにする
    variableWidth: true,//幅の違う画像の高さを揃えて表示
    dots: false,//下部ドットナビゲーションの表示
  });
  

  $("#back").on('click' , function() {
    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_push').play(); //クリックしたら音を再生

    window.location.href = 'register.html';
  })

  $(".slick-prev").on('click' , function() {
    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_push').play(); //クリックしたら音を再生
  })
 
  $(".slick-next").on('click' , function() {
    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_push').play(); //クリックしたら音を再生
  })

  $("button").on('click' , function() {
    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_push').play(); //クリックしたら音を再生
  })
})();
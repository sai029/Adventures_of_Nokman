window.onload = function() {
    // スクロールを禁止にする関数
    function disableScroll(event) {
      event.preventDefault();
    }
}

//BGM再生の際に開くオーバーレイの関数
var modal = document.querySelector("#modal");
var modalOverlay = document.querySelector("#modal-overlay");
var closeButton = document.querySelector("#close-button");
var openButton = document.querySelector("#open-button");

//閉じるボタン


//開くボタン


function audioplay() {
  document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
  document.getElementById('btn_audio').play(); //クリックしたら音を再生
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}
function audiomute() {
  document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
  document.getElementById('btn_audio').pause(); //クリックしたら音を再生
  modal.classList.toggle("closed");//モーダルを閉じる
  modalOverlay.classList.toggle("closed");
}

  document.addEventListener('DOMContentLoaded', function(){
  
    // オーバレイを開閉する関数
    const overlay = document.getElementById('overlay1');
    function overlayToggle() {
      overlay.classList.toggle('overlay-on');
    }
    // 指定した要素に対して上記関数を実行するクリックイベントを設定
    const clickArea = document.getElementsByClassName('overlay-event1');
    for(let i = 0; i < clickArea.length; i++) {
      clickArea[i].addEventListener('click', overlayToggle, false);
    }
    // イベントに対してバブリングを停止
    function stopEvent(event) {
      event.stopPropagation();
    }
    const overlayInner = document.getElementById('overlay-inner1');
    overlayInner.addEventListener('click', stopEvent, false);
    
  }, false);
  document.addEventListener('DOMContentLoaded', function(){
    
    // オーバレイを開閉する関数
    const overlay = document.getElementById('overlay2');
    function overlayToggle() {
      overlay.classList.toggle('overlay-on');
    }
    // 指定した要素に対して上記関数を実行するクリックイベントを設定
    const clickArea = document.getElementsByClassName('overlay-event2');
    for(let i = 0; i < clickArea.length; i++) {
      clickArea[i].addEventListener('click', overlayToggle, false);
    }
    // イベントに対してバブリングを停止
    function stopEvent(event) {
      event.stopPropagation();
    }
    const overlayInner = document.getElementById('overlay-inner2');
    overlayInner.addEventListener('click', stopEvent, false);
    
  }, false);

  function frameClick(){
    document.location.href="register.html";
  }

  function audio() {
    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_push').play(); //クリックしたら音を再生
  }
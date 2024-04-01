(() => {

  $doc = document;

  $("#back").on('click' , function() {
    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_push').play(); //クリックしたら音を再生
    window.location.href = 'register.html';
  })

  
  //セッションに保存されているメンバー数を取得
  const member_num = sessionStorage.getItem(['member_num']);
  //alert(member_num);

  //土庄港を選択したとき
  $("#tonosyo").on('click' , function() {
    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_push').play(); //クリックしたら音を再生
    for (i=0;i<member_num;i++){
      var str = sessionStorage.getItem(['name'+i]); //プレイヤー名の取得
      var arr = new Array();
      arr = str.split(","); //配列arrに分割して格納
      //alert(arr);
      //alert(arr.length);

      if(arr.length < 2){ //港名が登録されていなければ
        arr[arr.length] = "土庄港"; //配列arrの最後に要素を追加
        window.sessionStorage.setItem("name"+i, arr);
        break;
      }
      //break;
    }
    window.location.href = 'start_select.html';
  })

  //池田港を選択したとき
  $("#sakate").on('click' , function() {
    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
    document.getElementById('btn_push').play(); //クリックしたら音を再生
    for (i=0;i<member_num;i++){
      var str = sessionStorage.getItem(['name'+i]); //プレイヤー名の取得
      var arr = new Array();
      arr = str.split(","); //配列arrに分割して格納
      //alert(arr);
      //alert(arr.length);

      if(arr.length < 2){ //港名が登録されていなければ
        arr[arr.length] = "坂手港"; //配列arrの最後に要素を追加
        window.sessionStorage.setItem("name"+i, arr);
        break;
      }
      //break;
    }
    window.location.href = 'start_select.html';
  })

  //坂手港を選択したとき
  $("#ikeda").on('click' , function() {
      document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
      document.getElementById('btn_push').play(); //クリックしたら音を再生

    for (i=0;i<member_num;i++){
      var str = sessionStorage.getItem(['name'+i]); //プレイヤー名の取得
      var arr = new Array();
      arr = str.split(","); //配列arrに分割して格納
      //alert(arr); 
      //alert(arr.length);

      if(arr.length < 2){ //港名が登録されていなければ
        arr[arr.length] = "池田港"; //配列arrの最後に要素を追加
        window.sessionStorage.setItem("name"+i, arr);
        break;
      }
      //break;
    }
    window.location.href = 'start_select.html';
  })

  //start_select.html → sugoroku_1.html
  cnt = 0;
  //全プレイヤーに港名が登録されていれば
  for (i=0;i<(member_num);i++){
    var str = sessionStorage.getItem(['name'+i]); //プレイヤー名の取得
    var arr = new Array();
    arr = str.split(","); //配列arrに分割して格納
    //alert(arr);
    //alert(arr.length);

    if(arr.length == 2){ //港名が登録されていなければ
      cnt += 1;
    }else{ //港名が登録されていなければ//nitta
      const player_name = $doc.getElementById("player_name");
      player_name.textContent=arr[0];
      break;
    }
  }
  if(cnt == member_num){ //
    window.location.href = 'sugoroku_1.html'; //すごろくスタート！
  }

})();
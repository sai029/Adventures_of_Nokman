(() => {

    const $doc = document;
    
    createTable(0);
    
    //プレイヤーの名前を表示する表の作成
    function createTable(first){

        //プレイヤーの人数memberとプレイヤー名を表示する表playerを取得
        const member_num = $doc.getElementById("member");
        const member = $doc.getElementById("member_name");
        const table = $doc.getElementById("player");
        //const member_num = sessionStorage.length;
        //alert(member_num);

        if((sessionStorage.length > 1) && (first == 0)){
            member_num.setAttribute("value",sessionStorage.getItem(['member_num']));
            member.setAttribute("value",sessionStorage.getItem(['member_num']));
            //console.log(member.value);
        }

        //playerの人数分ループする
        for (i=first;i<member.value;i++){
            let newRow = $doc.createElement("tr");
            //newRow.setAttribute("id","tr"+i)

            //inputのtextタグを生成
            const player_name = "Player" + i;
            const new_input = $doc.createElement("input");
            new_input.setAttribute("id","user"+i);
            new_input.setAttribute("name","user"+ i);
            new_input.setAttribute("type","text");
            new_input.setAttribute("size","20");
            //Nitta_07/12
            //sessionStorageに登録あればそれを表示
            const str = window.sessionStorage.getItem(['name'+i]); //プレイヤー名の取得
            if(str != null){
                let arr = new Array();
                arr = str.split(","); //配列arrに分割して格納
                //alert(arr[0]);
                name_ = arr[0];
                //alert(name_);
                new_input.setAttribute("value",name_);
            }else{
                new_input.setAttribute("value",player_name);
            }
            //name_ = window.sessionStorage.getItem(['name'+i]);
            /*
            if(name_!=null){
                new_input.setAttribute("value",name_);
            }else{
                new_input.setAttribute("value",player_name);
            }
            */

            //inputのbuttonタグを生成
            const player_name_btn = "×";
            const new_input_btn = $doc.createElement("input");
            new_input_btn.setAttribute("type","button");
            new_input_btn.setAttribute("class","delbtn");
            new_input_btn.setAttribute("value",player_name_btn);

            //tdにinputタグとpタグを子要素として追加
            const newCell = $doc.createElement("td");
            newCell.appendChild(new_input);
            newCell.appendChild(new_input_btn);
        

            //trにtdを子要素として追加
            newRow.appendChild(newCell);

            //tableにtrを子要素として追加
            table.appendChild(newRow);
            
        }
    }



    $(function(){
        
        //プレイヤー追加
        $("#clickevent").on('click' , function() {
            document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
            document.getElementById('btn_push').play(); //クリックしたら音を再生
            
            let i = $("#member").val();
            let j = $("#member_name").val();
            if (i < 6) {
                $("#member").val(Number(i) + 1);
                $("#member_name").val(Number(j) + 1);
                createTable(Number(j));
            }else{
                alert("このゲームは6人までしかできません。")
            }
        });

        //プレイヤー削除
        $("#player").on('click' ,'.delbtn', function() {
            document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
            document.getElementById('btn_push').play(); //クリックしたら音を再生

            let i = $("#member").val();
            if(i > 2){
                if (!confirm("この行を削除しますか？"))
                    return;
                //const bro = $(this).prev().attr('id');
                //alert(bro);
                $(this).closest("tr").remove();
                $("#member").val(Number(i) - 1);
                //window.sessionStorage.clear([bro]);
            }            
        });
        //TOPへ
        $("#top").on('click' , function() {
            document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
            document.getElementById('btn_push').play(); //クリックしたら音を再生

            window.location.href = 'index.html';
        })

        //ユーザーの名前を抽出
        //$("#next").on('click' , function() {
        //    let i = $("#member_name").val();
        //    for (let j = 0; j < i; j++) {
        //        if ($("#user" + j).length) {
        //            const user_id = $("#user" + j).val();
        //            alert(user_id);
        //        }
        //    }  
        //});

        //Nitta_06/29
        //sessionStorage
        $("#next").on('click' , function() {
            document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
            document.getElementById('btn_push').play(); //クリックしたら音を再生
            let i = $("#member_name").val();
            //alert(i);
            window.sessionStorage.clear();
            let cnt = 0;
            for (let j = 0; j < i; j++) {
                //alert(j);
                if ($("#user" + j).length) {
                    const user_name = $("#user" + j).val();
                    window.sessionStorage.setItem(['name'+cnt],[user_name]);
                    //alert(user_name + "登録完了");
                    cnt += 1;
                }
                //alert(j);
            }
            const member_num = sessionStorage.length;
            //alert(member_num + "");
            window.sessionStorage.setItem(['member_num'], member_num); //登録メンバー数の保存
            window.location.href = 'select.html';
        });
    });

})();


    img = new Array("★","◆","●","■");
    koma = new Array();
    goal = 20; 


    restart();

    function restart() {
	    user_num = 0;
	    pre_num = 0;
	    pre_r = 0;
	    timer = 0;

        for (i=0; i<4; i++) {
            document.getElementById("brd"+i).innerHTML = img[i];
            koma[i] = 0;
        }

	    sai_reset();
    }

    function getNum(num){ 
        clearTimeout(timer);
        document.getElementById("sai"+pre_num).innerHTML = pre_r;
	    pre_num = num;
	    pre_r = r;
        document.getElementById("sai"+num).innerHTML = "<font color='#FF0000'>" + r + "</font>"; 
        koma[num] += r;
        var s = "";
        for (i=0; i<koma[num]; i++) {
            s += ".";
        }
        document.getElementById("brd"+num).innerHTML = s + img[num];
        if (koma[num] < goal) {
            sai_next();
        } else {
            goalin();
        }
    }

    function sai_next() {
        user_num++;
        if (user_num == 4) user_num = 0;
        var s = document.form1.elements["user"+user_num].value;
        if (s != "") {
            sai_reset();
        } else {
            if (user_num != pre_num) {
                sai_next();
            } else {
                sai_reset();
            }
        }
    }

    function sai_reset() { 
        document.form1.btn0.disabled = true;
        document.form1.btn1.disabled = true;
        document.form1.btn2.disabled = true;
        document.form1.btn3.disabled = true;
        document.form1.elements["btn"+user_num].disabled = false;
        sai_start();
    }

    function sai_start() {
        //サイコロの為に乱数生成
        r = Math.floor(Math.random() * 6) + 1;
        //ユーザーがいる場合
        if (user_num != pre_num || pre_r == 0)
            //ユーザーにサイコロの数値を格納 
            document.getElementById("sai"+user_num).innerHTML = r; 
        //stopするまでsai_startを繰り返す（0.1秒ごとに）
        timer = setTimeout("sai_start()",100);
    }

    function goalin() {
        alert("ゴール！！\n優勝は" + document.form1.elements["user"+user_num].value + "さんです。");
        restart();
    }
  
  
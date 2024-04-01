(() => {

    const $doc = document;

    //画像の拡大率
    const scale = 3.0;

    const sugoroku = $doc.getElementById("sugoroku");

    class ImageCanvas{
        constructor(){
            //リサイズフラグ
            this.resizeFlag  = true;
            this.resizeTimer = null;
            this.playerFlag = false;
            this.posX = 0;
            this.posY = 0;

            this.imageView();
            this.bind();
            
        }
    
        bind(){
            //画面リサイズ
            window.addEventListener( 'resize', () => {
                if(this.resizeFlag){
                    this.resizeFlag = false;
                    if(this.resizeTimer){
                        window.cancelAnimationFrame(this.resizeTimer);
                    }
                    this.resizeTimer = window.requestAnimationFrame(() => {
                        //ここにリサイズ時の処理を書く
                        this.drawResizeImage();
      
                        this.resizeFlag = true;
                    });
                }
            }, false );
        }
    
        imageView(){
            this.can = document.getElementById("game");
            //this.can.width = this.can.clientWidth;
            this.can.width = window.innerWidth;
            this.can.width *= devicePixelRatio;
            //this.can.height = this.can.clientHeight;
            this.can.height = window.innerHeight;
            this.can.height *= devicePixelRatio;
            this.ctx = this.can.getContext("2d");
    
            this.img = new Image();
            this.img.src="./image/Map_v08.png";
            //this.img_player = new Image();
            //this.img_player.src="./image/koma0.png";

       
            //this.img.onload = () =>{
            //    this.drawImageCenter(0,0);    
            //}
            
            //描画済みフラグはオフっておく
            this.isDrawed= false;
        }
    
        drawImageCenter(x,y){
            
            this.drawWidth = this.img.width;
            this.drawHeight = this.img.height;

            this.scaledDrawWidth = this.drawWidth*scale;
            this.scaledDrawHeight = this.drawHeight*scale;
     
            //キャンバスの中心の座標
            const centerX = this.can.width / 2;
            const centerY = this.can.height / 2;

            //背景画像の中心の座標
            const centerImageX = this.scaledDrawWidth/2;
            const centerImageY = this.scaledDrawHeight/2;
            //alert(centerImageX)
            
            //指定した座標
            let setfiedX;
            let setfiedY;

            //x = 451;
            //y = 1160;

            setfiedX = x*scale;
            setfiedY = y*scale;
            
            this.position = {
                x : (centerX - centerImageX ) + centerImageX - setfiedX,
                y : (centerY - centerImageY ) + centerImageY - setfiedY
            };
    
            this.ctx.clearRect(0, 0, this.can.width, this.can.height);
    
            //alert(this.position.x);
            //alert(this.position.y);

            this.ctx.drawImage(
              this.img,
              this.position.x,
              this.position.y,
              this.scaledDrawWidth,
              this.scaledDrawHeight
            );
        
            //描画済みフラグをたてる
            this.isDrawed = true;

            if (this.playerFlag == true) {
                //this.img_player.onload = () =>{
                    this.ctx.drawImage(
                        this.img_player,
                        centerX - this.img_player.width/2.4,
                        centerY - this.img_player.height/2.4,
                        this.img_player.width/1.2,
                        this.img_player.height/1.2
                    );
                //};
            }
            
    
        }
    
        //リサイズ時に再描画する
        drawResizeImage(){
            //すでに描画されている場合のみ
            if(!this.isDrawed){
                return;
            }
            //canvasを再取得
            this.imageView();
            this.drawPlayer(this.posX,this.posY,"");
        }

        drawPlayer(x,y,src){
            this.img_player = new Image();
            //this.img_player.src="./image/koma1.png";
            this.playerFlag = true;
            this.posX = x;
            this.posY = y;
       
            this.img.onload = () =>{
                this.img_player.onload = () =>{
                    this.drawImageCenter(x,y);
                    sugoroku.style.visibility = "visible"
                    
                }
            }
            if (src.length  > 0) {
                this.img_player.src= src;
            }else{
                this.img_player.src="./image/koma0.png";
            }
            

        }

        animationImageCanvas(x,y,tx,ty){
            this.currentX = x;
            this.currentY = y;

            this.cX = x;
            this.cY = y;

            this.targetX = tx;
            this.targetY = ty;

            this.frameCount = 0;
            this.startAnimationLoop();
        }

        startAnimationLoop(){
            const animate = () => {
                this.updatePosition();
                this.drawImageCenter(this.currentX,this.currentY);
            
                if (this.frameCount < 40) {
                    requestAnimationFrame(animate);
                }
            };

            animate();
        }

        updatePosition() {
            // フレームごとの座標の更新量を計算（座標Bへの移動を60フレームで行う場合）
            const dx = (this.targetX - this.cX) / 40;
            const dy = (this.targetY - this.cY) / 40;
        
            // 座標の更新
            this.currentX += dx;
            this.currentY += dy;
        
            // フレームカウントをインクリメント
            this.frameCount++;
        }
    }   
      

    //マスを無向グラフで表現
    class Graph{
        constructor(){
            this.troutList = {};
            this.attribute = {};
            this.eventList = {};
        }

        //マスの追加
        addVertex(vertex,attributes,ev,src,explain){
            this.troutList[vertex] = [];
            this.attribute[vertex] = attributes;
            this.eventList[vertex] = new Trout();
            
            this.eventList[vertex].setTitle(vertex);
            this.eventList[vertex].setEvent(ev);
            this.eventList[vertex].setImgSrc(src);
            this.eventList[vertex].setExplain(explain);


        }

        //マスを繋ぐエッジの追加
        addEdge(v1,v2){
            this.troutList[v1].push(v2);
            this.troutList[v2].push(v1);
        }

        //マスがどこと繋がっているかを取得
        getNeighbors(vertex){
            return this.troutList[vertex];
        }

        //マスの位置を取得
        getAttribute(vertex){
            return this.attribute[vertex];
        }

        view(vertex){
            //console.log(vertex);
            this.eventList[vertex].viewExplain();
        }

        getPoint(vertex){
            return this.eventList[vertex].getPointTrout();
        }

        viewEvent(vertex){
            return this.eventList[vertex].getEvent();
        }
    }

//------------------------------------------------------------------------------------------------------------------
//                                          ゲームクラス
//------------------------------------------------------------------------------------------------------------------
    class Game{
        constructor(){

            //ゲームのターン（10ターンまで（全てのプレイヤーが行動したら1ターン経過））
            this.turn = 1;

            //「サイコロをふる」ボタンを格納
            this.$btn = $doc.getElementById("diceBt");

            //ダイスの数を格納(マス-1)
            this.diceNum = 0;

            //小豆島のマスを登録
            this.graph = new Graph();
            //("スポットの名前","スポットの座標",イベントの判定値,スポットの説明)
            this.graph.addVertex("<ruby>小豆島博物館<rt>しょうどしまはくぶつかん</rt></ruby>",{x:391,y:1015},5,"","2020<ruby>年<rt>ねん</rt></ruby>にオープンした<ruby>私設博物館<rt>しせつはくぶつかん</rt></ruby>。<ruby>小豆島新聞<rt>しょうどしましんぶん</rt></ruby>の<ruby>社長<rt>しゃちょう</rt></ruby>で、<ruby>長年<rt>ながねん</rt></ruby><ruby>小豆島<rt>しょうどしま</rt></ruby>の<ruby>歴史<rt>れきし</rt></ruby>を<ruby>研究<rt>けんきゅう</rt></ruby>していた<ruby>藤井<rt>ふじい</rt></ruby><ruby>豊<rt>ゆたか</rt></ruby>さんの<ruby>本<rt>ほん</rt></ruby>や<ruby>資料<rt>しりょう</rt></ruby>、<ruby>島<rt>しま</rt></ruby><ruby>出身<rt>しゅっしん</rt></ruby>の<ruby>著名<rt>ちょめい</rt></ruby>な<ruby>画家<rt>がか</rt></ruby>などが<ruby>描<rt>か</rt></ruby>いた<ruby>絵画<rt>かいが</rt></ruby>が<ruby>展示<rt>てんじ</rt></ruby>されている。");
            this.graph.addVertex("土庄港",{x:328,y:925},5,"","高松港(たかまつこう)、新(しん)岡山港(おかやまこう)、豊島(てしま)経由(けいゆ)宇野港(うのこう)を結ぶ(むすぶ)フェリーが発着(はっちゃく)する港(みなと)。 小豆島で一番(いちばん)大きな(おおきな)港(みなと)で、お土産(おみやげ)やお食事処(おしょくじどころ)、レンタカー・レンタサイクルなども利用可能。 ");
            this.graph.addVertex("迷路のまち",{x:432,y:1108},2,"","路地(ろじ)が複雑(ふくざつ)に入り組んだ(いりくんだ)古くから(ふるくから)の町並み(まちなみ)がいつからか「迷路(めいろ)のまち」と呼ばれる(よばれる)ように。 かつて海賊(かいぞく)や海風(うみかぜ)からまちを守る(まもる)ために意図的(いとてき)に作られた(つくられた)と言われて(いわれて)いる。 まちには世界中(せかいじゅう)の妖怪(ようかい)が集まる(あつまる)「妖怪(ようかい)美術館(びじゅつかん)」が点在(てんざい)する。 ");
            this.graph.addVertex("エンジェルロード",{x:462,y:1195},4,"","1(１)日(にち)2(２)回(かい)、干(かん)潮時(ちょうじ)に海(うみ)の中(なか)から現れる(あらわれる)砂(すな)の道(みち)。 「天使(てんし)の散歩(さんぽ)道(みち)」「恋人(こいびと)の聖地(せいち)」とも呼ばれ(よばれ)、大切(たいせつ)な人(ひと)と手(て)をつないで渡る(わたる)と願い(ねがい)が叶う(かなう)と言われて(いわれて)いる。 ");
            this.graph.addVertex("鹿島海水浴場",{x:302,y:1151},5,"","土庄町(とのしょうちょう)にある波(なみ)静か(しずか)で白浜(しらはま)の海水浴場(かいすいよくじょう)。 近く(ちかく)には、温泉(おんせん)施設(しせつ)もあり、海水浴(かいすいよく)の後(あと)の癒し(いやし)にも最適(さいてき)。 ");
            this.graph.addVertex("オリーヴ大樹",{x:188,y:1224},5,"","2011(２０１１)年(ねん)3(３)月(がつ)、からはるか10000(１００００)㎞(きろめーとる)もの海(うみ)を旅(たび)してやってきたオリーブ(おりーぶ)の樹(き)。 高台(たかだい)から海(うみ)を見渡せる(みわたせる)位置(いち)にどっしりと根(ね)を張る(はる)「生命(せいめい)の樹(き)」。 ");
            this.graph.addVertex("小瀬",{x:49,y:1125},0,"","");
            this.graph.addVertex("富丘",{x:557,y:1010},0,"","");
            this.graph.addVertex("渕崎",{x:408,y:862},0,"","");
            this.graph.addVertex("宝生院シンパク",{x:663,y:881},5,"","小豆(しょうど)島(しま)八十八ヶ所(はちじゅうはちかしょ)霊場(れいじょう)の１つである宝生院(ほうしょういん)の境内(けいだい)にある真(しん)柏(ぱく)（シンパク(しんぱく)）の大樹(たいじゅ)。 樹齢(じゅれい)は約(やく)1600(１６００)年(ねん)以上(いじょう)、「応(おう)神(じん)天皇(てんのう)の御手植え(おてうえ)の木(き)」とも伝えられ(つたえられ)、国(くに)指定(してい)特別(とくべつ)天然(てんねん)記念物(きねんぶつ)となっている。 ");
            this.graph.addVertex("池田港",{x:812,y:1071},1,"","高松港(たかまつこう)を結ぶ(むすぶ)フェリー(ふぇりー)が発着(はっちゃく)する港(みなと)。 ターミナルビル(たーみなるびる)は、秋祭り(あきまつり)の太鼓(たいこ)台(だい)を模した(もした)特徴的(とくちょうてき)な外観(がいかん)。 ");
            this.graph.addVertex("農村歌舞伎",{x:896,y:793},5,"","300(３００)年(ねん)以上(いじょう)の歴史(れきし)を持つ(もつ)と言われる(いわれる)農村(のうそん)歌舞伎(かぶき)。 役者(やくしゃ)さんから化粧(けしょう)、浄瑠璃(じょうるり)、衣装(いしょう)など、すべて島(しま)の人(ひと)が担当(たんとう)している。 毎年(まいとし)、肥(ひ)土山(とやま)農村(のうそん)歌舞伎(かぶき)は5(５)月(がつ)、中山(なかやま)農村(のうそん)歌舞伎(かぶき)は10(１０)月(がつ)に行われる(おこなわれる)。 ");
            this.graph.addVertex("中山",{x:944,y:887},0,"","");
            this.graph.addVertex("池田",{x:978,y:1100},0,"","");
            this.graph.addVertex("オリーブ公園",{x:1101,y:1113},1,"./image/spot/オリーブ公園.png","<ruby>瀬戸内海<rt>せとないかい</rt></ruby>を<ruby>見下<rt>みお</rt></ruby>ろす<ruby>小高<rt>こだか</rt></ruby>い<ruby>丘<rt>おか</rt></ruby>に、<ruby>約<rt>やく</rt></ruby>2000<ruby>本<rt>ぼん</rt></ruby>のオリーブ<ruby>畑<rt>ばたけ</rt></ruby>が<ruby>広<rt>ひろ</rt></ruby>がる<ruby>道<rt>みち</rt></ruby>の<ruby>駅<rt>えき</rt></ruby>。 <ruby>園内<rt>えんない</rt></ruby>には、オリーブ<ruby>記念館<rt>きねんかん</rt></ruby>やギリシャ<ruby>風車<rt>ふうしゃ</rt></ruby>、「<ruby>魔女<rt>まじょ</rt></ruby>の<ruby>宅急便<rt>たっきゅうびん</rt></ruby>」のロケセットなどがある<ruby>人気<rt>にんき</rt></ruby>スポット。 ");
            this.graph.addVertex("池田の桟敷",{x:1029,y:1206},5,"","秋祭り(あきまつり)の見物(けんぶつ)のために利用(りよう)される野天(のてん)桟敷(さじき)。 自然(しぜん)の地形(ちけい)を巧み(たくみ)に利用(りよう)した、石積(いしづみ)の技術(ぎじゅつ)の最(さい)高傑作(こうけっさく)とも言われる(いわれる)。 ");
            this.graph.addVertex("ふるさと村",{x:1029,y:1298},5,"","池田(いけだ)湾(わん)に面した(めんした)海(うみ)の駅(えき)・道(みち)の駅(えき)。 遊ぶ(あそぶ)・体験(たいけん)する・泊まる(とまる)・食べる(たべる)・の５つを楽しむ(たのしむ)ことができる体験型(たいけんがた)・総合(そうごう)レジャー(れじゃー)施設(しせつ)。 ");
            this.graph.addVertex("誓願寺の大ソテツ",{x:1025,y:1390},5,"","小豆島霊場(れいじょう)３１番(３１ばん)礼所(れいしょ)「誓願寺(せいがんじ)」にある国(くに)指定(してい)天然(てんねん)記念物(きねんぶつ)のソテツ(そてつ)。 樹齢(じゅれい)1000(１０００)年(ねん)以上(いじょう)で、根本(ねもと)の周囲(しゅうい)は約(やく)1(１).8(８)ｍもある。 ");
            this.graph.addVertex("吉野",{x:1023,y:1479},0,"","");
            this.graph.addVertex("神浦",{x:1007,y:1716},0,"","");
            this.graph.addVertex("地蔵崎灯台",{x:995,y:1826},1,"./image/spot/大角鼻灯台・地蔵崎灯台.png","小豆(しょうど)島(しま)の最南端(さいなんたん)・三(み)都(と)半島(はんとう)に立つ(たつ)白亜(はくあ)の灯台(とうだい)。 ここから見える(みえる)景色(けしき)は絶景(ぜっけい)で、四国(しこく)十景(じゅっけい)・讃岐(さぬき)百景(ひゃっけい)に指定(してい)されている。 ");
            this.graph.addVertex("浦野",{x:1144,y:1537},0,"","");
            this.graph.addVertex("竹生",{x:1242,y:1120},0,"","");
            this.graph.addVertex("オリーブビーチ",{x:1382,y:1117},2,"","オリーブ(おりーぶ)公園(こうえん)の近く(ちかく)にある小豆(しょうど)島(しま)最大(さいだい)の海水浴場(かいすいよくじょう)。 穏やか(おだやか)な波(なみ)と約(やく)700m続く(つづく)白い(しろい)砂浜(すなはま)が印象的(いんしょうてき)。 ");
            this.graph.addVertex("草壁港",{x:1550,y:1100},5,"","小豆(しょうど)島(しま)の南部(なんぶ)、国道(こくどう)436(４３６)号(ごう)線沿い(せんぞい)にある港(みなと)。 2021(２０２１)年(ねん)3(３)月(がつ)31(３１)日(にち)まで高松港(たかまつこう)行き(ゆき)フェリー(ふぇりー)が運行(うんこう)していた。 ");
            this.graph.addVertex("安田",{x:1651,y:1081},0,"","");
            this.graph.addVertex("醤油記念館",{x:1748,y:1118},5,"","大正(たいしょう)初期(しょき)から使われて(つかわれて)いた醤油(しょうゆ)工場(こうじょう)を改造(かいぞう)して造られた(つくられた)記念館(きねんかん)。 有形(ゆうけい)文化(ぶんか)財(ざい)に登録(とうろく)された合掌造り(がっしょうづくり)の建物(たてもの)で、醤油造り(しょうゆづくり)の歴史(れきし)と製造(せいぞう)方法(ほうほう)を紹介(しょうかい)。 ");
            this.graph.addVertex("醤の郷",{x:1817,y:1212},5,"","醤油蔵(しょうゆくら)や佃煮(つくだに)工場(こうじょう)が軒(のき)を連ねる(つらねる)。 小豆(しょうど)島(しま)の長い(ながい)醬油造り(しょうゆづくり)の歴史(れきし)を感じられる(かんじられる)景観(けいかん)。 ");
            this.graph.addVertex("碁石山",{x:1961,y:1234},4,"","小豆(しょうど)島(しま)八十八ヶ所(はちじゅうはちかしょ)の第二番(だいにばん)礼所(れいしょ)。 白い(しろい)岩肌(いわはだ)に混じる(まじる)黒い(くろい)石(いし)が碁石(ごいし)に見える(みえる)ことが由来(ゆらい)。 ");
            this.graph.addVertex("堀越",{x:1650,y:1356},0,"","");
            this.graph.addVertex("映画村",{x:1526,y:1407},4,"./image/spot/二十四の瞳映画村.png","映画(えいが)「二十四(にじゅうし)の瞳(ひとみ)」の撮影(さつえい)セット(せっと)を改築(かいちく)した日本(にほん)映画(えいが)・文学(ぶんがく)のテーマパーク(てーまぱーく)。 大正(たいしょう)・昭和(しょうわ)初期(しょき)を再現(さいげん)した村(むら)には、木造(もくぞう)校舎(こうしゃ)や茶屋(ちゃや)、おが立ち並ぶ(たちならぶ)。 ");
            this.graph.addVertex("坂手港",{x:1875,y:1370},5,"","田浦(たのうら)半島(はんとう)の基部(きぶ)に位置(いち)する港(みなと)。 高松(たかまつ)東港(ひがしこう)、神戸港(こうべこう)を結ぶ(むすぶ)フェリー(ふぇりー)が発着(はっちゃく)する。 ");
            this.graph.addVertex("瀬戸の浜海水浴場",{x:1932,y:1520},1,"","坂手港(さかてこう)から徒歩(とほ)15(１５)分(ふん)の所(ところ)にある海水浴場(かいすいよくじょう)。 水(みず)の流れ(ながれ)が速い(はやい)ため、透明度(とうめいど)が高い(たかい)。 ");
            this.graph.addVertex("大角鼻灯台",{x:1991,y:1628},5,"","小豆(しょうど)島(しま)の東南(とうなん)に突出した(とっしゅつした)大角(おおかど)鼻(はな)に設置(せっち)されている灯台(とうだい)。 海上(かいじょう)交通量(こうつうりょう)が多い(おおい)小豆(しょうど)島(しま)の南(みなみ)の海(うみ)を照(て)らしている。 ");
            this.graph.addVertex("橘",{x:1980,y:941},0,"","");
            this.graph.addVertex("希望の道",{x:2165,y:929},4,"","「もう一つ(ひとつ)のエンジェルロード(えんじぇるろーど)」と呼ばれ(よばれ)、潮時(ちょうじ)に城ケ島(じょうがしま)へと続く(つづく)道(みち)が現れる(あらわれる)。 希望(きぼう)を持ち続け(もちつづけ)、実現(じつげん)を祈りながら(いのりながら)この道(みち)を歩けば(あるけば)願い(ねがい)が叶う(かなう)という想い(おもい)が込められて(こめられて)いる。 ");
            this.graph.addVertex("かもめ石",{x:2137,y:710},5,"","岩谷(いわがたに)海岸(かいがん)にある人工(じんこう)の石(いし)。 大阪(おおさか)城(じょう)へ石(いし)を運ぶ(はこぶ)際(さい)に積み出し(つみだし)の船(ふね)を係留(けいりゅう)するのに使った(つかった)と言われて(いわれて)いる。 ");
            this.graph.addVertex("当浜",{x:2194,y:542},0,"","");
            this.graph.addVertex("遠手浜海水浴場",{x:2130,y:403},1,"","福田港(ふくだこう)に近く(ちかく)にある海水浴場(かいすいよくじょう)。 自然(しぜん)海浜(かいひん)保全(ほぜん)地区(ちく)となっており、他(ほか)の海水浴場(かいすいよくじょう)と比べ(くらべ)穴場的(あなばてき)な存在(そんざい)。 ");
            this.graph.addVertex("福田港",{x:2102,y:306},5,"","小豆(しょうど)島(しま)の北東(ほくとう)からの玄関(げんかん)口(ぐち)、姫路港(ひめじこう)を結ぶ(むすぶ)フェリー(ふぇりー)が発着(はっちゃく)する。 「八日目(ようかめ)の蝉(せみ)」のロケ地(ろけち)の一つ(ひとつ)。 ");
            this.graph.addVertex("雲海寺/本地堂",{x:1942,y:305},5,"","小豆(しょうど)島(しま)八十八ヶ所(はちじゅうはちかしょ)第84番(だい８４ばん)礼所(れいしょ)である雲海寺(うんかいじ)と85(８５)番(ばん)礼所(れいしょ)である本地堂(ほんちどう)が横(よこ)並び(ならび)になっている。 ");
            this.graph.addVertex("吉田ダム",{x:2048,y:151},5,"","洪水(こうずい)調節(ちょうせつ)、水(みず)不足(ぶそく)の解消(かいしょう)、小豆(しょうど)島(しま)全域(ぜんいき)の水道(すいどう)水源(すいげん)として機能(きのう)する多目的(たもくてき)ダム(だむ)。 堤(てい)高(こう)は県内(けんない)一位(いちい)の約(やく)74(７４).5(５)ｍ。 ");
            this.graph.addVertex("小部",{x:1762,y:156},0,"","");
            this.graph.addVertex("大部港",{x:1462,y:266},5,"","岡山(おかやま)日生港(ひなせこう)を結ぶ(むすぶ)フェリー(ふぇりー)が発着(はっちゃく)する港(みなと)。 2023(２０２３)年(ねん)12(１２)月(がつ)から運航(うんこう)休止(きゅうし)。 ");
            this.graph.addVertex("恵門ノ瀧",{x:1563,y:369},5,"./image/spot/恵門の瀧.png","小豆(しょうど)島(しま)八十八ヶ所(はちじゅうはちかしょ)第81番(だい８１ばん)礼所(れいしょ)。 本堂(ほんどう)には立派(りっぱ)な厄除け(やくよけ)不動(ふどう)がある。 ");
            this.graph.addVertex("田井",{x:1348,y:281},0,"","");
            this.graph.addVertex("琴塚",{x:1196,y:357},0,"","");
            this.graph.addVertex("大阪城残石",{x:1028,y:441},5,"","道(みち)の駅(えき)・みなとオアシス(おあしす)「大阪城残(おおさかじょうざん)石(せき)記念(きねん)公(こう)園(えん)」。約(やく)400(４００)年前(ねんまえ)、冬(ふゆ)・夏(なつ)の陣(じん)で落城(らくじょう)した大阪(おおさか)城(じょう)を修築(しゅうちく)する際(さい)に切り出され(きりだされ)放置(ほうち)された40(４０)個(こ)の残(ざん)石(せき)や資料館(しりょうかん)がある。 ");
            this.graph.addVertex("夕陽の丘",{x:862,y:519},5,"","映画(えいが)「二十四(にじゅうし)の瞳(ひとみ)」にも登場(とうじょう)する屋形崎(やかたさき)夕陽(ゆうひ)の丘(おか)。 対岸(たいがん)に見える(みえる)のは岡山県(おかやまけん)・兵庫県(ひょうごけん)の町(まち)、「日本(にほん)の夕陽(ゆうひ)百選(ひゃくせん)」にも選ばれた(えらばれた)。 ");
            this.graph.addVertex("屋形崎",{x:745,y:539},0,"","");
            this.graph.addVertex("小豆島大観音",{x:845,y:615},5,"","正式(せいしき)名称(めいしょう)は「大本山(だいほんざん)小豆(しょうど)島大観音佛(しまだいかんのんぶっ)歯寺(しでら)」。フランス(ふらんす)のコンテスト(こんてすと)で1(１)位(い)になった世界一(せかいいち)美しい(うつくしい)観音(かんのん)様(さま)　 ");
            this.graph.addVertex("お猿の国",{x:1179,y:590},2,"","香川県(かがわけん)の天然(てんねん)記念物(きねんぶつ)に指定(してい)されたお猿(おさる)さんが遊ぶ(あそぶ)自然(しぜん)動物(どうぶつ)園(えん)。約(やく)500(５００)匹(ひき)のお猿(おさる)さん達(たち)が村(むら)の中(なか)で自由(じゆう)に楽しく(たのしく)暮らして(くらして)いる。 ");
            this.graph.addVertex("美しの原",{x:1512,y:571},5,"","銚子渓(ちょうしけい)から寒(かん)霞渓(かけい)へ行く(いく)小豆(しょうど)島(しま)スカイライン(すかいらいん)にある小豆(しょうど)島(しま)唯一(ゆいいつ)の高原(こうげん)。高原(こうげん)にある四方指(しほうざし)展望(てんぼう)台(だい)は「さぬき百景(ひゃっけい)」にも選ばれた(えらばれた)ビューポイント(びゅーぽいんと)。 ");
            this.graph.addVertex("寒霞渓",{x:1717,y:556},1,"./image/spot/寒霞渓.png","日本(にほん)三大(さんだい)渓谷(けいこく)美(び)のひとつに数えられ(かぞえられ)、瀬戸内海(せとないかい)国立(こくりつ)公園(こうえん)を代表(だいひょう)する景勝地(けいしょうち)の一つ(ひとつ)。秋(あき)の紅葉(こうよう)をはじめ四季折々(しきおりおり)の景色(けしき)が楽しめる(たのしめる)。 ");
            this.graph.addVertex("紅雲亭駅",{x:1677,y:725},5,"./image/spot/紅雲停駅.png","寒(かん)霞渓(かけい)の麓(ふもと)にあるロープウェイ(ろーぷうぇい)の乗り場(のりば)。 垂直(すいちょく)にそそり立つ(そそりたつ)大岩壁(おおいわかべ)の中(なか)をいくロープウェイ(ろーぷうぇい)からの眺め(ながめ)はまさに絶景(ぜっけい)。 ");
            this.graph.addVertex("粟地ダム",{x:1658,y:833},5,"","安田(やすだ)大川(おおかわ)にある自然調(しぜんちょう)整式(せいしき)のダム(だむ)。 ダム(だむ)の下(した)にある公園(こうえん)は地元(じもと)の人(ひと)が知る(しる)お花見(おはなみ)スポット(すぽっと)。 ");
            this.graph.addVertex("マスいち",{x:335,y:630},5,"","");
            this.graph.addVertex("マスに",{x:728,y:628},5,"","");
            this.graph.addVertex("マスさん",{x:1868,y:557},5,"","");
            this.graph.addVertex("マスよん",{x:770,y:764},3,"","");


            //マスとマスのノードを登録
            this.graph.addEdge("土庄港","<ruby>小豆島博物館<rt>しょうどしまはくぶつかん</rt></ruby>");
            this.graph.addEdge("<ruby>小豆島博物館<rt>しょうどしまはくぶつかん</rt></ruby>","迷路のまち");
            this.graph.addEdge("迷路のまち","エンジェルロード");
            this.graph.addEdge("迷路のまち","鹿島海水浴場");
            this.graph.addEdge("鹿島海水浴場","オリーヴ大樹");
            this.graph.addEdge("迷路のまち","富丘");
            this.graph.addEdge("オリーヴ大樹","小瀬");
            this.graph.addEdge("小瀬","土庄港");
            this.graph.addEdge("富丘","渕崎");
            this.graph.addEdge("マスいち","渕崎");
            this.graph.addEdge("マスに","渕崎");
            this.graph.addEdge("富丘","宝生院シンパク");
            this.graph.addEdge("富丘","池田港");
            this.graph.addEdge("宝生院シンパク","マスよん");
            this.graph.addEdge("マスよん","農村歌舞伎");
            this.graph.addEdge("小豆島大観音","マスよん");
            this.graph.addEdge("小豆島大観音","農村歌舞伎");
            this.graph.addEdge("中山","農村歌舞伎");
            this.graph.addEdge("マスに","渕崎");
            this.graph.addEdge("マスに","小豆島大観音");
            this.graph.addEdge("池田","池田港");
            this.graph.addEdge("池田","中山");
            this.graph.addEdge("池田","池田の桟敷");
            this.graph.addEdge("池田","オリーブ公園");
            this.graph.addEdge("池田の桟敷","ふるさと村");
            this.graph.addEdge("ふるさと村","誓願寺の大ソテツ");
            this.graph.addEdge("吉野","誓願寺の大ソテツ");
            this.graph.addEdge("吉野","神浦");
            this.graph.addEdge("神浦","地蔵崎灯台");
            this.graph.addEdge("浦野","地蔵崎灯台");
            this.graph.addEdge("浦野","竹生");
            this.graph.addEdge("オリーブ公園","竹生");
            this.graph.addEdge("竹生","オリーブビーチ");
            this.graph.addEdge("オリーブビーチ","草壁港");
            this.graph.addEdge("草壁港","安田");
            this.graph.addEdge("安田","粟地ダム");
            this.graph.addEdge("安田","醤油記念館");
            this.graph.addEdge("安田","橘");
            this.graph.addEdge("醤油記念館","醤の郷");
            this.graph.addEdge("醤の郷","碁石山");
            this.graph.addEdge("醤の郷","坂手港");
            this.graph.addEdge("醤の郷","堀越");
            this.graph.addEdge("堀越","映画村");
            this.graph.addEdge("坂手港","瀬戸の浜海水浴場");
            this.graph.addEdge("瀬戸の浜海水浴場","大角鼻灯台");
            this.graph.addEdge("大角鼻灯台","橘");
            this.graph.addEdge("橘","希望の道");
            this.graph.addEdge("橘","かもめ石");
            this.graph.addEdge("かもめ石","当浜");
            this.graph.addEdge("当浜","遠手浜海水浴場");
            this.graph.addEdge("遠手浜海水浴場","福田港");
            this.graph.addEdge("福田港","雲海寺/本地堂");
            this.graph.addEdge("福田港","吉田ダム");
            this.graph.addEdge("吉田ダム","小部");
            this.graph.addEdge("大部港","小部");
            this.graph.addEdge("大部港","恵門ノ瀧");
            this.graph.addEdge("大部港","田井");
            this.graph.addEdge("琴塚","田井");
            this.graph.addEdge("琴塚","大阪城残石");
            this.graph.addEdge("夕陽の丘","大阪城残石");
            this.graph.addEdge("夕陽の丘","屋形崎");
            this.graph.addEdge("マスいち","屋形崎");
            this.graph.addEdge("夕陽の丘","小豆島大観音");
            //this.graph.addEdge("屋形崎","渕崎");
            this.graph.addEdge("お猿の国","小豆島大観音");
            this.graph.addEdge("お猿の国","美しの原");
            this.graph.addEdge("寒霞渓","美しの原");
            this.graph.addEdge("寒霞渓","恵門ノ瀧");
            //this.graph.addEdge("寒霞渓","紅雲亭駅");
            //this.graph.addEdge("寒霞渓","雲海寺/本地堂");
            this.graph.addEdge("吉田ダム","雲海寺/本地堂");
            this.graph.addEdge("マスさん","雲海寺/本地堂");
            this.graph.addEdge("紅雲亭駅","粟地ダム");
            this.graph.addEdge("紅雲亭駅","マスさん");
            this.graph.addEdge("寒霞渓","マスさん");

            //サイコロの画像を格納する配列
            this.diceAry = ['./image/dice1.png',
                            './image/dice2.png',
                            './image/dice3.png',
                            './image/dice4.png',
                            './image/dice5.png',
                            './image/dice6.png'
                        ];  //  画像の配列


            //セッションに保存されているメンバー数を取得
            //nitta//const $mem = window.sessionStorage.getItem(['member_num']);
            //nitta//console.log(window.sessionStorage.getItem(['member_num']));
            //プレイヤーの人数を登録
            const $mem = window.sessionStorage.getItem(['member_num']);
            //const $mem = $doc.getElementById("member");
            //ターンプレイヤーを格納
            this.$turn = $doc.getElementById("turn").value;

            //全プレイヤーを読み込む配列
            this.player_list = [];
            
            //人数分プレイヤーを作成
            //for (let i = 0; i < $mem.value; i++) {
            for (let i = 0; i < $mem; i++) {
                this.player_list[i] = new Player();
                //プレイヤーを区別するためにiをIDとして保存
                this.player_list[i].setID(i);
            }
            //ゲームスタート
            this.start();
            this.dais();

        }

        //ゲームスタート時の処理
        start(){
            //プレイヤー名とポイントを表示
            createTable();

            //全プレイヤーのスタート位置を格納
            for (let i = 0; i < this.player_list.length; i++) {
                //sessionから持ってきたい
                //nitta
                const str = sessionStorage.getItem(['name'+i]); //プレイヤー名の取得
                let arr = new Array();
                arr = str.split(","); //配列arrに分割して格納
                //alert(arr);
                const Minato = arr[1];
                //alert(Minato);
                //this.player_list[i].setPosition(プレイヤーi番目のsessionから読み込んだ場所);
                this.player_list[i].setPosition(Minato);
                
                //this.player_list[i].setPosition("土庄港");
            }
            
            //一番初めのプレイヤーの位置を取得
            const turn1Pos = this.player_list[this.$turn].getPosition();
            const x = (this.graph.getAttribute(turn1Pos)).x;
            const y = (this.graph.getAttribute(turn1Pos)).y;

            //一番初めのプレイヤーを画面に表示
            this.player_list[this.$turn].viewPlayer(x,y);

            //○○のターンと表示
            this.player_list[this.$turn].viewTurnPlayer();


        }

        //「サイコロをふる」ボタンを押した時の処理
        dais(){
            this.$btn.addEventListener('click',(e) => {
                document.getElementById('diceaudio').currentTime = 0; //連続クリックに対応
                document.getElementById('diceaudio').play(); //クリックしたら音を再生
                $("#diceBt").fadeOut();

                const $dice = $doc.getElementById("dice");  //  ここに画像を表示
                const anim =document.getElementById("roledice");
                $("#diceContent").fadeIn();

                //setIntervalのIDを格納する変数
                let intervalId;


                const duration = 1000; //アニメーションの継続時間（ミリ秒）
                const frameRate = 100; //1フレームの表示時間（ミリ秒）
                const waitTime = 1300; //サイコロ停止後の待機時間（ミリ秒）

                // アニメーション開始
                intervalId = setInterval(() => {

                    $dice.style.display='none'
                    $("#roledice").fadeIn();
                    this.diceNum = Math.floor(Math.random() * 6); // 次の画像のインデックス
                    //console.log(this.diceNum);
                    $dice.src = this.diceAry[this.diceNum]; // 画像を表示

                    // アニメーション終了
                    if (Date.now() - startTime >= duration) {
                        clearInterval(intervalId); // インターバルを停止
                        $("#roledice").fadeOut();
                        $("#dice").fadeIn();
                        //waitTime秒後に実行する
                        setTimeout(() => {
                            //ダイスを非表示にする
                            $("#dice").fadeOut();
                            this.moveLoop(0,this.diceNum + 1,"","");
                        }, waitTime);
                    }

                }, frameRate);

                const startTime = Date.now(); // アニメーション開始時間を記録
            }, false);
        }

        //サイコロを振ってその分マスを進む処理
        moveLoop(i,daisNumber,pastPos,currentPos){

            //マスの数に達したら終了
            if(i >= daisNumber){
                $("#moveDice").fadeOut();
                
                $("#diceBt").fadeIn();
                $(".option").fadeIn();

                this.stop(currentPos);
                return;
            }

            $(".option").fadeOut();

            return new Promise((resolve) => {

                const $dice = $doc.getElementById("moveDice");  //  ここに画像を表示
                $("#moveDice").fadeIn();
                $dice.src = this.diceAry[daisNumber - i - 1];

                //誰の番かを格納
                const turn = this.$turn;
                
                const graph = this.graph;
                const player_list = this.player_list;
    
                //プレイヤーの現在地を取得
                const pos = player_list[turn].getPosition();
                //現在地から行ける場所を取得
                const nextPos = graph.getNeighbors(pos);
                //現在地の座標を取得
                const currentX = (graph.getAttribute(pos)).x;
                const currentY = (graph.getAttribute(pos)).y;

                //"root"divに次に行ける場所の候補を全てボタン表示
                const $root = $doc.getElementById("root");
                for (let j = 0; j < nextPos.length; j++) {
                    const $bt = $doc.createElement("button");
                    $bt.setAttribute("id",nextPos[j]);
                    $bt.setAttribute("class","next");
                    //$bt.textContent=nextPos[j];
                    $root.appendChild($bt);

                    //次に行く場所の座標を取得
                    const nextPosX = (graph.getAttribute(nextPos[j])).x;
                    const nextPosY = (graph.getAttribute(nextPos[j])).y;

                    //矢印ボタンの位置を把握するためにマス同士の差分を計算
                    const dx = nextPosX - currentX;
                    const dy = nextPosY - currentY;

                    let directionX;
                    let directionY;

                    //ボタンのスタイルをリセット
                    $bt.style.backgroundColor = "transparent";
                    //$bt.style.border =  "none";
                    $bt.style.cursor =  "pointer";
                    $bt.style.outline =  "none";
                    $bt.style.padding = 0;
                    $bt.style.appearance =  "none";
                    $bt.style.height = 0;
                    $bt.style.width = 0;

                    //上向きの矢印にする
                    $bt.style.borderLeft = "20px solid transparent";
                    $bt.style.borderRight = "20px solid transparent";
                    $bt.style.borderTop = "30px solid #FA325A";
                    $bt.style.borderBottom = "transparent";
                    //$bt.style.boxShadow =  "insert 0px 0px 10px rgba(0, 0, 0, .3)";


                    if (dx > 30) {
                        if (dy > 30) {
                            //右下
                            directionX = 60;
                            directionY = 60;
                            $bt.style.transform = "translate(-50%) rotate(-45deg)";
                        }else if(dy < -30){
                            //右上
                            directionX = 60;
                            directionY = -60;
                            $bt.style.transform = "translate(-50%) rotate(-135deg)";
                        }else{
                            //右
                            directionX = 60;
                            directionY = 0;
                            $bt.style.transform = "translate(-50%) rotate(-90deg)";
                        }
                    }else if(dx < -30){
                        if (dy > 30) {
                            //左下
                            directionX = -60;
                            directionY = 60;
                            $bt.style.transform = "translate(-50%) rotate(45deg)";
                        }else if(dy < -30){
                            //左上
                            directionX = -60;
                            directionY = -60;
                            $bt.style.transform = "translate(-50%) rotate(135deg)";
                        }else{
                            //左
                            directionX = -60;
                            directionY = 0;
                            $bt.style.transform = "translate(-50%) rotate(90deg)";
                        }
                    }else{
                        if (dy > 30) {
                            //下
                            directionX = 0;
                            directionY = 60;
                            $bt.style.transform = "translate(-50%)";
                        }else if(dy < -30){
                            //上
                            directionX = 0;
                            directionY = -60;
                            $bt.style.transform = "translate(-50%) rotate(180deg)";
                        }else{
                            //同じ座標
                            directionX = 0;
                            directionY = 0;
                        }
                    }

                    //ボタンの配置
                    $bt.style.position = "absolute";
                    $bt.style.top = "calc(50% + "+ directionY +"px)";
                    $bt.style.left = "calc(50% + " + directionX +"px)";
                }

                //ボタンを押した時の処理
                $(".next").on("click",function(){
                    document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
                    document.getElementById('btn_push').play(); //クリックしたら音を再生
                    const next = $(this).attr('id');
                    console.log(next);
                    //console.log("うごくことができるマスの数：",daisNumber - i-1);

                    //次に行く場所の座標を取得
                    const newPosX = (graph.getAttribute(next)).x;
                    const newPosY = (graph.getAttribute(next)).y;

                    player_list[turn].movePlayer(currentX,currentY,newPosX,newPosY);
                    player_list[turn].viewPlayer(newPosX,newPosY);
                    player_list[turn].setPosition(next);
                    $("#root").empty();

                    if (pastPos == next) {
                        i -= 1;
                    }
                    console.log("うごくことができるマスの数：",daisNumber - i-1);

                    resolve([pos,next]); 
                });
            }).then((result) => {
                //サイコロが0になるまでmoveLoopを呼び出す
                return this.moveLoop(i+1,daisNumber,result[0],result[1]);
            });
        }

        //マスに止まった時の処理
        stop(pos){
            //説明文の表示
            if(pos != "マスいち" && pos != "マスに" && pos != "マスさん" && pos != "マスよん"){
                this.graph.view(pos);
                
                //貰えるポイント
                let pt = this.graph.getPoint(pos);
                if (this.player_list[this.$turn].getEvent() == "ボーナスタイム") {
                    this.player_list[this.$turn].setEvent("");
                    pt = pt * 2;
                }

                //プレイヤーにポイントを渡す
                this.player_list[this.$turn].getPoint(pt);

                $(".close").on('click',() => {
                    $("#btn_push").get(0).play();
                    $("#overlay").fadeOut();
                    $("#explain").empty();
                    $("#pt_content").empty();
                    $(".close").remove();
                    
                    this.event(pos);
                });

            }else{
                this.event(pos);
            }

        }

        event(pos){
            //マスからイベントを読み込み
            const event_kinds = this.graph.viewEvent(pos);

            if (event_kinds == "イベントなし") {
                this.player_list[this.$turn].setEvent("");
                this.next();
            }else if(event_kinds == "クイズ"){
                const container = $doc.getElementById("event_bt");
                const buttons = container.getElementsByTagName("button");
                if (Math.random() > 0.5) {
                    // ボタン1とボタン2の順序を入れ替える
                    container.insertBefore(buttons[1], buttons[0]);
                  } else {
                    // ボタン2とボタン1の順序を入れ替える
                    container.insertBefore(buttons[0], buttons[1]);
                  }
                  
                $(".close").remove();
            }else if(event_kinds == "ポイントゲット"){
                this.player_list[this.$turn].getPoint(300);
            }
            
            this.player_list[this.$turn].setEvent(this.event_kinds);
            //console.log(this.player_list[this.$turn].getEvent());


            $(".close").on('click',() => {
                $("#btn_push").get(0).play();
                $("#event").fadeOut();
                $(".close").remove();

                this.next();
            });

            $("#quiz1").on('click',() => {
                $("#btn_push").get(0).play();
                $("#event").fadeOut();
                $("#quiz1").remove();
                $("#quiz2").remove();
                $(".close").remove();
                
                const $quiz_result = $doc.getElementById("quiz_result");
                $("#quiz_result").fadeIn();
                $("#success").get(0).play();

                //クイズの合否
                const $quiz_result_title = $doc.getElementById("quiz_result_title");
                $quiz_result_title.textContent = "せいかい";

                //合否による報酬
                const $quiz_result_content = $doc.getElementById("quiz_result_content");
                $quiz_result_content.textContent = "クイズにせいかいしました！\nごほうびにつぎのもらえるポイントが２倍に！";
                this.player_list[this.$turn].setEvent("ボーナスタイム");

                //クイズの答え画面の閉じるボタン
                const $quiz_result_close_bt = $doc.createElement("button");
                $quiz_result_close_bt.setAttribute("class","close"); 
                $quiz_result_close_bt.textContent = "とじる";
                $quiz_result.appendChild($quiz_result_close_bt);

                this.quizResult();
            });

            $("#quiz2").on('click',() => {
                $("#btn_push").get(0).play();
                $("#event").fadeOut();
                $("#quiz1").remove();
                $("#quiz2").remove();
                $(".close").remove();
            
                const $quiz_result = $doc.getElementById("quiz_result");
                $("#quiz_result").fadeIn();
                $("#fail").get(0).play();
                const $quiz_result_title = $doc.getElementById("quiz_result_title");
                $quiz_result_title.textContent = "ざんねん";

                //合否による報酬
                const $quiz_result_content = $doc.getElementById("quiz_result_content");
                $quiz_result_content.textContent = "まちがえてしまったので50ポイントをいただきます";
                
                this.player_list[this.$turn].getPoint(-50);

                const $quiz_result_close_bt = $doc.createElement("button");
                $quiz_result_close_bt.setAttribute("class","close");
                $quiz_result_close_bt.textContent = "とじる";
                $quiz_result.appendChild($quiz_result_close_bt);
                
                this.quizResult();
            });


        }

        quizResult(){
            $(".close").on("click", () => {
                $("#btn_push").get(0).play();
                $("#quiz_result").fadeOut();
                $(".close").remove();
                this.next();
            });
            
        }

        next(){
            

            //プレイヤーの人数を呼び出し
            //const $mem = $doc.getElementById("member");
            const $mem = window.sessionStorage.getItem(['member_num']);


            //if ($mem.value > Number(this.$turn) + 1) {
            if ($mem > Number(this.$turn) + 1) {
                this.$turn = Number(this.$turn) + 1;
                this.nextPlayer();
            }else{
                this.$turn = 0;
                this.turn += 1;
                console.log(this.turn);

                //10ターン経過すると終了
                if (this.turn > 5) {
                    this.finish();

                }else{//何ターン目なのかを表示
                    $("#turnView").fadeIn();
                    $("#turnView").empty();
                    const $turnView = $doc.getElementById("turnView");
                    const $turnViewChild = $doc.createElement("h1");
                    $turnViewChild.setAttribute("id","turnViewChild");
                    if (this.turn == 5) {
                        $turnViewChild.textContent = "さいごのターン";
                    }else{
                        $turnViewChild.textContent = this.turn + "ターン目";
                    }
                    $turnView.appendChild($turnViewChild);
                    $("#turnView").fadeOut(1000 , () => {
                        this.nextPlayer();
                    });
                }
            }
        }

        nextPlayer(){
            const event = this.player_list[this.$turn].getEvent();
            console.log(this.$turn, event);
            if (event == "一回休み") {
                this.player_list[this.$turn].setEvent("");
                this.next();
            }else{
                //console.log(this.$turn,"プレイヤー名");
                //console.log(this.turn,'ターン目');
                //プレイヤーの位置を取得
                const turnPos = this.player_list[this.$turn].getPosition();
                const x = (this.graph.getAttribute(turnPos)).x;
                const y = (this.graph.getAttribute(turnPos)).y;
    
                //プレイヤーを画面に表示
                this.player_list[this.$turn].viewPlayer(x,y);
    
                this.player_list[this.$turn].viewTurnPlayer();
            }
        }

        finish(){
            //alert("ゲームしゅうりょう");
            let max_point = 0;
            let j = 0;
            let victoryPlayer = [];

            
            for (let i = 0; i < this.player_list.length; i++) {
                const playerPoint = this.player_list[i].getPointEnd();
                if (max_point < playerPoint) {
                    victoryPlayer = [];
                    victoryPlayer[0] = i;
                    j = 0;
                    max_point = playerPoint;
                }else if(max_point == playerPoint){
                    j += 1;
                    victoryPlayer[j] = i;
                }
            }
            //最高得点のプレイヤー
            for (let i = 0; i < victoryPlayer.length; i++) {
                //セッションにthis.player_list[victoryPlayer[i]].getPoint(); ポイント
                           //this.player_list[victoryPlayer[i]].getName(); 名前
                           //this.player_list[victoryPlayer[i]].getSrc(); 画像
                var arr = new Array();
                arr[0] = this.player_list[victoryPlayer[i]].getPointEnd();
                arr[1] = this.player_list[victoryPlayer[i]].getName();
                arr[2] = this.player_list[victoryPlayer[i]].getSrc();
                //alert(arr);
                console.log(this.player_list[victoryPlayer[i]].getPoint());
                //console.log(arr);
                window.sessionStorage.setItem("V"+i, arr);
            }

            location = "finish.html";
        }
    }

    //マスclass
    class Trout{
        constructor(){
            this.point = 100;
            this.event = 0;
            this.title = "";
            this.explain = "";
            this.quiz = [];
            this.img_src = "";
        }

        setEvent(i){
            this.event = i;
        }

        setTitle(title){
            this.title = title; 
            switch (title) {
                case "小瀬":
                    this.quiz[0] = "こせ";
                    this.quiz[1] = "おせ";
                    break;

                case "富丘":
                    this.quiz[0] = "とみおか";
                    this.quiz[1] = "とみがおか";
                    break;
                
                case "池田":
                    this.quiz[0] = "いけだ";
                    this.quiz[1] = "いけた";
                    break;

                case "中山":
                    this.quiz[0] = "なかやま";
                    this.quiz[1] = "ちゅうざん";
                    break;
                
                case "吉野":
                    this.quiz[0] = "よしの";
                    this.quiz[1] = "よしや";
                    break;

                case "神浦":
                    this.quiz[0] = "こうのうら";
                    this.quiz[1] = "かみうら";
                    break;

                case "蒲野":
                    this.quiz[0] = "かまの";
                    this.quiz[1] = "かばの";
                    break;

                case "竹生":
                    this.quiz[0] = "たこう";
                    this.quiz[1] = "ちくせい";
                    break;
                
                case "安田":
                    this.quiz[0] = "やすだ";
                    this.quiz[1] = "あんだ";
                    break;

                case "堀越":
                    this.quiz[0] = "ほりこし";
                    this.quiz[1] = "ほりごし";
                    break;
                
                case "橘":
                    this.quiz[0] = "たちばな";
                    this.quiz[1] = "はし";
                    break;

                case "当浜":
                    this.quiz[0] = "あてはま";
                    this.quiz[1] = "とうひん";
                    break;

                case "小部":
                    this.quiz[0] = "こべ";
                    this.quiz[1] = "おべ";
                    break;
                
                case "田井":
                    this.quiz[0] = "たい";
                    this.quiz[1] = "でんい";
                    break;

                case "琴塚":
                    this.quiz[0] = "ことづか";
                    this.quiz[1] = "ことつか";
                    break;
                
                case "小海":
                    this.quiz[0] = "おみ";
                    this.quiz[1] = "こうみ";
                    break;

                case "屋形崎":
                    this.quiz[0] = "やかたざき";
                    this.quiz[1] = "やかたさき";
                    break;
                
                case "渕崎":
                    this.quiz[0] = "ふちざき";
                    this.quiz[1] = "ぶちざき";
                    break;
    

                default:
                    break;
            }
        }

        getEvent(){
            const $event = $doc.getElementById("event");
            const $event_title = $doc.getElementById("event_title");
            const $event_content = $doc.getElementById("event_content");

            const $close_bt = $doc.createElement("button");
            $close_bt.setAttribute("class","close");
            $close_bt.textContent = "とじる";

            let event = "";
            $event_title.textContent = "";
            $event_content.textContent = "";
            switch (this.event) {
                case 0:
                    $("#quiz").get(0).play();
                    const $event_bt = $doc.getElementById("event_bt");
                    $event_title.textContent = "クイズ"
                    $event_content.textContent ="「" +  this.title + "」は、なにとよむでしょうか？";
                    const $quiz1 = $doc.createElement("button");
                    $quiz1.setAttribute("id","quiz1");
                    $quiz1.textContent = this.quiz[0];
                    const $quiz2 = $doc.createElement("button");
                    $quiz2.setAttribute("id","quiz2");
                    $quiz2.textContent = this.quiz[1];
                    $event_bt.appendChild($quiz1);
                    $event_bt.appendChild($quiz2);

                    event = "クイズ";

                    break;
                case 1:
                    $event_title.textContent = "ボーナスタイム";
                    $event_content.textContent = this.title + "でこまっているひとをたすけた！つぎにとまったマスでもらえるポイントが2倍になる！";
                    $("#success").get(0).play();
                    event = "ボーナスタイム"; 
                    
                    break;
                case 2:
                    $event_title.textContent = "一回休み";
                    $event_content.textContent = this.title + "をまんきつする。一回休み。";
                    $("#fail").get(0).play();
                    event = "一回休み"; 
                    break;
            
                case 3:
                    $event_title.textContent = "一回休み";
                    $event_content.textContent = "道に迷ってしまう。一回休み。";
                    $("#fail").get(0).play();
                    event = "一回休み";
                    break;

                case 4:
                    $event_title.textContent = "ポイントゲット";
                    $event_content.textContent = this.title + "で良い景色を見て感動する。300ポイントゲット";
                    $("#success").get(0).play();
                    event = "ポイントゲット";
                    break;

                default:
                    event = "イベントなし";
                    return event;
            }

            $("#event").fadeIn();
            $event.appendChild($close_bt);
            return event;

        }

        getPointTrout(){
            let pt;
            if (this.point > 0) {
                pt = this.point;
                this.point -= 50;
            }else{
                pt = this.point;
            }
            return pt;
        }

        setExplain(ex){
            this.explain = ex;
        }

        setImgSrc(src){
            this.img_src = src;
        }

        viewExplain(){

            $("#overlay").fadeIn();
 
            const $overlay = $doc.getElementById("overlay");
            const $pt_content = $doc.getElementById("pt_content");
            const $explain = $doc.getElementById("explain");

            if(this.img_src.length > 0){
                const $explain_img = $doc.getElementById("explain_img");

                $explain_img.setAttribute("src",this.img_src);

                $explain.appendChild($explain_img);

            }
            

            //〇ptGETを表示
            const $point = $doc.createElement("h1");
            const $pt = $doc.createElement("h1");
            const $get = $doc.createElement("h1");

            const $new_title = $doc.createElement("h2");
            const $new_explain = $doc.createElement("p");
            const $close_bt = $doc.createElement("button");


            $point.setAttribute("id","point");
            $point.textContent = this.point;
            $pt.setAttribute("id","pt");
            $pt.textContent = "pt";
            $get.setAttribute("id","get");
            $get.textContent = "GET";

            $new_title.setAttribute("id","title");
            $new_title.innerHTML =this.title;

            $new_explain.setAttribute("id","ex_content");
            $new_explain.innerHTML= this.explain;

            $close_bt.setAttribute("class","close");
            $close_bt.textContent = "とじる";
            
            $pt_content.appendChild($point);
            $pt_content.appendChild($pt);
            $pt_content.appendChild($get);

            $explain.appendChild($new_title);
            $explain.appendChild($new_explain);
            $overlay.appendChild($close_bt);

        }

    }

    //プレイヤーclass
    class Player{
        constructor(){
            this.id = "";
            this.player_point = 0;
            this.position = "";
            this.name = "";
            this.player_event = "";
            this.image_src = "";
            this.imageCanvas = new ImageCanvas();
            //this.viewPlayer();
        }
        setID(id){
            this.id = id;
            this.setSrc();
        }

        setSrc(){
            const i = this.id + 1;
            this.image_src = "./image/koma" + i + ".png";
            console.log(this.image_src);
        }

        getSrc(){
            return this.image_src;
        }

        getName(){
            this.name = $doc.getElementById("user"+this.id).value;
            return this.name;
        }

        setPosition(pos){
            this.position = pos;
        }

        getPosition(){
            return this.position;
        }

        getPoint(p){
            if(!(this.player_point + p < 0)){
                this.player_point += p;
            }else{
                this.player_point = 0;
            }
            this.viewPoint(this.player_point);

        }

        getPointEnd(){
            return this.player_point;
        }

        viewPoint(p){
            const $point = $doc.getElementById("player_point" + this.id);
            $point.innerText = p;


        }

        getEvent(){
            return this.player_event;
        }

        
        setEvent(ev){
            this.player_event = ev;
        }

        viewTurnPlayer(){
            const $turnPlayer = $doc.getElementById("turnPlayer");
            $("#turnPlayer").fadeIn();
            const $turnPlayer_view = $doc.createElement("h1");
            const $turnPlayer_view2 = $doc.createElement("h2");

            $turnPlayer_view.setAttribute("id","turnPlayerView");
            $turnPlayer_view.textContent = this.getName();
            $turnPlayer_view2.setAttribute("id","turnPlayerView2");
            $turnPlayer_view2.textContent = "のターン"

            $turnPlayer.appendChild($turnPlayer_view);
            $turnPlayer.appendChild($turnPlayer_view2);

            $("#turnPlayer").fadeOut(2000, () => {
                $("#turnPlayer").empty();
            });
        }

        viewPlayer(x,y){
            this.imageCanvas = new ImageCanvas;
            this.imageCanvas.drawPlayer(x,y,this.image_src);
        }

        movePlayer(x,y,tx,ty){
            this.imageCanvas.animationImageCanvas(x,y,tx,ty);
        }

    }

    //new ImageCanvas();


    //createTable();
    
    //プレイヤーの名前とポイントを表示する表の作成
    function createTable(){
        //プレイヤーの人数memberとプレイヤー名を表示する表playerを取得
        //const $member = $doc.getElementById("member");
        //nitta
        const $member = window.sessionStorage.getItem(['member_num']);
        const $table = $doc.getElementById("player");
        
        //playerの人数分ループする
        //for (i=0;i<$member.value;i++){
        //nitta
        for (i=0;i<$member;i++){
            let $newRow = $doc.createElement("tr");

            //inputのtextタグを生成
            //const player_name = "Player" + i ;
            //const player_name = "あああ" + i ;

            var str = sessionStorage.getItem(['name'+i]); //プレイヤー名の取得
            var arr = new Array();
            arr = str.split(","); //配列arrに分割して格納
            const player_name = arr[0];

            const $new_input = $doc.createElement("input");
            $new_input.setAttribute("name","user"+ i);
            $new_input.setAttribute("id","user"+ i);
            $new_input.setAttribute("type","text");
            $new_input.setAttribute("size","20");
            $new_input.setAttribute("value",player_name);
            $new_input.readOnly = true;

            //ポイントを表示するpタグを生成
            const $point = $doc.createElement("p");
            const $newContent = $doc.createTextNode("0");
            $point.appendChild($newContent);
            $point.setAttribute("id","player_point" + i);
            $point.setAttribute("class","player_point");
            //$point.style.padding = "0.8rem";

            //ポイントを表示するpタグを生成
            const $pt = $doc.createElement("p");
            const $ptContent = $doc.createTextNode("pt");
            $pt.appendChild($ptContent);
            $pt.setAttribute("class","pt");
            //$pt.style.padding = "1rem";
            $pt.style.fontSize = "1.2rem"

            //tdにinputタグとpタグを子要素として追加
            const $newCell = $doc.createElement("td");
            $newCell.appendChild($new_input);
            $newCell.appendChild($point);
            $newCell.appendChild($pt);

            //trにtdを子要素として追加
            $newRow.appendChild($newCell);

            //tableにtrを子要素として追加
            $table.appendChild($newRow);
        }   
    }

    //ページを読み込んだときに実行される
    document.addEventListener('DOMContentLoaded', function(){
  
        // オーバレイを開閉する関数
        const overlay = document.getElementById('Map-overlay');
        function overlayToggle() {
          overlay.classList.toggle('overlay-on');
        }
        // 指定した要素に対して上記関数を実行するクリックイベントを設定
        const clickArea = document.getElementsByClassName('Map-overlay-event');
        for(let i = 0; i < clickArea.length; i++) {
          clickArea[i].addEventListener('click', overlayToggle, false);
        }
        // イベントに対してバブリングを停止
        function stopEvent(event) {
          event.stopPropagation();
        }
        const overlayInner = document.getElementById('Map-overlay-inner');
        overlayInner.addEventListener('click', stopEvent, false);
        
      }, false);
    
      document.addEventListener('DOMContentLoaded', function(){

        // オーバレイを開閉する関数
        const overlay = document.getElementById('Option-overlay');
        function overlayToggle() {
            overlay.classList.toggle('overlay-on');
        }
        // 指定した要素に対して上記関数を実行するクリックイベントを設定
        const clickArea = document.getElementsByClassName('Option-overlay-event');
        for(let i = 0; i < clickArea.length; i++) {
            clickArea[i].addEventListener('click', overlayToggle, false);
        }
        // イベントに対してバブリングを停止
        function stopEvent(event) {
            event.stopPropagation();
        }
        const overlayInner = document.getElementById('Option-overlay-inner');
        overlayInner.addEventListener('click', stopEvent, false);
        
    }, false);
     
    document.addEventListener('DOMContentLoaded', function(){
  
        // オーバレイを開閉する関数
        const overlay = document.getElementById('End-overlay');
        function overlayToggle() {
          overlay.classList.toggle('overlay-on');
        }
        // 指定した要素に対して上記関数を実行するクリックイベントを設定
        const clickArea = document.getElementsByClassName('End-overlay-event');
        for(let i = 0; i < clickArea.length; i++) {
          clickArea[i].addEventListener('click', overlayToggle, false);
        }
        // イベントに対してバブリングを停止
        function stopEvent(event) {
          event.stopPropagation();
        }
        const overlayInner = document.getElementById('End-overlay-inner');
        overlayInner.addEventListener('click', stopEvent, false);
        
    }, false);
    


    /*function audioplay() {
    $(".close-button-play").on('click', () => {
        document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
        document.getElementById('btn_audio').play(); //クリックしたら音を再生
    });

    //function audiomute() {
    $(".close-button-mute").on('click', () => {
        document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
        document.getElementById('btn_audio').pause(); //クリックしたら音を再生
    });
    /*
    $(".map, .option, .close, .rule, #diceBt, #close-btn1, #close-btn2").on('click', () => {
        document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
        document.getElementById('btn_push').play(); //クリックしたら音を再生
    });
    */
    $("button").on('click', () => {
        document.getElementById('btn_push').currentTime = 0; //連続クリックに対応
        document.getElementById('btn_push').play(); //クリックしたら音を再生
    });

    $(".true-end").on('click', () =>{
        location = "index.html";
    });

    const audio = document.getElementById("audio"); 

    audio.addEventListener("click", function(){
        $("#btn_audio").get(0).play();
        if(audio.textContent=='サウンドON'){
         audio.textContent = 'サウンドOFF'  //  ボタンの表示を変える
         $("#btn_audio").get(0).play();
        }else{
         audio.textContent = 'サウンドON';  //  ボタンの表示を変える
         $("#btn_audio").get(0).pause();        }
    });



    
    //全てが始まる
    new Game();


})();


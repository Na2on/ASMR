$(function() {
    // 定義
    var slideBtn = document.querySelectorAll('slide-btn'); // スライドで表示させる要素の取得
    var slideBtnRect = []; // 要素の位置を入れるための配列
    var slideBtnTop = []; // 要素の位置を入れるための配列
    var windowY = window.pageYOffset; // ウィンドウのスクロール位置を取得
    var windowH = window.innerHeight; // ウィンドウの高さを取得
    var remainder = 50; // ちょっとはみ出させる部分

    // 要素の位置を取得
    for (var i = 0; i < slideBtn.length; i++) {
        slideBtnRect.push(slideBtn[i].getBoundingClientRect());
    }

    for (var i = 0; i < slideBtnRect.length; i++) {
        slideBtnTop.push(slideBtnRect[i].top + windowY);
    }

    // ウィンドウがリサイズされたら、ウィンドウの高さを再取得
    window.addEventListener('resize', function() {
        windowH = window.innerHeight;
    });
    
    // スクロールされたら
    window.addEventListener('scroll', function() {
        // スクロール位置を取得
        windowY = window.pageYOffset;

        for (var i = 0; i < slideBtn.length; i++) { 
            // 要素が画面の下端にかかったら
            if (windowY > slideBtnTop[i] - windowH + remainder) {
                // .showを付与
                slideBtn[i].classList.add('active');
            } else {
                // 逆に.showを削除
                slideBtn[i].classList.remove('active');
            }
        }
    });

    // アニメーションさせたいクラス
    var container = $('.slide-text');
    // アニメーションスピード
    var speed = 80;

    // テキストの間にスペースを入れます
    var content = $(container).html();
    var text = $.trim(content);
    var newHtml = "";

    // スペースで区切ったテキストを、テキストの数だけspanで囲む
    text.split("").forEach(function(v) {
        newHtml += '<span>' + v + '</span>';
    });

    // spanで囲んだテキスト群をHTMLに戻す
    $(container).html(newHtml);

    // 1文字ずつ表示
    var txtNum = 0;
    setInterval(function() {
    $(container).find('span').eq(txtNum).css({opacity: 1});
        txtNum++
    }, speed);
    

    $('main section').each(function(i) {
        setTimeout(function() {
            $('main section').eq(i).addClass('active');
        }, 500 * i);
    });

    $('div ul li').each(function(i) {
        setTimeout(function() {
            $('div ul li').eq(i).addClass('active');
        }, 500 * i);
    });

    $('a').click(function() {
        var id = $(this).attr('href');
        var position = $(id).offset().top;
        $('html, body').animate({
            'scrollTop': position
        }, 'slow');
    });

    $('.toTop').click(function() {
        $('html, body').animate({
            'scrollTop': 0
        }, 'slow');
    });
});
/**
 * donut-indent
 * Copyright (c) 2015, kenji0x02. (MIT Licensed)
 * https://github.com/kenji0x02/donut-indent
 */

// 新たに生成した要素でjQueryイベントが有効にならないので
// documentに対してクリックイベントを登録する。ただしパフォーマンスは低下。
// $(".donut-indent").on('click', function() {
$(document).on('click',".donut-indent", function() {
  //キーボード操作などにより、オーバーレイが多重起動するのを防止する
  $(this).blur(); //ボタンからフォーカスを外す
  if($("#modal-overlay")[0]) return false ;   //新しくモーダルウィンドウを起動しない

  //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
  $("body").append('<div id="modal-overlay"></div>');

  //[$modal-overlay]をフェードインさせる
  $("#modal-overlay").fadeIn("slow");

  //コンテンツをセンタリングする
  centeringModalSyncer();

  //[$modal-content]をフェードインさせる
  $("#modal-content").fadeIn("slow");

  $("#modal-overlay, #modal-close").on('click', function() {
    //[#modal-overlay]と[#modal-close]をフェードアウトする
    $("#modal-content,#modal-overlay").fadeOut("slow",function() {
      //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
      $("#modal-overlay").remove();
    });
  });
});

//センタリングをする関数
function centeringModalSyncer() {

  //画面(ウィンドウ)の幅を取得し、変数[w]に格納
  var w = $(window).width();

  //画面(ウィンドウ)の高さを取得し、変数[h]に格納
  var h = $(window).height();

  //コンテンツ(#modal-content)の幅を取得し、変数[cw]に格納
  var cw = $("#modal-content").outerWidth();

  //コンテンツ(#modal-content)の高さを取得し、変数[ch]に格納
  var ch = $("#modal-content").outerHeight();

  //コンテンツ(#modal-content)を真ん中に配置するのに、左端から何ピクセル離せばいいか？を計算して、変数[pxleft]に格納
  var pxleft = ((w - cw)/2);

  //コンテンツ(#modal-content)を真ん中に配置するのに、上部から何ピクセル離せばいいか？を計算して、変数[pxtop]に格納
  var pxtop = ((h - ch)/2);

  $( "#modal-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
};

//リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
$( window ).resize( centeringModalSyncer ) ;

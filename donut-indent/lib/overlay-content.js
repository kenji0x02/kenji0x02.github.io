/**
 * donut-indent
 * Copyright (c) 2015, kenji0x02. (MIT Licensed)
 * https://github.com/kenji0x02/donut-indent
 */

// header numberが減った時は<ul>を増やす
// header numberが増えた時は</ul>を増やす
module.exports = function(hObject, indentDepth) {
  var content = '<ul>'
  var ulCount = 0;
  // $.each(hObject, function(index, value) {
    // maxIndexよりも小さいものは無視
    // filterをかけたほうがいい->ハッシュなのでフォルタかけれない。。
  
  for(var i = 1; i < hObject.length; i++) {
    // if(hObject.at)
    // textを抽出
    var value = hObject[i];
    var headingDiff = hObject[i].tagName.replace('H', '') - hObject[i-1].tagName.replace('H', '') - 0;
    console.log(headingDiff);
    if(headingDiff > 0){
      var bra = '';
      for(var j = 0; j < headingDiff; j++) {
        bra += '<ul>';
      }
      content += bra;
    }

    if(headingDiff < 0){
      var ket = '';
      for(var j = 0; j < -headingDiff; j++) {
        ket += '</ul>';
      }
      content += ket;
    }
    ulCount += headingDiff;

    var text = $(value).text();
    // ul要素を作成
    content += '<li>' + text + '</li>';
    // 
  }

  if(ulCount > 0){
    var ket = '';
    for(var j = 0; j < ulCount; j++) {
      ket += '</ul>';
    }
    content += ket;
  }
  // content += '</ul>'
  return content;
};

// module.exports.create = create;

$(function(){
  "use strict";

  var HEADER_TAG_PREFIX = 'multi_fan_indent_';

  function getHeaderFontSize(headerNumber) {
    return $(headerNumber + ":header").css('fontSize').replace("px", "") - 0;
  }

  function getHeaderLineHeight(headerNumber) {
    return $(headerNumber + ":header").css('line-height').replace("px", "") - 0;
  }

  function calcIconHalfSize(fontSize) {
    return Math.round(fontSize * 0.4);
  }

  function calcMarginTop(lineHeight, fontSize) {
    return Math.round(fontSize * 0.1 + (lineHeight - fontSize) * 0.5);
  }

  function calcCenter(fontSize) {
    return Math.round(fontSize * 0.4);
  }

  function initializeCanvasSize(iconSize, marginTop, canvas) {
    $(canvas).css('margin-top', marginTop)
    $(canvas).css('margin-right', marginTop)
    canvas.width = iconSize;
    canvas.height = iconSize;
  }

  function renderFan(redius, center, percentage, colorCode, canvas) {
    var ctx = canvas.getContext("2d");
    var ninetyDegree = 1.5707963267948966; // 90*Math.PI/180;
    var startRadian = -ninetyDegree;
    var endRadian = ninetyDegree * (percentage * 0.04 - 1);
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, redius, startRadian, endRadian, false);
    ctx.fillStyle = colorCode;
    ctx.fill();
  }

  function renderMultiFanIndent(canvasID) {
    var indentArray = canvasID.replace("multi_fan_indent_", "").split("_").map(function(el){
      return el - 0;
    });
    var headerTag = "h" + indentArray.filter(function(el, index, array){return (el != 0);}).length;
    var fontSize = getHeaderFontSize(headerTag);
    var lineHeight = getHeaderLineHeight(headerTag);
    var iconHalfSize = calcIconHalfSize(fontSize);
    var marginTop = calcMarginTop(lineHeight, fontSize);
    var center = calcCenter(fontSize);
    var canvas = document.getElementById(canvasID);

    // canvasの設定
    initializeCanvasSize(iconHalfSize * 2, marginTop, canvas);

    // 外側の円から描画していく
    indentArray.forEach(function(el, index, array) {
      var radiusRatio = [1, 0.66, 0.33];
      var radius = Math.round(iconHalfSize * radiusRatio[index]);
      // 100%の円
      renderFan(radius, center, 100, "#fff", canvas);
      // 扇型
      renderFan(radius, center, el, "#59bb0c", canvas);
    });
  }

  function createID() {
    var h1Object = $("h1:header");
    var h2Object = $("h2:header");
    var h3Object = $("h3:header");
    var hObject = $(":header");

    var h1TagNumber = 0;
    var h2TagNumber = 0;
    var h3TagNumber = 0;

    var initialTag = {1: 0, 2: 0, 3: 0};
    var tag = [];

    $.each(hObject, function(index, value) {
      var headers = $.extend(true, {}, initialTag);
      if(index > 0) {
        headers = $.extend(true, {}, tag[index - 1]);
      }

      var headerNumber = value.tagName.replace("H", "") - 0;

      // count up
      headers[headerNumber] += 1;

      // reset
      [1, 2, 3].forEach(function(el) {
        if(el > headerNumber) {
          headers[el] = 0;
        }
      });

      // todo:規格化

      tag.push(headers);
    });
  }

  createID();
  renderMultiFanIndent("multi_fan_indent_100_0_0");
  renderMultiFanIndent("multi_fan_indent_100_33_0");
  renderMultiFanIndent("multi_fan_indent_100_33_50");
});

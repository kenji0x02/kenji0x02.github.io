$(function(){
  "use strict";

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
      renderFan(radius, center, 100, "#999", canvas);
      // 扇型
      renderFan(radius, center, el, "#555", canvas);
    });
  }

  renderMultiFanIndent("multi_fan_indent_100_0_0");
  renderMultiFanIndent("multi_fan_indent_100_33_0");
  renderMultiFanIndent("multi_fan_indent_100_33_50");
});

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

  function renderFan(redius, center, canvas) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(center, center);
    // 背景
    ctx.arc(center, center, redius, 0*Math.PI/180, 360*Math.PI/180, false);
    ctx.fillStyle = "#eee";
    ctx.fill();
    // 扇型
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, redius, -90*Math.PI/180, 120*Math.PI/180, false);
    ctx.fillStyle = "#999";
    ctx.fill();
  }

  function renderFanIndent(headerNumber, canvasID) {
    var fontSize = getHeaderFontSize(headerNumber);
    var lineHeight = getHeaderLineHeight(headerNumber);

    var iconHalfSize = calcIconHalfSize(fontSize);
    var marginTop = calcMarginTop(lineHeight, fontSize);
    var center = calcCenter(fontSize);
    var canvas = document.getElementById(canvasID);
    initializeCanvasSize(iconHalfSize * 2, marginTop, canvas);
    renderFan(iconHalfSize, center, canvas);
  }
  
  renderFanIndent("h1", "multi-fan-index-1");
  renderFanIndent("h2", "multi-fan-index-1-1");
});

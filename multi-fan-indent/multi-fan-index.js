$(function(){
  "use strict";
  function initializeCanvasSize() {
    console.log("initialize");
    var canvas = document.getElementById("multi-fan-index-1");
    var headerHeight1 = $("h1:header").height();
    var headerHeight = $("h1:header").css('fontSize').replace("px", "");
    console.log(headerHeight);
    console.log(headerHeight1);
    canvas.width = headerHeight;
    canvas.height = headerHeight;
    var ctx = canvas.getContext("2d");
  }

  function renderFan() {
    console.log("render fan");
    var ctx = document.getElementById("multi-fan-index-1").getContext("2d");
    ctx.beginPath();
    ctx.moveTo(18, 18);
    ctx.arc(18, 18, 16, -90*Math.PI/180, 120*Math.PI/180, false);
    // ctx.arc(18, 18, 16, 0, Math.PI*2, true);
    ctx.fillStyle = "#337ab7";
    ctx.fill();
    // ctx.stroke();
  }

  var multiFanIndent = function(){};

  initializeCanvasSize();
  renderFan();
});

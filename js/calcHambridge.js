/*!
calc hambridge progression
*/
function calcHambridge(tar,ppi=10) {
  busy('busy');
  console.log("hambridge - ppi:"+ppi);
  var full_width=204;
  var full_height=484;
  var s_text=4;
  var s_y=2;
  var s_x=482;
  var w_width=full_width-4;
  var w_height=full_height-2;
  var cabinet=0;
  var front=0;
  var allFronts="";

  $("#tbl"+tar).html("");
  var ac=$("#canvas"+tar).attr("data-Type");
  // var ppi=$("#canvas"+tar).attr("data-PPI");

  var d_width=parseFloat($("#drawerwidth").val());
  var d_count=parseInt($("#drawercount").val());
  var rail=parseFloat($("#rail").val());

  var c = document.getElementById(tar);
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, full_width, full_height);
  ctx.beginPath();

  // Create gradient
  var grd = ctx.createLinearGradient(0,0,350,0);
  grd.addColorStop(0,"grey");
  grd.addColorStop(1,"white");
  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.font = "18px Arial";

  // calc rail height in pixels
  var h_rail=Math.round(rail*ppi);
  // draw bottom rail
  var x=s_x-h_rail;
  drawRail(s_y,x,w_width,h_rail,ctx);
  cabinet=+rail;

  // calc bottom front
  for (var i = 1; i < (d_count+1); i++) {
    var j=i+1;
    front=(d_width* ((Math.sqrt(j))-(Math.sqrt(i))) ).toFixed(3);
    h=Math.round(front*ppi);
    x=x-h;
    // draw front
    ctx.rect(s_y,x,w_width,h);
    ctx.stroke();
    cabinet=+cabinet + +front;
    y_text=Math.round(x+(h/2));
    // print front size
    f=setFraction(front);
    d=Math.trunc(front);
    allFronts=$("#tbl"+tar).html();
    $("#tbl"+tar).html("#"+i+": "+d+f+"<br>"+allFronts);
    ctx.fillText(front+" ("+d+f+'")', s_text, y_text);
    // calc & draw next rail
    x=x-h_rail;
    drawRail(s_y,x,w_width,h_rail,ctx);
    cabinet=+cabinet + +rail;
  }

  $("#cabinet"+tar).html(cabinet.toFixed(2));
  // $("#hambridge").attr("data-SET","yes");
  $("#canvas"+tar).attr("data-PPI",ppi);
  console.log("hambridge - x:"+x+" ppi:"+ppi);
  if (x<1) {
    var newPPI=Math.round(ppi/2);
    $("#canvas"+tar).attr("data-PPI",newPPI);
    calcHambridge(tar,newPPI);
  }
  busy('done');
}

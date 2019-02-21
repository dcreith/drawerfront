/*!
calc manual progression
*/
function totalSoFarDiff() {
  var sum=0;
  if (parseFloat($("#d1").val())>0) {sum=sum+parseFloat($("#d1").val());}
  if (parseFloat($("#d2").val())>0) {sum=sum+parseFloat($("#d2").val());}
  if (parseFloat($("#d3").val())>0) {sum=sum+parseFloat($("#d3").val());}
  if (parseFloat($("#d4").val())>0) {sum=sum+parseFloat($("#d4").val());}
  if (parseFloat($("#d5").val())>0) {sum=sum+parseFloat($("#d5").val());}
  if (parseFloat($("#d6").val())>0) {sum=sum+parseFloat($("#d6").val());}
  if (parseFloat($("#d7").val())>0) {sum=sum+parseFloat($("#d7").val());}
  if (parseFloat($("#d8").val())>0) {sum=sum+parseFloat($("#d8").val());}
  return sum;
}
function countSoFarDiff() {
  var cnt=0;
  if (parseFloat($("#d1").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#d2").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#d3").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#d4").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#d5").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#d6").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#d7").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#d8").val())>0) {cnt=cnt+1;}
  return cnt;
}
function calcManualDiff(tar,ppi=10) {
  busy('busy');
  console.log("manualdiff - ppi:"+ppi);
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
  var initialfront=parseFloat($("#base").val());

  // var ttl_so_far=totalSoFarDiff();
  var cnt_so_far=countSoFarDiff();
  var d_count=cnt_so_far;

  var rail=parseFloat($("#rail").val());
  // calc rail height in pixels
  var h_rail=Math.round(rail*ppi);

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

  if (d_count>0) {
    // draw bottom rail
    var x=s_x-h_rail;
    drawRail(s_y,x,w_width,h_rail,ctx);
    cabinet=+rail;

    front=initialfront.toFixed(3);
    var bottom=front;
    h=Math.round(front*ppi);
    x=x-h;
    ctx.rect(s_y,x,w_width,h);
    ctx.stroke();
    cabinet=+cabinet + +front;

    // print front size
    y_text=Math.round(x+(h/2));
    f=setFraction(front);
    d=Math.trunc(front);
    allFronts=$("#tbl"+tar).html();
    $("#tbl"+tar).html("#1: "+d+f+"<br>"+allFronts);
    ctx.fillText(front+" ("+d+f+'")', s_text, y_text);

    // draw bottom rail
    var x=x-h_rail;
    drawRail(s_y,x,w_width,h_rail,ctx);
    cabinet=+cabinet + +rail;

    for (var i = 2; i < (d_count+1); i++) {
      diff=parseFloat($("#d"+i).val());
      drawer=front-diff;
      front=drawer.toFixed(3);
      console.log("diff:"+diff);
      console.log("drawer:"+drawer);
      console.log("front:"+front);

      if (bottom>0) {
        h=Math.round(front*ppi);
        x=x-h;
        ctx.rect(s_y,x,w_width,h);
        ctx.stroke();
        cabinet=+cabinet + +front;

        // print front size
        y_text=Math.round(x+(h/2));
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

    }
  }

  $("#cabinet"+tar).html(cabinet.toFixed(2));
  $("#canvas"+tar).attr("data-PPI",ppi);
  if (x<1) {
    var newPPI=Math.round(ppi/2);
    $("#canvas"+tar).attr("data-PPI",newPPI);
    calcManualDiff(tar,newPPI);
  }
  busy('done');
}

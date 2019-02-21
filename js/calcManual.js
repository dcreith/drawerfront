/*!
calc manual progression
*/
function totalSoFar() {
  var sum=0;
  if (parseFloat($("#m1").val())>0) {sum=sum+parseFloat($("#m1").val());}
  if (parseFloat($("#m2").val())>0) {sum=sum+parseFloat($("#m2").val());}
  if (parseFloat($("#m3").val())>0) {sum=sum+parseFloat($("#m3").val());}
  if (parseFloat($("#m4").val())>0) {sum=sum+parseFloat($("#m4").val());}
  if (parseFloat($("#m5").val())>0) {sum=sum+parseFloat($("#m5").val());}
  if (parseFloat($("#m6").val())>0) {sum=sum+parseFloat($("#m6").val());}
  if (parseFloat($("#m7").val())>0) {sum=sum+parseFloat($("#m7").val());}
  if (parseFloat($("#m8").val())>0) {sum=sum+parseFloat($("#m8").val());}
  return sum;
}
function countSoFar() {
  var cnt=0;
  if (parseFloat($("#m1").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#m2").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#m3").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#m4").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#m5").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#m6").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#m7").val())>0) {cnt=cnt+1;}
  if (parseFloat($("#m8").val())>0) {cnt=cnt+1;}
  return cnt;
}
function calcManual(tar,ppi=10) {
  busy('busy');
  console.log("manual - ppi:"+ppi);
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

  var ttl_so_far=totalSoFar();
  var cnt_so_far=countSoFar();
  var d_count=cnt_so_far;

  var rail=parseFloat($("#rail").val());

  var ttl_canvas=480;
  while (ttl_canvas>479) {
    ttl_canvas=(ttl_so_far*ppi)+(((cnt_so_far+1)*rail)*ppi);
    if (ttl_canvas>480) {ppi=Math.round(ppi/2);}
  }

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
    // calc rail height in pixels
    var h_rail=Math.round(rail*ppi);
    // draw bottom rail
    var x=s_x-h_rail;
    drawRail(s_y,x,w_width,h_rail,ctx);
    cabinet=+rail;

    for (var i = 1; i < (9); i++) {
      drawer=parseFloat($("#m"+i).val());
      front=drawer.toFixed(3);
      if (front>0) {
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
    }
  }

  $("#cabinet"+tar).html(cabinet.toFixed(2));
  $("#canvas"+tar).attr("data-PPI",ppi);
  busy('done');
}

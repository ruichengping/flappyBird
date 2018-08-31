function calculateCanvas(){
  var width=375;
  var height=667;
  var view_width=document.body.clientWidth;
  var view_height=document.body.clientHeight;

  if(view_width<992){
    width=view_width;
    height=view_height;
  }
  return {
    width:width,
    height:height
  }
}

function setCanvasView(canvas){
  canvas.width=calculateCanvas().width;
  canvas.height=calculateCanvas().height;
}
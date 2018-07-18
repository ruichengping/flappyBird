function calculateCanvas(){
  var width=375;
  var height=667;
  var view_width,view_height;

  if(window.innerWidth){
    view_width=window.innerWidth;
    view_height=window.innerHeight;
  }else{
    view_width=document.documentElement.clientWidth;
    view_height=document.documentElement.clientHeight;
  }

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
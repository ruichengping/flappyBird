(function() {
    var canvas=document.getElementById('flappy_bird');
    setCanvasView(canvas);
    window.onresize=function(){
        setCanvasView(canvas);
    }
    var context=canvas.getContext('2d');
    var loading=document.getElementById('loading');

    loadResource({
        'background_day':'images/bg_day.png',
        'land':'images/land.png',
        'birdOne':'images/bird0_0.png',
        'birdTwo':'images/bird0_1.png',
        'birdThree':'images/bird0_2.png'
    },function (resourceModel) {
        var x=0;
        var gameprocess=setInterval(function () {
            clearCanvas();
            x=x-2<-canvas.width?0:x-2;
            drawBackground(resourceModel.background_day);
            drawLand(resourceModel.land,x);
        },30);
    });

    //加载资源
    function loadResource(resources,callback) {
        var count=0;
        var resourceModel={};
        _.keys(resources).forEach(function (key) {
            resourceModel[key]=new Image();
            resourceModel[key].src=resources[key];
            resourceModel[key].onload=function () {
                count++;
                loading.style.display='none';
                if(count===_.keys(resources).length){
                    if(typeof callback === 'function'){
                        callback(resourceModel);
                    }
                }
            }
        });
    }

    //清空画布
    function clearCanvas() {
        context.clearRect(0,0,canvas.width,canvas.height);
    }
    //画背景
    function drawBackground(background) {
        context.drawImage(background,0,0,canvas.width,canvas.height);
    }
    //画大地
    function drawLand(land,x) {
        context.drawImage(land,x,canvas.height-land.height,canvas.width,land.height);
        context.drawImage(land,canvas.width+x,canvas.height-land.height,canvas.width,land.height);
    }
    

    
    //管子
    function Pipe() {

    }
    
    Pipe.prototype.render=function () {
        
    }
})();




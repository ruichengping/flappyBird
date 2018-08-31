(function() {
    var canvas=document.getElementById('flappy_bird');
    var context=canvas.getContext('2d');
    var loading=document.getElementById('loading');
    var pipeList=[];
    var resourceModel={};
    var gameprocess;
    var pipeDistance=180;
    
    window.onresize=function(){
        setCanvasView(canvas);
        clearInterval(gameprocess);
        creatMainProcess(resourceModel);
    }

    loadResource({
        'background_day':'images/bg_day.png',
        'land':'images/land.png',
        'pipeDown':'images/pipe_down.png',
        'pipeUp':'images/pipe_up.png',
        'birdOne':'images/bird0_0.png',
        'birdTwo':'images/bird0_1.png',
        'birdThree':'images/bird0_2.png'
    },function () {
       setCanvasView(canvas);
       creatMainProcess(resourceModel);
    });

    //加载资源
    function loadResource(resources,callback) {
        var count=0;
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

    //初始化
    function creatMainProcess(resourceModel){
        var landX=0;
        var pipeX=canvas.width*0.5;  
        var land=new Land(resourceModel.land);
        var background=new Background(resourceModel.background_day);
        var pipe=new Pipe(resourceModel.pipeDown,resourceModel.pipeUp,resourceModel.land);
        pipeList=[pipe];
        gameprocess=setInterval(function () {
            clearCanvas();
            landX=landX-3<-canvas.width?0:landX-3;
            pipeX-=3;
            //画北京
            background.render();
            //画大地
            land.render(landX);
            if(Math.floor(pipeX/pipeDistance*-1)+1>pipeList.length){
                pipeList.push(new Pipe(resourceModel.pipeDown,resourceModel.pipeUp,resourceModel.land));
            }
            //画管子
            pipeList.forEach(function(pipe,index){
                pipe.render(pipeX+pipeDistance*index);
            });
        },30);
    }

    //清空画布
    function clearCanvas() {
        context.clearRect(0,0,canvas.width,canvas.height);
    }
    /**
     * 背景
     * @param {Object<Image>} image 背景图片
     */
    function Background(image){
        this.background=image;
    }
    Background.prototype.render=function(){
        var background=this.background;
        context.drawImage(background,0,0,canvas.width,canvas.height);
    }
  
    /**
     * 大地
     * @param {Object<Image>} image 大地图片
     */
    function Land(image){
        this.land=image;
    }
    
    Land.prototype.render=function(x){
        var land=this.land;
        context.drawImage(land,x,canvas.height-land.height,canvas.width,land.height);
        context.drawImage(land,canvas.width+x,canvas.height-land.height,canvas.width,land.height);
    }
    
    /**
     * 
     * @param {Object<Image>} pipeDownImage 上管子图片
     * @param {Object<Image>} pipeUpImage 下管子图片
     * @param {Object<Image>} landImage 大地
     */
    function Pipe(pipeDownImage,pipeUpImage,landImage) {
        //每对管子的唯一标识
        this.id=new Date().getTime();
        //随机数
        this.random=Math.round(Math.random()*80);
        //大地图片对象
        this.land=landImage;
        //向下管子图片对象
        this.pipeDown=pipeDownImage;
        //向上管子图片对象
        this.pipeUp=pipeUpImage;
    }
    Pipe.prototype.render=function (x) {
        var land=this.land;
        var distance=160;
        var pipeAverageHeight=(canvas.height-land.height-distance)*0.5
        var pipeDown=this.pipeDown;
        var pipeUp=this.pipeUp;
        var pipeUpHeight=pipeAverageHeight*(40+this.random)/100;
        var pipeDownHeight=canvas.height-land.height-distance-pipeUpHeight;
        if(x+pipeDown.width+canvas.width>0){
            //画向下管子
            context.drawImage(pipeDown,0,pipeDown.height-pipeDownHeight,pipeDown.width,pipeDownHeight,x+canvas.width,0,pipeDown.width,pipeDownHeight); 
            //画向上管子
            context.drawImage(pipeUp,0,0,pipeUp.width,pipeUpHeight,x+canvas.width,canvas.height-land.height-pipeUpHeight,pipeUp.width,pipeUpHeight);            
        }
    }

    function Bird(){

    }

    Bird.prototype.render=function(){

    }
})();




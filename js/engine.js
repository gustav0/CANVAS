Engine = Class.extend({

    /*
     * CANVAS
     */

     canvas:null,
     context:null,

    playing:false,
    ganador:null,

    unidadesIzquierda:null,


    bgImg:null,

   /*
    *Imagenes para las unidades
    */
    soldierImg:null,
    trollImg:null,
    mageImg:null,
    archerImg:null,
    knightImg:null,
    priestImg:null,

    coordenadas:null,

    json:'{"frames": [{    "animacion": "0",    "data": {"x":0,"y":0,"w":30,"h":32},    "mostrar": {"w":30,"h":32}},{    "animacion": "1",    "data": {"x":31,"y":0,"w":30,"h":32},    "mostrar": {"w":30,"h":32}},{    "animacion": "2",    "data": {"x":62,"y":0,"w":30,"h":32},    "mostrar": {"w":30,"h":32}}]}',
    parsedJSON:null,
    init: function(){},

    load: function(){
        var that = this;
        this.canvas = document.getElementById('canvas');
        this.context = that.canvas.getContext('2d');
        this.canvas.width = 850;
        this.canvas.height = 400;

        this.parsedJSON = JSON.parse(this.json);

        unidadesIzquierda = []

        that.soldierImg = new Image();
        that.soldierImg.src = "img/BlackGuard.png";

        that.trollImg = new Image();
        that.trollImg.src = "img/BlueGrayGuard.png";

        that.bgImg = new Image();
        that.mageImg = "img/GreenGuard.png";

        that.bgImg = new Image();
        that.archerImg = "img/OrangeGuard.png";

        that.bgImg = new Image();
        that.knightImg = "img/PurpleGuard.png";

        that.bgImg = new Image();
        that.priestImg = "img/Redguard.png";

        that.bgImg = new Image();
        that.bgImg.src = "img/background.png";


        this.crearUnidadesIzquierda();
        
    },
    start:function(){
        setInterval(this.updateSprite,300);
        setInterval(this.update,1000/30);
    },
    crearUnidadesIzquierda:function(){
        var unidad = new Unidad({x:10, y:10},"mage",1);
        unidadesIzquierda.push(unidad);
        var unidad2 = new Unidad({x:100, y:10},"mage",2);
        unidadesIzquierda.push(unidad2);
        var unidad3 = new Unidad({x:200, y:10},"mage",3);
        unidadesIzquierda.push(unidad3);
        var unidad4 = new Unidad({x:300, y:10},"mage",4);
        unidadesIzquierda.push(unidad4);
    },

    update:function(){
        myEngine.context.drawImage(myEngine.bgImg,0,0);
        for(var unidad in this.unidadesIzquierda){
            this.unidadesIzquierda[unidad].update();
        }
    },
    updateSprite:function(){
        for(var unidad in this.unidadesIzquierda){
           this.unidadesIzquierda[unidad].getFrameActual();
        }
    },

});
myEngine = new Engine();
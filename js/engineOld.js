Engine = Class.extend({
    /*
     * CANVAS
     */

    canvas: null,
    context: null,
    playing: false,
    ganador: null,
    unidadesIzquierda: null,
    unidadesDerecha: null,
    bgImg: null,
    /*
     *Imagenes para las unidades
     */

    soldierImg: null,
    trollImg: null,
    mageImg: null,
    archerImg: null,
    knightImg: null,
    priestImg: null,
    coordenadas: null,
    init: function() {
    },
    load: function() {
        // Init canvas
        this.stage = new createjs.Stage("canvas");
        this.stage.enableMouseOver();

        // Load assets
        var queue = new createjs.LoadQueue(true, "img/");

        queue.addEventListener("complete", function() {
            this.soldierImg = queue.getResult("soldier");
            this.trollImg = queue.getResult("troll");
            this.mageImg = queue.getResult("mage");
            this.archerImg = queue.getResult("archer");
            this.knightImg = queue.getResult("kinght");
            this.priestImg = queue.getResult("priest");

            this.setup();
        });

        queue.loadManifest([
            {id: "soldier", src: "soldierImg.png"},
            {id: "troll", src: "trollImg.png"},
            {id: "mage", src: "mageImg.png"},
            {id: "archer", src: "archerImg.png"},
            {id: "kinght", src: "knightImg.png"},
            {id: "priest", src: "priestImg.png"},
        ]);

        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 850;
        this.canvas.height = 400;

//        this.parsedJSON = JSON.parse(this.json);

        this.unidadesIzquierda = new Array();
        this.unidadesDerecha = new Array();

        this.soldierImg = new Image();
        this.soldierImg.src = "img/BlackGuard.png";

        this.trollImg = new Image();
        this.trollImg.src = "img/BlueGrayGuard.png";

        this.mageImg = new Image();
        this.mageImg.src = "img/YellowGuard.png";

        this.archerImg = new Image();
        this.archerImg.src = "img/OrangeGuard.png";

        this.knightImg = new Image();
        this.knightImg.src = "img/PurpleGuard.png";

        this.priestImg = new Image();
        this.priestImg.src = "img/Redguard.png";

        this.bgImg = new Image();
        this.bgImg.src = "img/background.png";


        this.crearUnidadesIzquierda();
        this.context.drawImage(this.bgImg, 0, 0);

    },
    start: function() {
        if (!myEngine.playing) {
            myEngine.playing = true;
            sprite = setInterval(myEngine.updateSprite, 300);
            update = setInterval(myEngine.update, 1000 / 30);
        } else {
            clearInterval(sprite);
            clearInterval(update);
            myEngine.playing = false;
        }

    },
    iniciarMove: function() {
        setInterval(function() {
            if (myEngine.playing) {
                for (var unidad in myEngine.unidadesIzquierda) {
                    if (!myEngine.unidadesIzquierda[unidad].detectarColision()) {
                        myEngine.unidadesIzquierda[unidad].posicion.x += 2;
                    } else {

                    }
                }
            }
        }, 50);


    },
    crearUnidadesIzquierda: function() {
        var unidad = new Unidad(1, "mage", {x: 125, y: 125}, {w: 30, h: 32}, 1);
        myEngine.unidadesIzquierda.push(unidad);
        var unidad4 = new Unidad(4, "soldier", {x: 275, y: 125}, {w: 30, h: 32}, 1);
        myEngine.unidadesIzquierda.push(unidad4);

        var unidada = new Unidad(10, "mage", {x: 125, y: 225}, {w: 30, h: 32}, 1);
        myEngine.unidadesIzquierda.push(unidada);
        var unidadb = new Unidad(11, "mage", {x: 175, y: 225}, {w: 30, h: 32}, 1);
        myEngine.unidadesIzquierda.push(unidadb);
        var unidadc = new Unidad(12, "troll", {x: 225, y: 225}, {w: 30, h: 32}, 1);
        myEngine.unidadesIzquierda.push(unidadc);
        var unidadd = new Unidad(13, "troll", {x: 275, y: 225}, {w: 30, h: 32}, 1);
        myEngine.unidadesIzquierda.push(unidadd);

        var unidad5 = new Unidad(5, "mage", {x: 425, y: 75}, {w: 30, h: 32}, 2);
        myEngine.unidadesDerecha.push(unidad5);
        var unidad6 = new Unidad(6, "soldier", {x: 425, y: 125}, {w: 30, h: 32}, 2);
        myEngine.unidadesDerecha.push(unidad6);
        var unidad7 = new Unidad(7, "soldier", {x: 425, y: 175}, {w: 30, h: 32}, 2);
        myEngine.unidadesDerecha.push(unidad7);
        var unidad8 = new Unidad(8, "mage", {x: 425, y: 275}, {w: 30, h: 32}, 2);
        myEngine.unidadesDerecha.push(unidad8);
        var unidad9 = new Unidad(9, "troll", {x: 625, y: 225}, {w: 30, h: 32}, 2);
        myEngine.unidadesDerecha.push(unidad9);
    },
    update: function() {
        myEngine.context.clearRect(0, 0, myEngine.canvas.width, myEngine.canvas.height);
        myEngine.context.drawImage(myEngine.bgImg, 0, 0);
        for (var unidad in myEngine.unidadesIzquierda) {
            myEngine.unidadesIzquierda[unidad].update();
        }
        for (var unidad in myEngine.unidadesDerecha) {
            myEngine.unidadesDerecha[unidad].update();
        }

    },
    updateSprite: function() {
        for (var unidad in myEngine.unidadesIzquierda) {
            myEngine.unidadesIzquierda[unidad].getFrameActual();
        }

        for (var unidad in myEngine.unidadesDerecha) {
            myEngine.unidadesDerecha[unidad].getFrameActual();
        }
    },
    compararBordes: function(a, b) {
        //1era forma
        // if(a.derecha <= b.izquierda || a.izquierda >= b.derecha){
        //     return false;
        // }else{
        //         if(a.arriba >= b.abajo){
        //             return false;
        //         }else{
        //             if(a.abajo <= b.arriba){
        //                 return false;
        //             }else{
        //                 return true;
        //             }
        //         }
        // }

        //2da forma
        // if(a.derecha >= b.izquierda && a.izquierda <= b.derecha){
        //     if(a.arriba <= b.abajo){
        //         if(a.abajo >= b.arriba){
        //             return true;
        //         }
        //     }
        // }
        // return false;

        return (a.derecha >= b.izquierda && a.izquierda <= b.derecha && a.arriba <= b.abajo && a.abajo >= b.arriba);
    },
});
myEngine = new Engine();
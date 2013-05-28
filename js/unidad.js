Unidad = Entidad.extend({

	id: 0,

	/*
     * No se
     */
    posicion: {},
    direccion:-1,

    /*
     * No se
     */
    size: {w:30,h:32},
    tipo:null,

    init: function(posicion, tipo, id) {
        this.tipo = tipo;
        this.id = id;
        this.posicion = posicion;

        this.img = myEngine.soldierImg;

        this.frames = new Array();

        for(var frame in myEngine.parsedJSON.frames){
            var a = {x:null,y:null};
            a.x=myEngine.parsedJSON.frames[frame].data.x;
            a.y=myEngine.parsedJSON.frames[frame].data.y;
            this.frames.push(a);
        }
    },

    update: function() {
        this.draw(this.img,this.posicion,this.size);
    }
});
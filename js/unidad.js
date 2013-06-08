Unidad = Entidad.extend({

	id:-1,
    posicion:{},
    direccion:-1,
    size:{w:30,h:32},
    tipo:null,
    velocidad:null,
    /*
     * EQUIPO DE LA UNIDAD. 0 PARA NEUTRAL 1 PARA IZQUIERDA, 2 PARA DERECHA
     */
     equipo:null,
     rango:null,


    init: function(id, tipo, posicion, size, equipo) {
        this.id = id;
        this.tipo = tipo;
        this.id = id;
        this.posicion = posicion;
        this.equipo = equipo;

        switch(tipo){
            case "soldier":
                this.velocidad = 2;
                this.img = myEngine.soldierImg;
                this.rango = 1 * 30;
                break;
            case "mage":
                this.velocidad = 1;
                this.img = myEngine.mageImg;
                this.rango = 4 * 30;
                break;
            case "troll":
                this.velocidad = 2;
                this.img = myEngine.trollImg;
                this.rango = 2 * 30;
                break;
        }
        




        this.frames = new Array();

        var equipoActual = null;
        // Esto decide a donde van a mirar
        if(this.equipo == 0){
            equipoActual = "central";
            this.direccion = 0;
        }else if(this.equipo == 1){
            equipoActual = "derecha";
            this.direccion = 6;
        }else if(this.equipo == 2){
            equipoActual = "izquierda";
            this.direccion = 4;
        }
        for(var frame in myEngine.parsedJSON[equipoActual]){
            var a = {x:null,y:null};
            a.x=myEngine.parsedJSON[equipoActual][frame].data.x;
            a.y=myEngine.parsedJSON[equipoActual][frame].data.y;
            this.frames.push(a);
        }
    },

    update: function() {
        this.draw(this.img,this.posicion,this.size);
    },

    getFrameActual:function(){
        this.i = (this.i + 1) % 3;
        this.frameActual = this.frames[this.i];
    },
    detectarColision:function(){
        var colision = false;
        var unidad = {};
        unidad.izquierda = this.posicion.x;
        unidad.derecha = this.posicion.x + this.size.w;
        unidad.arriba = this.posicion.y;
        unidad.abajo = this.posicion.y + this.size.h;

        if(this.equipo == 1){
            var unidadConRango = {};
            unidadConRango.izquierda = this.posicion.x;
            unidadConRango.derecha = this.posicion.x + this.size.w + this.rango;
            unidadConRango.arriba = this.posicion.y;
            unidadConRango.abajo = this.posicion.y + this.size.h;
        }
        //Verifica que no es el mismo con quien va a comparar.
        for(var i = 0; i < myEngine.unidadesIzquierda.length; i++){
            if(i == myEngine.unidadesIzquierda.indexOf(this)){
                if(i == myEngine.unidadesIzquierda.length-1) break;
                i++;
            }
           var aliado = {};
           aliado.izquierda = myEngine.unidadesIzquierda[i].posicion.x;
            aliado.derecha = myEngine.unidadesIzquierda[i].posicion.x + myEngine.unidadesIzquierda[i].size.w;
            aliado.arriba = myEngine.unidadesIzquierda[i].posicion.y;
            aliado.abajo = myEngine.unidadesIzquierda[i].posicion.y + myEngine.unidadesIzquierda[i].size.h;
            aliado.id = myEngine.unidadesIzquierda[i].id;
            if(myEngine.compararBordes(unidad, aliado)){
                colision = true;
                break;
            }
        }
        
        if (colision) return colision;

        for(var i = 0; i < myEngine.unidadesDerecha.length; i++){
            var rival = {};
            rival.izquierda = myEngine.unidadesDerecha[i].posicion.x;
            rival.derecha = myEngine.unidadesDerecha[i].posicion.x + myEngine.unidadesDerecha[i].size.w;
            rival.arriba = myEngine.unidadesDerecha[i].posicion.y;
            rival.abajo = myEngine.unidadesDerecha[i].posicion.y + myEngine.unidadesDerecha[i].size.h;
            rival.id = myEngine.unidadesDerecha[i].id;
            if(myEngine.compararBordes(unidadConRango, rival)){
                colision = true;
                break;
            }
        }
        return colision;

    },
});
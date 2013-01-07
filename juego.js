// CREAR OBJETO CANVAS
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 437;
canvas.height = 390;
document.getElementById('contenedor').appendChild(canvas);

//VARIABLES A CAMBIAR
var linea = 6;
var iniciar = false;
var colision = false;

//VARIABLES FIJAS
var len 				 = 48;
var unidades_por_columna = 6;
var unidades_por_fila  	 = 2;
var crear_unidad_tipo	 = 0;
var rango				 = 48;

// IMAGEN DE FONDO
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () { bgReady = true; };
bgImage.src = "images/background.png";


// IMAGEN - SOLDADO
var soldadoReady = false;
var soldadoImagen = new Image();
soldadoImagen.onload = function () { soldadoReady = true; };
soldadoImagen.src = "images/soldado.png";

// IMAGEN - ARQUERO
var arqueroReady = false;
var arqueroImagen = new Image();
arqueroImagen.onload = function () { arqueroReady = true; };
arqueroImagen.src = "images/arquero.png";

// IMAGEN - MAGO
var magoReady = false;
var magoImagen = new Image();
magoImagen.onload = function () { magoReady = true; };
magoImagen.src = "images/mago.png";

// IMAGEN - UNIDAD SIN IMAGEN (UNIDAD NULA)
var unidadSinImagen = new Image();
unidadSinImagen.onload = function () { magoReady = true; };
unidadSinImagen.src = "images/sinimagen.png";

// DEFINICIÓN DE UNIDADES
function unidad_null(id){
	this.id			= id || -1;
	this.tipo		= -1;
	this.rango		= 0;
	this.velocidad	= 0;
	this.colision	= false;
	this.width		= 50;
	this.height		= 50;
	this.parte		= 0;
}
function unidad_soldado(id){
	this.id			= id || -1;
	this.tipo 		= 0;
	this.rango 		= 0;
	this.velocidad 	= 0.7;
	this.colision	= false;
	this.width		= 50;
	this.height		= 50;
	this.parte		= 0;
}
function unidad_arquero(id){
	this.id			= id || -1;
	this.tipo 		= 1;
	this.rango 		= 3;
	this.velocidad 	= 0.5;
	this.colision	= false;
	this.width		= 50;
	this.height		= 50;
	this.parte		= 0;
}
function unidad_mago(id){
	this.id			= id || -1;
	this.tipo 		= 2;
	this.rango 		= 2;
	this.velocidad 	= 0.4;
	this.colision	= false;
	this.width		= 50;
	this.height		= 50;
	this.parte		= 0;
}

// DEFINICIÓN DE EQUIPOS
var equipo_jugador = new Array(unidades_por_columna);
var equipo_retador = new Array(unidades_por_columna);
// -FRONTLINES (PRUEBA)
var frontline_jugador = new Array(unidades_por_columna);
var frontline_retador = new Array(unidades_por_columna);

for(i=0;i<equipo_jugador.length;i++){
	equipo_jugador[i] = new Array(unidades_por_fila);
	equipo_retador[i] = new Array(unidades_por_fila);
}
limpiar_campo();
crear_retador(1);

// LLENAR CAMPO DE BATALLA CON NULLS
function limpiar_campo(){
	for(i=0;i<unidades_por_columna;i++){
		for(j=0;j<unidades_por_fila;j++){
			equipo_jugador[i][j] = new unidad_null();
			equipo_jugador[i][j].x = 51 + j*len; //51 porque 50 es el marco del tablero.
			equipo_jugador[i][j].y = 51 + i*len;
		}
	}
}
// CREAR UNIDADES EN EL CAMPO DE BATALLA
function iniciar_crear_unidad(){
	for(i=0;i<unidades_por_columna;i++){
		for(j=0;j<unidades_por_fila;j++){
			unidad = equipo_jugador[i][j];
			if(clickdX>unidad.x && clickdX<unidad.x+unidad.width){
				if(clickdY>unidad.y && clickdY<unidad.y+unidad.height){
					switch(crear_unidad_tipo){
						case 0:
						  equipo_jugador[i][j] = new unidad_soldado((i*7+j*11)+1);
						  break;
						case 1:
						  equipo_jugador[i][j] = new unidad_arquero(i*7+j*11);
						  break;
						case 2:
						  equipo_jugador[i][j] = new unidad_mago(i*7+j*11);
						  break;
					}
					equipo_jugador[i][j].x = unidad.x;
					equipo_jugador[i][j].y = unidad.y;
				}
			}
		}
	}
}

// MÉTODO PARA CAMBIAR EL TIPO DE UNIDAD A CREAR
function cambiar_unidad_tipo(tipo){
	crear_unidad_tipo = tipo;
}

// GENERAR EL RETADOR
function crear_retador(nivel){
	var random = 0;
	var min = 0;
	var max = 24;
	for(i=0;i<unidades_por_columna;i++){
		for(j=0;j<unidades_por_fila;j++){
			equipo_retador[i][j] = new unidad_null();
			equipo_retador[i][j].x = 381 + j*len; //51 porque 50 es el marco del tablero.
			equipo_retador[i][j].y = 51 + i*len;
		}
	}
	for(i=0;i<unidades_por_columna;i++){
		for(j=0;j<unidades_por_fila;j++){
			random = Math.floor(Math.random() * (max - min + 1)) + min;
			switch(parseInt(random/10)){
				case 0:
					equipo_retador[i][j] = new unidad_soldado((i*7+j*11)+2);
					break;
				case 1:
					equipo_retador[i][j] = new unidad_arquero((i*7+j*11)+2);
					break;
				case 2:
					equipo_retador[i][j] = new unidad_mago((i*7+j*11)+2);
					break;
			}
			equipo_retador[i][j].x = 290 + j*len; //51 porque 50 es el marco del tablero.
			equipo_retador[i][j].y = 51 + i*len;
		}
	}
}

// ALMACENAR KEYS
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("mousedown",function(e){
    clickdX = e.pageX;
    clickdY = e.pageY;
    keysDown[-1]=true
},false);
addEventListener("mouseup",function(e){
    delete keysDown[-1]
},false);

// HACER UPDATE DE LOS OBJETOS
var update = function (modifier) {
	if (38 in keysDown) {
		iniciar = true;
	}
	if(keysDown[-1]){
			iniciar_crear_unidad();
	 }
	if (iniciar) { // FLECHA ARRIBA PARA INICIAR
		// 1. DETERMINAR EL "FRONTLINE"
		// 2. AVANZAR PRIMERA COLUMNA HASTA TENER RANGO CON EL FRONTLINE
		// 3. AVANZAR SEGUNDA COLUMNA HASTA TENER RANGO CONEL FRONTLINE O COLISION DE EQUIPO
		// 4. ATACAR CON LA PRIMERA FILA AL FRONTLINE
		// 5. ATACAR CON LA SEGUNDA FILA AL FRONTLINE
		// 6. REPETIR

		/* 1. DETERMINAR EL FRONTLINE */
			// 1.1 INICIALIZAR EL FRONTLINE A LA PRIMERA COLUMNA
		for(i=0;i<unidades_por_columna;i++){
			frontline_retador[i]=equipo_retador[i][0];
		}
			// 1.2 DETERMINAR FRONTLINE MEDIANTE EL MENOR X DE LA FILA.
		for(i=0;i<unidades_por_columna;i++){
			for(j=0;j<unidades_por_fila;j++){
				if (frontline_retador[i].x>equipo_retador[i][j].x){
					frontline_retador[i]=equipo_retador[i][j];
				}
			}
		}
		/* 1. DETERMINAR EL FRONTLINE */

		/* 2. y 3. AVANZAR CUALQUIER UNIDAD */
		for(i=0;i<unidades_por_columna;i++){
			for(j=0;j<unidades_por_fila;j++){
				rangoUnidad = equipo_jugador[i][j].x + equipo_jugador[i][j].width + equipo_jugador[i][j].rango * rango;
				for(y=0;y<unidades_por_fila;y++){
					if (equipo_retador[i][y]==frontline_retador[i]) {
						if(rangoUnidad<equipo_retador[i][y].x){
							equipo_jugador[i][j].x += 1 * equipo_jugador[i][j].velocidad;
						}else{
							// ATACAR
						}
					};
					
				}
			}
		}
	}

};
// DIBUJAR EN CANVAS
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (soldadoReady) {
		for(i=0;i<unidades_por_columna;i++){
			for(j=0;j<unidades_por_fila;j++){
				switch(equipo_jugador[i][j].tipo){
					case -1:
					  ctx.drawImage(unidadSinImagen, equipo_jugador[i][j].x, equipo_jugador[i][j].y);
					  break;
					case 0:
					  ctx.drawImage(soldadoImagen, equipo_jugador[i][j].x, equipo_jugador[i][j].y);
					  break;
					case 1:
					  ctx.drawImage(arqueroImagen, equipo_jugador[i][j].x, equipo_jugador[i][j].y);
					  break;
					case 2:
					  ctx.drawImage(magoImagen, equipo_jugador[i][j].x, equipo_jugador[i][j].y);
					  break;
				}
				switch(equipo_retador[i][j].tipo){
					case -1:
					  ctx.drawImage(unidadSinImagen, equipo_retador[i][j].x, equipo_retador[i][j].y);
					  break;
					case 0:
					  ctx.drawImage(soldadoImagen, equipo_retador[i][j].x, equipo_retador[i][j].y);
					  break;
					case 1:
					  ctx.drawImage(arqueroImagen, equipo_retador[i][j].x, equipo_retador[i][j].y);
					  break;
					case 2:
					  ctx.drawImage(magoImagen, equipo_retador[i][j].x, equipo_retador[i][j].y);
					  break;
				}
			}
		}
	}
};

// LOOP PARA EJECUTAR EL JUEGO.
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	then = now;
};

// Let's play this game! -NPI
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
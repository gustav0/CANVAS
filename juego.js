// CREAR OBJETO CANVAS
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var linea = 6;
var iniciar = false;
var colision = false;
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

// IMAGEN DE FONDO
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.jpg";


// IMAGEN - SOLDADO
var soldadoReady = false;
var soldadoImagen = new Image();
soldadoImagen.onload = function () {
	soldadoReady = true;
};
soldadoImagen.src = "images/soldado.png";
// IMAGEN - ARQUERO
var arqueroReady = false;
var arqueroImagen = new Image();
arqueroImagen.onload = function () {
	arqueroReady = true;
};
arqueroImagen.src = "images/arquero.png";
// IMAGEN - MAGO
var magoReady = false;
var magoImagen = new Image();
magoImagen.onload = function () {
	magoReady = true;
};
magoImagen.src = "images/mago.png";

function unidad_soldado(){
	this.tipo=0;
	this.rango=0;
	this.velocidad=0.7;
	this.colision=false;
}
function unidad_arquero(){
	this.tipo=1;
	this.rango=5;
	this.velocidad=0.5;
	this.colision=false;
}
function unidad_mago(){
	this.tipo=2;
	this.rango=3;
	this.velocidad=0.4;
	this.colision=false;
}

// VARIABLES
var unidadEquipoA = new Array();
var unidadEquipoB = new Array();
var posicion = 50;
for (i=0;i<linea;i++){

	unidadEquipoA[i] = new unidad_soldado();
	unidadEquipoA[i].x = 50;
	if(i==0) unidadEquipoA[i].y = 50;
	else unidadEquipoA[i].y = unidadEquipoA[(i-1)].y + posicion;

	unidadEquipoB[i] = new unidad_arquero();
	unidadEquipoB[i].x = 300;
	if(i==0) unidadEquipoB[i].y = 50;
	else unidadEquipoB[i].y = unidadEquipoB[(i-1)].y + posicion;

}



// ALMACENAR KEYS
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

// HACER UPDATE DE LOS OBJETOS
var update = function (modifier) {
	if (38 in keysDown) {
		iniciar = true;
	}
	if (iniciar) { // FLECHA ARRIBA PARA INICIAR
		for (i=0;i<linea;i++) {	
			if(!unidadEquipoA[i].colision){
				
				unidadEquipoA[i].x +=1*unidadEquipoA[i].velocidad;
			}else{
				//ATACAR
			}
			if(!unidadEquipoB[i].colision){
				unidadEquipoB[i].x -=1*unidadEquipoB[i].velocidad;
			}else{
				//ATACAR
			}
		}	
		for (i=0;i<linea;i++) {
			if (unidadEquipoA[i].x + 25*unidadEquipoA[i].rango +30 >= (unidadEquipoB[i].x)) {
				unidadEquipoA[i].colision=true;
			}
			if (unidadEquipoB[i].x - 25*unidadEquipoB[i].rango <= (unidadEquipoA[i].x)) {
				unidadEquipoB[i].colision=true;
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
		for (i=0;i<linea;i++) {
			if (unidadEquipoA[i].tipo==0){
				ctx.drawImage(soldadoImagen, unidadEquipoA[i].x, unidadEquipoA[i].y);
			}else if(unidadEquipoA[i].tipo==1){
				ctx.drawImage(arqueroImagen, unidadEquipoA[i].x, unidadEquipoA[i].y);
			}else if(unidadEquipoA[i].tipo==2){
				ctx.drawImage(magoImagen, unidadEquipoA[i].x, unidadEquipoA[i].y);
			}
			if (unidadEquipoB[i].tipo==0){
				ctx.drawImage(soldadoImagen, unidadEquipoB[i].x, unidadEquipoB[i].y);
			}else if(unidadEquipoB[i].tipo==1){
				ctx.drawImage(arqueroImagen, unidadEquipoB[i].x, unidadEquipoB[i].y);
			}else if(unidadEquipoB[i].tipo==2){
				ctx.drawImage(magoImagen, unidadEquipoB[i].x, unidadEquipoB[i].y);
			}	
				
		};
		
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
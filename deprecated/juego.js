// CREAR OBJETO CANVAS
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 850;
canvas.height = 400;
document.getElementById('contenedor').appendChild(canvas);

//VARIABLES A CAMBIAR
var linea = 6;
var iniciar = false;
var colision = false;

//VARIABLES FIJAS
actual = 0;
posicionJugador = 0;
posicionRetador = 0;

var len = 50;
var unidades_por_columna = 6;
var unidades_por_fila = 8;
var crear_unidad_tipo = 0;
var rango = 48;
var posicion = new Array();
for (i = 0; i < 3; i++) {
    posicion[i] = new Array();
    for (j = 0; j < 3; j++) {
        posicion[i][j] = new variable_sprite(i * 42, j * 42);
    }
}
function variable_sprite(posicionX, posicionY) {
    this.x = posicionX;
    this.y = posicionY;
}
// IMAGEN DE FONDO
var bgImage = new Image();
bgImage.src = "images/background.png";

// IMAGEN - SOLDADO
var soldadoImagen = new Image();
soldadoImagen.src = "images/sprite/soldado.png";

// IMAGEN - ARQUERO
var arqueroImagen = new Image();
arqueroImagen.src = "images/arquero.png";

// IMAGEN - MAGO
var magoImagen = new Image();
magoImagen.src = "images/mago.png";

// IMAGEN - UNIDAD SIN IMAGEN (UNIDAD NULA)
var unidadSinImagen = new Image();
unidadSinImagen.src = "images/sinimagen.png";

// IMAGEN - UNIDAD SIN IMAGEN (UNIDAD NULA)
var castilloImagen = new Image();
castilloImagen.src = "images/castillo.png";

// DEFINICIÓN DE UNIDADES
function unidad_null(id) {
    this.id = id || -1;
    this.tipo = -1;
    this.rango = 0;
    this.velocidad = 0;
    this.colision = false;
    this.width = 48;
    this.height = 48;
    this.parte = 0;
    this.vida = 0;
    this.ataque = 0;
    this.defensa = 0;
}
function unidad_castillo(id) {
    this.id = id || -1;
    this.tipo = 99;
    this.rango = 0;
    this.velocidad = -1;
    this.colision = true;
    this.width = 48;
    this.height = 48;
    this.parte = 0;
    this.vida = -1;
    this.ataque = 0;
    this.defensa = 0;
}
function unidad_soldado(id) {
    this.id = id || -1;
    this.tipo = 0;
    this.rango = 0;
    this.velocidad = .355;
    this.colision = true;
    this.width = 48;
    this.height = 48;
    this.parte = 0;
    this.vida = 300;
    this.ataque = 12;
    this.defensa = 4;
}
function unidad_arquero(id) {
    this.id = id || -1;
    this.tipo = 1;
    this.rango = 3;
    this.velocidad = .3;
    this.colision = true;
    this.width = 48;
    this.height = 48;
    this.parte = 0;
    this.vida = 140;
    this.ataque = 9;
    this.defensa = 2;
}
function unidad_mago(id) {
    this.id = id || -1;
    this.tipo = 2;
    this.rango = 2;
    this.velocidad = .3;
    this.colision = true;
    this.width = 48;
    this.height = 48;
    this.parte = 0;
    this.vida = 200;
    this.ataque = 13;
    this.defensa = 1;
}

// DEFINICIÓN DE EQUIPOS
var equipo_jugador = new Array(unidades_por_columna);
var equipo_retador = new Array(unidades_por_columna);
// -FRONTLINES (PRUEBA)
var frontline_jugador = new Array(unidades_por_columna);
var frontline_retador = new Array(unidades_por_columna);

for (i = 0; i < equipo_jugador.length; i++) {
    equipo_jugador[i] = new Array(unidades_por_fila);
    equipo_retador[i] = new Array(unidades_por_fila);
}
limpiar_campo();
crear_retador(1);

// LLENAR CAMPO DE BATALLA CON NULLS

function limpiar_campo() {
    for (i = 0; i < unidades_por_columna; i++) {
        for (j = 1; j < unidades_por_fila; j++) {
            equipo_jugador[i][j] = new unidad_null();
            equipo_jugador[i][j].x = 2 + j * len;
            equipo_jugador[i][j].y = 52 + i * len; //52 porque 50 es el marco del tablero.
        }
        equipo_jugador[i][0] = new unidad_castillo();
        equipo_jugador[i][0].x = 2;
        equipo_jugador[i][0].y = 52 + i * len;
    }
}

// CREAR UNIDADES EN EL CAMPO DE BATALLA
function iniciar_crear_unidad() {
    for (i = 0; i < unidades_por_columna; i++) {
        for (j = 0; j < unidades_por_fila; j++) {
            unidad = equipo_jugador[i][j];
            unidad_retador = equipo_retador[i][j];
            if (clickdX > unidad.x && clickdX < unidad.x + unidad.width) {
                if (clickdY > unidad.y && clickdY < unidad.y + unidad.height) {
                    if (equipo_jugador[i][j].tipo < 0) {
                        switch (crear_unidad_tipo) {
                            case 0:
                                equipo_jugador[i][j] = new unidad_soldado((i * 7 + j * 11) + 1);
                                break;
                            case 1:
                                equipo_jugador[i][j] = new unidad_arquero(i * 7 + j * 11);
                                break;
                            case 2:
                                equipo_jugador[i][j] = new unidad_mago(i * 7 + j * 11);
                                break;
                            case 99:
                                equipo_jugador[i][j] = new unidad_castillo(i * 7 + j * 11);
                                break;
                        }
                    }
                    equipo_jugador[i][j].x = unidad.x;
                    equipo_jugador[i][j].y = unidad.y;
                }
            }

            if (clickdX > unidad_retador.x && clickdX < unidad_retador.x + unidad_retador.width) {
                if (clickdY > unidad_retador.y && clickdY < unidad_retador.y + unidad_retador.height) {
                    if (equipo_retador[i][j].tipo != -1 && equipo_retador[i][j].tipo != 99) {
                        equipo_retador[i][j] = new unidad_null();
                        break;
                    }
                }
            }

        }
    }
}

// MÉTODO PARA CAMBIAR EL TIPO DE UNIDAD A CREAR
function cambiar_unidad_tipo(tipo) {
    crear_unidad_tipo = tipo;
}

// GENERAR EL RETADOR
function crear_retador(nivel) {
    var random = 0;
    var min = 0;
    var max = 24;
    for (i = 0; i < unidades_por_columna; i++) {
        for (j = 0; j < unidades_por_fila; j++) {
            equipo_retador[i][j] = new unidad_null();
            equipo_retador[i][j].x = 381 + j * len; //51 porque 50 es el marco del tablero.
            equipo_retador[i][j].y = 52 + i * len;
        }
    }
    for (i = 0; i < unidades_por_columna; i++) {
        for (j = 0; j < unidades_por_fila; j++) {
            if (j == unidades_por_fila - 1) {
                equipo_retador[i][j] = new unidad_castillo();
            } else if (j == 0) {
                equipo_retador[i][j] = new unidad_soldado();
            } else if (j == 1) {
                equipo_retador[i][j] = new unidad_mago();
            } else if (j == 2) {
                equipo_retador[i][j] = new unidad_arquero();
            }
            // 	else{
            // 	random = Math.floor(Math.random() * (max - min + 1)) + min;
            // 	switch(parseInt(random/10)){
            // 		case 0:
            // 			equipo_retador[i][j] = new unidad_soldado((i*7+j*11)+2);
            // 			break;
            // 		case 1:
            // 			equipo_retador[i][j] = new unidad_mago((i*7+j*11)+2);
            // 			break;
            // 		case 2:
            // 			equipo_retador[i][j] = new unidad_arquero((i*7+j*11)+2);
            // 			break;
            // 	}
            // }
            equipo_retador[i][j].x = 452 + j * len;
            equipo_retador[i][j].y = 52 + i * len;
        }
    }
}

// DETERMINAR EL FRONTLINE
function determinar_frontline() {
    // 1.1 INICIALIZAR EL FRONTLINE USANDO LA PRIMERA COLUMNA
    for (i = 0; i < unidades_por_columna; i++) {
        frontline_retador[i] = equipo_retador[i][unidades_por_fila - 1];
    }
    for (i = 0; i < unidades_por_columna; i++) {
        frontline_jugador[i] = equipo_jugador[i][0];
    }
    //1.2 DETERMINAR FRONTLINE MEDIANTE EL MENOR X DE LA FILA.
    for (i = 0; i < unidades_por_columna; i++) {
        for (j = 0; j < unidades_por_fila; j++) {
            if (frontline_retador[i].x > equipo_retador[i][j].x) {
                if (equipo_retador[i][j].colision) {
                    frontline_retador[i] = equipo_retador[i][j];
                }
            }
        }
    }
    // 1.2 DETERMINAR FRONTLINE MEDIANTE EL MAYOR X DE LA FILA.
    for (i = 0; i < unidades_por_columna; i++) {
        for (j = 0; j < unidades_por_fila; j++) {
            if (frontline_jugador[i].x < equipo_jugador[i][j].x) {
                if (equipo_jugador[i][j].colision) {
                    frontline_jugador[i] = equipo_jugador[i][j];
                }
            }
        }
    }
}

// ALMACENAR KEYS
var keysDown = {};
addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("mousedown", function(e) {
    clickdX = e.pageX;
    clickdY = e.pageY;
    keysDown[-1] = true
}, false);
addEventListener("mouseup", function(e) {
    delete keysDown[-1];
}, false);

// HACER UPDATE DE LOS OBJETOS
var update = function(modifier) {
    if (38 in keysDown) {
        unidadSinImagen.src = "";
        iniciar = true;
        posicionJugador = 2;
        posicionRetador = 1;
        bandera_sprite = true;
    }
    if (keysDown[-1]) {
        iniciar_crear_unidad();
    }
    if (iniciar) { // FLECHA ARRIBA PARA INICIAR
        // 1. DETERMINAR EL "FRONTLINE"
        // 2. AVANZAR PRIMERA COLUMNA HASTA TENER RANGO CON EL FRONTLINE
        // 3. AVANZAR SEGUNDA COLUMNA HASTA TENER RANGO CONEL FRONTLINE O COLISION DE EQUIPO
        // 6. REPETIR

        /* 1. DETERMINAR EL FRONTLINE */
        determinar_frontline();


        /* 2. y 3. AVANZAR CUALQUIER UNIDAD */
        for (i = 0; i < unidades_por_columna; i++) {  // RECORRER LA MATRIZ COMPLETA
            for (j = 0; j < unidades_por_fila; j++) { // RECORRER LA MATRIZ COMPLETA
                rango_unidad_jugador = equipo_jugador[i][j].x + equipo_jugador[i][j].width + equipo_jugador[i][j].rango * rango;
                rango_unidad_retador = equipo_retador[i][j].x - equipo_retador[i][j].width - equipo_retador[i][j].rango * rango;
                for (y = 0; y < unidades_por_fila; y++) { // RECORRER ELEMENTOS ENEMIGOS DE LA MISMA FILA
                    if (equipo_retador[i][y] == frontline_retador[i]) { // SI ELEMENTO ENEMIGO ES FRONTLINE
                        if (rango_unidad_jugador < equipo_retador[i][y].x) { // SI UNIDAD ESTA EN RANGO CON FRONTLINE 
                            if (j == unidades_por_fila - 1) {
                                if (equipo_jugador[i][j].velocidad > 0) {
                                    equipo_jugador[i][j].x += 1 * equipo_jugador[i][j].velocidad;	// AVANZAR LO MÁS POSIBLE
                                }
                            } else { // SI NO ES FRONTLINE DEL EJERCITO PROPIO (2DA COLUMNA)
                                for (k = j + 1; k < unidades_por_fila; k++) {
                                    if (equipo_jugador[i][k].colision) {
                                        if (equipo_jugador[i][j].x + equipo_jugador[i][j].width < equipo_jugador[i][k].x) {
                                            if (equipo_jugador[i][j].velocidad > 0) {
                                                equipo_jugador[i][j].x += 1 * equipo_jugador[i][j].velocidad;	// AVANZAR LO MÁS POSIBLE
                                            }
                                        }
                                        break;
                                    } else {
                                        equipo_jugador[i][k] = equipo_jugador[i][j];
                                        equipo_jugador[i][j] = new unidad_null();
                                        equipo_jugador[i][j].x = 2;
                                    }
                                }
                            }
                        } else {
                            if (equipo_jugador[i][j].ataque > 0) {
                                if (equipo_retador[i][y].vida <= 0) {
                                    equipo_retador[i][y] = new unidad_null();
                                } else {
                                    equipo_retador[i][y].vida -= 1;
                                }
                            }

                        }
                    }//REPETIR PARA EL RETADOR
                    if (equipo_jugador[i][y] == frontline_jugador[i]) { // SI ELEMENTO ENEMIGO ES FRONTLINE
                        if (rango_unidad_retador > equipo_jugador[i][y].x) { // SI UNIDAD NO ESTA EN RANGO CON FRONTLINE 
                            if (j == 0) {
                                if (equipo_retador[i][j].velocidad > 0) {
                                    equipo_retador[i][j].x -= 1 * equipo_retador[i][j].velocidad;
                                }
                            } else {
                                for (k = j - 1; k < unidades_por_fila - 1; k++) {
                                    if (equipo_retador[i][k].colision) {
                                        if (equipo_retador[i][j].x > equipo_retador[i][k].x + equipo_retador[i][k].width) {
                                            if (equipo_retador[i][j].velocidad > 0) {
                                                equipo_retador[i][j].x -= 1 * equipo_retador[i][j].velocidad;
                                            }
                                        }
                                        break;
                                    } else {
                                        equipo_retador[i][k] = equipo_retador[i][j];
                                        equipo_retador[i][j] = new unidad_null();
                                        equipo_retador[i][j].x = 802;
                                    }
                                }
                            }
                        } else {
                            if (equipo_retador[i][j].ataque > 0) {
                                if (equipo_jugador[i][y].vida <= 0) {
                                    equipo_jugador[i][y] = new unidad_null();
                                } else {
                                    equipo_jugador[i][y].vida -= 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

};
// DIBUJAR EN CANVAS
var animar = function() {
    if (true) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (true) {
        ctx.font = "normal 9px Verdana";
        ctx.fillStyle = "#3bff00";
        for (i = 0; i < unidades_por_columna; i++) {
            for (j = 0; j < unidades_por_fila; j++) {
                switch (equipo_jugador[i][j].tipo) {
                    case -1:
                        ctx.drawImage(unidadSinImagen, equipo_jugador[i][j].x, equipo_jugador[i][j].y);
                        break;
                    case 0:
                        //ctx.drawImage(soldadoImagen,srcX,srcY,srcW,srcH,destX,destY,destW,destH);
                        ctx.drawImage(soldadoImagen, posicion[actual][posicionJugador].x, posicion[actual][posicionJugador].y, 42, 42, equipo_jugador[i][j].x, equipo_jugador[i][j].y, 48, 48);
                        break;
                    case 1:
                        ctx.drawImage(arqueroImagen, equipo_jugador[i][j].x, equipo_jugador[i][j].y);
                        break;
                    case 2:
                        ctx.drawImage(magoImagen, equipo_jugador[i][j].x, equipo_jugador[i][j].y);
                        break;
                    case 99:
                        ctx.drawImage(castilloImagen, equipo_jugador[i][j].x, equipo_jugador[i][j].y);
                        break;
                }
                switch (equipo_retador[i][j].tipo) {
                    case -1:
                        ctx.drawImage(unidadSinImagen, equipo_retador[i][j].x, equipo_retador[i][j].y);
                        break;
                    case 0:
                        ctx.drawImage(soldadoImagen, posicion[actual][posicionRetador].x, posicion[actual][posicionRetador].y, 42, 42, equipo_retador[i][j].x, equipo_retador[i][j].y, 48, 48);
                        break;
                    case 1:
                        ctx.drawImage(arqueroImagen, equipo_retador[i][j].x, equipo_retador[i][j].y);
                        break;
                    case 2:
                        ctx.drawImage(magoImagen, equipo_retador[i][j].x, equipo_retador[i][j].y);
                        break;
                    case 99:
                        ctx.drawImage(castilloImagen, equipo_retador[i][j].x, equipo_retador[i][j].y);
                        break;

                }
                if (equipo_jugador[i][j].vida > 0) {
                    ctx.fillText(equipo_jugador[i][j].vida, equipo_jugador[i][j].x + 7, equipo_jugador[i][j].y + 25);
                }
                if (equipo_retador[i][j].vida > 0) {
                    ctx.fillText(equipo_retador[i][j].vida, equipo_retador[i][j].x + 7, equipo_retador[i][j].y + 25);
                }
            }
        }
    }
};

// LOOP PARA EJECUTAR EL JUEGO.
var main = function() {
    update();
    animar();

};
function mover_sprite() {
    actual = (actual + 1) % 2;
}
setInterval(main, 20); // Execute as fast as possible
setInterval(mover_sprite, 400)
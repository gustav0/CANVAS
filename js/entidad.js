Entidad = Class.extend({
    img:null,
	frames:[],
    frameActual:{x:0,y:0},
    i:0,

    init: function() {
    },

    update: function() {
    },
    
    draw:function(img,pos,size){
    	for(var frame in this.frames){
    		this.finalDraw(img, this.frames[frame].x, this.frames[frame].y, this.size.h, this.size.w, pos.x, pos.y, size.h, size.w);
    	}
    },

    finalDraw:function(img, sx, sy, sh, sw, px, py, h, w){
        var centerX = px - (w/2);
        var centerY = py - (h/2);
        myEngine.context.drawImage(img, this.frameActual.x, this.frameActual.y, sh, sw, centerX, centerY, h, w);
    },
});
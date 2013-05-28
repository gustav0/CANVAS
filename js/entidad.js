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
    	
    	for(var frame in myEngine.parsedJSON.frames){

    		this.finalDraw(img, myEngine.parsedJSON.frames[frame].data.h, myEngine.parsedJSON.frames[frame].data.w, 
    			pos.x, pos.y, size.h, size.w);
    		//console.log("draw: "+this.id+" -> x: "+pos.x+", pos.y: "+pos.y);

    	}
    		
        
    },
    finalDraw:function(img, sh, sw, px, py, h, w){
    	myEngine.context.drawImage(img, this.frameActual.x, this.frameActual.y, sh, sw, px, py, h, w);
    },
    getFrameActual:function(){
    	//myEngine.context.clearRect(0,0,myEngine.canvas.width,myEngine.canvas.height);
    	this.i = (this.i + 1) % 2;
    	this.frameActual = this.frames[this.i];
    }
});
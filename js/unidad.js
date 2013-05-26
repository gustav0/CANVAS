Unidad = Entidad.extend({

	id: 0,
	
	/*
     * No se
     */
    position: {},

    /*
     * No se
     */
    size: {
        w: 48,
        h: 48
    },
    init: function(position, controls, id) {
        if (id) {
            this.id = id;
        }
        if (controls) {
            this.controls = controls;
        }
        controls: {
            'up': 'up',
        },
    },

    update: function() {
    }
});
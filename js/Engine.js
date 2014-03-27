Engine = Class.extend({
    stage: null,
    holder: null,
    backkground: null,
    size: {},
    //
    playing: false,
    backgroundImg: null,
    unitSoldierImg: null,
    unitTrollImg: null,
    unitsTeamA: [],
    unitsTeamB: [],
    init: function() {
        this.size = {
            w: 850,
            h: 400
        };
    },
    load: function() {
        this.stage = new createjs.Stage("canvas");
        this.stage.enableMouseOver();
        this.holder = new createjs.Container();

        this.stage.addChild(this.holder);

        var queue = new createjs.LoadQueue(true, "img/");
        var that = this;
        queue.addEventListener("complete", function() {
            that.backgroundImg = queue.getResult("background");
            that.soldierImg = queue.getResult("soldier");
            that.trollImg = queue.getResult("troll");

            that.setup();
        });
        queue.loadManifest([
            {id: "background", src: "Background.png"},
            {id: "unitSoldier", src: "BlackGuard.png"},
            {id: "unitTroll", src: "GreenGuard.png"}
        ]);

        createjs.Ticker.addEventListener("tick", this.tick);
        createjs.Ticker.setFPS(60);

        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNC;
    },
    setup: function() {
        this.backgroundImg = new createjs.Bitmap(this.backgroundImg);
        this.backgroundImg.x = 0;
        this.backgroundImg.y = 0;
        

        this.holder.addChild(this.backgroundImg);
        this.stage.update();
    },
    tick: function(event) {
    }
});

myEngine = new Engine();


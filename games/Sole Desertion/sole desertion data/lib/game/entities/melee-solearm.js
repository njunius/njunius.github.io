ig.module( 
	'game.entities.melee-solearm' 
)
.requires(
	'game.entities.melee'
)
.defines(function(){
	
EntityMeleeSolearm = EntityMelee.extend({
	
	size: {x:0, y:0},
	collides: ig.Entity.COLLIDES.NEVER,
	animSheet: new ig.AnimationSheet('media/weapons/solearm.png', 128, 128),
	lifetime: 0,
	zIndex: -255,
	
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('up', .5, [7]);
		this.addAnim('down', .5, [1]);
		this.addAnim('left', .5, [5]);
		this.addAnim('right', .5, [6]);
		this.addAnim('idleUp', 1, [3]);
		this.addAnim('idleDown', 1, [0]);
		this.addAnim('idleLeft', 1, [4]);
		this.addAnim('idleRight', 1, [2]);
		this.maxVel.x = 200;
		this.maxVel.y = 200;				
	},
	
	update: function() {
		this.parent();
		
		var player = this.parentEntity;
		
		this.pos.x = player.pos.x - 52;
		this.pos.y = player.pos.y - 49;
		
		if (player.direction === "up" && this.lifetime === 0) {
			this.currentAnim = this.anims.idleUp;

		}
		else if (player.direction === "down" && this.lifetime === 0) {
			this.currentAnim = this.anims.idleDown;
		}
		else if (player.direction === "left" && this.lifetime === 0) {
			this.currentAnim = this.anims.idleLeft;

		}
		else if (player.direction === "right" && this.lifetime === 0) {
			this.currentAnim = this.anims.idleRight;

		}
		
		if(this.lifetime !== 0){
			if (player.direction === "down") {
				this.size.x = 20;
				this.size.y = 80;
				this.offset.y = 74;
				this.offset.x = 52;
			}
			else if (player.direction === "up") {
				this.size.x = 20;
				this.size.y = 80;
				this.offset.y = -20;
				this.offset.x = 58;
			}
			else if (player.direction === "left") {
				this.size.x = 80;
				this.size.y = 20;
				this.offset.y = 56;
				this.offset.x = -16;
			}
			else if (player.direction === "right") {
				this.size.x = 80;
				this.size.y = 20;
				this.offset.y = 54;
				this.offset.x = 72;
			}
			this.pos.y += this.offset.y;
			this.pos.x += this.offset.x;
			this.collides = ig.Entity.COLLIDES.PASSIVE;
			this.lifetime++;
		}
		if(this.lifetime > 10){
			this.size.x = 0;
			this.size.y = 0;
			this.lifetime = 0;
			this.offset.x = 0;
			this.offset.y = 0;
			this.pos.x = 52;
			this.pos.y = 49;
			this.collides = ig.Entity.COLLIDES.NEVER;
		}
	}
	
	
});	
});
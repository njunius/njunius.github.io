ig.module( 
	'game.entities.projectile' 
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityProjectile = ig.Entity.extend({
	
	collides: ig.Entity.COLLIDES.ACTIVE,
	
	init: function(x, y, settings) {

		this.maxVel.x = 10000;
		this.maxVel.y = 10000;
		this.parent(x, y, settings);
				
		if (settings.direction === "up") {
			this.vel.y = -500;
			this.accel.y = -100;
			this.vel.x = 0;
		}
		else if (settings.direction === "down") {
			this.vel.y = 500;
			this.accel.y = 100;
			this.vel.x = 0;
		}
		else if (settings.direction === "left") {
			this.vel.x = -500;
			this.accel.x = -100;
			this.vel.y = 0;
		}
		else if (settings.direction === "right") {
			this.vel.x = 500;
			this.accel.x = 100;
			this.vel.y = 0;
		}
			
	}
	
});
});
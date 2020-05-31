ig.module( 
	'game.entities.projectile-arrow' 
)
.requires(
	'impact.entity',
	'game.entities.projectile',
	'game.entities.player'
)
.defines(function(){
	
EntityProjectileArrow = EntityProjectile.extend({
	
	animSheet: new ig.AnimationSheet('media/arrow.png', 24, 24),
	soundOuch: new ig.Sound( 'media/sound/snd_squelch.ogg' ),
	
	init: function(x, y, settings) {
		this.addAnim('up', 1, [2]);
		this.addAnim('left', 1, [1]);
		this.addAnim('right', 1, [3]);
		this.addAnim('down', 1, [0]);
	
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		
		if (player.direction === "up") {
			this.size.x = 8;
			this.size.y = 24;
			this.offset.x = 9;
			this.currentAnim = this.anims.up;
			this.vel.y = -500;
			this.accel.y = -200;
			this.vel.x = 0;
		}
		else if (player.direction === "down") {
			this.size.x = 8;
			this.size.y = 24;
			this.offset.x = 9;
			this.currentAnim = this.anims.down;
			this.vel.y = 500;
			this.accel.y = 200;
			this.vel.x = 0;
		}
		else if (player.direction === "left") {
			this.size.x = 24;
			this.size.y = 8;
			this.offset.y = 9;
			this.currentAnim = this.anims.left;
			this.vel.x = -500;
			this.accel.x = -200;
			this.vel.y = 0;
		}
		else if (player.direction === "right") {
			this.size.x = 24;
			this.size.y = 8;
			this.offset.y = 9;
			this.currentAnim = this.anims.right;
			this.vel.x = 500;
			this.accel.x = 200;
			this.vel.y = 0;
		}

		this.parent(x, y, settings);		

	},
	
	update: function(){
		
		this.parent();
		
	},
	
	//On collsion with any non entity, despawn arrow
	handleMovementTrace: function( res ) {
    	if( res.collision.y || res.collision.x ) {
        	this.kill();
    	}
    	
    	this.parent(res); 
	},
	collideWith: function( other, axis ) {
    	if ( other instanceof EntityEnemy ) {
    		this.soundOuch.play();
    		other.receiveDamage(15, this);
    		this.kill();
    	}
	}
	
	
});
});
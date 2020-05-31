ig.module( 
	'game.entities.projectile-bullet' 
)
.requires(
	'impact.entity',
	'game.entities.projectile',
	'game.entities.enemy'
)
.defines(function(){
	
EntityProjectileBullet = EntityProjectile.extend({
	
	animSheet: new ig.AnimationSheet('media/bullet.png', 16, 16),
	soundOuch: new ig.Sound( 'media/sound/snd_squelch.ogg' ),
	lifetime: 0,
	
	init: function(x, y, settings) {
		this.addAnim('up', 1, [1]);
		this.addAnim('down', 1, [3]);
		this.addAnim('left', 1, [0]);
		this.addAnim('right', 1, [2]);

		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		
		if (player.direction === "up") {
			this.size.x = 5;
			this.size.y = 10;
			this.offset.x = 5;
			this.currentAnim = this.anims.up;
		}
		else if (player.direction === "down") {
			this.size.x = 5;
			this.size.y = 10;
			this.offset.x = 5;
			this.currentAnim = this.anims.down;
		}
		else if (player.direction === "left") {
			this.size.x = 10;
			this.size.y = 5;
			this.offset.y = 5;
			this.currentAnim = this.anims.left;
		}
		else if (player.direction === "right") {
			this.size.x = 10;
			this.size.y = 5;
			this.offset.y = 5;
			this.currentAnim = this.anims.right;
		}
		

		this.parent(x, y, settings);		

	},
	
	update: function(){
		
		this.parent();
		
		this.lifetime++;
		if(this.lifetime > 17){
			this.kill();
		}
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
    		other.receiveDamage(2, this);
    		this.kill();
    	}
	}
	
});
});
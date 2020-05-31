ig.module( 
	'game.entities.key' 
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityKey = ig.Entity.extend({
	
	collides: ig.Entity.COLLIDES.ACTIVE,
	animSheet: new ig.AnimationSheet('media/keys.png', 32, 32),
	size: {x:32, y:32},
	color: 'yellow',
	collected: 0,
	soundPickup: new ig.Sound( 'media/sound/snd_pickup.ogg' ),
	
	init: function(x, y, settings) {
		this.addAnim('yellow', 1, [0]);
		this.addAnim('green', 1, [1]);
		this.addAnim('white', 1, [2]);
		this.addAnim('blue', 1, [3]);
		this.parent(x, y, settings);
	},
	
	update: function() {
		if (this.color === 'yellow') this.currentAnim = this.anims.yellow;
		else if (this.color === 'green') this.currentAnim = this.anims.green;
		else if (this.color === 'white') this.currentAnim = this.anims.white;
		else if (this.color === 'blue') this.currentAnim = this.anims.blue;

	},
	
	collideWith: function( other, axis ) {
		if ( other instanceof EntityPlayer) {
			this.soundPickup.play();
			this.pos.x = -1;
			this.pos.y = -1;
			var door = ig.game.getEntitiesByType( EntityDoor );
			for (var i = 0; i < door.length; i++) {
				if (door[i].color === this.color) {
					door[i].color = 'open';
					door[i].currentAnim = door[i].anims.open;
				}
				this.collected = true;
				this.counter++;
			}
			
		}
		else if ( other instanceof EntityProjectile ) {
			other.kill();
		}
	},
	
	draw: function() {
		this.parent();
		if (this.collected === true) { 	
			
			//There's probably a better way of doing this				
			if (this.color === 'yellow') 
				this.anims.yellow.draw( (ig.system.width - 50), 86 );
			else if (this.color === 'green') 
				this.anims.green.draw( (ig.system.width - 50), 54 );
			else if (this.color === 'white') 
				this.anims.white.draw( (ig.system.width - 50), 22 );
			else if (this.color === 'blue') 
				this.anims.blue.draw( (ig.system.width - 50), 118 );
		}	
		
	}
	
});	
});
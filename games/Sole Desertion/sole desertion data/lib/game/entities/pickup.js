ig.module( 
	'game.entities.pickup' 
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityPickup = ig.Entity.extend({
	
	collides: ig.Entity.COLLIDES.ACTIVE,
	animSheet: new ig.AnimationSheet('media/packs.png', 32, 32),
	size: {x:32, y:32},
	flavor: 'health',
	soundPickup: new ig.Sound( 'media/sound/snd_ammoPickup.ogg' ),
	
	init: function(x, y, settings) {

		this.addAnim('health', 1, [2]);
		this.addAnim('bullet', 1, [1]);
		this.addAnim('spear', 1, [0]);
		this.parent(x, y, settings);
	},
	
	update: function() {
		if (this.flavor === 'health') this.currentAnim = this.anims.health;
		else if (this.flavor === 'bullet') this.currentAnim = this.anims.bullet;
		else if (this.flavor === 'spear') this.currentAnim = this.anims.spear;
	},
	
	collideWith: function( other, axis ) {
		if ( other instanceof EntityPlayer) {	
			this.soundPickup.play();
			//Fill 1/4 of max health without going over max health	
			if (this.flavor === 'health') 
				if(other.health < (other.maxHealth - other.maxHealth/4))
					other.health = other.health + other.maxHealth/4;
				else 
					other.health = other.maxHealth;
				
			if (this.flavor === 'bullet') 
				other.SMGAmmo = other.SMGAmmo + 20;
			if (this.flavor === 'spear') 
				other.spearAmmo = other.spearAmmo + 3;
				
			this.kill();
		}
		else if ( other instanceof EntityProjectile ) {
			other.kill();
		}
	}
	
});	
});
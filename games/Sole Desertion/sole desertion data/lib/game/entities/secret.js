ig.module( 
	'game.entities.secret' 
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntitySecret = ig.Entity.extend({
	
	collides: ig.Entity.COLLIDES.FIXED,
	zIndex: -2,
	size: {x:204, y:102},
	animSheet: new ig.AnimationSheet('media/secretCrack.png', 204, 102),
	index: 0,
	
	init: function(x, y, settings) {
		this.addAnim('default', 1, [0]);
		this.parent(x, y, settings);
	},
	

	collideWith: function( other, axis ) {
		if ( other instanceof EntityMelee ) {
			var block = ig.game.getEntitiesByType( EntitySecretHiders );
			for ( var i = 0; i < block.length; i++) {
				if ( block[i].index === this.index ) block[i].kill();
			}
			this.kill();		
		}

	}
	
	
});	
});
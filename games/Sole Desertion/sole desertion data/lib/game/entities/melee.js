ig.module( 
	'game.entities.melee' 
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityMelee = ig.Entity.extend({
	
	collides: ig.Entity.COLLIDES.PASSIVE,

	
	init: function(x, y, settings) {

		this.parent(x, y, settings);
			
	},
	
});	
});
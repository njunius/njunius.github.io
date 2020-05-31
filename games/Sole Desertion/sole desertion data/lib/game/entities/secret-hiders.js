ig.module( 
	'game.entities.secret-hiders' 
)
.requires(
	'game.entities.secret'
)
.defines(function(){
	
EntitySecretHiders = EntitySecret.extend({
	
	collides: ig.Entity.COLLIDES.NEVER,
	zIndex: 255,
	size: {x:51, y:51},
	index: 0,
	animSheet: new ig.AnimationSheet('media/secretBlock.png', 51, 51),
	
	init: function(x, y, settings) {
		this.addAnim('default', 1, [0]);
		this.parent(x, y, settings);
	},
});	
});
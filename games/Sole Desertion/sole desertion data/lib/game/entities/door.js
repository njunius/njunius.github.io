ig.module( 
	'game.entities.door' 
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityDoor = ig.Entity.extend({
	
	collides: ig.Entity.COLLIDES.FIXED,
	zIndex: -1,
	size: {x:102, y:153},
	animSheet: new ig.AnimationSheet('media/doors_with_exit.png', 102, 153),
	color: 'open',
	
	init: function(x, y, settings) {
		this.addAnim('yellow', 1, [0]);
		this.addAnim('green', 1, [1]);
		this.addAnim('white', 1, [2]);
		this.addAnim('blue', 1, [3]);
		this.addAnim('open', 1, [4]);
		this.addAnim('exit', 1, [6]);
		this.parent(x, y, settings);
	},
	
	update: function() {
		if (this.color === 'yellow') this.currentAnim = this.anims.yellow;
		else if (this.color === 'green') this.currentAnim = this.anims.green;
		else if (this.color === 'white') this.currentAnim = this.anims.white;
		else if (this.color === 'blue') this.currentAnim = this.anims.blue;
		else if (this.color === 'final') this.currentAnim = this.anims.exit;
		else this.currentAnim = this.anims.open;
		
		if (this.color === 'open') {
			this.addAnim('open', 1, [5]);
			this.collides = ig.Entity.COLLIDES.NEVER;
		} 
	},
	
	collideWith: function( other, axis ) {
		if ( other instanceof EntityProjectile) {
			other.kill();		
		}
		if ( other instanceof EntityPlayer && this.color == 'final'){
			ig.system.setGame(MyGame);
		}
	}
	
	
});	
});
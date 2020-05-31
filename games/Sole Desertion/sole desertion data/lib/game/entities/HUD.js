ig.module( 
	'game.entities.HUD' 
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityHUD = ig.Entity.extend({
	
	zIndex: -2,
	font: new ig.Font( 'media/04b03.font.png' ),
	
	init: function(x, y, settings) {
		this.parent(x, y, settings);
	},
	
	draw: function(){
		
		this.parent();
		//var this = ig.game.getEntitiesByType( Entitythis )[0];
		
		// health bar border 
		ig.system.context.fillStyle = "rgb(30, 30, 30)";
		ig.system.context.beginPath();
		ig.system.context.rect(ig.game.screen.x + 45, ig.game.screen.y + 45, 110, 20);
		ig.system.context.closePath();
		ig.system.context.fill();
		
		// health bar
		ig.system.context.fillStyle = "rgb(170, 20, 50)";
		ig.system.context.beginPath();
		ig.system.context.rect(ig.game.screen.x + 50, ig.game.screen.y + 50, (this.health / this.maxHealth) * 100, 10 );
		ig.system.context.closePath();
		ig.system.context.fill();
		
		// ammo remaining
		this.font.draw('Spears: ' + this.spearAmmo, ig.game.screen.x + 350, ig.game.screen.y + 50 );
		this.font.draw('Bullets: ' + this.SMGAmmo, ig.game.screen.x + 200, ig.game.screen.y + 50 );
		
	}
	
});	
});
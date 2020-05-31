ig.module( 
	'game.entities.enemy' 
)
.requires(
	'impact.entity',
	'game.entities.player',
	'game.entities.projectile-arrow',
	'game.entities.melee-sword'
)
.defines(function(){
	
EntityEnemy = ig.Entity.extend({
	
	turn: 1,
	collides: ig.Entity.COLLIDES.ACTIVE,
	size: {x:25, y:45},
	offset: {x:20, y:7},
	animSheet: new ig.AnimationSheet('media/spirit.png', 64, 64),
	direction: 0,
	health: 30,
	hitTimer: 10,
	alreadyCollided: false,
	bounciness: 1,
	soundOuch: new ig.Sound( 'media/sound/snd_squelch.ogg' ),
	soundHitPlayer: new ig.Sound( 'media/sound/snd_playerHit.ogg' ),

	
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.vel.x = 100;
		this.vel.y = 0;
		this.addAnim('neutral', 1, [0, 1]);
		this.addAnim('engaged', 0.7, [0, 1]);
		this.addAnim('angry', 0.3, [2, 3]);
	},
	
	update: function() {
		var arrow = ig.game.getEntitiesByType( EntityProjectileArrow )[0];
		var sword = ig.game.getEntitiesByType( EntityMeleeSword )[0];
		var solearm = ig.game.getEntitiesByType( EntityMeleeSolearm )[0];
		var warhammer = ig.game.getEntitiesByType( EntityMeleeWarhammer )[0];
		this.parent();
		if(this.hitTimer > 0){
			this.currentAnim = this.anims.angry;
			this.hitTimer--;
		}
		if(this.hitTimer < 1){
    		this.currentAnim = this.anims.neutral;
			this.hitTimer = 0;
		}
				
		if(sword != null && sword.lifetime === 0){
			this.alreadyCollided = false;
		}
		if (solearm != null && solearm.lifetime === 0) {
			this.alreadyCollided = false;
		}
		if (warhammer != null && warhammer.lifetime === 0) {
			this.alreadyCollided = false;
		}
		
		this.vel.x *= this.turn;
		this.ai();
	},
	
	
	collideWith: function( other, axis ) {
    	if ( other instanceof EntityPlayer && this.hitTimer === 0) {
    		other.receiveDamage(2, this);
			this.soundHitPlayer.play();
    		this.hitTimer = 120;
    	}
    	if(other instanceof EntityMeleeSword && this.alreadyCollided === false && other.lifetime !== 0){
    		this.receiveDamage(5, other);
    		this.soundOuch.play();
    		this.alreadyCollided = true;
    	}
    	if(other instanceof EntityMeleeSolearm && this.alreadyCollided === false && other.lifetime !== 0){
    		this.receiveDamage(8, other);
    		this.soundOuch.play();
    		this.alreadyCollided = true;
    	}
    	if(other instanceof EntityMeleeWarhammer && this.alreadyCollided === false && other.lifetime !== 0){
    		this.receiveDamage(15, other);
    		this.soundOuch.play();
    		this.alreadyCollided = true;
    	}
	},
	
	ai: function() {
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		
		//Track player if within specified distance
		if ( this.distanceTo( player ) < 200 && this.distanceTo( player ) > 20 ) {
			
			if (this.currentAnim !== this.anims.angry)
				this.currentAnim = this.anims.engaged;
			
			var angle = this.angleTo( player ) * (180/Math.PI); //Rad to deg
			
			//Some cool math, copyright me
			var k = Math.abs((angle - 90) / 90);
			Math.abs(angle) > 90 ? k*=-1:k;
			this.vel.x = 100 * k;
			this.vel.y = 100 - this.vel.x * k;
		}
		else if ( this.distanceTo( player ) > 200 ){
			//Reset to default velocity, preserving direction. Works as long as maxVel = 100 (default velocity)
			this.vel.x *= 100;
			this.vel.y = 0;
			this.currentAnim = this.anims.neutral;
		}
		//Try to avoid case where enemy is ontop of player, causes some weird lag
		else if ( this.distanceTo( player ) < 20 ) {
			this.vel.x = 0;
			this.vel.y = 0;
		}
		
	}

});
});
ig.module( 
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityPlayer = ig.Entity.extend({
	
	size: {x:20, y:25},
	offset: {x:22, y:22},
	collides: ig.Entity.COLLIDES.PASSIVE,
	animUp: new ig.AnimationSheet('media/asimov_up.png', 64, 64),
	animDown: new ig.AnimationSheet('media/asimov_down.png', 64, 64),
	animLeft: new ig.AnimationSheet('media/asimov_left.png', 64, 64),
	animRight: new ig.AnimationSheet('media/asimov_right.png', 64, 64),
	direction: "up",
	equippedWeapon: 1,
	currWeapon: null,
	ROFCap: 0,
	canFire: true,
	SMGAmmo: 30,
	spearAmmo: 3,
	maxSpear: 25,
	maxSMG: 125,
	health: 20,
	maxHealth: 20,
	sprint: 1,
	stamina: 100,
	staminaDelay: 50,
	wepSpawned: false,
	font: new ig.Font( 'media/04b03.font.png' ),
	soundSwing: new ig.Sound( 'media/sound/snd_whiff.ogg' ),
	soundHammer: new ig.Sound( 'media/sound/snd_hammer.ogg' ),
	soundGun: new ig.Sound( 'media/sound/snd_shoot.ogg' ),
	soundBow: new ig.Sound( 'media/sound/snd_pressButtonDown.ogg' ),
	zIndex: 255,
	
	init: function(x, y, settings) {
		
		// load animations
		this.anims.moveUp = new ig.Animation( this.animUp, 0.1, [10,11,14,13] );
		this.anims.moveDown = new ig.Animation( this.animDown, 0.1, [10,11,14,13] );
		this.anims.moveLeft = new ig.Animation( this.animLeft, 0.1, [10,11,14,13] );
		this.anims.moveRight = new ig.Animation( this.animRight, 0.1, [10,11,14,13] );
		
		this.anims.moveUpBow = new ig.Animation( this.animUp, 0.1, [1,2,4,5] );
		this.anims.moveDownBow = new ig.Animation( this.animDown, 0.1, [1,2,4,5] );
		this.anims.moveLeftBow = new ig.Animation( this.animLeft, 0.1, [1,2,4,5] );
		this.anims.moveRightBow = new ig.Animation( this.animRight, 0.1, [1,2,4,5] );
		
		this.anims.moveUpGun = new ig.Animation( this.animUp, 0.1, [3,7,8,12] );
		this.anims.moveDownGun = new ig.Animation( this.animDown, 0.1, [3,7,8,12] );
		this.anims.moveLeftGun = new ig.Animation( this.animLeft, 0.1, [3,7,8,12] );
		this.anims.moveRightGun = new ig.Animation( this.animRight, 0.1, [3,7,8,12] );
		
        this.anims.idleUp = new ig.Animation( this.animUp, 1, [9] );
        this.anims.idleDown = new ig.Animation( this.animDown, 1, [9] );
        this.anims.idleLeft = new ig.Animation( this.animLeft, 1, [9] );
        this.anims.idleRight = new ig.Animation( this.animRight, 1, [9] );
        
        this.anims.idleUpBow = new ig.Animation( this.animUp, 1, [0] );
        this.anims.idleDownBow = new ig.Animation( this.animDown, 1, [0] );
        this.anims.idleLeftBow = new ig.Animation( this.animLeft, 1, [0] );
        this.anims.idleRightBow = new ig.Animation( this.animRight, 1, [0] );
        
        this.anims.idleUpGun = new ig.Animation( this.animUp, 1, [6] );
        this.anims.idleDownGun = new ig.Animation( this.animDown, 1, [6] );
        this.anims.idleLeftGun = new ig.Animation( this.animLeft, 1, [6] );
        this.anims.idleRightGun = new ig.Animation( this.animRight, 1, [6] );
        
		this.maxVel.x = 10000;
		this.maxVel.y = 10000;
		this.parent(x, y, settings);
	},
	
	update: function() {
		
		if ( this.wepSpawned === false ) {
			this.currWeapon = ig.game.spawnEntity(EntityMeleeSword, this.pos.x, this.pos.y, {parentEntity: this});
        	this.currWeapon.zIndex = -this.zIndex;
        	this.wepSpawned = true;
		}

		var settings = {direction: this.direction};
		ig.game.screen.x = this.pos.x - ig.system.width/2;
		ig.game.screen.y = this.pos.y - ig.system.height/2; 
		// Rate of fire control for crossbow
		if(this.canFire == false && this.ROFCap < 119 && this.equippedWeapon == 5){
			this.ROFCap++;
		}
		if(this.ROFCap > 118 && this.equippedWeapon == 5){
			this.ROFCap = 0;
			this.canFire = true;
		}
		
		// Rate of fire control for SMG
		if(this.canFire == false && this.ROFCap < 10 && this.equippedWeapon == 4){
			this.ROFCap++;
		}
		if(this.ROFCap > 9 && this.equippedWeapon == 4){
			this.ROFCap = 0;
			this.canFire = true;
		}
		
		// Rate of fire for Sword
		if(this.canFire == false && this.ROFCap < 20 && this.equippedWeapon == 1){
			this.ROFCap++;
		}
		if(this.ROFCap > 19 && this.equippedWeapon == 1){
			this.ROFCap = 0;
			this.canFire = true;
		}
		
		// Rate of fire for Solearm
		if(this.canFire == false && this.ROFCap < 30 && this.equippedWeapon == 2){
			this.ROFCap++;
		}
		if(this.ROFCap > 29 && this.equippedWeapon == 2){
			this.ROFCap = 0;
			this.canFire = true;
		}
		
		// Rate of fire for Warhammer
		if(this.canFire == false && this.ROFCap < 90 && this.equippedWeapon == 3){
			this.ROFCap++;
		}
		if(this.ROFCap > 89 && this.equippedWeapon == 3){
			this.ROFCap = 0;
			this.canFire = true;
		}
		
		// movement behavior
		if(ig.input.state('up')) {
			this.vel.y = -200 * this.sprint;
			this.vel.x = 0;
			
			if (this.equippedWeapon === 4)
				this.currentAnim = this.anims.moveUpGun;
			else if (this.equippedWeapon === 5)
				this.currentAnim = this.anims.moveUpBow;
			else 
				this.currentAnim = this.anims.moveUp;
				
			this.direction = "up";
		}
		else if(ig.input.state('down')) {
			this.vel.y = 200 * this.sprint;
			this.vel.x = 0;
			
			if (this.equippedWeapon === 4)
				this.currentAnim = this.anims.moveDownGun;
			else if (this.equippedWeapon === 5)
				this.currentAnim = this.anims.moveDownBow;
			else 
				this.currentAnim = this.anims.moveDown;
				
			this.direction = "down";
		}
		else if(ig.input.state('left')) {
			this.vel.x = -200 * this.sprint;
			this.vel.y = 0;
			
			if (this.equippedWeapon === 4)
				this.currentAnim = this.anims.moveLeftGun;
			else if (this.equippedWeapon === 5)
				this.currentAnim = this.anims.moveLeftBow;
			else 
				this.currentAnim = this.anims.moveLeft;
				
			this.direction = "left";
		}
		else if(ig.input.state('right')) {
			this.vel.x = 200 * this.sprint;
			this.vel.y = 0;

			if (this.equippedWeapon === 4)
				this.currentAnim = this.anims.moveRightGun;
			else if (this.equippedWeapon === 5)
				this.currentAnim = this.anims.moveRightBow;
			else 
				this.currentAnim = this.anims.moveRight;			

			this.direction = "right";
		}
		else {
			this.vel.x = 0;
			this.vel.y = 0;
			if (this.direction === "up") {
				
				if (this.equippedWeapon === 4)
					this.currentAnim = this.anims.idleUpGun;
				else if (this.equippedWeapon === 5)
					this.currentAnim = this.anims.idleUpBow;
				else 
					this.currentAnim = this.anims.idleUp;

			}
			else if (this.direction === "down") {
				

				if (this.equippedWeapon === 4)
					this.currentAnim = this.anims.idleDownGun;
				else if (this.equippedWeapon === 5)
					this.currentAnim = this.anims.idleDownBow;
				else 
					this.currentAnim = this.anims.idleDown;
				
			}
			
			else if (this.direction === "left") {
				
				if (this.equippedWeapon === 4)
					this.currentAnim = this.anims.idleLeftGun;
				else if (this.equippedWeapon === 5)
					this.currentAnim = this.anims.idleLeftBow;
				else 
					this.currentAnim = this.anims.idleLeft;
					
				}
					
			else if (this.direction === "right") {
				
				if (this.equippedWeapon === 4)
					this.currentAnim = this.anims.idleRightGun;
				else if (this.equippedWeapon === 5)
					this.currentAnim = this.anims.idleRightBow;
				else 
					this.currentAnim = this.anims.idleRight;
				}
		}
		
		// update collisions
		if(this.currentAnim === this.anims.down || this.currentAnim === this.anims.idleDown){
			this.offset.x = 22;
			this.offset.y = 22;
		}
		
		// weapon switch behavior
		if(ig.input.state('1')){
			this.equippedWeapon = 1;
			this.canFire = true;
			this.ROFCap = 0;
			this.currWeapon.kill();
			this.currWeapon = ig.game.spawnEntity(EntityMeleeSword, this.pos.x, this.pos.y, {parentEntity: this});
			this.currWeapon.zIndex = -this.zIndex;
		}
		else if(ig.input.state('2')){
			this.equippedWeapon = 2;
			this.canFire = true;
			this.ROFCap = 0;
			this.currWeapon.kill();
			this.currWeapon = ig.game.spawnEntity(EntityMeleeSolearm, this.pos.x, this.pos.y, {parentEntity: this});
			this.currWeapon.zIndex = -this.zIndex;
		}
		else if(ig.input.state('3')){
			this.equippedWeapon = 3;
			this.canFire = true;
			this.ROFCap = 0;
			this.currWeapon.kill();
			this.currWeapon = ig.game.spawnEntity(EntityMeleeWarhammer, this.pos.x, this.pos.y, {parentEntity: this});
			this.currWeapon.zIndex = -this.zIndex;
		}
		else if(ig.input.state('4')){
			this.equippedWeapon = 4;
			this.canFire = true;
			this.ROFCap = 0;
			this.currWeapon.kill();
		}
		else if(ig.input.state('5')){
			this.equippedWeapon = 5;
			this.canFire = true;
			this.ROFCap = 0;
			this.currWeapon.kill();
		}
		
		// weapon firing
		if(this.equippedWeapon === 4){
			if(ig.input.state('space') && this.ROFCap === 0 && this.SMGAmmo > 0){
				this.soundGun.play();
				var settings = {direction: this.direction};
				if(this.direction === "right"){
					ig.game.spawnEntity(EntityProjectileBullet, this.pos.x + 20, this.pos.y + 7, settings);
				}
				else if(this.direction === "left"){
					ig.game.spawnEntity(EntityProjectileBullet, this.pos.x - 20, this.pos.y + 7, settings);
				}
				else if(this.direction === "up"){
					ig.game.spawnEntity(EntityProjectileBullet, this.pos.x + 15, this.pos.y - 20, settings);
				}
				else if(this.direction === "down"){
					ig.game.spawnEntity(EntityProjectileBullet, this.pos.x - 2, this.pos.y + 20, settings);
				}
				this.SMGAmmo--;
				this.canFire = false;
			}
		}
		
		if(ig.input.pressed('space')) {
			var enemy = ig.game.getEntitiesByType( EntityEnemy )[0];
			var settings = {direction: this.direction};
			if(this.equippedWeapon === 5 && this.ROFCap === 0 && this.spearAmmo > 0){
				this.soundBow.play();
				if(this.direction === "right"){
					ig.game.spawnEntity(EntityProjectileArrow, this.pos.x + 20, this.pos.y + 7, settings);
				}
				else if(this.direction === "left"){
					ig.game.spawnEntity(EntityProjectileArrow, this.pos.x - 20, this.pos.y + 7, settings);
				}
				else if(this.direction === "up"){
					ig.game.spawnEntity(EntityProjectileArrow, this.pos.x + 15, this.pos.y - 20, settings);
				}
				else if(this.direction === "down"){
					ig.game.spawnEntity(EntityProjectileArrow, this.pos.x - 2, this.pos.y + 20, settings);
				}
				this.spearAmmo--;
				this.canFire = false;

			}
			
			if ( this.stamina > 0 ) {
				// melee
				// sword
				if(this.equippedWeapon === 1 && this.ROFCap === 0) {
					if (this.direction === "up") 
						this.currWeapon.currentAnim = this.currWeapon.anims.up;
					else if (this.direction === "down") 
						this.currWeapon.currentAnim = this.currWeapon.anims.down;
					else if (this.direction === "left") 
						this.currWeapon.currentAnim = this.currWeapon.anims.left;
					else if (this.direction === "right") 
						this.currWeapon.currentAnim = this.currWeapon.anims.right;
					this.soundSwing.play();
					this.stamina -= 25;
					this.staminaDelay -= 30;
					this.currWeapon.lifetime = 1;
					this.canFire = false;
				}
				
				// solearm
				if(this.equippedWeapon === 2 && this.ROFCap ===  0) {
					if (this.direction === "up") 
						this.currWeapon.currentAnim = this.currWeapon.anims.up;
					else if (this.direction === "down") 
						this.currWeapon.currentAnim = this.currWeapon.anims.down;
					else if (this.direction === "left") 
						this.currWeapon.currentAnim = this.currWeapon.anims.left;
					else if (this.direction === "right") 
						this.currWeapon.currentAnim = this.currWeapon.anims.right;
					this.soundSwing.play();
					this.stamina -= 20;
					this.staminaDelay -= 20;
					this.currWeapon.lifetime = 1;
					this.canFire = false;
				}
				
				// warhammer
				if(this.equippedWeapon === 3 && this.ROFCap ===  0){
					console.log("hammer");
					if (this.direction === "up") 
						this.currWeapon.currentAnim = this.currWeapon.anims.up;
					else if (this.direction === "down") 
						this.currWeapon.currentAnim = this.currWeapon.anims.down;
					else if (this.direction === "left") 
						this.currWeapon.currentAnim = this.currWeapon.anims.left;
					else if (this.direction === "right") 
						this.currWeapon.currentAnim = this.currWeapon.anims.right;
					this.soundHammer.play();
					this.stamina -= 50;
					this.staminaDelay -= 70;
					this.currWeapon.lifetime = 1;
					this.canFire = false;
				}
			}
		}
		
		//sprint and stamina		
		if ( this.stamina < 100 && this.staminaDelay === 50) 
			this.stamina++;
		if ( this.staminaDelay < 50 )
			this.staminaDelay++;
			
		if ( ig.input.state('shift') ) {
			if (this.stamina > 0) {
				this.anims.moveUp.frameTime = 0.05;
				this.anims.moveDown.frameTime = 0.05;
				this.anims.moveLeft.frameTime = 0.05;
				this.anims.moveRight.frameTime = 0.05;
				this.sprint = 2;
			}
			else {
				this.anims.moveUp.frameTime = 0.1;
				this.anims.moveDown.frameTime = 0.1;
				this.anims.moveLeft.frameTime = 0.1;
				this.anims.moveRight.frameTime = 0.1;
				this.sprint = 1;
			}
		}
		
		if ( ig.input.state('shift') ) {
			if ( this.stamina > -20 )
			this.stamina-=2;
		}
		
		if ( ig.input.released('shift') ) {
			this.anims.moveUp.frameTime = 0.1;
			this.anims.moveDown.frameTime = 0.1;
			this.anims.moveLeft.frameTime = 0.1;
			this.anims.moveRight.frameTime = 0.1;
			this.sprint = 1;
		}
		
		this.parent();
	},
	
	draw: function(){
		
		this.parent();
		
		// bar borders 
		ig.system.context.fillStyle = "rgb(30, 30, 30)";
		ig.system.context.beginPath();
		ig.system.context.rect(30, 30, 110, 26);
		ig.system.context.closePath();
		ig.system.context.fill();
		
		// health bar
		ig.system.context.fillStyle = "rgb(170, 20, 50)";
		ig.system.context.beginPath();
		ig.system.context.rect(35, 35, (this.health / this.maxHealth) * 100, 10 );
		ig.system.context.closePath();
		ig.system.context.fill();
		
		// stamina bar
		ig.system.context.fillStyle = "rgb(10, 120, 40)";
		ig.system.context.beginPath();
		if ( this.stamina > 0 ) 
			ig.system.context.rect(35, 48, (this.stamina / 100) * 100, 4 );
		ig.system.context.closePath();
		ig.system.context.fill();
		
		// ammo remaining
		this.font.draw('Spears: ' + this.spearAmmo, 350, 35 );
		this.font.draw('Bullets: ' + this.SMGAmmo, 200, 35 );
		
	},
	
	kill: function() {
		ig.game.loadLevelDeferred( LevelLevel2 );	
	}

});
});
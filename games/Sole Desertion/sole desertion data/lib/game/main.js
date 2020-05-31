ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.player',
	'game.entities.projectile-arrow',
	'game.entities.projectile-bullet',
	'game.entities.enemy',
	'game.entities.melee-sword',
	'game.entities.melee-solearm',
	'game.entities.melee-warhammer',
	'game.entities.door',
	'game.entities.key',
	'game.entities.secret',
	'game.levels.level2',
	'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	backgroundMusic1: new ig.Sound( 'media/sound/bak1_faster.ogg', false ),
	backgroundMusic2: new ig.Sound( 'media/sound/bak2_faster.ogg', false ),
	menu: true,
	instruction: false,
	credits: false,
	loopControl: 0,
	cursor: new ig.Image('media/cursor.png'),
	cursorX: 100,
	cursorY: 295,
	title: new ig.Image('media/title.png'),
	controls: new ig.Image('media/controls.png'),
	creditScreen: new ig.Image('media/credits.png'),
	buffer: 20,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.UP_ARROW, 'up');
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind( ig.KEY.SPACE, 'space');
		ig.input.bind( ig.KEY.SHIFT, 'shift');
		ig.input.bind( ig.KEY._1, '1');
		ig.input.bind( ig.KEY._2, '2');
		ig.input.bind( ig.KEY._3, '3');
		ig.input.bind( ig.KEY._4, '4');
		ig.input.bind( ig.KEY._5, '5');		
		
		ig.music.add( this.backgroundMusic1 );
		//ig.music.add( this.backgroundMusic2 );
		
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		if(this.buffer !== 10){
			this.buffer--;
		}
		if(this.buffer < 0){
			this.buffer = 10;
		}
		// Add your own, additional update code here
		if(ig.input.state('down') && this.menu === true && this.cursorY === 295 && this.buffer === 10){
			this.cursorY = 340;
			this.buffer = 9;
		}
		else if(ig.input.state('up') && this.menu === true && this.cursorY === 385 && this.buffer === 10){
			this.cursorY = 340;
			this.buffer = 9;
		}
		else if(ig.input.state('up') && this.menu === true && this.cursorY === 340 && this.buffer === 10){
			this.cursorY = 295;
			this.buffer = 9;
		}
		else if(ig.input.state('down') && this.menu === true && this.cursorY === 340 && this.buffer === 10){
			this.cursorY = 385;
			this.buffer = 9;
		}
		
		if(ig.input.state('space') && this.buffer === 10){
			if(this.cursorY === 295){
				this.menu = false;
				this.instruction = false;
				this.buffer = 9;
			}
			else if(this.cursorY === 340){
				this.instruction = true;
				this.credits = false;
				this.cursorY = 0;
				this.buffer = 9;
			}
			else if(this.cursorY  === 385){
				this.credits = true;
				this.instructions = false;
				this.cursorY = 0;
				this.buffer = 9;
			}
			else if(this.credits === true){
				this.credits = false;
				this.cursorY = 295;
				this.buffer = 9;
			}
			else if(this.instruction === true){
				this.instruction = false;
				this.cursorY = 295;
				this.buffer = 9;
			}
		}
		
		if(this.menu === false && this.loopControl === 0){
			this.loadLevel( LevelLevel2 );
			ig.music.volume = 0.5;
			//ig.backgroundMusic1.volume = 0.3;
			ig.music.play();
			this.loopControl = 1;
		}
		
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		if(this.menu === true){
			if(this.credits === false && this.instruction === false){
				this.title.draw(0, 0);
				this.cursor.draw(this.cursorX, this.cursorY);
			}
			else if(this.instruction === true){
				this.controls.draw(0, 0);
			}
			else if(this.credits === true){
				this.creditScreen.draw(0, 0);
			}
		}
		
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 576, 576, 1 );

});

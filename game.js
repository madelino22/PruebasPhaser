import BolaFuego from "./bola_fuego.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }






  create() {

    //input
    this.cursors1 = this.input.keyboard.createCursorKeys();
    this.cursors2 = this.input.keyboard.createCursorKeys();
    this.cursors2 = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })
    this.space = this.input.keyboard.addKey('SPACE');






    console.log("creado game.js");

    this.sky = this.add.image(this.sys.game.canvas.width/2,this.sys.canvas.height/2, "sky");
    this.sky.height *= 2;
    this.add.text(10, 10, "¡Hola, mundasdo!", { fontColor: 0xffff00 });
    


   //creación del player y asignarle a su grupo(category) de colisiones
    this.playerGroup =  this.matter.world.nextCategory();
    this.player = this.matter.add.sprite(this.sys.game.canvas.width/2, this.sys.canvas.height/2, "favicon");
    this.player.setCollisionCategory(this.playerGroup);
    this.player.setFixedRotation();//para que no se rote solo    
    this.player.setMass(50);
    this.player.orientacion=1;//sale mirando a la derecha




    //creación de la capa/grupo(category) de c  olisión de las plataformas
    this.plataformas = this.matter.world.nextCategory();
    //this.player.setCollidesWith([this.plataformas]); //añadir la colisión entre el player y ellas
    


    //creación de las plataformas
    this.suelo1 = this.matter.add.image(this.sys.game.canvas.width/4*3,this.sys.canvas.height/4*3, "platform");
    this.suelo1.body.isStatic = true;
    this.suelo1.setCollisionCategory(this.plataformas)

    this.suelo2 = this.matter.add.image(this.sys.game.canvas.width/4,this.sys.canvas.height/4*3, "platform");
    this.suelo2.body.isStatic = true;
    this.suelo2.setCollisionCategory(this.plataformas);

    this.suelo3 = this.matter.add.image(this.sys.game.canvas.width/2,this.sys.canvas.height/2, "platform");
    this.suelo3.body.isStatic = true;
    this.suelo3.setCollisionCategory(this.plataformas);
    
   //los añado a un array para tenerlos todos juntos, para poder permitir al jugador saltar cuando toque un suelo
    this.suelos = [this.suelo1, this.suelo2, this.suelo3];

    //esto es el checheo de la colision del jugador con cualquier suelo
    this.player.setOnCollideWith( this.suelos,  () =>{
      this.tocaSuelo = true;
    })

    //esto es la otra forma de hacer la colision entre objetos, es global
    // this.matter.world.on('collisionstart', (evento, cuerpo1, cuerpo2) =>{
      
    //   if(cuerpo1.collisionFilter.category === this.player.body.collisionFilter.category && cuerpo2.collisionFilter.category === this.plataformas ){
    //     this.tocaSuelo = true;
    //     console.log("activar salto");
    //   }
       
    //  })
    console.log(this.player);
    
    //Creo el trigger
   
    this.trigger = this.matter.add.rectangle(this.sys.game.canvas.width/2,this.sys.canvas.height/2 -80, 120, 40, {isSensor: true})
    console.log(this.trigger);
    this.trigger.isStatic = true;

    this.player.setOnCollideWith( this.trigger,  () =>{
      console.log("soy un trigger");
    })

    this.trigger.onCollideCallback = () =>{
     console.log("holi")
    }
    this.player.setCollidesWith([this.plataformas, this.trigger, 1])
    // this.trigger.setCollidesWith([this.plataformas, this.playerGroup]);
    
    // this.player.setOnCollideWith( this.trigger,  () =>{
    //   console.log("trigger");
    // })
    
    this.matter.world.on('collisionstart', (evento, cuerpo1, cuerpo2) =>{
      
        if(true){
          this.tocaSuelo = true;
        }
         
       })





    
    
    
    //Cuando toque el suelo

    this.cursors2.up.on("down", () => {
      if(this.tocaSuelo){
        this.player.applyForce({x:0, y:-2}); 
        this.tocaSuelo = false;
      }
   });

    this.space.on("down", () => {
      this.time.delayedCall(1000, () => {      new BolaFuego(this, this.player.x,this.player.y, "bola_fuego", this.player.orientacion * 10);
    })
    });


   
   // this.bolafuego1 = new BolaFuego(this, 100,100, "bola_fuego", 10);

  }











  update(time, delta) {
    if(this.cursors2.right.isDown){
     this.player.setVelocityX(3); 
     this.player.orientacion = 1;
    }
    else if(this.cursors2.left.isDown){
      this.player.setVelocityX(-3); 
      this.player.orientacion = -1;
    }
    else if(this.tocaSuelo){
      this.player.setVelocityX(0); 
    }


    //console.log("x: " + this.player.x + "y: " + this.player.y)
  }
}

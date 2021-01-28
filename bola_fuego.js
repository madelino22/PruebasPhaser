export default class BolaFuego extends Phaser.Physics.Matter.Sprite{

    constructor(scene, x, y, nombre_img, vel){
        super(scene.matter.world,x,y, nombre_img);
        scene.add.existing(this);
        console.log("bolafuego");
        this.displayHeight *=0.2;
        this.displayWidth *=0.2 * -vel/10;
        this.velocity = vel;
        this.setIgnoreGravity(true);
        this.setFixedRotation();//para que no se rote solo  
        this.setVelocityX(this.velocity);  

    }
    preUpdate(t,d){
        super.preUpdate(t,d);
        
    }


}
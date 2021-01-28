export default class Bootloader extends Phaser.Scene{
    constructor(){
        super({key: "Bootloader"});
    }

    preload(){
        this.load.on("complete", () => {
            console.log("Cargando main...");
            this.scene.start("main");
        })

        this.load.image("sky", "./resources/sky.png");
        this.load.image("platform" , "./resources/platform.png");
        this.load.image("bola_fuego", "./resources/bola_fuego.png");
        this.load.image("favicon" , "./resources/favicon.png");
        this.load.spritesheet("player_anim", "./resources/player.png",  {frameWidth: 192, frameHeight: 192})
    }

    create(){
        console.log("Creado bootloader")
        this.anims.create({
            key: "anim_player",
            frames: this.anims.generateFrameNumbers("player_anim",{start:0, end: 20}),
            frameRate: 8,
            repeat: -1

        })
    }
}
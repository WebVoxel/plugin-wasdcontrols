import { Plugin } from '@webvoxel/core';
import * as THREE from 'three';
import { PointerLockControls } from './PointerLockControls';

export interface IKeyMap {
	left?: number;
	right?: number;
	forward?: number;
	backward?: number;
	jump?: number;
	sneak?: number;
}

export interface IWASDControlsPluginOptions {
	keyMap?: IKeyMap;
}

export class WASDControlsPlugin extends Plugin {
	public prevTime: number = performance.now();
	public velocity: THREE.Vector3 = new THREE.Vector3();
	public direction: THREE.Vector3 = new THREE.Vector3();
	public moveRight: boolean = false;
	public moveLeft: boolean = false;
	public moveForward: boolean = false;
	public moveBackward: boolean = false;
	public ready: boolean = false;
	public controls?: PointerLockControls;
	public keyMap: IKeyMap;

    constructor(options?: IWASDControlsPluginOptions) {
        super('wasdcontrols');

		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);

		const defaultKeyMap = {
			forward: 87,
			left: 65,
			backward: 83,
			right: 68,
			sneak: 16,
			jump: 32,
		};

		this.keyMap = {
			...defaultKeyMap,
			...(options && options.keyMap ? options.keyMap : {}),
		}
    }

    init() {
		this.controls = new PointerLockControls(this.game.camera, document.body);
		this.ready = true;
        this.on('before_load', () => {
            this.game.currentWorld.scene.add(this.controls.getObject());
            document.addEventListener('keydown', this.onKeyDown, false);
            document.addEventListener('keyup', this.onKeyUp, false);
            this.ready = true;
        });

        this.on('animate', (): void => {
            var time = performance.now();
            var delta = ( time - this.prevTime ) / 1000;
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;

            this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
            this.direction.normalize(); // this ensures consistent movements in all directions

            if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 100.0 * delta;
            if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 100.0 * delta;

            this.velocity.y = Math.max(0, this.velocity.y);

            this.controls.moveRight(-this.velocity.x * delta);
            this.controls.moveForward(-this.velocity.z * delta);

            this.prevTime = time;
        });
    }

    private onKeyDown(event: KeyboardEvent) {
		switch (event.keyCode) {
			case this.keyMap.forward:
				this.moveForward = true;
				break;
			case this.keyMap.left:
				this.moveLeft = true;
				break;
			case this.keyMap.backward:
				this.moveBackward = true;
				break;
			case this.keyMap.right: 
				this.moveRight = true;
				break;
			// case 32: // space
			// 	if ( canJump === true ) velocity.y += 350;
			// 	canJump = false;
			// 	break;
		}
	};

	private onKeyUp(event: KeyboardEvent) {
		switch (event.keyCode) {
			case this.keyMap.forward:
				this.moveForward = false;
				break;
			case this.keyMap.left:
				this.moveLeft = false;
				break;
			case this.keyMap.backward:
				this.moveBackward = false;
				break;
			case this.keyMap.right: 
				this.moveRight = false;
				break;
		}
	};
}
import { EventDispatcher, Vector3, Euler, Camera } from "three";

/**
 * Three.js PointerLockControls class, ported to typescript.
 * @author mrdoob
 * @author Mugen87
 * @author RailRunner16
 */
export class PointerLockControls extends EventDispatcher {
    public domElement: HTMLElement;
    public isLocked: boolean;

    // Internals
    private static PI_2 = Math.PI / 2;
    private euler: Euler;
    private camera: Camera;
    private vec: Vector3;
    private events = {
        changeEvent: { type: 'change' },
	    lockEvent: { type: 'lock' },
	    unlockEvent: { type: 'unlock' },
    };
    
    constructor(camera: Camera, domElement: HTMLElement) {
        super();

        if (!domElement) {
            console.warn( 'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.' );
            domElement = document.body;
        }

	    this.domElement = domElement;
    	this.isLocked = false;

        this.camera = camera;
	    this.euler = new Euler(0, 0, 0, 'YXZ');

        this.vec = new Vector3();

        this.onPointerlockChange = this.onPointerlockChange.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.connect();
    }

	private onMouseMove(event: any): void {
		if (!this.isLocked) return;

		let movementX: number = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		let movementY: number = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		this.euler.setFromQuaternion(this.camera.quaternion);

		this.euler.y -= movementX * 0.002;
		this.euler.x -= movementY * 0.002;

		this.euler.x = Math.max(-PointerLockControls.PI_2, Math.min(PointerLockControls.PI_2, this.euler.x));
		this.camera.quaternion.setFromEuler(this.euler);
		this.dispatchEvent(this.events.changeEvent);
	}

	private onPointerlockChange(): void {
		if ( document.pointerLockElement === this.domElement ) {
			this.dispatchEvent( this.events.lockEvent );
			this.isLocked = true;
		} else {
			this.dispatchEvent(this.events.unlockEvent);
			this.isLocked = false;
		}
	}

	private onPointerlockError(): void {
        console.error( 'THREE.PointerLockControls: Unable to use Pointer Lock API' );
	}

	public connect(): void {
		document.addEventListener('mousemove', this.onMouseMove, false);
		document.addEventListener('pointerlockchange', this.onPointerlockChange, false);
		document.addEventListener('pointerlockerror', this.onPointerlockError, false);
	};

	public disconnect(): void {
		document.removeEventListener('mousemove', this.onMouseMove, false);
		document.removeEventListener('pointerlockchange', this.onPointerlockChange, false);
		document.removeEventListener('pointerlockerror', this.onPointerlockError, false);
	};

	public dispose(): void {
		this.disconnect();
	};

	public getObject(): Camera {
		return this.camera;
	};

	public getDirection(v: Vector3): Vector3 {
		let direction = new Vector3(0, 0, -1);
        return v.copy(direction).applyQuaternion(this.camera.quaternion);
	}

	public moveForward(distance: number): void {
		this.vec.setFromMatrixColumn(this.camera.matrix, 0);
		this.vec.crossVectors(this.camera.up, this.vec);
		this.camera.position.addScaledVector(this.vec, distance);
	}

	public moveRight(distance: number): void {
		this.vec.setFromMatrixColumn(this.camera.matrix, 0);
		this.camera.position.addScaledVector(this.vec, distance);
	}

    public lock(): void {
		this.domElement.requestPointerLock();
	}

	public unlock(): void {
		document.exitPointerLock();
	}
}

import { EventDispatcher, Vector3, Camera } from "three";
/**
 * Three.js PointerLockControls class, ported to typescript.
 * @author mrdoob
 * @author Mugen87
 * @author RailRunner16
 */
export declare class PointerLockControls extends EventDispatcher {
    domElement: HTMLElement;
    isLocked: boolean;
    private static PI_2;
    private euler;
    private camera;
    private vec;
    private events;
    constructor(camera: Camera, domElement: HTMLElement);
    private onMouseMove;
    private onPointerlockChange;
    private onPointerlockError;
    connect(): void;
    disconnect(): void;
    dispose(): void;
    getObject(): Camera;
    getDirection(v: Vector3): Vector3;
    moveForward(distance: number): void;
    moveRight(distance: number): void;
    lock(): void;
    unlock(): void;
}

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
export declare class WASDControlsPlugin extends Plugin {
    prevTime: number;
    velocity: THREE.Vector3;
    direction: THREE.Vector3;
    moveRight: boolean;
    moveLeft: boolean;
    moveForward: boolean;
    moveBackward: boolean;
    ready: boolean;
    controls?: PointerLockControls;
    keyMap: IKeyMap;
    constructor(options?: IWASDControlsPluginOptions);
    init(): void;
    private onKeyDown;
    private onKeyUp;
}

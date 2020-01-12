# @webvoxel/plugin-wasdcontrols
> WASD controls for WebVoxel

## Usage
#### Without pointer locking
```javascript
import { Game, World } from '@webvoxel/core';
import { WASDControlsPlugin} from '@webvoxel/plugin-wasdcontrols';

const wasd = new WASDControlsPlugin();

const game = new Game({
    plugins: [
        wasd,
    ],
    initialWorld: new World(),
});

game.start();
```

#### With pointer locking
```javascript
import { Game, World } from '@webvoxel/core';
import { WASDControlsPlugin} from '@webvoxel/plugin-wasdcontrols';

const wasd = new WASDControlsPlugin();

const game = new Game({
    plugins: [
        wasd,
    ],
    initialWorld: new World(),
});

game.start();

game.renderer.domElement.addEventListener('click', () => wasd.controls.lock());
```
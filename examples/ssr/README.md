# Server-Side Rendering FAST Components

## Notes
1. Using NodeJS module resolution, we need to enumerate fast-element (and the other packages) as `"type": "module"`. These currently export ES6 modules so this change is really a fix.
2. Because our packages don't include a ".js" extension when importing assets from files (`import { foo } from "./bar"`) the node process must be run with the  `--es-module-specifier-resolution=node` flag. Otherwise, we need to change imports to point at file locations (`import { foo } from "./bar.js"`)

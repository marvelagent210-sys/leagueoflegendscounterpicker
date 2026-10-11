// Worker threads don't inherit tsx's module hooks: register them, then load the TypeScript worker.
import { register } from "tsx/esm/api";

register();
await import("./worker.ts");

/** A simulation worker: loads each dataset revision once, then runs its matchups. */
import type { WorkerRequest, WorkerResponse } from "./protocol";
import { runMatchup } from "./run";
import { createSourceLoader } from "./source";

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
  postMessage(message: WorkerResponse): void;
};

const load = createSourceLoader();

scope.onmessage = (event) => {
  const request = event.data;
  load(request.dataUrl, request.dataFingerprint)
    .then((data) => runMatchup(data, request.you, request.enemy, request.settings, request.log, request.variants))
    .then((run) => scope.postMessage({ id: request.id, run }))
    .catch((error: unknown) => scope.postMessage({ id: request.id, error: error instanceof Error ? error.message : String(error) }));
};

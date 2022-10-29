import cluster from "cluster";
import os from "os";

cluster.isPrimary
  ? runPrimary()
  : runWorker();

function runPrimary() {
  const numWorkers = os.cpus().length;
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, _signal) => {
    if (worker.exitedAfterDisconnect || code == 0) {
      return;
    }

    cluster.fork();
  });
}

function runWorker() {
  require("./server");
}
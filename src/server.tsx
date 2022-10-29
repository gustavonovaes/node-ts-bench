import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

import heapdump from "heapdump";
import path from "path";

if (process.env.HEAPDUMP) {
  process.on("SIGINT", function () {
    const out = path.join(__dirname, "../" + Date.now() + ".heapsnapshot");
    console.log("heapdump: ", out);
    heapdump.writeSnapshot(out);
    process.exit(0);
  });
}

const server = express();

server.get('/', (_req, res) => {
  const depth = Math.round(1 + Math.random() * 4);
  ReactDOMServer.renderToPipeableStream(<Tree depth={depth} />).pipe(res);
});

const port = Number(process.env.PORT ?? 4000);
server.listen(port, () => {
  console.log(`#${process.pid} listening on ${port}... `);
});

function Tree({ depth }: { depth: number }) {
  return (
    <div>
      <span>{depth}</span>
      {[...Array(depth).keys()].map((n) => (
        <fieldset key={n}>
          {depth > 1 ? <Tree depth={depth - 1} /> : <span>.</span>}
        </fieldset>
      ))}
    </div>
  )
}
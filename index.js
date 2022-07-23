import { serve } from "https://deno.land/std/http/server.ts";
import {Socket} from "https://unpkg.com/browse/socket.io@3.0.1/dist/index.d.ts";

new Worker(new URL("worker.js", import.meta.url).href, { type: "module" });
const server = serve({ port: 3001 });
const app = new Application();
const io = Socket(3001);

// serve index page
if (req.url === "/") {
  req.respond({
    status: 200,
    body: await Deno.open("./public/index.html"),
  });
}

io.on("connection", (socket) => {
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});
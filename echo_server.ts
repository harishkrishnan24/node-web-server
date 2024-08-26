import * as net from "net";

function newConnection(socket: net.Socket) {
  console.log("new connection", socket.remoteAddress, socket.remotePort);

  socket.on("end", () => {
    console.log("EOF");
  });

  socket.on("data", (data: Buffer) => {
    console.log("data:", data);
    socket.write(data);

    if (data.includes("q")) {
      console.log("Closing connection");
      socket.end();
    }
  });
}

let server = net.createServer();

server.on("connection", newConnection);

server.on("error", (err: Error) => {
  throw err;
});

server.listen({ host: "127.0.0.1", port: 1234 });

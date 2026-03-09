Deno.serve({ port: 1810 }, (req) => {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.onopen = () => {
    console.log("a client connected!");
  };
  socket.onmessage = (event) => {
    if (event.data === "ping") {
      socket.send("pong");
    }
  };
  return response;
});

//const io = require("socket.io")(5000);
const io = require("socket.io")(5000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recepients, text }) => {
    recepients.forEach((recipient) => {
      const newrecepients = recepients.filter((r) => r !== recipient);
      newrecepients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recepients: newrecepients,
        sender: id,
        text,
      });
    });
  });
});

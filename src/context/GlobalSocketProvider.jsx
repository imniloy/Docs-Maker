import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";

const socketInstance = io("http://localhost:5000", {
  transports: ["websocket"],
  maxHttpBufferSize: 1e8, // Set the maximum payload size to 100MB (in bytes)
});
export const SocketContext = createContext();

const GlobalSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(socketInstance);

  useEffect(() => {
    // socket.emit("joinRoom", "123");
    socket.on("connect", () => {
      console.log(socket.id + " connected");
    });

    return () => {
      socket.disconnect();
      console.log("disconnected");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default GlobalSocketProvider;

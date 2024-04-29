import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";

const socketInstance = io("http://localhost:5000");
export const SocketContext = createContext();

const GlobalSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(socketInstance);

  useEffect(() => {
    socketInstance.emit("joinRoom", "123");

    return () => {
      socketInstance.off("connection");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default GlobalSocketProvider;

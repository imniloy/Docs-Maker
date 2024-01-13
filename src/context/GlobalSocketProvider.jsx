import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";

const socketInstance = io("http://localhost:5000");
export const SocketContext = createContext();

const GlobalSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socketInstance.on("connect", () => {
      setSocket(socketInstance);
      // socketInstance.on("Welcome", (data) => {
      //   console.log(data);
      // });
    });
    console.log("object socket");
    return () => {
      socketInstance.off("connect");
    };
  }, []);
  console.log("object 1");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default GlobalSocketProvider;

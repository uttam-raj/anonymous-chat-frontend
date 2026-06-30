import { io } from "socket.io-client";
// const SOCKET_URL = "http://localhost:5000";

// const socket = io(SOCKET_URL, {
//     autoConnect: true,
//     transports: ["websocket"],
// });

const socket = io(import.meta.env.VITE_BACKEND_URL, {
    transports: ["websocket", "polling"],
    withCredentials: true
});


export default socket;
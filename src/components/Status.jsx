import { useEffect, useState } from "react";
import socket from "../services/socket";

function Status() {

    const [connected, setConnected] = useState(socket.connected);

    useEffect(() => {

        function onConnect() {
            setConnected(true);
        }

        function onDisconnect() {
            setConnected(false);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };

    }, []);

    return (
        <div className="status">
            <h3>
                Server Status :
                <span style={{ color: connected ? "green" : "red" }}>
                    {connected ? " Connected" : " Disconnected"}
                </span>
            </h3>
        </div>
    );
}

export default Status;
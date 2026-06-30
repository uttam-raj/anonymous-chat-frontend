import { useEffect, useState } from "react";
import socket from "../services/socket";

import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";

function Chat() {

    const [messages, setMessages] = useState([]);
    const [sessionId, setSessionId] = useState("");
    const [connected, setConnected] = useState(false);

    useEffect(() => {

        // Store user's anonymous session id
        socket.on("session_created", (data) => {

            setSessionId(data.sessionId);

        });

        // Show backend validation errors
        socket.on("message_error", (msg) => {

            alert(msg);

        });

        socket.on("searching", () => {
            console.log("Searching for new partner...");
            setMessages([]);
            setConnected(false);
            socket.emit("find_partner");
            });

        socket.on("matched", (data) => {
            console.log("Matched:", data);
            setConnected(true);
            setMessages([]);
        });

        socket.on("partner_skipped", () => {
        alert("Your partner skipped the chat.");
        setConnected(false);
        setMessages([]);
        });

        // Receive messages
        socket.on("receive_message", (data) => {

            setMessages((prev) => [

                ...prev,
                data

            ]);

        });

        return () => {

            socket.off("session_created");
            socket.off("message_error");
            socket.off("receive_message");
            socket.off("matched");
            socket.off("searching");
            socket.off("partner_skipped");

        };

    }, []);

    // Send Message
    const sendMessage = (message) => {

        const trimmed = message.trim();

        if (!trimmed) return;

        socket.emit("send_message", {

            message: trimmed

        });

    };

    const skipChat = () => {

        // Clear current chat immediately
        setMessages([]);

        // Ask backend to skip current partner
        socket.emit("skip_chat");

    };

    const endChat = () => {

        if (!connected) return;

        setMessages([]);

        socket.emit("end_chat");

};

    return (

        <div className="chat-page">

            <div className="chat-container">

                <ChatHeader
                    connected={connected}
                    messageCount={messages.length}
                    onSkip={skipChat}
                    onEnd={endChat}
                />

                <ChatBox
                    messages={messages}
                    sessionId={sessionId}
                />

                <ChatInput
                    onSend={sendMessage}
                />

            </div>

        </div>

    );

}

export default Chat;
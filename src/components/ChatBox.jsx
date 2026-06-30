import { useEffect, useRef } from "react";
import Message from "./Message";

function ChatBox({ messages, sessionId }) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    return (

        <div className="chat-body">

    {messages.length === 0 ? (

        <div className="empty-chat">

            👋 Say hello and start the conversation!

        </div>

    ) : (

        messages.map((msg, index) => (

            <Message
                key={index}
                message={msg}
                isOwn={msg.sender === sessionId}
            />

        ))

    )}

    <div ref={bottomRef}></div>

</div>

    );

}

export default ChatBox;
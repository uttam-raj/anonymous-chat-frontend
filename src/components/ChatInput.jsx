// import { useState } from "react";
import { useState, useRef, useEffect } from "react";

function ChatInput({ onSend }) {

    const [message, setMessage] = useState("");
    const inputRef = useRef(null);

    const MAX_LENGTH = 300;

    useEffect(() => {

    inputRef.current?.focus();

}, []);

    const send = () => {

        const trimmed = message.trim();

        if (!trimmed) return;

        onSend(trimmed);

        setMessage("");
    };

    return (

        <div className="chat-footer">

            <div className="input-container">

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    maxLength={MAX_LENGTH}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            send();

                        }

                    }}
                />

                <small>

                    {message.length}/{MAX_LENGTH}

                </small>

            </div>

            <button

                onClick={send}

                disabled={!message.trim()}

            >

                Send

            </button>

        </div>

    );

}

export default ChatInput;
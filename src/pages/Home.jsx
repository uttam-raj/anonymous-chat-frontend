import { useState, useEffect } from "react";
import socket from "../services/socket";
import Chat from "./Chat";

function Home() {

    const [searching, setSearching] = useState(false);

    const [matched, setMatched] = useState(false);

    const startChat = () => {

        setSearching(true);

        socket.emit("find_partner");

    };

    useEffect(() => {

        socket.on("searching", () => {

            setSearching(true);

        });

        socket.on("matched", (data) => {

            console.log(data);

            setSearching(false);

            setMatched(true);

        });

        return () => {

            socket.off("searching");

            socket.off("matched");

        };

    }, []);

    if (matched) {

        return <Chat />;

    }

    return (

        <div className="home">

            <h1>Anonymous Chat</h1>

            <p>Chat anonymously with random people.</p>

            {!searching && (

                <button
                    className="start-btn"
                    onClick={startChat}
                >
                    Start Chat
                </button>

            )}

            {searching && (

                <h2>
                    🔍 Searching for Partner...
                </h2>

            )}

        </div>

    );

}

export default Home;
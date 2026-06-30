function ChatHeader({

    connected,

    messageCount,

    onSkip,
    onEnd

}) {

    console.log("Connected Prop:", connected);

    return (

        <div className="chat-header">

            {/* <h2>
                {connected ? "Connected" : "Waiting"}
            </h2> */}

            <div>

                <h2>👤 Anonymous Partner</h2>

                <small>

                    {
                        connected
                        ? `Session Active • ${messageCount} Messages`
                        : "Searching for partner..."
                    }

                </small>

            </div>

            <div className="header-right">

                <div className="status">

                    <span className="status-dot"></span>

                    {
                        connected
                        ? "Connected"
                        : "Waiting"
                    }

                </div>

                <div className="header-buttons">

                    <button
                        className="skip-btn"
                        onClick={onSkip}
                        disabled={!connected}
                    >
                        Skip
                    </button>

                    <button
                        className="end-btn"
                        onClick={onEnd}
                        disabled={!connected}
                    >
                        End
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ChatHeader;
function Message({ message, isOwn }) {

    const time = new Date(message.time).toLocaleTimeString([], {

    hour: "2-digit",

    minute: "2-digit",

    hour12: true

});

    return (

        <div
            className={
                isOwn
                    ? "message own-message"
                    : "message partner-message"
            }
        >

            <div className="sender">

                {isOwn ? "You" : "Partner"}

            </div>

            <div className="text">

                {message.message}

            </div>

            <div className="time">

                {time}

            </div>

        </div>

    );

}

export default Message;
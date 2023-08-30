const getSender = (loggedUser, users) => {
    if (!loggedUser || !users || users.length < 2) {
        return "Unknown Sender";
    }
    return users[0]._id === loggedUser.data._id ? users[1].name : users[0].name;
};

const getLastMessage = (chat) => {
    if (!chat) return;
    if (chat.content.length > 30)
        return chat.content.substring(0, 31) + "...";
    else return chat.content;
}

const getLastMessageSenderName = (loggedUser, chat) => {
    if (!chat || !loggedUser) return;

    if (loggedUser.data._id === chat.sender._id) return "Me : ";
    else return chat.sender.name + " : ";
}

const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

const isLastSender = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};

const isSameSenderMargin = (messages, m, i, userId) => {
    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export { getSender, isSameSender, isLastSender, isSameSenderMargin, isSameUser, getLastMessage, getLastMessageSenderName };
import React from 'react';
import ScrollableFeed from "react-scrollable-feed";
import { AccountState } from '../Context/AccountProvider';
import { isLastSender, isSameSender, isSameSenderMargin, isSameUser } from '../../config/chatLogics';
import { Avatar, Tooltip } from '@chakra-ui/react';

const ScrollableChat = ({ message }) => {
    const { account } = AccountState();
    return (
        <ScrollableFeed>
            {message && message.map((m, i) => (
                <div key={m._id} style={{ display: "flex" }}>
                    {
                        (isSameSender(message, m, i, account.data._id) ||
                            isLastSender(message, i, account.data._id))
                        &&
                        (
                            <Tooltip
                                label={m.sender.name}
                                placement='bottom-start'
                                hasArrow
                            >
                                <Avatar
                                    mt="7px"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={m.sender.name}
                                    bgColor="#ef8172"
                                />
                            </Tooltip>
                        )
                    }
                    <span
                        style={{
                            backgroundColor: `${m.sender._id === account.data._id ? "#F0F0F0" : "#D8D9DA"}`,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            marginLeft: isSameSenderMargin(message, m, i, account.data._id),
                            marginTop: isSameUser(message, m, i, account.data._id) ? 3 : 10
                        }}>
                        {m.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat;
import React from 'react'
import { AccountState } from '../Context/AccountProvider';
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const ChatBox = () => {
    const { selectedChat } = AccountState();
    return (
        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg={"white"}
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <SingleChat />
        </Box>
    )
}

export default ChatBox;
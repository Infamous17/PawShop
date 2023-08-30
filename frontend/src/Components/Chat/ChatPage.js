import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AccountState } from '../Context/AccountProvider';
import MyChats from './MyChats';
import ChatBox from './ChatBox';

const ChatPage = () => {
    const navigate = useNavigate();
    const { account } = AccountState();

    useEffect(() => {
        const accountInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!accountInfo) {
            navigate("/signin");
        }
    }, [navigate]);

    return (
        <div style={{ width: "100%" }}>
            <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
            >
                {account && <MyChats />}
                {account && <ChatBox />}
            </Box>
        </div>
    )
}

export default ChatPage;
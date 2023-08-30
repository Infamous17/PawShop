import React, { useEffect, useState } from 'react'
import { AccountState } from '../Context/AccountProvider';
import { Avatar, Box, Skeleton, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getSender, getLastMessage, getLastMessageSenderName } from '../../config/chatLogics';

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { account, selectedChat, setSelectedChat, chats, setChats, notification, setNotification } = AccountState();
    const [chatLoading, setChatLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, [fetchAgain]);

    const fetchChats = async () => {
        try {
            setChatLoading(true);
            const token = account.data.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            };

            const { data } = await axios.get("/chat", config);
            setChats(data);
            console.log(data);
            setChatLoading(false);
        } catch (error) {
            setChatLoading(false);
            toast({
                title: "Failed to load the chats",
                description: error.message,
                status: "error",
                duration: 5000,
                position: 'bottom'
            });
        }
    };

    const hasNewMessage = (chatId) => {
        const chatNotification = notification.find((notif) => notif.chat._id === chatId);
        return chatNotification;
    };

    const notifMessage = (chatId) => {
        const chatNotification = notification.find((notif) => notif.chat._id === chatId);
        return chatNotification.content;
    };

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            fontFamily="Ubuntu"
            p={3}
            bg="#F4F4F2"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                Messages
            </Box>

            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#F4F4F2"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chatLoading ? (
                    <Stack>
                        <Skeleton height="60px" />
                        <Skeleton height="60px" />
                        <Skeleton height="60px" />
                        <Skeleton height="60px" />
                        <Skeleton height="60px" />
                        <Skeleton height="60px" />
                        <Skeleton height="60px" />
                        <Skeleton height="60px" />
                    </Stack>
                ) : (
                    chats && (
                        <Stack overflowY="scroll" className='chatBox'>
                            {chats.map((chat) => (
                                <Box
                                    onClick={() => {
                                        setSelectedChat(chat);
                                        setNotification((preNotification) => {
                                            return preNotification.filter((notif) => notif.chat._id !== chat._id)
                                        });
                                    }}
                                    cursor="pointer"
                                    bgColor={selectedChat === chat ? "#EDE9D5" : "#E8E8E8"}
                                    color={"black"}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                >
                                    <Stack direction="row" alignItems="center" display="flex">
                                        <Avatar
                                            bgColor={selectedChat === chat ? "#ff4c68" : "#ef8172"}
                                            size="md"
                                            cursor="pointer"
                                            name={getSender(loggedUser, chat.users)}
                                            border="1px"
                                            outline={selectedChat === chat ? "black" : null}
                                        />

                                        <Stack display="flex" flexDir="column" justifyItems="center" h="100%">
                                            <Text mb={0} ml={2} >
                                                {getSender(loggedUser, chat.users)}
                                            </Text>
                                            <Text mb={0} ml={2} fontSize="sm">
                                                <b>
                                                    {hasNewMessage(chat._id)
                                                        ?
                                                        getSender(loggedUser, chat.users) + " : "
                                                        :
                                                        getLastMessageSenderName(loggedUser, chat.latestMessage)}
                                                </b>
                                                {hasNewMessage(chat._id) ? <b>{notifMessage(chat._id)}</b> : getLastMessage(chat.latestMessage)}
                                            </Text>
                                        </Stack>

                                        <Stack ml={"auto"} display="flex" justifyContent="flex-end">
                                            {hasNewMessage(chat._id) && <i class="fa-solid fa-circle" style={{ color: "#ff4c68" }}></i>}
                                        </Stack>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    )
                )}
            </Box>
        </Box>
    )
}

export default MyChats;
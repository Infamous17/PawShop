import React, { useEffect, useState } from 'react'
import { AccountState } from '../Context/AccountProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender } from '../../config/chatLogics';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from '../../animation/typing.json';

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = () => {
    const toast = useToast();
    const { account, selectedChat, setSelectedChat, notification, setNotification } = AccountState();

    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState();
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", account);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, []);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                }
            } else {
                setMessage([...message, newMessageReceived]);
            }
        });
    });

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${account.data.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(`/message/${selectedChat._id}`, config);

            setMessage(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error sending message!",
                description: "failed to load messages",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${account.data.token}`,
                    },
                };

                setNewMessage("");
                const { data } = await axios.post("/message/", {
                    content: newMessage,
                    chatId: selectedChat._id,
                },
                    config
                );
                console.log(data);
                socket.emit("new message", data);
                setMessage([...message, data]);
            } catch (error) {
                toast({
                    title: "Error sending message!",
                    description: "failed to send message",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        }
    };

    const typingHandler = (event) => {
        setNewMessage(event.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime()
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDifference = timeNow - lastTypingTime;

            if (timeDifference >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w={"100%"}
                        fontFamily="Montserrat"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {getSender(account, selectedChat.users)}
                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className='messages'>
                                <ScrollableChat message={message} />
                            </div>
                        )}

                        <FormControl
                            onKeyDown={sendMessage}
                            mt={3}
                            isRequired
                        >
                            {isTyping && (
                                <div>
                                    <Lottie
                                        width={70}
                                        style={{ marginBottom: 15, marginLeft: 0 }}
                                        options={defaultOptions}
                                    />
                                </div>
                            )
                            }
                            <Input
                                value={newMessage}
                                variant="filled"
                                bg="#e0e0e0"
                                placeholder='Enter a message'
                                focusBorderColor='red.400'
                                autoComplete='off'
                                onChange={typingHandler}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="100%"
                >
                    <Text fontSize="3xl" pb={3} fontFamily="Montserrat">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    )
}

export default SingleChat;
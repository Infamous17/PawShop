import axios from 'axios';
import { Container, Box, Grid, Button, useMediaQuery, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useToast } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import ListItems from './ListItems';
import { SlidersHorizontal } from 'lucide-react';
import Filter from './Filter';
import { AccountState } from './Context/AccountProvider';
import { useNavigate } from 'react-router-dom';

const Adopt = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { account, setSelectedChat, chats, setChats } = AccountState();
    const [isLargerThan1050] = useMediaQuery("(min-width: 1100px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const [allListings, setAllListings] = useState([]);

    useEffect(() => {
        const fetchAllListing = async () => {
            try {
                const accountInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!accountInfo) {
                    navigate('/signin');
                    return;
                }

                const token = accountInfo.data.token; // Get the authentication token from user info
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the headers
                    }
                };
                const response = await axios.get("/adopt", config);
                setAllListings(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllListing();
    }, []);

    const handleChat = async (userId) => {
        try {
            const token = account.data.token;
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            };

            const { data } = await axios.post("/adopt", { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            navigate("/chat");
        } catch (error) {
            toast({
                title: "Error Fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                position: 'bottom'
            });
        }
    };

    return (
        <Container maxW="container.2xl" mt={10} mb={10}>
            <h1 className='listingHeading' >Pets available for adoption</h1>
            <Container maxW="container.2xl" display="flex" flexDir={isLargerThan1050 ? "row" : "column"} justifyContent={"space-between"}>
                {isLargerThan1050
                    ? (
                        <Box w={"300px"} h="fit-content" m={5} p={5} fontFamily={"Montserrat"}>
                            <h3>Filter</h3>
                            <Filter setAllListings={setAllListings} onClose={onClose} />
                        </Box>
                    )
                    : (
                        <>
                            <Button ref={btnRef} fontFamily={"Ubuntu"} color={"black"} variant={"ghost"} onClick={onOpen} ml={"auto"}>
                                <SlidersHorizontal />Filters
                            </Button>
                            <Drawer
                                isOpen={isOpen}
                                placement='left'
                                onClose={onClose}
                                finalFocusRef={btnRef}
                            >
                                <DrawerOverlay />
                                <DrawerContent fontFamily={"Ubuntu"}>
                                    <DrawerCloseButton />
                                    <DrawerHeader>Filters</DrawerHeader>
                                    <DrawerBody>
                                        <Filter setAllListings={setAllListings} onClose={onClose} />
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        </>
                    )}
                <Box m={5} w={allListings.length < 1 && "80%"} textAlign={allListings.length < 1 && "center"} minW={"70%"}>
                    {allListings.length > 0
                        ?
                        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={6} display={"flex"} flexFlow={"wrap"} justifyContent={!isLargerThan1050 ? "space-around" : "center"} >
                            {allListings.map((list, index) => (
                                <ListItems
                                    key={index}
                                    id={list._id}
                                    owner={list.userId.name}
                                    userId={list.userId._id}
                                    name={list.petName}
                                    gender={list.gender}
                                    breed={list.breed}
                                    vaccinated={list.vaccinated}
                                    neutered={list.neutered}
                                    houseTrained={list.houseTrained}
                                    year={list.years}
                                    month={list.months}
                                    kgs={list.kgs}
                                    reason={list.reason}
                                    description={list.description}
                                    state={list.state}
                                    city={list.city}
                                    photo={list.photo}
                                    handleChat={handleChat}
                                />
                            ))}
                        </Grid>
                        :
                        <h1 className='noResult'> No Result Found</h1>
                    }
                </Box>
            </Container>
        </Container>
    )
}

export default Adopt;
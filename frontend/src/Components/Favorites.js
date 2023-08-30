import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Spinner, useToast } from '@chakra-ui/react';
import ListItems from './ListItems';
import { AccountState } from "./Context/AccountProvider";

const Favorites = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { account, setSelectedChat, chats, setChats } = AccountState();

    const [favoriteId, setFavoriteId] = useState([]);
    const [favoritePet, setFavoritePet] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getFavoritesId = async () => {
            try {
                const accountInfo = JSON.parse(localStorage.getItem("userInfo"));
                if (!accountInfo) {
                    navigate("/signin");
                }

                const token = accountInfo.data.token; // Get the authentication token from user info
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the headers
                    }
                };

                const response = await axios.get("/favorites", config);
                setFavoriteId(response.data.favorites);
            } catch (error) {
                console.log(error);
            }
        };

        getFavoritesId();
    }, [navigate, favoriteId]);

    useEffect(() => {
        const getFavorite = async () => {
            try {
                if (!favoriteId || favoriteId.length === 0) {
                    setIsLoading(false);
                    return;
                }
                const favoritePromises = favoriteId.map(async (favId) => {
                    const response = await axios.get(`/favorites/${favId}`);
                    return response.data;
                });
                const favoritePetData = await Promise.all(favoritePromises);
                setFavoritePet(favoritePetData);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getFavorite();
    }, [favoriteId]);

    const removeFavorite = async (favoriteId) => {
        try {
            const token = account.data.token; // Get the authentication token from user info
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            };

            await axios.delete(`/favorites/${favoriteId}`, config);
            toast({
                title: 'Successful Removed',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error Occured',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    };

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
        <Container minH="container.sm" maxW="container.lg" mt={10} mb={10} display="flex" flexDir="column" alignItems="center">
            <h1 className='listingHeading' >Favourites</h1>
            {!isLoading ? (
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                    {favoritePet.map((list, index) => (
                        <ListItems
                            key={index}
                            id={list._id}
                            userId={list.userId._id}
                            owner={list.userId.name}
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
                            page="favorite"
                            removeFavorite={removeFavorite}
                            handleChat={handleChat}
                        />
                    ))}
                </Grid>
            ) : (
                <Spinner size="xl" color='red' mt="10%" />
            )}
        </Container>
    )
}

export default Favorites;
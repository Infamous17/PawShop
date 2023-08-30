import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Grid, useToast } from '@chakra-ui/react';
import ListItems from './ListItems';

const Listings = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [myListing, setMyListing] = useState([]);
    const [deleteAction, setDeleteAction] = useState(false);

    useEffect(() => {
        const getListing = async () => {
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

                const response = await axios.get('/listings', config);
                setMyListing(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (deleteAction) {
            // Fetch listings only when delete action occurs
            getListing();
            setDeleteAction(false); // Reset delete action flag
        }

        getListing();
    }, [navigate, deleteAction]);

    const deleteListing = async (listingId) => {
        try {
            await axios.delete(`/listings/${listingId}`);
            toast({
                title: 'Successful Deleted',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setDeleteAction(true);

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
    }

    return (
        <Container minH="container.sm" maxW="container.lg" mt={10} mb={10} display="flex" flexDir="column" alignItems="center">
            <h1 className='listingHeading' >My Listings</h1>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                {myListing.map((list, index) => (
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
                        deleteListing={deleteListing}
                        page="listing" />
                ))}
            </Grid>
        </Container>
    )
}

export default Listings;
import { GridItem, Box, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Trash, Pencil } from 'lucide-react';
import ItemModal from './ItemModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertDialogPopUp from './AlertDialog';

const ListItems = (props) => {
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

    const handleDelete = (event) => {
        event.stopPropagation();
        setIsAlertDialogOpen(true);
    };

    const handleEdit = (event) => {
        event.stopPropagation();
        navigate(`/listings/edit/${props.id}`);
    };

    const listItemStyle = {
        backgroundImage: `url(${props.photo})`,
    };

    const handleFavorite = async (event) => {
        event.stopPropagation();
        const accountInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!accountInfo) {
            navigate("/signin");
        }

        try {
            const resopnse = await axios.post(`/adopt/${accountInfo.data._id}/${props.id}`);
            if (resopnse.data.message === "Already in favorites") {
                toast({
                    title: 'Already in favorites',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: "bottom"
                });
            } else {
                toast({
                    title: 'Added to favorites',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error Occured',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
        }
    };

    return (
        <GridItem
            w="315px"
            h={"250px"}
            style={listItemStyle}
            className='gridItem'
            onClick={onOpen}
        >
            {props.page === "listing" ? (
                <>
                    <Box
                        w={"fit-content"}
                        pos={"absolute"}
                        top={"200px"}
                        left={"280px"}
                        mt={2}
                        color={"#f5f2f2"}
                        _hover={{ color: "#ff4c68" }}
                        onClick={handleDelete}>
                        <Trash />
                    </Box>

                    <Box
                        w={"fit-content"}
                        pos={"absolute"}
                        top={"200px"}
                        left={"240px"}
                        mt={2}
                        color={"#f5f2f2"}
                        onClick={handleEdit}
                        _hover={{ color: "#ff4c68" }} >
                        <Pencil />
                    </Box>
                </>
            ) : props.page === "favorite" ? (
                <Box
                    w={"fit-content"}
                    pos={"absolute"}
                    top={"200px"}
                    left={"280px"}
                    mt={2}
                    color={"#f5f2f2"}
                >
                    <i class="fa-solid fa-heart fa-xl" style={{ color: "#ff4c68" }}></i>
                </Box>
            ) : (
                <Box
                    w={"fit-content"}
                    pos={"absolute"}
                    top={"200px"}
                    left={"280px"}
                    mt={2}
                    color={"#f5f2f2"}
                    onClick={handleFavorite}
                    _hover={{ color: "#ff4c68" }}>
                    <i class="fa-solid fa-heart fa-xl"></i>
                </Box>
            )}

            <div className='listItemText'>
                <h3 style={{ fontWeight: "600" }}>{props.name}</h3>
                <p>{props.breed}</p>
                <p>{props.state + " , " + props.city}</p>
            </div>
            <ItemModal
                isOpen={isOpen}
                onClose={onClose}
                name={props.name}
                gender={props.gender}
                breed={props.breed}
                vaccinated={props.vaccinated}
                neutered={props.neutered}
                houseTrained={props.houseTrained}
                year={props.year}
                month={props.month}
                kgs={props.kgs}
                reason={props.reason}
                description={props.description}
                state={props.state}
                city={props.city}
                photo={props.photo}
                page={props.page || 0}
                deleteListing={props.deleteListing}
                removeFavorite={props.removeFavorite}
                id={props.id}
                userId={props.userId}
                handleChat={props.handleChat}
                owner={props.owner}
            />

            <AlertDialogPopUp
                id={props.id}
                deleteListing={props.deleteListing}
                isOpen={isAlertDialogOpen}
                onClose={() => setIsAlertDialogOpen(false)}
                page={props.page}
            />
        </GridItem>
    );
}

export default ListItems;
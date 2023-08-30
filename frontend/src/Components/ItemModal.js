import { Image, Modal, ModalContent, ModalHeader, ModalOverlay, ModalCloseButton, ModalBody, Stack, Box, Text, ModalFooter, Button, useDisclosure, Avatar } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Trash, Pencil, User2 } from 'lucide-react';
import AlertDialogPopUp from './AlertDialog';
import { useNavigate } from 'react-router-dom';
import { AccountState } from './Context/AccountProvider';

const ItemModal = (props) => {
    const { account } = AccountState();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose} size={'xl'} >
                <ModalOverlay />
                <ModalContent fontFamily="Ubuntu">
                    <ModalHeader p={0} >
                        <Image src={props.photo} w="100%" h="350px" objectFit="cover" />
                        <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody bg='gray.50'>
                        <h2 style={{ fontFamily: "Montserrat" }}>{props.name}</h2>
                        <h6>{props.breed}</h6>
                        <h6><i class="fa-solid fa-location-dot" style={{ marginRight: "5px" }}></i>{props.state}, {props.city}</h6>
                        <Stack direction="row" spacing={10} justifyContent="space-around" mt={5}>
                            <Box boxShadow="xl" rounded='md' bg='white' p="6" fontWeight="bold">
                                {props.gender}
                            </Box>
                            <Box boxShadow="xl" rounded='md' bg='white' p="6" fontWeight="bold">
                                {props.year + "Yrs " + props.month + "Mos"}
                            </Box>
                            <Box boxShadow="xl" rounded='md' bg='white' p="6" fontWeight="bold">
                                {props.kgs + "kgs"}
                            </Box>
                        </Stack>
                        <Stack direction="row" mt={5} spacing={10} justifyContent="space-around">
                            <Box>
                                {props.vaccinated === "yes"
                                    ? <i class="fa-solid fa-check fa-lg" style={{ color: "#51da4e", marginRight: "5px" }}></i>
                                    : <i class="fa-solid fa-xmark fa-lg" style={{ color: "#f10404", marginRight: "5px" }}></i>
                                }Vaccinated
                            </Box>
                            <Box>
                                {props.neutered === "yes"
                                    ? <i class="fa-solid fa-check fa-lg" style={{ color: "#51da4e", marginRight: "5px" }}></i>
                                    : <i class="fa-solid fa-xmark fa-lg" style={{ color: "#f10404", marginRight: "5px" }}></i>
                                }Neutered
                            </Box>
                            <Box>
                                {props.houseTrained === "yes"
                                    ? <i class="fa-solid fa-check fa-lg" style={{ color: "#51da4e", marginRight: "5px" }}></i>
                                    : <i class="fa-solid fa-xmark fa-lg" style={{ color: "#f10404", marginRight: "5px" }}></i>
                                }House Trained
                            </Box>
                        </Stack>
                        <Box mt={5}>
                            <Text fontSize="lg" as="b">About me</Text>
                            <Text fontSize="md">{props.description}</Text>
                        </Box>
                        <Box mt={5}>
                            <Text fontSize="lg" as="b">Reason</Text>
                            <Text fontSize="md">{props.reason}</Text>
                        </Box>
                        <Box mt={5}>
                            <Text fontSize="lg" as="b">Owner</Text>
                            <Stack direction="row" mt={3}>
                                <Avatar
                                    size="lg"
                                    icon={<User2 color='red' size="40px" />}
                                    bg="#fff"
                                />
                                <Stack justifyContent="space-around">
                                    <Text fontSize="lg" as="b">{props.owner}</Text>
                                </Stack>
                            </Stack>
                        </Box>
                    </ModalBody>
                    <ModalFooter justifyContent="space-around">
                        <Stack direction="row">
                            {props.page === "listing"
                                ? (
                                    <>
                                        <Button variant="solid" bgColor="#ef8172" _hover={{ bgColor: "#ff4c68" }} onClick={() => {
                                            navigate(`/listings/edit/${props.id}`);
                                        }}>
                                            <Pencil /> Edit
                                        </Button>
                                        <Button variant="solid" onClick={onOpen}>
                                            <Trash /> Delete
                                        </Button>
                                    </>
                                )
                                : props.page === "favorite"
                                    ? (
                                        <>
                                            <Button variant="solid" bgColor="#ef8172" _hover={{ bgColor: "#ff4c68" }} onClick={() => {
                                                setIsLoading(true);
                                                props.handleChat(props.userId);
                                            }}
                                                isLoading={isLoading}
                                            >
                                                Chat with owner
                                            </Button>
                                            <Button variant="solid" onClick={onOpen}>
                                                <Trash /> Remove
                                            </Button>
                                        </>
                                    )
                                    : account.data._id !== props.userId && (
                                        <>
                                            <Button variant="solid" bgColor="#ef8172" _hover={{ bgColor: "#ff4c68" }} onClick={() => {
                                                setIsLoading(true);
                                                props.handleChat(props.userId);
                                            }}
                                                isLoading={isLoading}
                                            >
                                                Chat with owner
                                            </Button>
                                        </>
                                    )
                            }
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <AlertDialogPopUp
                id={props.id}
                deleteListing={props.deleteListing}
                isOpen={isOpen}
                onClose={onClose}
                page={props.page}
                removeFavorite={props.removeFavorite}
            />
        </>
    )
}

export default ItemModal;
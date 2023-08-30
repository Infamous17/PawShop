import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import React, { useRef } from 'react';

const AlertDialogPopUp = (props) => {
    const cancelRef = useRef();

    return (
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={props.onClose}
            isOpen={props.isOpen}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {props.page === "listing" ? "Delete Listing" : "Remove from favourites"}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {props.page === "listing" ? "Are you sure you want to delete this listing?" : "Are you sure you want to remove this from favorites?"}

                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={props.onClose}>
                            Cancle
                        </Button>
                        {props.page === "listing"
                            ?
                            <Button ml={3} colorScheme='red' onClick={() => {
                                props.deleteListing(props.id);
                                props.onClose();
                            }}>
                                Delete
                            </Button>
                            :
                            <Button ml={3} colorScheme='red' onClick={() => {
                                props.removeFavorite(props.id);
                                props.onClose();
                            }}>
                                Remove
                            </Button>}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AlertDialogPopUp;
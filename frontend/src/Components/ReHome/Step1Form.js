import { Button, FormControl, Image } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react'
import { AccountState } from "../Context/AccountProvider";
import dog from "../../photos/dog.png"
import cat from "../../photos/cat.png"

const Step1Form = ({ formData, setFormData, onValidityChange }) => {
    const { account } = AccountState();

    const validateForm = useCallback(() => {
        if (formData.category === "") return false;
        return true;
    }, [formData]);

    useEffect(() => {
        const formIsValid = validateForm();
        onValidityChange(formIsValid);
    }, [formData, onValidityChange, validateForm]);

    const handleClick = (event) => {
        formData.userId = account.data._id;
        const newValue = event.target.name;
        setFormData({
            ...formData,
            category: newValue
        })
    };

    return (
        <FormControl
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
            w={"fit-content"}>

            <Button
                name='dog'
                w={"35%"}
                h={"60%"}
                overflow={"hidden"}
                backgroundColor={formData.category === "dog" ? "red" : "white"}
                _hover={{ backgroundColor: "red" }}
                margin={"20px"}
                onClick={handleClick} >
                <Image name='dog' src={dog} width={"100%"} height={"100%"} objectFit={"contain"} />
            </Button>

            <Button
                name='cat'
                w={"35%"}
                h={"60%"}
                overflow={"hidden"}
                backgroundColor={formData.category === "cat" ? "red" : "white"}
                _hover={{ backgroundColor: "red" }}
                margin={"20px"}
                onClick={handleClick}>
                <Image name='cat' src={cat} width={"100%"} height={"100%"} objectFit={"contain"} />
            </Button>

        </FormControl>
    )
}

export default Step1Form;
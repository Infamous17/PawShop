import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react'

const Step5Form = ({ formData, setFormData, onValidityChange }) => {

    const validateForm = useCallback(() => {
        if (formData.reason === "") return false;
        if (formData.description === "") return false;
        return true;
    }, [formData]);

    useEffect(() => {
        const formIsValid = validateForm();
        onValidityChange(formIsValid);
    }, [formData, onValidityChange, validateForm]);

    return (
        <FormControl
            color={"#ff4c68"}
            fontFamily={"Ubuntu"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
            w={"fit-content"}>

            <FormLabel>Reason for Re-Home?</FormLabel>

            <Input
                value={formData.reason}
                placeholder='Reason'
                variant={'flushed'}
                focusBorderColor='red.400'
                color={"black"}
                onChange={(event) => {
                    setFormData({
                        ...formData, reason: event.target.value
                    })
                }}
            />

            <FormLabel
                mt={10}>
                Tell us more about your pet?
            </FormLabel>

            <Input
                value={formData.description}
                placeholder='Additional Info'
                variant={'flushed'}
                focusBorderColor='red.400'
                color={"black"}
                onChange={(event) => {
                    setFormData({
                        ...formData, description: event.target.value
                    })
                }} />

        </FormControl>
    )
}

export default Step5Form;
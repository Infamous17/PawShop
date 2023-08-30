import { FormControl, FormLabel, InputGroup, InputRightAddon, Input, Stack } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react'

const Step4Form = ({ formData, setFormData, onValidityChange }) => {

    const validateForm = useCallback(() => {
        if (formData.years === "") return false;
        if (formData.months === "") return false;
        if (formData.kgs === "") return false;
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

            <FormLabel>How old is your pet?</FormLabel>

            <Stack spacing={3}>

                <InputGroup >

                    <Input
                        value={formData.years}
                        type='number'
                        variant='outline'
                        focusBorderColor='red.400'
                        autoComplete='off'
                        color={"black"}
                        onChange={(event) => {
                            setFormData({
                                ...formData, years: event.target.value
                            })
                        }}
                    />

                    <InputRightAddon
                        children="years"
                        color={"black"} />

                </InputGroup>

                <InputGroup>

                    <Input
                        value={formData.months}
                        type='number'
                        variant='outline'
                        focusBorderColor='red.400'
                        autoComplete='off'
                        color={"black"}
                        onChange={(event) => {
                            setFormData({
                                ...formData, months: event.target.value
                            })
                        }} />

                    <InputRightAddon
                        children="months"
                        color={"black"} />

                </InputGroup>

            </Stack>

            <FormLabel
                mt={10}>
                Weight(in kg)?
            </FormLabel>

            <InputGroup>

                <Input
                    value={formData.kgs}
                    type='number'
                    variant='outline'
                    focusBorderColor='red.400'
                    autoComplete='off'
                    color={"black"}
                    onChange={(event) => {
                        setFormData({
                            ...formData, kgs: event.target.value
                        })
                    }}
                />
                <InputRightAddon
                    children="kgs"
                    color={"black"} />

            </InputGroup>
        </FormControl>
    )
}

export default Step4Form;
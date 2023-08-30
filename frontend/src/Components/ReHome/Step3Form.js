import { FormControl, FormLabel, Stack, Radio, RadioGroup, Select, Input, Box } from '@chakra-ui/react';
import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";

const Step3Form = ({ formData, setFormData, onValidityChange }) => {
    const [dogBreeds, setDogBreeds] = useState([]);

    const validateForm = useCallback(() => {
        if (formData.breed === "") return false;
        if (formData.vaccinated === "") return false;
        if (formData.neutered === "") return false;
        if (formData.houseTrained === "") return false;
        return true;
    }, [formData]);

    useEffect(() => {

        async function fetchBreed() {
            try {
                if (formData.category === "dog") {
                    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
                    const dogBreedName = Object.keys(response.data.message);
                    setDogBreeds(dogBreedName);
                } else {
                    const response = await fetch("https://api.thecatapi.com/v1/breeds?api_key=" + process.env.CAT_API);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    const breedNames = data.map(breed => breed.name);
                    setDogBreeds(breedNames);
                }
            } catch (error) {
                console.error('Error fetching breed data:', error);
            }
        }

        fetchBreed();
        const formIsValid = validateForm();
        onValidityChange(formIsValid);
    }, [formData, onValidityChange, validateForm]);

    return (
        <FormControl
            color={"#ff4c68"}
            fontFamily={"Ubuntu"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            w={"fit-content"}>

            <FormLabel>What's the breed of your pet?</FormLabel>

            <RadioGroup
                onChange={(value) => setFormData({ ...formData, breedType: value })}
                value={formData.breedType}
                w={"100%"} >

                <Stack
                    spacing={3}
                    direction='column'
                    color={"black"}
                    align={"start"}
                    w={"100%"}>

                    <Radio
                        colorScheme='red'
                        value='purebred'>
                        Purebred
                    </Radio>

                    <Radio
                        colorScheme='red'
                        value='crossbred'>
                        Crossbred(Mixed breed)
                    </Radio>

                </Stack>

            </RadioGroup>
            {formData.breedType === "purebred"
                ? (
                    <Select
                        value={formData.breed}
                        placeholder='Primary Breed'
                        variant="flushed"
                        focusBorderColor='red.400'
                        color={"black"}
                        mt={3}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                breed: event.target.value
                            })
                        }}>

                        {dogBreeds.map((breed, index) => (
                            <option key={index} value={breed}>
                                {breed}
                            </option>
                        ))}

                    </Select>
                )
                : (
                    formData.breedType === "crossbred"
                        ?
                        (
                            <Input
                                value={formData.breed}
                                type='text'
                                variant='flushed'
                                placeholder='Crossbred'
                                focusBorderColor='red.400'
                                autoComplete='off'
                                color={"black"}
                                mt={3}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        breed: event.target.value
                                    })
                                }} />
                        )
                        : null
                )}

            <Box
                w="100%"
                display={"flex"}
                flexDirection={"column"}
                mt={10}>

                <FormLabel>Vaccinated</FormLabel>

                <RadioGroup
                    onChange={(value) => setFormData({ ...formData, vaccinated: value })}
                    value={formData.vaccinated}
                    w={"100%"} >

                    <Stack
                        spacing={3}
                        direction='row'
                        color={"black"}
                        align={"start"}
                        w={"100%"}>

                        <Radio
                            colorScheme='red'
                            value='yes'>
                            Yes
                        </Radio>

                        <Radio
                            colorScheme='red'
                            value='no'>
                            No
                        </Radio>

                    </Stack>
                </RadioGroup>
            </Box>

            <Box
                w="100%"
                display={"flex"}
                flexDirection={"column"}
                mt={10}>

                <FormLabel>Neutered</FormLabel>

                <RadioGroup
                    onChange={(value) => setFormData({ ...formData, neutered: value })}
                    value={formData.neutered}
                    w={"100%"} >

                    <Stack
                        spacing={3}
                        direction='row'
                        color={"black"}
                        align={"start"}
                        w={"100%"}>

                        <Radio
                            colorScheme='red'
                            value='yes'>
                            Yes
                        </Radio>

                        <Radio
                            colorScheme='red'
                            value='no'>
                            No
                        </Radio>

                    </Stack>
                </RadioGroup>
            </Box>

            <Box
                w="100%"
                display={"flex"}
                flexDirection={"column"}
                mt={10}>

                <FormLabel>House Trained</FormLabel>

                <RadioGroup
                    onChange={(value) => setFormData({ ...formData, houseTrained: value })}
                    value={formData.houseTrained}
                    w={"100%"}>

                    <Stack
                        spacing={3}
                        direction='row'
                        color={"black"}
                        align={"start"}
                        w={"100%"}>

                        <Radio
                            colorScheme='red'
                            value='yes'>
                            Yes
                        </Radio>

                        <Radio
                            colorScheme='red'
                            value='no'>
                            No
                        </Radio>

                    </Stack>
                </RadioGroup>
            </Box>
        </FormControl>
    )
}

export default Step3Form;

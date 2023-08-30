import { FormControl, FormLabel, Input, Stack, Box, Image, Select } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react'
import { State, City } from 'country-state-city';

const Step6Form = ({ formData, setFormData, onValidityChange, setLoading }) => {
    const [file, setFile] = useState();
    const [city, setCity] = useState([]);

    const postDetail = (pic) => {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "pawshop");
        data.append("cloud_name", "dirtmijpo");

        fetch("https://api.cloudinary.com/v1_1/dirtmijpo/image/upload", {
            method: "post",
            body: data
        })
            .then((res) => res.json())
            .then(data => {
                const url = data.url.toString();
                formData.photo = url;
                setLoading(false);
            })
    }

    const validateForm = useCallback(() => {
        if (formData.city === "") return false;
        if (formData.state === "") return false;
        if (formData.photo === "") return false;
        return true;
    }, [formData]);

    useEffect(() => {
        const formIsValid = validateForm();
        onValidityChange(formIsValid);
    }, [formData, onValidityChange, validateForm]);

    const handleSelectState = (e) => {
        const stateCode = e.target.value;
        const stateCities = City.getCitiesOfState("IN", stateCode)
        setCity(stateCities);
        setFormData({
            ...formData,
            state: State.getStateByCodeAndCountry(stateCode, "IN").name
        });
    };

    return (
        <FormControl
            color={"#ff4c68"}
            fontFamily={"Ubuntu"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
            w={"fit-content"}>

            <FormLabel>Your pet's location?</FormLabel>

            <Stack spacing={3} color="black">
                <Select
                    variant={"outline"}
                    placeholder='Select state here...'
                    focusBorderColor='red.400'
                    onChange={handleSelectState}>
                    {State.getStatesOfCountry("IN").map((state, index) => (
                        <option value={state.isoCode} key={index} >{state.name}</option>
                    ))}
                </Select>

                <Select
                    value={formData.city}
                    variant={"outline"}
                    placeholder='Select city here...'
                    focusBorderColor='red.400'
                    onChange={(event) => {
                        setFormData({
                            ...formData, city: event.target.value
                        })
                    }}>
                    {city.map((city, index) => (
                        <option key={index} value={city.name}>{city.name}</option>
                    ))}
                </Select>
            </Stack>
            <FormLabel mt={10}>Add a photo of your pet</FormLabel>
            <Box width={"100%"} h={"50%"}>
                <Image src={file} objectFit={"cover"} mb={5} />
                <Input
                    name='petPhoto'
                    type='file'
                    variant={"unstyled"}
                    aria-hidden="true"
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={(e) => {
                        setFile(URL.createObjectURL(e.target.files[0]));
                        postDetail(e.target.files[0]);
                        setLoading(true);
                    }} />
            </Box>
        </FormControl>
    )
}

export default Step6Form;
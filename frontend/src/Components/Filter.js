import { Box, RadioGroup, Select, Stack, Radio, Button } from '@chakra-ui/react';
import React, { useState } from 'react'
import { State, City } from 'country-state-city';
import axios from 'axios';
import { AccountState } from './Context/AccountProvider';

const Filter = (props) => {
    const { account } = AccountState();

    const [city, setCity] = useState([]);
    const [gender, setGender] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectState = (event) => {
        const stateCode = event.target.value;
        setSelectedState(State.getStateByCodeAndCountry(stateCode, "IN").name);
        const stateCities = City.getCitiesOfState("IN", stateCode)
        setCity(stateCities);
    };

    const handleFilterClick = async () => {
        setIsLoading(true);
        try {
            const token = account.data.token; // Get the authentication token from user info
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            };

            const params = {};
            if (gender) {
                params.gender = gender;
            }
            if (selectedCity) {
                params.city = selectedCity;
            }
            if (selectedState) {
                params.state = selectedState;
            }
            if (selectedCategory) {
                params.category = selectedCategory;
            }
            const response = await axios.get("/adopt", {
                headers: config.headers,
                params: params,
            });
            props.setAllListings(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
        props.onClose();
    };

    const removeFilter = async () => {
        setGender("");
        setSelectedCategory("");
        setSelectedCity("");
        setSelectedState("");
        try {
            const token = account.data.token; // Get the authentication token from user info
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            };

            const response = await axios.get("/adopt", config);
            props.setAllListings(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
        props.onClose()
    };

    return (
        <Box>
            <Box fontFamily={"Ubuntu"} mt={8}>
                <h6>Gender</h6>
                <RadioGroup onChange={setGender} value={gender}>
                    <Stack direction="row">
                        <Radio
                            value='male'
                            colorScheme='red'>
                            Male
                        </Radio>
                        <Radio
                            value='female'
                            colorScheme='red'>
                            Female
                        </Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <Box fontFamily={"Ubuntu"} mt={8}>
                <h6>Pet Type</h6>
                <Select
                    variant={"filled"}
                    placeholder='Search pet type here...'
                    focusBorderColor='red.400'
                    onChange={(event) => {
                        setSelectedCategory(event.target.value)
                    }}>
                    <option value='dog'>Dog</option>
                    <option value='cat'>Cat</option>
                </Select>
            </Box>
            <Box fontFamily={"Ubuntu"} mt={8}>
                <h6>Search by State</h6>
                <Select
                    variant={"filled"}
                    placeholder='Search by state here...'
                    focusBorderColor='red.400'
                    onChange={handleSelectState}>
                    {State.getStatesOfCountry("IN").map((state, index) => (
                        <option key={index} value={state.isoCode}>{state.name}</option>
                    ))}
                </Select>
            </Box>
            <Box fontFamily={"Ubuntu"} mt={8}>
                <h6>Search by City</h6>
                <Select
                    variant={"filled"}
                    placeholder='Search by city here...'
                    focusBorderColor='red.400'
                    onChange={(event) => {
                        setSelectedCity(event.target.value)
                    }}>
                    {city.map((city, index) => (
                        <option key={index} value={city.name}>{city.name}</option>
                    ))}
                </Select>
            </Box>
            <Stack direction={"row"}>
                <Button
                    mt={8}
                    fontFamily={"Ubuntu"}
                    bgColor={"#ef8172"}
                    color={"#fff"}
                    _hover={{ backgroundColor: "#ff4c68" }}
                    onClick={handleFilterClick}
                    isLoading={isLoading}>
                    Apply Filter
                </Button>

                <Button
                    variant={"ghost"}
                    mt={8}
                    fontFamily={"Ubuntu"}
                    color={"black"}
                    _hover={{ backgroundColor: "#fff" }}
                    onClick={removeFilter}>
                    Remove filter
                </Button>
            </Stack>
        </Box>
    )
}

export default Filter;
import { Box, Container, FormLabel, RadioGroup, Stack, Radio, Input, InputGroup, InputRightAddon, Textarea, Select, Button, Image, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { State, City } from 'country-state-city';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const [petType, setPetType] = useState("");
    const [petName, setPetName] = useState("");
    const [gender, setGender] = useState("");
    const [breed, setBreed] = useState("");
    const [breedType, setBreedType] = useState("");
    const [vaccinated, setVaccinated] = useState("");
    const [neutered, setNeutered] = useState("");
    const [houseTrained, setHouseTrained] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [kgs, setKgs] = useState("");
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [photo, setPhoto] = useState("");
    const [city, setCity] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [changes, setChanges] = useState({});
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        const fetchListingDetails = async () => {
            try {
                const response = await axios.get(`/listings/edit/${id}`);
                setPetType(response.data.category);
                setPetName(response.data.petName);
                setGender(response.data.gender);
                setBreed(response.data.breed);
                setBreedType(response.data.breedType);
                setVaccinated(response.data.vaccinated);
                setNeutered(response.data.neutered);
                setHouseTrained(response.data.houseTrained);
                setYear(response.data.years);
                setMonth(response.data.months);
                setKgs(response.data.kgs);
                setReason(response.data.reason);
                setDescription(response.data.description);
                setSelectedState(response.data.state);
                setSelectedCity(response.data.city);
                setPhoto(response.data.photo);

                const selectedStateObj = State.getStatesOfCountry("IN").find(
                    state => state.name === response.data.state
                );

                if (selectedStateObj) {
                    setSelectedState(selectedStateObj.name);

                    // Get the cities of the selected state ISO code
                    const cities = City.getCitiesOfState("IN", selectedStateObj.isoCode);
                    setCity(cities);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchListingDetails();
    }, [id]);

    useEffect(() => {

        async function fetchBreed() {
            try {
                if (petType === "dog") {
                    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
                    const dogBreedName = Object.keys(response.data.message);
                    setBreeds(dogBreedName);
                } else {
                    const response = await fetch("https://api.thecatapi.com/v1/breeds?api_key=" + process.env.CAT_API);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    const breedNames = data.map(breed => breed.name);
                    setBreeds(breedNames);
                }
            } catch (error) {
                console.error('Error fetching breed data:', error);
            }
            console.log(breeds);
        }

        fetchBreed();
    }, [petType]);

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
                setPhoto(url);
                handleChanges("photo", url)
                setLoading(false);
            })
    };

    const handleChanges = (field, value) => {
        setChanges((prevChanges) => ({
            ...prevChanges,
            [field]: value,
        }));
    }

    const handleSave = async () => {
        setButtonLoading(true);
        if (petType && petName && gender && breedType && breed && vaccinated && neutered && houseTrained && year && month && kgs && reason && description && selectedState && selectedCity && photo) {
            await axios.patch(`/listings/edit/${id}`, changes);
            navigate("/listings");
            setButtonLoading(false);
            toast({
                title: 'Successfully updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
        } else {
            setButtonLoading(false);
            toast({
                title: 'Fill all the fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
        }
    }

    return (
        <Container minH="container.sm" maxW="xs" p={5} fontFamily="Ubuntu">
            <FormLabel textAlign="center" fontSize="2xl" fontWeight="bold">Edit your pet</FormLabel>
            <Box mt={10} display="flex" flexDir="column" alignItems="center">
                {loading ? <Spinner color='red.500' /> : <Image src={photo} objectFit="contain" />}
                <Input
                    mt={3}
                    type='file'
                    variant={"unstyled"}
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={(e) => {
                        setLoading(true);
                        postDetail(e.target.files[0]);
                    }}
                />
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Type of pet</FormLabel>
                <RadioGroup
                    onChange={(value) => {
                        setPetType(value);
                        setBreedType("");
                        setBreed("");
                        handleChanges("category", value);
                    }}
                    value={petType}
                >
                    <Stack direction='column'>
                        <Radio value='dog' colorScheme='red'>Dog</Radio>
                        <Radio value='cat' colorScheme='red'>Cat</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Name</FormLabel>
                <Input
                    value={petName}
                    type='text'
                    variant='outline'
                    placeholder='Name'
                    focusBorderColor='red.400'
                    autoComplete='off'
                    color={"black"}
                    onChange={(event) => {
                        setPetName(event.target.value);
                        handleChanges("petName", event.target.value)
                    }}
                />
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Gender</FormLabel>
                <RadioGroup
                    onChange={(value) => {
                        setGender(value);
                        handleChanges("gender", value);
                    }} value={gender}>
                    <Stack direction='row'>
                        <Radio value='male' colorScheme='red'>Male</Radio>
                        <Radio value='female' colorScheme='red' ml={5}>Female</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Breed</FormLabel>
                <RadioGroup
                    value={breedType}
                    w={"100%"}
                    onChange={(value) => {
                        setBreedType(value);
                        handleChanges("breedType", value);
                    }}
                >
                    <Stack
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
                {breedType === "purebred"
                    ? (
                        <Select
                            value={breed}
                            placeholder='Primary Breed'
                            variant="outline"
                            focusBorderColor='red.400'
                            color={"black"}
                            mt={3}
                            onChange={(event) => {
                                setBreed(event.target.value);
                                handleChanges("breed", event.target.value);
                            }}>

                            {breeds.map((breed, index) => (
                                <option key={index} value={breed}>
                                    {breed}
                                </option>
                            ))}

                        </Select>
                    )
                    : (
                        breedType === "crossbred"
                            ?
                            (
                                <Input
                                    value={breed}
                                    type='text'
                                    variant='flushed'
                                    placeholder='Crossbred'
                                    focusBorderColor='red.400'
                                    autoComplete='off'
                                    color={"black"}
                                    mt={3}
                                    onChange={(event) => {
                                        setBreed(event.target.value);
                                        handleChanges("breed", event.target.value);
                                    }} />
                            )
                            : null
                    )}
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Vaccinated</FormLabel>
                <RadioGroup
                    onChange={(value) => {
                        setVaccinated(value);
                        handleChanges("vaccinated", value);
                    }}
                    value={vaccinated}
                >
                    <Stack direction='row'>
                        <Radio value='yes' colorScheme='red'>Yes</Radio>
                        <Radio value='no' colorScheme='red' ml={5}>No</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Neutered</FormLabel>
                <RadioGroup
                    onChange={(value) => {
                        setNeutered(value);
                        handleChanges("neutered", value);
                    }}
                    value={neutered}
                >
                    <Stack direction='row'>
                        <Radio value='yes' colorScheme='red'>Yes</Radio>
                        <Radio value='no' colorScheme='red' ml={5}>No</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">House Trained</FormLabel>
                <RadioGroup
                    onChange={(value) => {
                        setHouseTrained(value);
                        handleChanges("houseTrained", value);
                    }}
                    value={houseTrained}
                >
                    <Stack direction='row'>
                        <Radio value='yes' colorScheme='red'>Yes</Radio>
                        <Radio value='no' colorScheme='red' ml={5}>No</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Age</FormLabel>
                <Stack spacing={3}>
                    <InputGroup >
                        <Input
                            value={year}
                            type='number'
                            variant='outline'
                            focusBorderColor='red.400'
                            autoComplete='off'
                            color={"black"}
                            onChange={(event) => {
                                setYear(event.target.value);
                                handleChanges("years", event.target.value);
                            }}
                        />
                        <InputRightAddon
                            children="years"
                            color={"black"} />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            value={month}
                            type='number'
                            variant='outline'
                            focusBorderColor='red.400'
                            autoComplete='off'
                            color={"black"}
                            onChange={(event) => {
                                setMonth(event.target.value);
                                handleChanges("months", event.target.value);
                            }}
                        />
                        <InputRightAddon
                            children="months"
                            color={"black"} />
                    </InputGroup>
                </Stack>
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Weight</FormLabel>
                <InputGroup >
                    <Input
                        value={kgs}
                        type='number'
                        variant='outline'
                        focusBorderColor='red.400'
                        autoComplete='off'
                        color={"black"}
                        onChange={(event) => {
                            setKgs(event.target.value);
                            handleChanges("kgs", event.target.value);
                        }}
                    />
                    <InputRightAddon
                        children="kgs"
                        color={"black"} />
                </InputGroup>
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Reason for Re-Home?</FormLabel>
                <Textarea
                    value={reason}
                    variant='outline'
                    placeholder='Reason'
                    rows={6}
                    resize={'none'}
                    focusBorderColor='red.400'
                    color={"black"}
                    onChange={(event) => {
                        setReason(event.target.value);
                        handleChanges("reason", event.target.value);
                    }}
                />
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Tell us more about your pet?</FormLabel>
                <Textarea
                    value={description}
                    variant='outline'
                    placeholder='Additional Info.'
                    rows={6}
                    resize={'none'}
                    focusBorderColor='red.400'
                    color={"black"}
                    onChange={(event) => {
                        setDescription(event.target.value);
                        handleChanges("description", event.target.value);
                    }}
                />
            </Box>
            <Box mt={10}>
                <FormLabel fontSize="xl" color="#ef8172">Your pet's location?</FormLabel>
                <Stack spacing={3}>
                    <Select
                        value={selectedState}
                        variant={"outline"}
                        placeholder='Select state here...'
                        focusBorderColor='red.400'
                        onChange={(event) => {
                            setSelectedState(event.target.value);
                            handleChanges('state', event.target.value);
                            setSelectedCity("");
                            const selectedStateObj = State.getStatesOfCountry("IN").find(
                                state => state.name === event.target.value
                            );
                            const cities = City.getCitiesOfState("IN", selectedStateObj.isoCode);
                            setCity(cities);
                        }}
                    >
                        {State.getStatesOfCountry("IN").map((state, index) => (
                            <option value={state.name} key={index} >{state.name}</option>
                        ))}
                    </Select>

                    <Select
                        value={selectedCity}
                        variant={"outline"}
                        placeholder='Select city here...'
                        focusBorderColor='red.400'
                        onChange={(event) => {
                            setSelectedCity(event.target.value);
                            handleChanges('city', event.target.value);
                        }}
                    >
                        {city.map((city, index) => (
                            <option key={index} value={city.name}>{city.name}</option>
                        ))}
                    </Select>
                </Stack>
            </Box>
            <Box mt={10} mb={5}>
                <Stack direction="row" justifyContent="space-evenly">
                    <Button
                        variant="solid"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Cancle
                    </Button>
                    <Button
                        variant="solid"
                        bgColor="#ef8172"
                        _hover={{ bgColor: "#ff4c68" }}
                        isLoading={buttonLoading}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Stack>
            </Box>
        </Container>
    )
}

export default Edit;
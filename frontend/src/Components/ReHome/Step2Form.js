import { FormControl, FormLabel, Input, Stack, Button, Box } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';

const Step2Form = ({ formData, setFormData, onValidityChange }) => {

    const validateForm = useCallback(() => {
        if (formData.petName === "") return false;
        if (formData.gender === "") return false;
        return true;
    }, [formData]);

    useEffect(() => {
        const formIsValid = validateForm();
        onValidityChange(formIsValid);
    }, [formData, onValidityChange, validateForm]);

    const handleClick = (event) => {
        const newValue = event.target.name;
        setFormData({
            ...formData,
            gender: newValue
        });
    };

    const handleIconClick = (e) => {
        e.stopPropagation();
        const newValue = e.target.getAttribute("name");
        setFormData({
            ...formData,
            gender: newValue
        });
    };

    return (
        <FormControl
            color={"#ff4c68"}
            fontFamily={"Ubuntu"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            w={"fit-content"}>

            <Stack spacing={3}>

                <FormLabel
                    fontSize={'lg'}>
                    Name of your pet?
                </FormLabel>

                <Input
                    name='petName'
                    value={formData.petName}
                    type='text'
                    variant='flushed'
                    placeholder='Name'
                    focusBorderColor='red.400'
                    autoComplete='off'
                    color={"black"}
                    onChange={(event) => {
                        setFormData({
                            ...formData, petName: event.target.value
                        })
                    }} />

                <FormLabel
                    fontSize={'lg'} >
                    Boy or Girl?
                </FormLabel>

                <Box
                    display={"flex"}
                    flexDirection={"row"}>

                    <Button
                        name='male'
                        w="80px"
                        h="80px"
                        backgroundColor={formData.gender === "male" && "red"}
                        _hover={{ backgroundColor: "red" }}
                        onClick={handleClick}>
                        <i class="fa-solid fa-mars fa-2xl" name="male" onClick={handleIconClick}></i>
                    </Button>

                    <Button
                        name='female'
                        w="80px"
                        h="80px"
                        ml={"20px"}
                        backgroundColor={formData.gender === "female" && "red"}
                        _hover={{ backgroundColor: "red" }}
                        onClick={handleClick}>
                        <i class="fa-solid fa-venus fa-2xl" name="female" onClick={handleIconClick}></i>
                    </Button>

                </Box>
            </Stack>
        </FormControl>
    )
}

export default Step2Form;
import { FormControl, InputGroup, InputLeftAddon, Input, Button, InputRightElement, Stack, Container, useToast } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const accountInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (accountInfo) {
            navigate("/");
        }
    }, [navigate]);

    const handleClick = async () => setShow(!show);

    function handleChange(event) {
        if (event.target.name === "pass") {
            const passValue = event.target.value;
            setPassword(passValue);
        } else {
            const confirmPassValue = event.target.value;
            setConfirmPassword(confirmPassValue);
        }
    }

    const submitHandler = async () => {
        setLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: 'Password does not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const data = await axios.post(
                "/signup",
                { name, email, password },
                config
            );
            toast({
                title: 'Register Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });

            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            navigate("/");
        } catch (error) {
            toast({
                title: 'Error Occured!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }
    }

    const isMatching = password === confirmPassword && confirmPassword !== '';

    return (
        <div className='signIn-container'>
            <Container>
                <a href='/'>
                    <ArrowLeftIcon boxSize={6} className='back' />
                </a>
                <h1>SIGNUP</h1>
                <FormControl>
                    <Stack spacing={6}>
                        <InputGroup size="lg">
                            <InputLeftAddon children='Name' />
                            <Input type='text' variant='filled' placeholder='John' focusBorderColor='red.400' onChange={(e) => setName(e.target.value)} value={name} autoComplete='off' />
                        </InputGroup>
                        <InputGroup size="lg">
                            <InputLeftAddon children='Email' />
                            <Input type='email' variant='filled' placeholder='example@gmail.com' focusBorderColor='red.400' onChange={(e) => setEmail(e.target.value)} value={email} autoComplete='off' />
                        </InputGroup>
                        <InputGroup size='lg'>
                            <Input
                                name='pass'
                                value={password}
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                variant='filled'
                                focusBorderColor='red.400'
                                onChange={handleChange}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup size='lg'>
                            <Input
                                name='confirmPass'
                                value={confirmPassword}
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Confirm password'
                                variant='filled'
                                focusBorderColor='red.400'
                                onChange={handleChange}
                            />
                            <InputRightElement>
                                {isMatching ? (
                                    <CheckIcon color="green.500" />
                                ) : confirmPassword === '' ? null : (
                                    <CloseIcon color="red.500" />
                                )}
                            </InputRightElement>
                        </InputGroup>
                    </Stack>
                    <Button
                        mt={6}
                        colorScheme='red'
                        type='submit'
                        className='sub-button'
                        onClick={submitHandler}
                        isLoading={loading}
                    >
                        SignUp
                    </Button>
                </FormControl>
            </Container>
        </div>
    )
}

export default SignUp;
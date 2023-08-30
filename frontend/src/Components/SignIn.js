import { FormControl, InputGroup, InputLeftAddon, Input, Button, InputRightElement, Stack, Container, useToast } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const accountInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (accountInfo) {
            navigate("/");
        }
    }, [navigate]);

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);

        if (!email || !password) {
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

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const data = await axios.post(
                "/signin",
                { email, password },
                config
            );

            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });

            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            navigate(-1);
        } catch (error) {
            toast({
                title: 'Email or Password is invalid',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }
    }

    return (
        <div className='signIn-container'>
            <Container>
                <a href='/'>
                    <ArrowLeftIcon boxSize={6} className='back' />
                </a>
                <h1>WELCOME BACK!</h1>
                <FormControl>
                    <Stack spacing={6}>
                        <InputGroup size="lg">
                            <InputLeftAddon children='Email' />
                            <Input type='email' variant='filled' placeholder='example@gmail.com' focusBorderColor='red.400' onChange={(e) => setEmail(e.target.value)} value={email} autoComplete='off' />
                        </InputGroup>
                        <InputGroup size='lg'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                variant='filled'
                                focusBorderColor='red.400'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Stack>
                    <Button
                        mt={10}
                        colorScheme='red'
                        type='submit'
                        className='sub-button'
                        onClick={submitHandler}
                        isLoading={loading}
                    >
                        SignIn
                    </Button>
                </FormControl>
                <p className='create'>Don't have an account? <a href='/signup'>Create an account</a></p>
            </Container>
        </div>
    )
}

export default SignIn;
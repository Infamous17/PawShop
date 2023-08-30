import { Box, Button, Container, Step, Stepper, StepSeparator, StepTitle, useSteps, StepStatus, StepIcon, StepNumber, StepIndicator, useToast, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';
import Step5Form from './Step5Form';
import Step6Form from './Step6Form';

const steps = [
    { title: 'Step 1' },
    { title: 'Step 2' },
    { title: 'Step 3' },
    { title: 'Step 4' },
    { title: 'Step 5' },
    { title: 'Step 6' },
];

const ReHome = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        category: "",
        petName: "",
        gender: "",
        breedType: "",
        breed: "",
        vaccinated: "",
        neutered: "",
        houseTrained: "",
        years: "",
        months: "",
        kgs: "",
        reason: "",
        description: "",
        city: "",
        state: "",
        photo: "",
        userId: "",
    });

    useEffect(() => {
        const accountInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!accountInfo) {
            navigate("/signin");
        }
    }, [navigate]);

    const handleValidityChange = (isValid) => {
        setIsValid(isValid);
    };

    const handleLoading = (isLoading) => {
        setIsLoading(isLoading);
    };

    const { activeStep, setActiveStep } = useSteps({
        index: currentStep,
        count: steps.length,
    });

    const handleNext = () => {
        if (isValid) {
            setCurrentStep((prevStep) => prevStep + 1);
            setActiveStep(currentStep + 1);
        } else {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => prevStep - 1);
        setActiveStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        if (isValid) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json"
                    }
                };

                await axios.post(
                    "/rehome",
                    formData,
                    config
                );

                toast({
                    title: 'Listing created',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "bottom"
                });
                setIsLoading(false);
                navigate("/listings");

            } catch (error) {
                toast({
                    title: 'Failed to create listing',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                });
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
        }
    };

    return (
        <Container maxW="container.md" margin="5% auto" padding={0}>
            <Box display="flex" flexDirection="row">
                <Box >
                    <Stepper index={activeStep} orientation='vertical' height='400px' gap='0' p={5}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={index < activeStep ? <StepIcon /> : null}
                                        incomplete={index > activeStep ? <StepNumber /> : null}
                                        active={index === activeStep ? <StepNumber /> : null}
                                    />
                                </StepIndicator>

                                {isLargerThan600 && (
                                    <Box flexShrink='0'>
                                        <StepTitle>{step.title}</StepTitle>
                                    </Box>)}

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box padding={5} display="flex" flexDirection="column" alignItems="center" width="100%">
                    {currentStep === 0 && (
                        <Step1Form formData={formData} setFormData={setFormData} onValidityChange={handleValidityChange} />
                    )}
                    {currentStep === 1 && (
                        <Step2Form formData={formData} setFormData={setFormData} onValidityChange={handleValidityChange} />
                    )}
                    {currentStep === 2 && (
                        <Step3Form formData={formData} setFormData={setFormData} onValidityChange={handleValidityChange} />
                    )}
                    {currentStep === 3 && (
                        <Step4Form formData={formData} setFormData={setFormData} onValidityChange={handleValidityChange} />
                    )}
                    {currentStep === 4 && (
                        <Step5Form formData={formData} setFormData={setFormData} onValidityChange={handleValidityChange} />
                    )}
                    {currentStep === 5 && (
                        <Step6Form formData={formData} setFormData={setFormData} onValidityChange={handleValidityChange} setLoading={handleLoading} />
                    )}
                </Box>
            </Box>
            <Box paddingTop={5} display="flex" flexFlow="row" justifyContent="space-between" p={5}>
                {currentStep > 0 && (
                    <Button colorScheme='gray' onClick={handlePrevious} >Previous</Button>
                )}
                {currentStep === steps.length - 1 && (
                    <Button colorScheme='red' onClick={handleSubmit} type='submit' isLoading={isLoading}>Submit</Button>
                )}
                {currentStep < steps.length - 1 && (
                    <Button colorScheme='gray' onClick={handleNext} ml={currentStep > 0 ? 0 : "auto"}>Next</Button>
                )}
            </Box>
        </Container>
    )
}

export default ReHome;
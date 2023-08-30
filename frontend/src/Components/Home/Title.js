import React from 'react'
import titleImage from '../../photos/titleimg.png';
import { Button } from '@chakra-ui/react';

const Title = () => {
    return (
        <div className='titleContainer'>
            <div class="row content-box">
                <div class="col-lg-6 title">
                    <h1>PawShop helps you <br></br>to ReHome and Adopt <br></br> A Pet in India</h1>
                    <p>Every pet Deserves a Good Home. #Adoptive</p>
                    <Button colorScheme='pink' variant='outline' size='lg'>
                        <a href='/adopt'>Adopt A Pet</a>
                    </Button>
                </div>
                <div class="col-lg-6 image-box">
                    <img className="title-img" src={titleImage} alt="title-img" />
                </div>
            </div>
        </div>
    )
}

export default Title;
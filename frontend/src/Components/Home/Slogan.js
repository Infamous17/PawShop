import React from 'react'
import bg from '../../photos/bg.png'
import { Button } from '@chakra-ui/react';

const Slogan = () => {
    return (
        <div className="slogan-container">
            <img src={bg} alt="background-img" />
            <div className='overlay-text'>
                <h2>#AdoptLove</h2>
                <p>Approximately 1478 dogs & cats die every day on road in India. PawShop is on a mission to provide every dog and cat a home before 2035. It’s just one of the many ways PawShop! gives back and helps you become a part of something larger. Join PawShop Community and help setting up Pet houses in your surrounding for strays.</p>
                <a href='/adopt'>
                    <Button colorScheme='pink' variant='outline' size='lg'>
                        Adopt A Pet
                    </Button>
                </a>
            </div>
        </div>
    )
}

export default Slogan;
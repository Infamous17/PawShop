import React from 'react'

const HowItWorks = () => {
    return (
        <div className='woking-container'>
            <div class="row">
                <h2>HOW IT WORKS?</h2>
                <div class="feature-box col-lg-4">
                    <i class="icon fa-solid fa-magnifying-glass fa-4x"></i>
                    <h3>Search</h3>
                    <p>Simply enter your city start your search.</p>
                </div>
                <div class="feature-box col-lg-4">
                    <i class="icon fa-regular fa-message fa-4x"></i>
                    <h3>Meet</h3>
                    <p>Schedule your appointment to meet the pet you love.</p>
                </div>
                <div class="feature-box col-lg-4">
                    <i class="icon fa-solid fa-cart-shopping fa-4x"></i>
                    <h3>Adopt</h3>
                    <p>Finally adopt the dog or cat you love.</p>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;
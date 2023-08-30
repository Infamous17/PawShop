import React from 'react'
import comment1 from '../../photos/dog-img.jpg'
import comment2 from '../../photos/lady-img.jpg'

const Comments = () => {
    return (
        <div className="comments-container">
            <h2>What They're Saying</h2>
            <div
                id="carouselExample"
                class="carousel slide"
                data-ride="false"
                data-bs-ride="carousel"
            >
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <h2>
                            Great experience 👍🏻👍🏻 also very polite in nature.
                        </h2>
                        <img
                            class="testimonial-image"
                            src={comment1}
                            alt="dog-profile"
                        />
                        <em>Ruchika</em>
                    </div>
                    <div class="carousel-item">
                        <h2 class="testimonial-text">
                            We had an amazing experience. Thanks pawshop for such a quick solution and service.
                        </h2>
                        <img
                            class="testimonial-image"
                            src={comment2}
                            alt="lady-profile"
                        />
                        <em>Shivangi Rai</em>
                    </div>
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                >
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    )
}

export default Comments;
export const Carousel = () => {
    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3>
                    Find your next "Software Engineering" book.
                </h3>
            </div>
            <div className="carousel carousel-dark slide mt-5
                d-none d-lg-block" data-bs-interval="false"
                id="caroselExample">
                
                {/* Desktop  */}

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div className="text-center">
                                    <img
                                    src={require('./../../Images/BooksImages/python-001.png')}
                                    width={151} height={233} alt="python"/>
                                    <h6 className="mt-2">Books</h6>
                                    <p>ASL</p>
                                    <a href="#" className="btn main-color text-white">
                                        Reserve
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div className="text-center">
                                    <img
                                    src={require('./../../Images/BooksImages/python-001.png')}
                                    width={151} height={233} alt="python"/>
                                    <h6 className="mt-2">Books</h6>
                                    <p>ASL</p>
                                    <a href="#" className="btn main-color text-white">
                                        Reserve
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button"
                        data-bs-target="#caroselExample" data-bs-slide="prev">
                        
                        <span className="carousel-control-prev-icon"
                        aria-hidden="true">

                        </span>

                        <span className="visually-hidden">Previous</span>

                    </button>

                    <button className="carousel-control-next" type="button"
                        data-bs-target="#caroselExample" data-bs-slide="next">
                        
                        <span className="carousel-control-next-icon"
                        aria-hidden="true">

                        </span>

                        <span className="visually-hidden">Next</span>

                    </button>

                </div>

                {/* Mobile */}

            </div>
        </div>
    );
}
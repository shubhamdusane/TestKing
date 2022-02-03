import React from 'react'

function Blogs() {
    return (
        <section className="bg__dark pb-5">
            <div className="container bg__dark pb-5">
                <div className="d-flex">
                    <div className="flex-1">
                        <p className="blog__title">BLOGS</p>
                    </div>
                    {/* <div className="view_all">
                        VIEW ALL
                    </div> */}
                </div>
                <div className="row mt-3 pb-4">
                    <div className="col-12 col-md-4 mt-2 stretch-card">
                        <div className="blog__card__2 p-3">
                            <div>
                                <img src="/assets/blog__1.png" className="img-fluid" />
                            </div>
                            <p className="blog__card__title__2 mt-3">
                                6 Ways You Can Get Involved in the USDAO World
                            </p>
                            <p className="blog__description__2">
                                USDAO is the latest and perhaps most high-profile project to attempt to use the blockchain’s functionality as a Stablecoin to move digital tokens that represent real currency...
                            </p>
                            <p className="blog__date mt-1">
                                26 April 2020
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 mt-2 ">
                        <div className="col-12 stretch-card">
                            <div className="blog__card__2 p-3">
                                <div className="row">
                                    <div className="col-6 col-md-3 ">
                                        <div>
                                            <img src="/assets/blog__1.png" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <p className="blog__card__title__2 ">
                                            6 Ways You Can Get Involved in the USDAO World
                            </p>

                                        <p className="blog__date mt-3">
                                            26 April 2020
                            </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 mt-2 stretch-card">
                            <div className="blog__card__2 p-3">
                                <div className="row">
                                    <div className="col-6 col-md-3">
                                        <div>
                                            <img src="/assets/blog__1.png" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <p className="blog__card__title__2 ">
                                            6 Ways You Can Get Involved in the USDAO World
                            </p>

                                        <p className="blog__date">
                                            26 April 2020
                            </p>
                                    </div>
                                </div>
                                <p className="blog__description__2 mt-5">
                                    USDAO is the latest and perhaps most high-profile project to attempt to use the blockchain’s functionality as a Stablecoin to move digital tokens that represent real currency...
                            </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Blogs

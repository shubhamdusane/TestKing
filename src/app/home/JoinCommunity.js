import React from 'react'

function JoinCommunity() {
    return (
        <>
        <div className="col-12 col-md-8 m-auto community__section position__relative">
                {/* <div className='community__bg'>
                    <img src={require('../../assets/images/community__bg.png')} />
                </div> */}
                <div className="col-12 community__title">
                    JOIN OUR COMMUNITY
                </div>
                <div className="row mt-5">
                    <div className="col-4 mt-5 text-center">
                        <img src={require('../../assets/images/github.png')} className="img-fluid" />
                    </div>
                    <div className="col-4 mt-5 text-center">
                        <img src={require('../../assets/images/telegram.png')} className="img-fluid" />
                    </div>
                    <div className="col-4 mt-5 text-center">
                        <img src={require('../../assets/images/discord.png')} className="img-fluid" />
                    </div>
                    <div className="col-4 mt-5 text-center">
                        <img src={require('../../assets/images/fb.png')} className="img-fluid" />
                    </div>
                    <div className="col-4 mt-5 text-center">
                        <img src={require('../../assets/images/medium.png')} className="img-fluid" />
                    </div>
                    <div className="col-4 mt-5 text-center">
                        <img src={require('../../assets/images/linkedin.png')} className="img-fluid" />
                    </div>
                </div>
                <div className="col-12 blogs__title">
                    RECENT BLOG POSTS
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-4 mt-3 stretch-card">
                        <div className="blog__card p-3">
                            <div className="blog__img text-center">
                                <img src={require('../../assets/images/blog1.png')} className="img-fluid" />
                            </div>
                            <div className="blog__title">
                                How to connect you wallet with USDR?
                            </div>
                            <div className="blog__time">
                                February 28th, 2021
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mt-3 stretch-card">
                        <div className="blog__card p-3">
                            <div className="blog__img text-center">
                                <img src={require('../../assets/images/blog2.png')} className="img-fluid" />
                            </div>
                            <div className="blog__title">
                            4 ways you can make more profit with USDR.
                            </div>
                            <div className="blog__time">
                                February 28th, 2021
                            </div>
                        </div>
                    </div>


                    <div className="col-12 col-md-4 mt-3 stretch-card">
                        <div className="blog__card p-3">
                            <div className="blog__img text-center">
                                <img src={require('../../assets/images/blog3.png')} className="img-fluid" />
                            </div>
                            <div className="blog__title">
                            How USDR keeps its value always 1?
                            </div>
                            <div className="blog__time">
                                February 28th, 2021
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default JoinCommunity
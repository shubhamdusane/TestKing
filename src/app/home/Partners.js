import React, {useState, useEffect } from 'react'


// img = []


const Partners = ({title = 'Our Partners' }) => {

    return (
        <div className='text-center bg__dark partners_class'>
            <h2>{title}</h2>
            <div className='container'>
                <div className='d-flex flex-wrap'>
                    <div className='justify-content-center align-items-center d-flex wow zoomIn column-wrap'>
                        <a href='/'>
                            <img src='/dots.png' target="_blank"/>
                        </a>
                    </div>
                    <div className='justify-content-center align-items-center d-flex wow zoomIn column-wrap'>
                        <a href='/'>
                            <img src='/dots.png' target="_blank"/>
                        </a>
                    </div>
                    <div className='justify-content-center align-items-center d-flex wow zoomIn column-wrap'>
                        <a href='/'>
                            <img src='/dots.png' target="_blank"/>
                        </a>
                    </div>
                    <div className='justify-content-center align-items-center d-flex wow zoomIn column-wrap'>
                        <a href='/'>
                            <img src='/dots.png' target="_blank"/>
                        </a>
                    </div>
                    <div className='justify-content-center align-items-center d-flex wow zoomIn column-wrap '>
                        <a href='/'>
                            <img src='/dots.png' target="_blank"/>
                        </a>
                    </div>
                    <div className='justify-content-center align-items-center d-flex wow zoomIn column-wrap'>
                        <a href='/'>
                            <img src='/dots.png     ' target="_blank"/>
                        </a>
                    </div>
                    <div className='justify-content-center align-items-center d-flex wow zoomIn column-wrap'>
                        <a href='/'>
                            <img src='/dots.png' target="_blank"/>
                        </a>
                    </div>
                </div>
            </div>
		</div>
    )
}

export default Partners
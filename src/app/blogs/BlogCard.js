import React from 'react'

function BlogCard() {
    return (
        <div className="col-12 col-md-4 mt-3 stretch-card">
                        <div className="blog__card p-3">
                            <div className="blog__img text-center">
                                <img src={require('../../assets/images/blog1.png')} className="img-fluid" />
                            </div>
                            <div className="blog__title">
                                How to connect you wallet with USDR?
                            </div>
                            <div className="blog__content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio velit pellentesque diam ac. Pellentesque non justo vitae vel, nec ac, duis risus. Lectus etiam egestas aenean gravida amet, nulla nunc. Dignissim est vulputate amet ut. Iaculis pharetra, odio sagittis elit lorem. Cursus massa interdum rutrum sed ut nam amet at quis. Elementum imperdiet sollicitudin elementum cras consectetur mi a sodales. In volutpat convallis cursus pellentesque. Nunc, feugiat ac suspendisse nam ultrices eu, amet neque condimentum. Lorem risus, quis euismod mauris rhoncus.
                            </div>
                            <div className="blog__time">
                                February 28th, 2021
                            </div>
                        </div>
                    </div>
    )
}

export default BlogCard
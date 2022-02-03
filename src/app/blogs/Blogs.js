import React from 'react'
import HomeFooter from '../home/HomeFooter'
import HomeNavbar from '../home/HomeNavbar'
import BlogCard from './BlogCard'
import '../../app/App.scss'

function Blogs({ history }) {
	return (
		<div className='home__container'>
			<HomeNavbar history={history} />
			<div className='col-12 text-center about__page__title'>USDAO BLOGS</div>
			<div className='container mt-5'>
				<div className='row mt-5'>
					<BlogCard />
					<BlogCard /> <BlogCard /> <BlogCard /> <BlogCard /> <BlogCard />{' '}
					<BlogCard /> <BlogCard />
				</div>
			</div>
			<HomeFooter />
		</div>
	)
}

export default Blogs

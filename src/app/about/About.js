import React from 'react'
import HomeFooter from '../home/HomeFooter'
import HomeNavbar from '../home/HomeNavbar'
import Social from '../home/Social'
import AboutIntro from './AboutIntro'
import '../../app/App.scss'

function About({ history }) {
	return (
		<div className='home__container'>
			<div className='intro__img'>
				<HomeNavbar history={history} />
				<AboutIntro history={history} />
			</div>
			<section className='bg__dark pt-5'>
				<div className='container pt-5 pb-5'>
					<div className='row pt-5 pb-5'>
						<div className='col-12 col-md-6'>
							<p className='about__title3'>USDAO FOUNDATION</p>
							<div className='about__page__description2'>
								The motivation to develop a stable coin like USDAO is to build
								an enterprise-friendly, easily integrable as well as
								interoperable stable coin that should not only be as reliable as
								fiat currencies currently are but also open new doors of
								possibilities for businesses using blockchain technology. We
								intend to provide a solution to this problem. We, at EDGE196,
								have built a stable coin that should simplify transactions in
								business processes and extend limits of faster and safer global
								transactions by offering data security, low transaction fees,
								private transactions (optional), decentralized governance, and
								much more. We promise to offer simple implementation and easy
								integration of our technology into your existing businesses.
								USDAO is powered by Ethereum blockchain which is itself a
								reputed and established market leader in decentralized
								applications technology.
							</div>
						</div>
						<div className='col-12 col-md-5 ml-auto'>
							<img
								alt='#'
								src='/assets/about__into.png'
								className='img-fluid'
							/>
						</div>
					</div>
				</div>
				<div className='container pt-5 pb-5'>
					<div className='card__foundation'>
						<p className='foundation__title'>
							USDAO NETWORK PROCESS RUNS WITH TWO TOKEN PROCESS
						</p>
					</div>
				</div>
				<div className='container pt-5 pb-5'>
					<div className='row mt-5'>
						<div className='col-12 col-md-5 mt-3'>
							<img alt='#' src='/assets/mission.png' className='img-fluid' />
						</div>
						<div className='col-12 col-md-7 mt-3'>
							<p className='mission__title'>OUR MISSION</p>
							<p className='mission__description'>
								Create a stable coin that meets the requirements of businesses
								and enterprises, competent enough against traditional solutions
								and provide significant improvements over them.
							</p>
						</div>
					</div>
				</div>

				<div className='container pt-5 pb-5'>
					<div className='row mt-5'>
						<div className='col-12 col-md-7 mt-3 '>
							<p className='mission__title'>OUR VISION</p>
							<p className='mission__description'>
								Develop a stable coin to build an enterprise-friendly, easily
								integrable as well as interoperable that is reliable as fiat
								currencies currently and new doors of possibilities for
								businesses using blockchain technology
							</p>
						</div>
						<div className='col-12 col-md-5 mt-3'>
							<img alt='#' src='/assets/vission.png' className='img-fluid' />
						</div>
					</div>
				</div>
			</section>
			<Social />
			<HomeFooter />
		</div>
	)
}

export default About

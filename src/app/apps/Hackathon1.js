import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import Avatar from '@material-ui/core/Avatar'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import HomeNavbar from '../../app/home/HomeNavbar'
import HomeFooter from '../home/HomeFooter'
import Partners from '../home/Partners'
import Advisor from '../home/Advisor'
import '../../app/App.scss'

// rgba(1, 32, 71, 1)

const faqQuestion = [
	{
		ques: 'Who can participate?',
		ans: 'The competition is open to all college students, individuals, startups, and businesses who are passionate about technology. '
	},
	{
		ques: 'What if I have never been to a hackathon or worked with USDAO stablecoin before?',
		ans: 'No worries! It’s helpful to have some software engineering experience, but it’s not a requirement. Projects also often need designers, front-end engineers, project managers, and more. We will also have talks, workshops, and mentors to help you with your project. This is a great place to learn all things blockchain and smart contracts.'
	},
	{
		ques: 'Do I need to pay any money to register for the hackathon?',
		ans: 'No. You do not have to pay anything to anyone to register yourself for any hackathon on Hackmania.'
	},
	{
		ques: 'Do I need to have any specific qualifications to be a participant in the hackathon? ',
		ans: 'If you love to code, you are more than welcome to participate in the hackathon.'
	},
	{
		ques: 'How do I submit what I have made for the hackathon?',
		ans: 'You have to develop the application on your local system and submit it on Hackmania in tar/zip file format along with instructions to run the application and source code.'
	},
	{
		ques: 'Do we need to have the entire idea fully working? ',
		ans: 'The entire idea need not be fully implemented; however, the submission should be functional so that it can be reviewed by the judges.'
	},
	{
		ques: 'How is the environment? Will your environment support any language? Will you provide any IDE and DB for us to work on ideas? ',
		ans: 'You have to develop the entire software application on your local system and submit it on Hackmania in tar/zip file format along with instructions to run the application and source code.'
	},
	{
		ques: 'Does one have to be online and available for the entire duration of the hackathon? ',
		ans: 'No, one does not need to be logged in on Hackmania or be online for the entire duration. You can develop the application on your local system based on the given themes and then submit it on Hackmania, on the specific challenge page.'
	},
	{
		ques: 'Since there is no specific technology mentioned, are there any restrictions on using the number of pre-built libraries? ',
		ans: 'There is no restriction to use any language, technology stack, or library. You can use any of them to create a web/mobile application.'
	},
	{
		ques: 'Do I need to give a demo for the product that I have built?',
		ans: 'If you want you can submit a small presentation or video that demonstrates your submission, however, it is not mandatory, and only good to have. In case you are one of the winners, you might be invited to demo your application at an online call, details of which will be shared with sufficient advance notice.'
	},
	{
		ques: 'If it is a team submission, does that mean all team members will have access to work at the same time? ',
		ans: 'Yes, all team members can log in from their account and do application submission on Hackmania.'
	},
	{
		ques: 'How will this virtual event take place?',
		ans: 'This event takes place 100% online.  The hackathon chat/support happens on Discord, workshops happen over Zoom.'
	},
	{
		ques: 'Who will own the IP (Intellectual Property) Rights to the product that I have built? ',
		ans: 'The developer/developers of the web/mobile application will have all rights and own the IP of the product. However, all code needs to be in the public domain (open source) so that it can be evaluated by the judges.'
	}
]

const schedule = []
const Hackathon1 = ({ history }) => {
	const [darkMode, setDarkMode] = useState(false),
		[show, setShow] = useState(false)

	const hackTypes = [
		'Real Esteate',
		'Gaming',
		'NFTs',
		'Lending & Borrowing',
		'Banking & Finance',
		'Startups',
		'Supply Chain',
		'e-Commerce',
		'e-Learning',
		'Digital Ads',
		'Freelancing',
		'Wallets',
		'Mobile App Economy',
		'Tourism',
		'Gift Card',
		'Lottery Mechanism',
		'Decentralized Staking',
		'Yield Farm & Optimizer',
		'Tools & Infrastructure',
		'Analytics'
	]
	const timetable = [
		{
			date: '02nd Oct',
			country: 'India',
			type: 'Real Esteate',
			plan: [
				'Daohack opening ceremon',
				'Registration & Idea',
				'Prototype Submission',
				'Result Announce'
			]
		},
		{
			date: '02nd Oct',
			country: 'India',
			type: 'Real Esteate',
			plan: [
				'Daohack opening ceremon',
				'Registration & Idea',
				'Prototype Submission',
				'Result Announce'
			]
		},
		{
			date: '02nd Oct',
			country: 'India',
			type: 'Real Esteate',
			plan: [
				'Daohack opening ceremon',
				'Registration & Idea',
				'Prototype Submission',
				'Result Announce'
			]
		},
		{
			date: '02nd Oct',
			country: 'India',
			type: 'Real Esteate',
			plan: [
				'Daohack opening ceremon',
				'Registration & Idea',
				'Prototype Submission',
				'Result Announce'
			]
		},
		{
			date: '02nd Oct',
			country: 'India',
			type: 'Real Esteate',
			plan: [
				'Daohack opening ceremon',
				'Registration & Idea',
				'Prototype Submission',
				'Result Announce'
			]
		},
		{
			date: '02nd Oct',
			country: 'India',
			type: 'Real Esteate',
			plan: [
				'Daohack opening ceremon',
				'Registration & Idea',
				'Prototype Submission',
				'Result Announce'
			]
		}
	]

	return (
		<div className='hackathon-c'>
			<HomeNavbar
				history={history}
				show={show}
				setShow={setShow}
				mode={darkMode}
				setmode={setDarkMode}
			/>
			<div className='main-section'>
				<div className='container'>
					<div className='align-items-center justify-content-center d-flex dao-logo'>
						<img src='/assets/daohack/Group12670.png' />
					</div>
					<div className='align-items-center justify-content-center dao-content'>
						<div className='d-inline-flex'>
							<img className='flag-1' src='/assets/daohack/india.png' />
							<div className='flag-content'>
								INDIA EDITION 2021 | SEPTEMBER 27TH TO OCTOBER 20TH
							</div>
							<img className='flag-2' src='/assets/daohack/india.png' />
						</div>
					</div>
					<div className='apply-btn'>
						<button>Apply Now</button>
					</div>
					<div className='spring-img'>
						<img src='/assets/daohack/spring.png' />
					</div>
					<div className='polyhedron-img'>
						<img src='/assets/daohack/polyhedron.png' />
					</div>
					<div className='card reason-join'>
						<div className='card-body'>
							<div className='row d-flex'>
								<div className='col-sm-6'>
									<h1>REASONS TO JOIN</h1>
								</div>
								<div className='col-sm-6'>
									<div className='reason-wrapper'>
										<p>
											<span>{`>`}</span> Win prizes from a total pool of $50k{' '}
										</p>
										<p>
											<span>{`>`}</span> Attend world-class workshops hosted by
											experts in the blockchain space
										</p>
										<p>
											<span>{`>`}</span> Connect with like-minded developers and
											community members{' '}
										</p>
										<p>
											<span>{`>`}</span> Learn and grow as a newcomer to the
											space{' '}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='align-items-center justify-content-center prize-a'>
						{/* <div className='heading-m'> */}
						<h1>PRIZES</h1>
						{/* </div> */}
						<div className='amount'>$ 50,000</div>
						<h2>in total prizes</h2>
					</div>

					<div className='card reason-join'>
						<div className='card-body'>
							<div className='row d-flex typeWrapper'>
								{hackTypes.map((data, index) => (
									<div className='col-md-3' key={index}>
										<div>
											<p>{data}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='scheduleWrapper'>
						<div className='row'>
							<div className='col-md-8'>
								<h2>SCHEDULE</h2>
								<p>
									The schedule will continue to expand leading to the hackathon.
									Stay tuned{' '}
								</p>
								<p>
									for more details about workshops and pre-event festivities!
								</p>
							</div>
							<div className='col-md-4'>
								<div className='typeSelect'>
									<p>Select Type</p>

									<select>
										<option>Real Estate</option>
									</select>
								</div>
							</div>
						</div>
						<div className='row'>
							{timetable.map((data, index) => (
								<div className='col-md-3'>
									<div className='scheduleCard'>
										<h4 className=''>30 Jan</h4>
										<h5>India</h5>
										{data.plan.map((item, index) => (
											<div className='dataWrap'>
												<p className='week'> &#8226; {index + 1}st Week</p>
												<p className='weekData'> {item}</p>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
					<Advisor title={'Industry Leaders'} />
					<Partners title={'Partners'} />
					<CommunitySponsor />
					<JoinUs />
					<FAQ />
				</div>
			</div>
			<JoinMovement />
			<HomeFooter />
		</div>
	)
}

const JoinUs = () => {
	return (
		<div className='join-us'>
			<div className='row d-flex flex-sm-row '>
				<div className='col-sm-5 flex-column col-12'>
					<h1>JOIN US</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam
					</p>
				</div>
				<div className='col-sm-7 flex-column col-12'>
					<div className='card reason-join'>
						<div className='card-body'>
							<div className='d-inline-flex input-wrap w-100'>
								<div className='w-50'>
									<h4>Your Name</h4>
									<input className='w-90' placeholder='Enter name' />
								</div>
								<div className='w-50'>
									<h4>Mail</h4>
									<input placeholder='xyz@mail.com' />
								</div>
							</div>
							<div className='w-100'>
								<textarea placeholder='Enter name' />
							</div>
							<button className='mt-3'>Send Message</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const JoinMovement = () => {
	return (
		<div className='join-movement'>
			<div className='card'>
				<div className='card-body'>
					<h1>Join the movement of digital currency</h1>
					<div className='d-inline-flex input-wrap'>
						<input placeholder='Enter your email address' />
						<button>Subscribe</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const FAQ = () => {
	const onClick = () => {
		var accordions = document.getElementsByClassName('accordion')
		for (var i = 0; i < accordions.length; i++) {
			accordions[i].onclick = function () {
				this.classList.toggle('is-open')

				var content = this.nextElementSibling
				if (content.style.maxHeight) {
					content.style.maxHeight = null
				} else {
					content.style.maxHeight = content.scrollHeight + 'px'
				}
			}
		}
	}

	return (
		<div tabindex='0'>
			<div className='faqConatiner'>
				<h1>FAQS</h1>
				{faqQuestion.map((val) => (
					<div className='accordian-wrap'>
						<button className='accordion' onClick={onClick}>
							{val.ques}
						</button>
						<div class='accordion-content'>
							<p>{val.ans}</p>
						</div>
					</div>
				))}
			</div>
			{/* <div className="pb-5">
                <hr style={{ color: 'white' }} />
              </div>  */}
		</div>
	)
}

const CommunitySponsor = () => {
	return (
		<div className='sponsorWrapper pb-5'>
			<div className='row'>
				<div className='col-md-8'>
					<div className='sponser-heading'>
						<h2 className='community'>Community </h2>
						<h2>Sponsor </h2>
					</div>
					<p>
						We are proud to partner with our community sponsors to upskill and
						enable developers in the blockchain space to build an economically
						fair world powered by cryptographic truth. If you or your
						organization is interested in contributing, reach out.
					</p>
				</div>
			</div>
			<div className='row mt-5 '>
				<div className='col-md-3 col-12 mb-5'>
					<div className='card column-wrap'>
						<p>Sponsor1</p>
					</div>
				</div>
				<div className='col-md-3 col-12 mb-5'>
					<div className='card column-wrap'>
						<p>Sponsor1</p>
					</div>
				</div>
				<div className='col-md-3 col-12 mb-5'>
					<div className='card column-wrap'>
						<p>Sponsor1</p>
					</div>
				</div>
				<div className='col-md-3 col-12 mb-5'>
					<div className='card column-wrap'>
						<p>Sponsor1</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Hackathon1

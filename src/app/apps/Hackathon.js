import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import Avatar from '@material-ui/core/Avatar'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import HomeNavbar from '../../app/home/HomeNavbar'
import HomeFooter from '../home/HomeFooter'
import '../../app/App.scss'

const useStyles = makeStyles((theme) => ({
	rounded: {
		color: '#fff',
		backgroundColor: '#3A3A3C',
		height: 25,
		width: 25
	},
	rounded2: {
		color: '#fff',
		backgroundColor: '#3A3A3C',
		height: 36,
		width: 36
	}
}))

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
	},
	faqQuestion = [
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

const theme = [
	'Banking & Finance',
	'Supply Chain',
	'Decentralized Fundraising',
	'Gaming & NFT',
	'Digital Ads & Entertainment Industry',
	'Startups',
	'E-Learning',
	'Lending & Borrowing'
]

//const schedule = ['Register ', 'Submit your Idea', 'Evaluation begins', 'Results announced', 'Project Submission', 'Finals. Something like this']
const schedule = []
const Hackathon = ({ history }) => {
	const [darkMode, setDarkMode] = useState(false),
		winnerRef = useRef(null),
		scheduleRef = useRef(null),
		ruleRef = useRef(null),
		faqRef = useRef(null),
		[show, setShow] = useState(false)

	const onFocus = (ref) => {
		ref.current && ref.current.focus()
	}

	return (
		<div className='hackathon-class'>
			<HomeNavbar
				history={history}
				show={show}
				setShow={setShow}
				mode={darkMode}
				setmode={setDarkMode}
			/>
			{/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ left: '0px' }}>
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{flex:1}}>
              <li className="nav-item text-start">
                <a className="nav-link f-16" aria-current="page" href="#">Telegram</a>
              </li>
              <li className="nav-item text-start">
                <a className="nav-link f-16" href="#">Discord</a>
              </li>
              <li className="nav-item text-start">
                <a className="nav-link f-16" href="#">Github</a>
              </li>
            </ul>
            <form className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link text-start f-16" aria-current="page" href="#">Litepaper</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-start f-16" href="#">Whitepaper</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-start" href="#">
                    <Avatar variant="rounded" className={classes.rounded}>
                      <SettingsIcon fontSize="small" />
                    </Avatar>
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-top-light" style={{ left: '0px' }}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/logo.svg" className="img-fluid" style={{ width: '80%' }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" style={{ flex: 1 }}></form>
            <form className="d-flex" style={{ flex: 2 }}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Enterprise
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Enterprise 1</a></li>
                    <li><a className="dropdown-item" href="#">Enterprise 2</a></li>
                    <li><a className="dropdown-item" href="#">Enterprise 3</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="Individuals" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Individuals
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="Individuals">
                    <li><a className="dropdown-item" href="#">Individuals 1</a></li>
                    <li><a className="dropdown-item" href="#">Individuals 2</a></li>
                    <li><a className="dropdown-item" href="#">Individuals 3</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="Developers" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Developers
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="Developers">
                    <li><a className="dropdown-item" href="#">Developers 1</a></li>
                    <li><a className="dropdown-item" href="#">Developers 2</a></li>
                    <li><a className="dropdown-item" href="#">Developers 3</a></li>
                  </ul>
                </li>
              </ul>
            </form>
            <form className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link text-start" href="#">
                    <Avatar variant="rounded" className={classes.rounded2}>
                      <MoreHorizIcon />
                    </Avatar>
                  </a>
                </li>
                <li className="nav-item mt-auto mb-auto" style={{ width: '130px' }}>
                  <button type="button" className="btn btn-primary btn-sm w-100 p-2" style={{ background: '#F85E11', border: 'none', outline: 'none' }}>Launch App</button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav> */}
			<div
				style={{
					backgroundColor: '#3A3A3C',
					backgroundImage: 'url(./landing4.svg)',
					minHeight: '84vh',
					backgroundSize: 'contain'
				}}
			>
				<div
					style={{
						backgroundImage: 'url(./landing.png)',
						minHeight: '84vh',
						backgroundSize: 'cover'
					}}
				>
					<div
						style={{
							backgroundImage: 'url(./landing2.svg)',
							minHeight: '90vh',
							backgroundSize: 'contain'
						}}
					>
						<div className='text-center heading'>
							India Edition VIRTUAL EVENT | SEPTEMBER 24 - OCTOBER 20
							{/* <img src="./indiaEdition.svg" className="mt-5 img-fluid" /> */}
							{/* <img src="./worldwide.png" className="img-fluid mt-3 p-3" /> */}
						</div>
						<div className='col-8 m-auto'>
							<img src='./hack.png' className='mt-3 img-fluid' />
						</div>
						{/* <div className="text-center pt-5 mt-5">
              <img src="./sugarland.png" style={{ width: '35%' }} />
            </div> */}
						<div className='col-12 col-md-8 m-auto indiaEdition pb-5'>
							<h1 style={{ color: '#fff', textAlign: 'center' }}>
								India Edition 2021
							</h1>
							{/* <img src="./indiaEdition.svg" className="mt-5 img-fluid" /> */}
						</div>
						<div className='col-12 col-md-12 text-center'>
							<a
								type='button'
								className='btn btn-primary btn-sm p-2'
								href='http://hackathon.hackmania.com/hackathons/daohackindia
'
								target='_blank'
								style={{
									background: 'transparent',
									outline: 'none',
									width: 160,
									border: '1px solid white'
								}}
							>
								Apply Now
							</a>
						</div>

						<div className='col-11 col-md-8 m-auto'>
							<div className='row mt-5 pt-5'>
								{/* <div className="col-3 col-md-1 m-auto text-white mt-2"><a onClick={e => onFocus(winnerRef)}>Winners</a></div> */}
								<div className='col-3 col-md-1 m-auto text-white mt-2'>
									<a onClick={(e) => onFocus(scheduleRef)}>Partners</a>
								</div>
								<div className='col-3 col-md-1 m-auto text-white mt-2'>
									Judges
								</div>
								{/* <div className="col-3 col-md-1 m-auto text-white mt-2">Technology</div> */}
								<div className='col-3 col-md-1 m-auto text-white mt-2'>
									Participants
								</div>
								{/* <div className="col-3 col-md-1 m-auto text-white mt-2"><a onClick={e => onFocus(ruleRef)}>Rules</a></div> */}
								{/* <div className="col-3 col-md-1 m-auto text-white mt-2"><a onClick={e => onFocus(faqRef)}>FAQs</a></div> */}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='container mt-5 mb-5'>
				{/* <div className="col-12 col-md-8 m-auto">
          <div className="row">
            <div className="col-12 col-md-7 mt-3">
              <img src="./video.png" className="img-fluid" />
            </div>
            <div className="col-12 col-md-5 mt-auto mb-auto">
              <div  ref = {winnerRef}  tabindex="0">
                <p className="col-12 mt-3" style={{
                  fontWeight: '400',
                  fontSize: 14
                }}
                >WINNERS</p>
                <p className="col-12 col-md-10" style={{
                  color: '#F85E11',
                  fontSize: 22
                }}>
                  $5000 in Hackathon prize
                </p>
                <p className="col-12 col-md-12" style={{
                  color: '#979797',
                  fontSize: 12
                }}>
                  You will get 2500Eth and 2500$ in USDAO.
                </p>
              </div>
            </div>
          </div>
        </div> */}
			</div>

			<div className='container  mb-5'>
				<div className='col-12 col-md-12 m-auto'>
					<div className='row'>
						{theme.map((v) => (
							<div key={v} className='col-12 col-md-3 mt-3'>
								<div
									style={{
										textAlign: 'center',
										color: 'white',
										height: 95,
										fontSize: 10,
										backgroundColor: v === 1 ? '#F85E11' : '#979797',
										borderRadius: 10,
										padding: 5
									}}
									className='columns-wrap-1'
								>
									<div
										style={{
											fontSize: 20,
											marginBottom: 5,
											marginTop: 20
										}}
									>
										{v}
									</div>
									{/* <p style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 10,
              }}>
                  GRAND PRIZE
                </p>
                <p style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 10,
                paddingTop:15
              }}>
                COMPANY NAME HERE >
                </p> */}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* <div className="" style={{
        backgroundImage: 'url(./winner.png)',
        backgroundSize: 'cover',
        minHeight: '50vh'
      }}>
        <div className="container">
          <div className="col-12">
            <div className="row pt-5">
              <div className="col-12 col-md-5 p-0">
                <p style={{
                  color: 'white',
                  fontSize: 14
                }}>Runner-Up Awards</p>
                <p className="col-12 col-md-6 p-0" style={{
                  color: 'white',
                  fontSize: 22
                }}>
                  $125k+ in Hackathon prize bounties
                </p>
                <p style={{
                  color: 'white',
                  fontSize: 12
                }}>
                  Explore a diverse range of winning projects that built feature-rich smart contracts by accessing off-chain data and computation through Chainlink oracle networks.</p>
              </div>

              <div className="col-12 col-md-7 ">
                <p style={{
                  color: 'white',
                  fontSize: 12
                }}>
                COMPANY NAME HERE > COMPANY NAME HERE > COMPANY NAME HERE > COMPANY NAME HERE >
                </p>
                <p style={{
                  color: 'white',
                  fontSize: 12
                }}>
                COMPANY NAME HERE > COMPANY NAME HERE > COMPANY NAME HERE > COMPANY NAME HERE >
                </p>
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary btn-sm p-2 mt-3" style={{ background: 'transparent', outline: 'none', border: '1px solid white' }}>SEE THE PROJECT GALLERY</button>
        </div>
      </div> */}

			<div
				style={{
					background: 'url(./schedule.png)',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					minHeight: '80vh'
				}}
				ref={scheduleRef}
				tabindex='0'
			>
				<h2
					style={{
						color: 'white',
						textAlign: 'center',
						paddingTop: 50
					}}
				>
					Our Partners
				</h2>

				<div className='col-md-12' style={{ textAlign: 'center' }}>
					<img
						src='/Logo_KBA.png'
						className='img-responsive'
						alt='partner'
						style={{ width: '200px' }}
					/>
				</div>

				{/* <p className="col-12 col-md-4 m-auto" style={{
          color: 'white',
          fontSize: 12,
          textAlign: 'center',
          paddingTop: 10
        }}>
          Explore a diverse range of winning projects that built feature-rich smart contracts by accessing off-chain data and computation through Chainlink oracle networks.
        </p> */}

				<div className='container  pt-5'>
					<div className='col-12 col-md-11 m-auto pb-5'>
						<div className='col-12 col-md-12 m-auto'>
							<div className='row'>
								{schedule.map((v) => (
									<div key={v} className='col-12 col-md-4 mt-3'>
										<div
											style={{
												textAlign: 'center',
												color: 'white',
												height: 95,
												fontSize: 10,
												backgroundColor: v === 1 ? '#F85E11' : '#979797',
												borderRadius: 10,
												padding: 5
											}}
											className='columns-wrap'
										>
											<div
												style={{
													fontSize: 20,
													marginBottom: 5,
													marginTop: 20
												}}
											>
												{v}
											</div>
											{/* <p style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 10,
              }}>
                  GRAND PRIZE
                </p>
                <p style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 10,
                paddingTop:15
              }}>
                COMPANY NAME HERE >
                </p> */}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <div style={{
        background: '#242426'
        }} ref = {ruleRef}  tabindex="0">
        <div className="container rulesContainer">
          <h1>Rules</h1>
          <div className='rulesListing'>
          <ul>
            <li>This is a team participation hackathon. You can have 1 to 4 members in your team.</li>
            <li>You can either invite your friends to form a team or you can request other teams to add you as a member.</li>
            <li>The idea phase will start at ( ) and end at ( ), you work on your hack during the allotted time only.+</li>
            <li>The prototype phase will start at ( ) and end at ( ), you work on your hack during the allotted time only.</li>
            <li>It's an online hackathon, you can participate from anywhere.</li>
            <li>There are multiple themes of the hackathon, you must submit a hack that is in one of the themes mentioned.</li>
            <li>Once the hackathon starts, you will get an option to submit your hack, you can submit as many times as you want, the last hack will be considered as the final submission.</li>
            <li>You are expected to come up with new and innovative ideas, any idea that has been copied from somewhere will be disqualified.</li>
            <li>Your hack must be developed entirely during the hackathon duration. You may use open source libraries and other freely available systems/services such as Google Maps, Facebook Connect, Twitter feeds, etc.</li>
            <li>The intellectual property of your code belongs only to your team.</li>
            <li>By participating in the hackathon, you agree to the terms and conditions of Hackmania.</li>
          </ul>
          </div>
        </div>
      </div> */}
			{/* <div className="container">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-6">
              <p className="col-12" style={{
                fontSize: 14
              }}>JUDGES & SPEAKERS</p>

              <p className="col-12 col-md-6" style={{
                color: '#F85E11',
                fontSize: 22
              }}>
                Inspired by industry leaders
              </p>

              <p className="col-12 col-md-7" style={{
                fontSize: 12,
                color: '#979797'
              }}>Explore a diverse range of winning projects that built feature-rich smart contracts by accessing off-chain data and computation through Chainlink oracle networks.</p>
            </div>
          </div>
        </div>
      </div> */}

			{/* <div className="container mb-5">
        <div className="col-12 col-md-12 m-auto">
          <div className="row">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(v =>
              <div key={v} className="col-12 col-md-3 mt-5">
                <div style={{
                  textAlign: 'start',
                  color: 'white',
                  fontSize: 10,
                  backgroundColor: '#3A3A3C',
                  borderRadius: 10,
                  paddingLeft: 20,
                  paddingTop: 10,
                  paddingBottom: 5,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: -30
                  }}>
                    <img src="./user.png" className="img-fluid" style={{ height: 90 }} />
                  </div>
                  <div style={{
                    fontSize: 20,
                    marginBottom: 10,
                    marginTop: 55
                  }}>
                    Name Here
                  </div>
                  <div>
                    Title
                  </div>
                  <div className="mt-2">
                COMPANY NAME HERE >
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div> */}

			{/* <div style={{
        background: '#242426',
        padding: 20
      }}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-md-7">
              <div className="row">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v =>
                  <div key={v} className="col-6 col-md-4 mt-3 p-3" >
                    <img src="./solana.png" className="img-fluid" />
                  </div>)}
              </div>
            </div>
            <div className="col-12 col-md-5 mt-3 p-4">
              <p className="col-12" style={{
                color: 'white',
                fontSize: 12
              }}>TECHNOLOGY PARTICIPANTS</p>

              <p className="col-12 col-md-10" style={{
                color: 'white',
                fontSize: 22
              }}>
                Built with these market-leading protocols & organizations
              </p>

              <p className="col-12 col-md-8" style={{
                fontSize: 12,
                color: 'white'
              }}>Explore a diverse range of winning projects that built feature-rich smart contracts by accessing off-chain data and computation through Chainlink oracle networks.</p>
            </div>
          </div>
        </div>
      </div> */}

			<div
				style={{
					background: '#242426'
				}}
				ref={faqRef}
				tabindex='0'
			>
				<div className='container faqConatiner'>
					<h1>FAQs</h1>
					{faqQuestion.map((val) => (
						<>
							<button className='accordion' onClick={onClick}>
								{val.ques}
							</button>
							<div class='accordion-content'>
								<br />
								{val.ans}
								<br />
							</div>
						</>
					))}
				</div>
				<div className='pb-5'>
					<hr style={{ color: 'white' }} />
				</div>
			</div>
			<HomeFooter history={history} />
			{/* <div className="container mt-5 pb-5">
          <div className="row">
            <div className="col-12 col-md-2 m-auto">
              <a className="navbar-brand" href="#">
                <img src="/logo.svg" className="img-fluid" style={{ width: '80%' }} />
              </a>
            </div>

            <div className="col-12 col-md-2 m-auto">
              <a className="navbar-brand text-white" href="#">
                Stake
              </a>
            </div>

            <div className="col-12 col-md-2 m-auto">
              <a className="navbar-brand text-white" href="#">
                Get USDAO
              </a>
            </div>

            <div className="col-12 col-md-2 m-auto">
              <a className="navbar-brand text-white" href="#">
                Community
              </a>
            </div>

            <div className="col-12 col-md-2 m-auto">
              <a className="navbar-brand text-white" href="#">
                Presskit
              </a>
            </div>

            <div className="col-12 col-md-2 m-auto">
              <a className="navbar-brand text-white" href="#">
                Privacy Policy
              </a>
            </div>
          </div>

          <p style={{ fontSize: 14, color: 'white', marginTop: 40, marginBottom: 10 }}>
          Digital assets are subject to a number of risks, including price volatility. Transacting digital assets could return in significant losses and may not be suitable for some consumers. Digital asset markets and exchanges are not regulated with the same controls or customer protections available with other forms of financial products and are subject to an evolving regulatory environment.
        </p>

        <p style={{ fontSize: 14, color: 'white' }}>
          © 2021 USDAO. All Rights Reserved
        </p>
        </div>

         */}
		</div>

		// </div>
	)
}

export default Hackathon

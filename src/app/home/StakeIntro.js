import React  from 'react'
// import { decimalPlaces} from '../../utils';
// import { TVLAmount } from '../../redux/staking';

function StakeIntro({ history, myRef, tvl }) {

	// const [tvlAmount, settvlAmount] = useState();

	// useEffect(async()=>{
    //     TVLAmount(settvlAmount);
         
    //     },[])
	
	return (
		<div className=''>
			<div className='col-8 text-left demo-content ml-auto mr-auto'>
				<div className='intro__title__height'>
					<div className='intro__title font__weight__bold'>
						EARN STAKING REWARDS{' '}
						<span style={{ color: '#F85E11' }}>USING USDAO</span>
					</div>
					<div className='d-flex justify-content-center flex-wrap'>
						<div className='d-flex justify-content-center text-center mt-5 w-100'>
							{/* <div className='btn btn-primary navbar__button text-center'>
								<span
									style={{ textDecoration: 'none', color: 'white' }}
									onClick={() => {history.push('/stakes')}}
								>
									Deposit Now
								</span>
							</div> */}
							<button className='button_stake'>TVL: {tvl}</button>
						</div>
					</div>
				</div>
			</div>
			<div className='container position__relative mt-5 pt-5 pb-5 p-0 m-0 ml-5'>
				<div className='d-flex justify-content-start ml-3'></div>
			</div>
		</div>
	)
}

export default StakeIntro

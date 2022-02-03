import React, { useState, useEffect } from 'react'
import { hasAdminAccess } from '../../../redux/staking'
import StakingAdminComp from './StakingAdminComp'
import '../../../app/App.scss'

const StakingAdminDash = ({ history }) => {
	const [hasAccess, sethasAccess] = useState()
	let comp

	useEffect(async () => {
		await hasAdminAccess(sethasAccess)
	}, [])
	return (
		<StakingAdminComp />
		// <div>
		//     {hasAccess ? <StakingAdminComp/>
		//     : <div>
		//         <div class="card">
		//             <div class="card-body">
		//             You don't have access.
		//             </div>
		//         </div>
		//       </div>
		//     }

		// </div>
	)
}

export default StakingAdminDash

// const mapStateToProps = (state) => {
// 	return {
// 		inputAmount: usmInputAmountSelector(state),
// 	}
// }

// export default connect(mapStateToProps)(Stakingmain)

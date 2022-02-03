import React, { useState, useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import {
	metamaskErrorSelector,
	networkProviderSelector
} from '../redux/selectors'
require('dotenv').config();
function App() {
	return (
		<div>
			<AppRoutes />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		networkProvider: networkProviderSelector(state),
		metamaskError: metamaskErrorSelector(state)
	}
}

export default connect(mapStateToProps)(App)

// ganache port: 0.0.0.0:8545
// private keys:
// (0) 0xe1c9b65f2493a0c73b470e408fdf19683b806fd8296aebb25571c4edc8b58dfe
// (1) 0xceee7e14875af8fe9778bb5685a17afd4b23838b34ceef47c6215a7def1c863c
// (2) 0x0e954d7392c293df20263cc47820f16b4ef6d4a274a12461f21a722721d84485
// (3) 0x5d50201676371a54c2cace1b26c114cded7c938ec296d9cbee697ab515bf1ff7
// (4) 0x8dbba8e026a867e5036bacff5a37c37afe83bff6db560d1f61c566094d4b5884
// (5) 0xca28add632d4802bc5acf806aaa55a420361b60ee3dcd880099758e57e4b6553
// (6) 0xda966afbc6b84a9cade4220c8144f6efef9d45a8e98cadbd39fc18e985f7ad79
// (7) 0xa3ea021061f0fc0f1b0bed6c05ef99f2d167fbbb94f2f378f28ae3a8074f0d4f
// (8) 0x64ae7cd74ac5393e41492cc0d6ae30da84f6e68f8ba51b9492a9547fe39907b3
// (9) 0x8b6e036da61e5ac4874a770d7258583cd1b373798e740deaff4015fea80294b0

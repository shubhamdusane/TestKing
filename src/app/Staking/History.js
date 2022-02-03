import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '../../app/App.scss'

const Dashboard = () => {
	return (
		<div className='container-scroller'>
			<Sidebar />
			<div className='container-fluid page-body-wrapper'>
				<Navbar title='HISTORY' />
				<div className='main-panel'>
					<div className='content-wrapper'>
						<div className='row'>
							<div className='col-12 stretch-card'>
								<div className='col-md-12 grid-margin stretch-card p-0'>
									<div className='card'>
										<div className='card-body'>
											<div className='col-12 col-md-12 m-auto'>
												<div className='table-responsive borderless'>
													<table className='table'>
														<thead>
															<tr className='border__table'>
																<td>Type</td>
																<td>Amount</td>
																<td>Date</td>
																<td>Transaction ID</td>
															</tr>
														</thead>
														<tbody>
															{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
																<tr>
																	<td key={v}>Stacked</td>
																	<td>100 USDAO</td>
																	<td>19-02-2021 | 03:50AM</td>
																	<td>654s14dsdg64S4sd6g4d65g465SG65fd4D</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className=' col-12 d-flex'>
								<div className='flex-1'>
									<img alt='#' src='/assets/governance/pagination.png' />
								</div>
								<div>
									<img alt='#' src='/assets/governance/csv.png' className='' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard

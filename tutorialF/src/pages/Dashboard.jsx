import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

export default function Dashboard() {
	const [state, setState] = useState('')
	const [applicants, setApplicants] = useState([])
	const [jobTitle, setJobTitle] = useState('')
	const [jobCategory, setJobCategory] = useState('')
	const [jobLocation, setJobLocation] = useState('')
	const [jobDescription, setJobDescription] = useState('')
	const [jobExperience, setJobExperience] = useState('')
	const [openJob, setOpenJob] = useState([])
	const queryParams = new URLSearchParams(window.location.search)
	const token = queryParams.get('token')

	const fetchApplicants = () => {
		fetch('http://localhost:1337/api/applicantlists')
			.then(res => res.json())
			.then(list => setApplicants(list.data))
			.catch(error => console.error('Error fetching applicants:', error))
	}

	const fetchOpenJobs = () => {
		fetch('http://localhost:1337/api/joblists')
			.then(res => res.json())
			.then(list => setOpenJob(list.data))
			.catch(error => console.error('Error fetching open jobs:', error))
	}

	const update = async id => {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ data: { Status: 'Approved' } }),
		}
		try {
			const response = await fetch(
				`http://localhost:1337/api/applicantlists/${id}`,
				requestOptions
			)
			await response.json()
			setState('1')
		} catch (error) {
			console.error('Error updating applicant:', error)
		}
	}

	const deleteApplicant = async id => {
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		}
		try {
			const response = await fetch(
				`http://localhost:1337/api/applicantlists/${id}`,
				requestOptions
			)
			await response.json()
			setState('1')
			console.log(state)
		} catch (error) {
			console.error('Error deleting applicant:', error)
		}
	}

	useEffect(() => {
		fetchApplicants()
		fetchOpenJobs()
	}, [])

	if (!token) {
		return <Navigate to='/login' />
	}

	const addJob = async () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				data: {
					JobPosition: jobTitle,
					Category: jobCategory,
					Location: jobLocation,
					Experience: jobExperience,
					JobDescription: jobDescription,
					JobStatus: 'Open',
					Agency: 'Strapi',
				},
			}),
		}
		try {
			await fetch('http://localhost:1337/api/joblists', requestOptions)
			alert('Job Added Successfully...')
		} catch (error) {
			console.error('Error adding job:', error)
		}
	}

	return (
		<div>
			<div className='header'>
				<link
					href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
					rel='stylesheet'
				/>
				<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'></script>
				<div>
					<div className='menu1'>
						<Link to='/'>Job Board</Link>
					</div>
					<div className='menu2'>
						<Link to='/'>Logout</Link>
					</div>
				</div>
			</div>
			<br />
			<br />
			<div className='filter_'>
				<br />
				<div className='filter2_'>
					<span>Open Positions</span>
					<hr />
					{openJob.map((list, i) => {
						if (list.attributes.JobStatus === 'Open') {
							return (
								<div key={i}>
									<span style={{ fontSize: '17px' }}>
										{list.attributes.JobPosition}
									</span>
									<hr />
								</div>
							)
						}
						return null
					})}
				</div>
			</div>
			<div className='job2'>
				<br />
				<br />
				{applicants.map((list, i) => {
					if (list.attributes.Status === 'Pending') {
						return (
							<div key={i}>
								<div className='detaills_'>
									<div className='logo_'></div>
									<div className='description'>
										<span className='span1_'>{list.attributes.Name}</span>
										<span style={{ float: 'right' }}>
											{list.attributes.Status}
										</span>
										<br />
										<span className='span1_'>{list.attributes.Email}</span>
										<textarea
											style={{ borderWidth: '0px' }}
											readOnly
											cols='70'
											rows='3'
										>
											{list.attributes.Message}
										</textarea>
										<center>
											<a
												target='_blank'
												rel='noopener noreferrer'
												href={list.attributes.Portfolio_Link}
											>
												View Portfolio
											</a>
											<br />
											<button
												className='btn-success'
												onClick={() => update(list.id)}
											>
												Approve
											</button>
											<button
												className='btn-danger'
												onClick={() => deleteApplicant(list.id)}
											>
												Decline
											</button>
										</center>
									</div>
								</div>
								<br />
							</div>
						)
					}
					return null
				})}
			</div>
			<div className='filt'>
				<br />
				<div className='filter2_'>
					<span>Post New Position</span>
					<br />
					<br />
					<form className='filter3_' method='get'>
						<input
							type='text'
							onChange={event => setJobTitle(event.target.value)}
							placeholder='Job Title'
							style={{ width: '200px', borderRadius: '10px' }}
						/>
						<input
							type='text'
							onChange={event => setJobCategory(event.target.value)}
							placeholder='Enter Job Category'
							style={{ width: '200px', borderRadius: '10px' }}
						/>
						<br />
						<input
							type='text'
							onChange={event => setJobLocation(event.target.value)}
							placeholder='Location'
							style={{ width: '200px', borderRadius: '10px' }}
						/>
						<br />
						<textarea
							onChange={event => setJobDescription(event.target.value)}
							style={{ width: '200px', borderRadius: '10px' }}
							placeholder='Job description'
						></textarea>
						<br />
						<select
							onChange={event => setJobExperience(event.target.value)}
							className='select'
						>
							<option value='' disabled defaultValue>
								Requirement
							</option>
							<option value='Experience : 0 - 1 year'>
								Experience : 0 - 1 year
							</option>
							<option value='Experience : 1 - 3 years'>
								Experience : 1 - 3 years
							</option>
							<option value='Experience : 4 - 7 years'>
								Experience : 4 - 7 years
							</option>
						</select>
						<br />
						<br />
						<center>
							<button type='button' onClick={addJob} className='form-control'>
								Add Job
							</button>
						</center>
					</form>
				</div>
			</div>
		</div>
	)
}

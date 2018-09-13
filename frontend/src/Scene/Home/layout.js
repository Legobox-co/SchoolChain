import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
	Input,
	Col,
	Row,
	Button,
	Container,
	FormGroup,
	Label
} from "reactstrap"
import './home.css'
import web3 from 'web3';
import {toast} from 'react-toastify';
import { schoolChainContract } from '../../config/web3';

class Scene extends Component {
	constructor(props, context){
		super(props)
		console.log(context);
		this.contracts = context.drizzle.contracts
		this.web3 =context.drizzle.store;
		this.state = {
			vc:null,
			departments: [],
			currentAddress: null
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.createDepartments = this.createDepartments.bind(this);
		this.createLecturer = this.createLecturer.bind(this);
	}


	componentDidMount(props){
		this.getData();
		// this.getDepartments();
	}

	handleTextChange(e){
		this.setState({
			...this.state,
			[e.target.name]:e.target.value
		})
	}


	async getData(){
		try {
			if(this.props.drizzleStatus.initialized){
				//  listen for the various events on the other props
				console.log(schoolChainContract);
				let allresults = [];
				schoolChainContract.events.DepartmentCreated({},{
					fromBlock: 0,
					toBlock: 'latest'
				},function(err, events){
					if(!err){
						console.log(events)
						let result = {
							departmentId:events.returnValues.departmentId,
							departmentName:web3.utils.hexToString(events.returnValues.name)
						};

						allresults.push(result);
					}else{
						console.log(err)
					}
				});


				let res = await this.contracts.SchoolChainCore.methods.vc.call().call()
				if(res){
					console.log(this.web3.getState().accounts[0]);
					this.setState({
						...this.state,
						currentAddress: this.web3.getState().accounts[0],
						vc:res,
						departments: allresults
					})
					console.log(res)
				}
			}
		}catch(err){
			console.log(err);
		}
	}


	async getDepartments(){
		try {
			if(this.props.drizzleStatus.initialized){
				let res = await this.contracts.SchoolChainCore.methods._getDepartment(0).call();
				if(res){
					console.log(web3.utils.hexToString(res))
				}
			}
		}catch(err){
			console.log(err);
		}
	}

	async createDepartments(){
		try {
			if(this.props.drizzleStatus.initialized){
				let hexDepartment = web3.utils.toHex(this.state.departmentName);
				let res = await this.contracts.SchoolChainCore.methods._createDepartment(hexDepartment, this.state.departmentFeecharge).send();
				if(res){
					// @ts-ignore
					toast.success(`✨ your transactions was completed just created a new dept`, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					});

					console.log(res)
				}
			}
		}catch(err){
			console.log(err);
		}
	}

	async createLecturer(){
		try {
			if(this.props.drizzleStatus.initialized){
				if(this.state.selectDepartment){
					let res = await this.contracts.SchoolChainCore.methods._createLecturer(this.state.lecturerAddress, web3.utils.stringToHex(this.state.lecturerName), this.state.selectDepartment).send();
					if(res){
						// @ts-ignore
						toast.success(`✨ your transactions was completed just added a new lecturer to the department`, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true
						});
	
						console.log(res)
					}
				}
				
			}
		}catch(err){
			console.log(err);
		}
	}

	render() {
		const departmentsView = this.state.departments.map(item=>{
			return <li className="App-department-list" key={item.departmentId}>{item.departmentName}</li>
		});

		const departmentsOptions = this.state.departments.map(item=>{
			return <option key={item.departmentId} value={item.departmentId}>{item.departmentName}</option>
		});

		return (
			<React.Fragment>
				<div style={styles.background}>
					<Container>
						<Row>
							<Col md={12}>
							<div className="App">
								<h3 className="App-marginned">Welcome to Schoolchain</h3>
								<p>Abstracting base-level educational infrastructure onto to the blockchain</p>
								<p>Final's Project </p>
								
								<p>The VC's address: {this.state.vc}</p>
								<p> Your address: {this.state.currentAddress}</p>
							</div>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<Col md={6}>
									{/* Creating departments */}
									<Col md={12}>
										<h4>Create department</h4>
										<FormGroup>
											<Label id="departmentName"></Label>
											<Input id="departmetnName" name="departmentName" placeholder="Department name" onChange={this.handleTextChange}/>
										</FormGroup>
										<FormGroup>
											<Label id="departmentFeecharge">Department's Tuition Fee</Label>
											<Input id="departmentFeecharge" name="departmentFeecharge"
											placeholder="Department fee"  onChange={this.handleTextChange}/>
										</FormGroup>
										<FormGroup>
											<Button size="sm" onClick={this.createDepartments}>Create department</Button>
										</FormGroup>
										<hr/>
									</Col>

									{/* Creating Lecturers */}
									<Col md={12}>
										<h4>Create Lecturers</h4>
										<FormGroup>
											<Label id="Select Department"></Label>
											<Input type="select" id="Select Department" onChange={ v => this.handleTextChange(v)} name="selectDepartment" className="App-focus-input">
											<option>Select Department</option>
											{departmentsOptions}
											</Input>
										</FormGroup>
										<FormGroup>
											<Label id="lecturerName">Lecturer's Name</Label>
											<Input id="lecturerName" name="lecturerName"
											placeholder="Enter Lecturer name"  onChange={this.handleTextChange}/>
										</FormGroup>
										<FormGroup>
											<Label id="lecturerAddress">Lecturer's Address</Label>
											<Input id="lecturerAddress" name="lecturerAddress"
											placeholder="Enter Lecturer name"  onChange={this.handleTextChange}/>
										</FormGroup>
										<FormGroup>
											<Button size="sm" onClick={this.createLecturer}>Create lecturers</Button>
										</FormGroup>
									</Col>
								</Col>
								<Col md={6}>
									<h4>Departments in the school</h4>
									<ul>
										{departmentsView}
									</ul>
								</Col>
							</Col>
						</Row>
					</Container>
				</div>
			</React.Fragment>
		)
	}
}

const styles = {
	loginContainer: {
		// float: 'none',
		alignContent: 'center',
	},
	background: {
		width: '100%',
		height: 1000,
		backgroundSize: '100% 1219px',
		backgroundRepeat: 'no-repeat',
		resizeMode: 'cover'
	},
	header: {
		height: 700,
		position: 'absolute',
		width: '100%'
	},
	headerIllustration: {
		position: 'absolute',
		right: 0,
		bottom: 200
	}
}


Scene.contextTypes = {
	drizzle: PropTypes.object
}
export default withRouter(Scene);

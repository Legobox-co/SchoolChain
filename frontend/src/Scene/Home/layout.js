import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert';
import PropTypes from 'prop-types'
import {
	Input,
	Col,
	Row,
	Button,
	Container,
	FormGroup,
	Label,
	Nav,
	NavItem,
	TabPane,
	NavLink,
	CardText,
	CardTitle,
	TabContent
} from "reactstrap"
import './home.css'
import web3 from 'web3';
import {toast} from 'react-toastify';
import { schoolChainContract } from '../../config/web3';
import classnames from 'classnames'

class Scene extends Component {
	constructor(props, context){
		super(props)
		console.log(context);
		this.contracts = context.drizzle.contracts
		this.web3 =context.drizzle.store;
		this.state = {
			activeTab: '1',
			vc:null,
			departments: [],
			sessions:[],
			currentAddress: null,
			levels:[],
			schoolFees:[]
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.createDepartments = this.createDepartments.bind(this);
		this.createLecturer = this.createLecturer.bind(this);
		this.paySchoolFees = this.paySchoolFees.bind(this);
		this.createSession = this.createSession.bind(this);
		this.createStudent = this.createStudent.bind(this);
		this.createLevel = this.createLevel.bind(this);
		this.checkPayment = this.checkPayment.bind(this);
		this.toggle = this.toggle.bind(this);
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

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}


	async getData(){
		try {
			if(this.props.drizzleStatus.initialized){
				//  listen for the various events on the other props
				console.log(schoolChainContract);
				let allresults = [];
				let allSessions = [];
				let allLevels = [];
				let allPayments = [];
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


				schoolChainContract.events.NewSessionCreated({},{
					fromBlock: 0,
					toBlock: 'latest'
				},function(err, events){
					if(!err){
						console.log(events)
						let result = {
							sessionID:events.returnValues.sessionID,
							name:web3.utils.hexToString(events.returnValues.name),
							hostelFee: web3.utils.fromWei(new web3.utils.BN(events.returnValues.hostelFee), 'ether')
						};

						allSessions.push(result);
					}else{
						console.log(err)
					}
				});


				schoolChainContract.events.LevelCreated({},{
					fromBlock: 0,
					toBlock: 'latest'
				},function(err, events){
					if(!err){
						console.log(events)
						let result = {
							id:events.returnValues.levelId,
							name:events.returnValues._name,
							fees: web3.utils.fromWei(new web3.utils.BN(events.returnValues.generalFees), 'ether')
						};

						allLevels.push(result);
					}else{
						console.log(err)
					}
				});

				schoolChainContract.events.SchoolFeesPaid({},{
					fromBlock: 0,
					toBlock: 'latest'
				},function(err, events){
					if(!err){
						console.log(events)
						let result = {
							name:web3.utils.hexToString(events.returnValues.name),
							sessionID: events.returnValues.SessionID,
							studentAddress: events.returnValues.studentAddress
						};

						allPayments.push(result);
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
						departments: allresults,
						sessions: allSessions,
						levels:allLevels,
						schoolFees: allPayments
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
					this.getData()
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
					this.getData()
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
						this.getData()
						console.log(res)
					}
				}

			}
		}catch(err){
			console.log(err);
		}
	}

	async createSession(){
		try {
			if(this.props.drizzleStatus.initialized){
				if(this.state.sessionName && this.state.hostelFee){
					let res = await this.contracts.SchoolChainCore.methods._createSession(web3.utils.stringToHex(this.state.sessionName), this.state.hostelFee).send();
					if(res){
						// @ts-ignore
						toast.success(`✨ You've created a new session`, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true
						});
						this.getData()
						console.log(res)
					}
				}

			}
		}catch(err){
			console.log(err);
		}
	}

	async createLevel(){
		console.log(this.props);
		try {
			if(this.props.drizzleStatus.initialized){
				if(this.state.levelName && this.state.levelFee){
					let res = await this.contracts.SchoolChainCore.methods._createLevel(this.state.levelName, this.state.levelFee).send();
					if(res){
						// @ts-ignore
						toast.success(`✨ You've created a new level`, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true
						});
						this.getData()
						console.log(res)
					}
				}

			}
		}catch(err){
			console.log(err);
		}
	}

	async paySchoolFees(){
		try {
			if(this.props.drizzleStatus.initialized){
				if(this.state.selectDepartment && this.state.selectSession){
					let res = await this.contracts.SchoolChainCore.methods.payTuitionCurrentSession(this.state.selectDepartment, this.state.selectSession).send({value: web3.utils.toWei(new web3.utils.BN(this.state.selectAmount), 'ether') });
					if(res){
						// @ts-ignore
						toast.success(`✨ Your school fees was paid successfully`, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true
						});
						swal("Paid fees", `You've just successfully paid your school fees`, "success");
						this.getData()
						console.log(res)
					}
				}

			}
		}catch(err){
			console.log(err);
		}
	}

	async payHostelFees(){
		try {
			if(this.props.drizzleStatus.initialized){
				if(this.state.selectHostelFee && this.state.selectSession){
					let res = await this.contracts.SchoolChainCore.methods.payHostelAccomodations(this.state.selectSession).send({value: web3.utils.toWei(new web3.utils.BN(this.state.selectHostelFee), 'ether') });
					if(res){
						// @ts-ignore
						toast.success(`✨ Your hostel fees has been paid successfully`, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true
						});
						swal("Paid fees", `Your hostel fees has been paid successfully`, "success");
						this.getData()
						console.log(res)
					}
				}

			}
		}catch(err){
			console.log(err);
		}
	}

	async checkPayment(){
		for(let i = 0; i < this.state.schoolFees.length; i++){
			// check the payment values
			console.log(this.state.schoolFees[i].studentAddress,this.state.studentAddress);
			if(this.state.studentAddress == this.state.schoolFees[i].studentAddress){
				swal("Paid fees", `${this.state.schoolFees[i].name} has paid his fees on the session`, "success");
				break;
			}
		}
	}

	async createStudent(){
		try {
			if(this.props.drizzleStatus.initialized){
				if(this.state.selectStudentDepartment && this.state.studentAddress && this.state.studentName){
					let res = await this.contracts.SchoolChainCore.methods._createStudent(web3.utils.stringToHex(this.state.studentName), this.state.selectStudentDepartment, this.state.studentAddress,this.state.selectLevel).send();
					if(res){
						// @ts-ignore
						toast.success(`✨ your transactions was completed just added a new student to the department`, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true
						});
						this.getData()
						console.log(res)
					}
				}else{
					// @ts-ignore
					toast.error(`✨ Make sure all students properties are set`, {
						position: "bottom-left",
						autoClose: 5000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					});
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

		const sessionsView = this.state.sessions.map(item=>{
			return (<li className="App-department-list" key={item.sessionID}>
								<Col md={12}>{item.name} session</Col>
								<Col md={12}>{item.hostelFee} ethers</Col>
							</li>)
		});

		const levelsView = this.state.levels.map(item=>{
			// return <li className="App-department-list" >{item.name} - {item.fees} ethers</li>
			return (<li className="App-department-list">
								<Col md={12}>{item.name} level</Col>
								<Col md={12}>{item.fees} ethers</Col>
							</li>)
		});

		const feesView = this.state.schoolFees.map(item=>{
			return <li className="App-department-list" key={item.name}>{item.name}</li>
		});

		const levelsOptions = this.state.levels.map(item=>{
			return <option key={item.id} value={item.id}>{item.name}</option>
		});

		const departmentsOptions = this.state.departments.map(item=>{
			return <option key={item.departmentId} value={item.departmentId}>{item.departmentName}</option>
		});

		const sessionOptions = this.state.sessions.map(item=>{
			return <option key={item.sessionID} value={item.sessionID}>{item.name}</option>
		});

		return (
			<React.Fragment>
				<Row style={{backgroundColor: '#2184ff', color: '#fff'}}>
					<Col md={12}>
					<div className="App">
						<h2 className="App-marginned">Welcome to Schoolchain</h2>
						<p>Abstracting base-level educational infrastructure onto to the blockchain</p>
						<p>The VC's address: {this.state.vc}</p>
						<p> Your address: {this.state.currentAddress}</p>
					</div>
					</Col>
				</Row>
				<div style={[styles.background,{marginTop: 20}]}>
					<Container>
						<Row>
							<Col md={12} xs={12} style={{ borderBottom: '1px solid #ededed', paddingBottom: 20 }}>
								<Nav tabs style={{ border: 'none' }}>
									<NavItem>
										<NavLink
											style={{ border: 'none' }}
											className={classnames({ 'Dashb-tab-active': this.state.activeTab === '1' })}
											onClick={() => { this.toggle('1'); }}
										>
											<i className="fa fa-server"></i>
											<span> Fees and Payments</span>
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											style={{ border: 'none' }}
											className={classnames({ 'Dashb-tab-active': this.state.activeTab === '2' })}
											onClick={() => { this.toggle('2'); }}
										>
											<i className="fa fa-cloud-upload"></i>
											<span> School management and Departments</span>
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											style={{ border: 'none' }}
											className={classnames({ 'Dashb-tab-active': this.state.activeTab === '3' })}
											onClick={() => { this.toggle('3'); }}
										>
											<i className="fa fa-heart"></i>
											<span> E-voting</span>
										</NavLink>
									</NavItem>
								</Nav>
							</Col>
							<Col md={12} xs={12} style={{ paddingTop: 20, boxShadow:'0px 3px 3px #202020' }}>
								<TabContent activeTab={this.state.activeTab}>
									<TabPane tabId="1">
										<Row>
											<Col md={12} sm="12">
												<h2>Fees and Payments</h2>
													<Col md={12} style={{padding:0, marginTop: 20}}>
														<Col md={6} style={{padding:0}}>
															{/* Creating departments */}
															<Col md={12}>
																<h4>Pay School Fees</h4>
																<FormGroup>
																	<Label id="Select Session"></Label>
																	<Input type="select" id="Select Department" onChange={ v => this.handleTextChange(v)} name="selectSession" className="App-focus-input">
																	<option>Select Session</option>
																	{sessionOptions}
																	</Input>
																</FormGroup>
																<FormGroup>
																	<Label id="Select Department"></Label>
																	<Input type="select" id="Select Department" onChange={ v => this.handleTextChange(v)} name="selectDepartment" className="App-focus-input">
																	<option>Select Department</option>
																	{departmentsOptions}
																	</Input>
																</FormGroup>
																<FormGroup>
																	<Label id="Amount"></Label>
																	<Input type="number" id="Amount" onChange={ v => this.handleTextChange(v)} name="selectAmount" className="App-focus-input">
																	</Input>
																</FormGroup>
																<FormGroup>
																	<Button size="sm" onClick={this.paySchoolFees}>Pay Fees</Button>
																</FormGroup>
																<hr/>
															</Col>

															{/* Creating check schoolfees */}
															<Col md={12}>
																<h4>Check School fees payment</h4>
																<FormGroup>
																	<Label id="School fees value"></Label>
																	<Input type="text" id="School fees value" onChange={ v => this.handleTextChange(v)} name="studentAddress" className="App-focus-input">
																	</Input>
																</FormGroup>
																<FormGroup>
																	<Button size="sm" onClick={()=>this.checkPayment()}>Check Student Fees</Button>
																</FormGroup>
																<hr/>
															</Col>

															{/* Pay hostel fees */}
															<Col md={12}>
																<h4>Pay hostel fees</h4>
																<FormGroup>
																	<Label id="Select Session"></Label>
																	<Input type="select" id="Select Session" onChange={ v => this.handleTextChange(v)} name="selectSession" className="App-focus-input">
																	<option>Select Session</option>
																	{sessionOptions}
																	</Input>
																</FormGroup>
																<FormGroup>
																	<Label id="Amount"></Label>
																	<Input type="number" id="Amount" onChange={ v => this.handleTextChange(v)} name="selectHostelFee" className="App-focus-input">
																	</Input>
																</FormGroup>
																<FormGroup>
																	<Button size="sm" onClick={()=>this.payHostelFees()}>Check Student Fees</Button>
																</FormGroup>
																<hr/>
															</Col>

														</Col>
														<Col md={6}>
															<ul class="list-group">
															  <li class="list-group-item">
																	<h4>Departments in the school</h4>
																	<ul>
																		{departmentsView}
																	</ul>
																</li>
															  <li class="list-group-item">
																	<h4>Sessions of the school</h4>
																	<ul>
																		{sessionsView}
																	</ul>
																</li>
															  <li class="list-group-item">
																	<h4>Departments in the school</h4>
																	<ul>
																		{departmentsView}
																	</ul>
																</li>
															  <li class="list-group-item">
																	<h4>Levels of the school</h4>
																	<ul>
																		{levelsView}
																	</ul>
																</li>
															  <li class="list-group-item">
																	<h4>Paid fees</h4>
																	<ul>
																		{feesView}
																	</ul>
																</li>
															</ul>
														</Col>
													</Col>
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col md={12} sm="12">
													<h4>School Management and Departments</h4>
													<Col md={12} style={{padding:0, marginTop: 20}}>
														<Col md={6} style={{padding:0}}>
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


															{/* Creating Students */}
															<Col md={12}>
																<h4>Add student</h4>
																<FormGroup>
																	<Label id="selectStudentDepartment">Select department</Label>
																	<Input type="select" id="Select Department" onChange={ v => this.handleTextChange(v)} name="selectStudentDepartment" className="App-focus-input">
																	<option>Select Department</option>
																	{departmentsOptions}
																	</Input>
																</FormGroup>
																<FormGroup>
																	<Label id="Select Level">Select the level</Label>
																	<Input type="select" id="Select Department" onChange={ v => this.handleTextChange(v)} name="selectLevel" className="App-focus-input">
																	<option>Select Level</option>
																	{levelsOptions}
																	</Input>
																</FormGroup>
																<FormGroup>
																	<Label id="studentName">Student's Name</Label>
																	<Input id="studentName" name="studentName"
																	placeholder="Enter Student name"  onChange={this.handleTextChange}/>
																</FormGroup>
																<FormGroup>
																	<Label id="studentAddress">Student's Address</Label>
																	<Input id="studentAddress" name="studentAddress" placeholder="Enter Student Address"  onChange={this.handleTextChange}/>
																</FormGroup>
																<FormGroup>
																	<Button size="sm" onClick={this.createStudent}>Create Student</Button>
																</FormGroup>
															</Col>

															{/* Creating Sessions */}
															<Col md={12}>
																<h4>Create Session</h4>
																<FormGroup>
																	<Label id="session">Session name</Label>
																	<Input id="session" name="sessionName"
																	placeholder="Enter session name"  onChange={this.handleTextChange}/>
																</FormGroup>
																<FormGroup>
																	<Label id="hostelFee">Hostel Fee charge</Label>
																	<Input id="hostelFee" name="hostelFee"
																	placeholder="Enter hostel fee" type="number" onChange={this.handleTextChange}/>
																</FormGroup>

																<FormGroup>
																	<Button size="sm" onClick={this.createSession}>Create Session</Button>
																</FormGroup>
															</Col>

															{/* Creating Sessions */}
															<Col md={12}>
																<h4>Create Level</h4>
																<FormGroup>
																	<Label id="levelName">Level name</Label>
																	<Input id="levelName" name="levelName"
																	placeholder="Enter level number" type="number"  onChange={this.handleTextChange}/>
																</FormGroup>
																<FormGroup>
																	<Label id="levelFee">School fees for Level</Label>
																	<Input id="levelFee" name="levelFee"
																	placeholder="Enter school fees for levels" type="number" onChange={this.handleTextChange}/>
																</FormGroup>

																<FormGroup>
																	<Button size="sm" onClick={this.createLevel}>Create Level</Button>
																</FormGroup>
															</Col>
														</Col>
														<Col md={6}>
															<ul class="list-group">
															  <li class="list-group-item">
																	<h4>Departments in the school</h4>
																	<ul>
																		{departmentsView}
																	</ul>
																</li>
															  <li class="list-group-item">
																	<h4>Sessions of the school</h4>
																	<ul>
																		{sessionsView}
																	</ul>
																</li>
															  <li class="list-group-item">
																	<h4>Departments in the school</h4>
																	<ul>
																		{departmentsView}
																	</ul>
																</li>
															  <li class="list-group-item">
																	<h4>Levels of the school</h4>
																	<ul>
																		{levelsView}
																	</ul>
																</li>
															  <li class="list-group-item">
																	<h4>Paid fees</h4>
																	<ul>
																		{feesView}
																	</ul>
																</li>
															</ul>
														</Col>
													</Col>
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col md={12} sm="12">
												<h4>E-voting stuffs</h4>
												<Col md={12} sm={12} style={{padding:0,marginTop:34}}>
													Evoting and management
												</Col>
											</Col>
										</Row>
									</TabPane>
								</TabContent>
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

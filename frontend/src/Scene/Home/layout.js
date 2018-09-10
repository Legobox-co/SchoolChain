import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
	Input,
	Col,
	Card,
	Row,
	Button,
	Container,
} from "reactstrap"
import './home.css'
import web3 from 'web3';
import {toast} from 'react-toastify';

class Scene extends Component {
	constructor(props, context){
		super(props)
		console.log(context);
		this.contracts = context.drizzle.contracts

		this.state = {
			vc:null
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.createDepartments = this.createDepartments.bind(this);
	}

	componentDidMount(props){
		this.getData();
		this.getDepartments();
	}

	static defaultProps = {

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
				let res = await this.contracts.SchoolChainCore.methods.vc.call().call();
				if(res){
					this.setState({
						...this.state,
						vc:res
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
					// this.setState({
					// 	...this.state,
					// 	vc:res
					// })
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
					// this.setState({
					// 	...this.state,
					// 	vc:res
					// })
					toast.success({...res});
					console.log(res)
				}
			}
		}catch(err){
			console.log(err);
		}
	}

	render() {
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
							</div>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<h2>Create department</h2>
								<Input name="departmentName" placeholder="Department name" onChange={this.handleTextChange}/>
								<Input name="departmentFeecharge"
								placeholder="Department fee"  onChange={this.handleTextChange}/>
								<Button size="sm" onClick={this.createDepartments}>Create department</Button>
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

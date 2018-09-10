import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  NavbarBrand,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  Container,
  DropdownMenu,
  Collapse
} from "reactstrap";
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';

class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
			toggle: false,
			projectToggle:false
		}
		this.navigateTo = this.navigateTo.bind(this);
	}


	dropdown(){
		this.setState({
			toggle: !this.state.toggle
		});
	}

	navigateTo(value){
		console.log(value);
		const {history} = this.props;
		history.push(value);
	}

	render(){

		return (
			<React.Fragment>
				<Navbar className="App-navbar" color="transparent" light expand="md">
					<Container>
                    <NavbarBrand style={{ cursor: 'pointer' }} onClick={()=> this.props.history.push('/home')}>
                    <img src={require('../assets/logo.png')} width={30}/>
                    </NavbarBrand>
						<NavbarToggler onClick={this.dropdown}></NavbarToggler>
							<Collapse isOpen={this.state.toggle} navbar>
								<Nav className="ml-auto">
								</Nav>
							</Collapse>
					</Container>
				</Navbar>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

export default connect(mapStateToProps)(withRouter(Header));
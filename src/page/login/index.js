import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';

import test from '@img/test.png';
import * as actions from './actions';
import style from './style.scss';

@connect(
	state => state,
	dispatch => ({actions: bindActionCreators(actions, dispatch)}),
)
class Login extends Component {
	constructor(props) {
		super(props);
		console.log(this);
	}

	goToPage = () => {
		const { history } = this.props;
		history.push({pathname: '/home', query: {page: 1}});
	}

	render() {
		return (
			<div>
				{/* <DatePicker /> */}
				<Button type="primary" onClick={this.goToPage}>Primary</Button>
				<h1 className={style.login}>Login</h1>
				<img src={test} width='50px' height='50px' alt='' />
			</div>
		);
	}
}

export default Login;

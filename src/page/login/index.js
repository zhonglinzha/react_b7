import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
// import * as qs from 'qs';
// import { Base64 } from 'js-base64';
import base64 from 'base-64';

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
		history.push({pathname: '/home', search: base64.encode({a: { c: '1'}, b: 2})});
	}

	render() {
		return (
			<div>
				{/* <DatePicker /> */}
				<Button type="primary" onClick={this.goToPage}>Primary</Button>
				<h1 className={style.login}>Login</h1>
				<img src={test} width='50px' height='50px' alt='' />
				<div className={style.but}>123</div>
			</div>
		);
	}
}

export default Login;

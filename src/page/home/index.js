import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import style from './style.scss';

@connect(
	state => state,
	dispatch => ({actions: bindActionCreators(actions, dispatch)}),
)
class Home extends Component {
	constructor(props) {
		super(props);
		console.log(this);
	}

	render() {
		return (
			<div>
				<h1 className={style.home}>Home</h1>
			</div>
		);
	}
}

export default Home;

// 这是自动生成的文件，可以修改。

import * as types from './constants';

const initialState = {
	login: '2',
};

const loginReducer = (state = initialState, { type, data }) => {
	switch (type) {
		case types.LOGIN:
			return { ...state, ...data};
		default:
			return state;
	}
};

export default loginReducer;

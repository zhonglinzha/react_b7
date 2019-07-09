// 这是自动生成的文件，可以修改。

import * as types from './constants';

const initialState = {
	about: '3',
};

const aboutReducer = (state = initialState, { type, data }) => {
	switch (type) {
		case types.ABOUT:
			return { ...state, ...data};
		default:
			return state;
	}
};

export default aboutReducer;

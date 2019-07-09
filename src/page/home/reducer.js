// 这是自动生成的文件，可以修改。

import * as types from './constants';

const initialState = {
	home: '1',
};

const homeReducer = (state = initialState, { type, data }) => {
	switch (type) {
		case types.HOME:
			return { ...state, ...data};
		default:
			return state;
	}
};

export default homeReducer;

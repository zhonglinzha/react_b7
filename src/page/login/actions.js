// 这是自动生成的文件，可以修改。
import * as type from './constants';

const login = data => ({
	type: type.LOGIN,
	data,
});

const loginAction = param => (dispatch, getState) => new Promise(() => {
	getState();
	dispatch(login(param));
});

export { loginAction };

// 这是自动生成的文件，可以修改。
import * as type from './constants';

const home = data => ({
	type: type.HOME,
	data,
});

const homeAction = param => (dispatch, getState) => new Promise(() => {
	getState();
	dispatch(home(param));
});

export { homeAction };

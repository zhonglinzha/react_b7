// 这是自动生成的文件，可以修改。
import * as type from './constants';

const about = data => ({
	type: type.ABOUT,
	data,
});

const aboutAction = param => (dispatch, getState) => new Promise(() => {
	dispatch(about(param));
});

export { aboutAction };

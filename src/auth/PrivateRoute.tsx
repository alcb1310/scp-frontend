import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateStatus } from '../api/connection';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const storeData = useSelector((state: any) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	useEffect(() => {
		validateStatus({
			token: storeData.token,
			type: storeData.type,
		}).then((data) => {
			dispatch({
				type: 'users/SetCurrentUser',
				payload: data.data.detail,
			});
		}).catch((err) => {
			navigate('/')
		})
	}, []);

	return children;
};

export { PrivateRoute };

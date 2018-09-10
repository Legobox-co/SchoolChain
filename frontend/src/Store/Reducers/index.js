import reduceReducers from "../../Utils/reduce-reducers";
import initialState from './inital-state';
import actionType from '../action-type';
import _ from 'lodash';

const INITIAL_STATE = initialState;


let authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionType.LOGGED_IN:
			return {
				...state,
				isAuthenticated: true
			};
		case actionType.LOGGED_OUT:
			return {
				...this.state,
				isAuthenticated: false
			}
		case actionType.SET_REDIRECT_URL:
			return {
				...state,
				redirectUrl: action.payload
			}
		default: return state;
	}
};


let projectReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionType.CHANGE_PROJECT:
			// get the project corresponding then set it to current project
			try{
				return {...state}
			}catch(err){
				return {...state}
			}
		case actionType.ADD_SERVER:
			try{
				return {...state}
			}catch(err){
				console.log(err);
				return {...state}
			}
		default: return state;
	}
};

const rootReducer = reduceReducers(
	authReducer,
	projectReducer
);

export default rootReducer;

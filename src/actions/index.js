import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder'

//Action Creator
export const fetchPostsAndUsers = () => async (dispatch, getState) =>{
    await dispatch(fetchPosts());  //When we call action creator inside another one,
    // we must Make sure we dispatch the result of calling the other action creator

 /*  const userIds =  _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));*/ // Different way to do Below

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value()

};

//Action Creator
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({type: 'FETCH_POSTS', payload: response.data });

};

//Action Creator

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch ({ type: 'FETCH_USER', payload: response.data });
};



//MEMOIZED VERSION APPROACH

//CAN ONLY FETCH EACH USER EXACTLY ONE TIME. not good if user has updated/changed
/*export const fetchUser = (id) =>  dispatch => {
    _fetchUser(id,dispatch);
};
const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch ({ type: 'FETCH_USER', payload: response.data });
});*/


    //BAD approach!!! braking rules of action creator. MUST USE Redux-Thunk Middleware
/*  const response = await jsonPlaceholder.get('./posts');
    dispatch({
            type: 'FETCH_POSTS',
            payload: {response}
        }; })
};*/

import history from '../history';
import streams from '../apis/streams';
import { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM 
} from "./types";


interface FormValues {
    title:string; 
    description:string;
}


export const signIn = (userId:string) => {
    return {
        type: SIGN_IN,
        payload:userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues:FormValues) => async (dispatch:Function,getState:Function) => {
    
    const { userId } = getState().auth
    
    const response = await streams.post('/streams', {...formValues, userId });


    dispatch({type: CREATE_STREAM, payload: response.data})

    history.push('/');
};

export const fetchStreams = () => async (dispatch:Function) => {
    const response = await streams.get('/streams');
    

    dispatch({type: FETCH_STREAMS, payload: response.data})
};

export const fetchStream = (id:number) => async (dispatch:Function) => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({type: FETCH_STREAM, payload: response.data})
};

export const editStream = (id:number,formValues:FormValues) => async (dispatch:Function) => {
    const response = await streams.patch(`/streams/${id}`,formValues);

    dispatch({type: EDIT_STREAM, payload: response.data})

    history.push('/');
};

export const deleteStream = (id:number) => async (dispatch:Function) => {
    await streams.delete(`/streams/${id}`);

    dispatch({type: DELETE_STREAM, payload: {id} })

    history.push('/');
};

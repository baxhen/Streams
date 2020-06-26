import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { State, StreamState } from '../../interfaces';
import { editStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';



export interface MyProps {
    editStream(id:number,formValues:FormValues):void;
    fetchStream(id:number):void;
    match:{
        params:{
            id:number;
        }
    }
    stream:StreamState;
}
export interface FormValues {
     title?:string; 
     description?:string;
 }




class StreamEdit extends React.Component <MyProps> {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues:FormValues) => {          
       this.props.editStream(this.props.match.params.id,formValues);       
    }

 

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
           <div>
               <h3>Edit a Stream</h3>
               <StreamForm
               initialValues={_.pick(this.props.stream, 'title', 'description')} 
               onSubmit={this.onSubmit} 
               />
           </div>
        );
    }
}


const mapStateToProps = (state:State, ownProps:MyProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps,{ editStream, fetchStream })(StreamEdit);
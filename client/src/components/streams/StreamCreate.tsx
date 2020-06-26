import React from 'react';
import { createStream } from '../../actions';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';


interface MyProps {
    createStream(formValues:FormValues):void;
}
interface FormValues {
     title?:string; 
     description?:string;
 }




class StreamCreate extends React.Component <MyProps> {

    onSubmit = (formValues:FormValues) => {
        this.props.createStream(formValues);
        
    }    

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}





export default connect(null,{ createStream })(StreamCreate);
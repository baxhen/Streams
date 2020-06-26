import React from 'react';
import { Field, reduxForm ,InjectedFormProps } from 'redux-form';
import { FormProps, Meta } from '../../interfaces';




interface MyProps {
    onSubmit(formValues:FormValues):void;
}
interface FormValues {
     title?:string; 
     description?:string;
 }




class StreamForm extends React.Component <MyProps & InjectedFormProps<{},MyProps>> {

    onSubmit = (formValues:FormValues) => {
        this.props.onSubmit(formValues);
        
    }

    renderError(meta:Meta) {

        const { error, touched } = meta;
        
        if(touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        };

    }

    renderInput = (formProps:FormProps) => {
        const { input, label, meta } = formProps 
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;      
        return (
            <div className={className}>
                <label htmlFor="title">{ label }</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues:FormValues) => {
    const errors = {title:'', description:''};
    if(!formValues.title) {
        errors.title = 'You must enter a title';
    } else if(!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
}

export default reduxForm<{},MyProps>({
    form: 'streamForm',
    validate
})(StreamForm);


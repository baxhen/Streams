import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { MyProps, State } from '../../interfaces'
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions'
import { Link } from 'react-router-dom';





class StreamDelete extends React.Component <MyProps> {   

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (id:number) => {
        this.props.deleteStream(id)
    }
    


    renderActions() {
        const { id } = this.props.match.params
        return (
            <>
                <button onClick={() => this.onSubmit(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete this stream with title: ${this.props.stream.title}?`
    }
    

    render() {
        
        return (                          
                <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
                />           
        );
    }
};

const mapStateToProps = (state:State, ownProps:MyProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream})(StreamDelete);
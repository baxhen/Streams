import React, { createRef } from 'react';
import flv from 'flv.js';
import { fetchStream } from '../../actions';
import { connect } from 'react-redux';
import { MyProps, State } from '../../interfaces';

interface Player {
    attachMediaElement(mediaElement:HTMLMediaElement):void,
    load():void
}


class StreamShow extends React.Component <MyProps> {

    videoRef:any;
    player:any;

   constructor(props:MyProps) {
       super(props)
       const { id } = this.props.match.params;

       this.videoRef = createRef<HTMLVideoElement>();
       
   }
   

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer();   
        
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    buildPlayer() {        
        if (this.player || !this.props.stream) {
            return;
        } 
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
            });
        
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();        
    }

    render(){

        const { stream } = this.props

        if(!stream) {
            return <div></div>
        }
        

        return (

            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls ></video>
                <h1>{stream.title}</h1>
                <h5>{stream.description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state:State, ownProps:MyProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);
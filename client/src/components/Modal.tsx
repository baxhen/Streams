import React from 'react';
import ReactDOM from 'react-dom';


interface Modal {
    title:string;
    content:string;
    actions:any;
    onDismiss():void;
}

const Modal = (props:Modal) => {
    const { title, content, actions, onDismiss } = props;
    const modal = document.querySelector('#modal')
    if(modal){
        return ReactDOM.createPortal(
            <div 
            onClick={onDismiss} 
            className="ui dimmer modals visible active"
            >
                <div onClick={(e)=> e.stopPropagation()} className="ui standard modal visible active">
                    <div className="header">{title}</div>
                    <div className="content">
                        {content}
                    </div>
                    <div className="actions">
                        {actions}
                    </div>
                </div>
            </div>,
            modal
            
        );
    } 

    return null;
    
}

export default Modal;
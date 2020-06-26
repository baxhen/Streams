import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { State } from '../interfaces';


declare global {
    interface Window { gapi: any;  }
    
}


interface MyProps {
    signIn(userId:string):void;
    signOut():void;
    isSignedIn:boolean | null;
}

class GoogleAuth extends React.Component<MyProps> {
    
    
    

    componentDidMount() {
        
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:'896609340030-d8nfgs69h1j0i6f332h8phunesj3ghov.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                const auth = window.gapi.auth2.getAuthInstance();
                const userId = auth.currentUser.get().getId()
                this.onAuthChange(auth.isSignedIn.get(),userId);
                auth.isSignedIn.listen(() => this.onAuthChange(auth.isSignedIn.get(),userId));
            });
        });
    }

    onAuthChange = (isSignedIn:boolean,userId:string) => {        
        if(isSignedIn) {
            this.props.signIn(userId);
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        const auth = window.gapi.auth2.getAuthInstance();
        auth.signIn();

    };

    onSignOutClick = () => {
        const auth = window.gapi.auth2.getAuthInstance();
        auth.signOut();

    };

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out                   
                </button>
            );
        }

        return (
            <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google                 
            </button>
        );
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    };
};

const mapStateToProps = (state: State) => {
    return { isSignedIn: state.auth.isSignedIn} 
}


export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
import React from 'react';
import {Redirect} from 'react-router-dom';
function Protected(props) {
    console.log(props.copmponents)
    var auth =JSON.parse(localStorage.getItem('auth'))
    console.log(localStorage.getItem('auth'));
    const Component = props.copmponents;
        return (
            <div>
                {auth ? <Component/>: <Redirect to="login" ></Redirect>}
            </div>
        );
}

export default Protected;
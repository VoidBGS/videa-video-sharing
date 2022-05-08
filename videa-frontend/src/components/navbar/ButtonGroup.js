import React from 'react';

const ButtonGroup = (props) =>{
    return (
        <div className='button-group-box mr-2 flex center'>
            {props.children}
        </div>
    );
}

export default ButtonGroup;
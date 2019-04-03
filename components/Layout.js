import React from 'react';

export default () => {
    return (
        <div>
            <h1>I'm a header</h1>
            {props.children}
            <h1>I'm a footer</h1>
        </div>
    );
};
import {Alert} from 'react-bootstrap';
import React from 'react';

const createAlert = (variant, message) => {
    const variantHeadings = {
        success: 'Successful!',
        danger: 'Error!',
        info: 'Information'
    };
    return (
        <Alert variant={variant} dismissible="true"> 
            <Alert.Heading>{ variantHeadings[variant] }</Alert.Heading>
            <p className="small">{message} </p>
        </Alert>
    );
}

export default createAlert;

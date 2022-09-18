import React from 'react';
import {Alert} from "react-bootstrap";

type AlertProps = {
    variant: string,
    setShow(isShow: boolean): void,
    heading: string
}


const AlertForm: React.FC<AlertProps> = ({variant, setShow, heading}):JSX.Element => {
    return (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{heading}</Alert.Heading>
        </Alert>
    );
};

export default AlertForm;
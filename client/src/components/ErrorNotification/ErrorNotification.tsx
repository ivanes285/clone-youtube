import React from 'react';
import { ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export interface ErrorNotificationInterface {
	position?: string;
}

const ErrorNotification : React.FC<ErrorNotificationInterface> = ({position}) => {
	return <ToastContainer position={position as ToastPosition} autoClose={2000} hideProgressBar={true}  newestOnTop={false}
	closeOnClick theme="light"/>
};


export default ErrorNotification;

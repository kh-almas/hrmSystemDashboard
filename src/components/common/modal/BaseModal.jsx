import React from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";

const BaseModal = ({title, children, dataModal, dataToggle}) => {
    return (
        <>
            <Modal isOpen={dataModal} toggle={dataToggle}>
                <ModalHeader toggle={dataToggle}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </Modal>
        </>
    );
};

export default BaseModal;
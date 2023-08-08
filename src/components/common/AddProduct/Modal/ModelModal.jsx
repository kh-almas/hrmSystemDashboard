import React from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Input from "../../modal/Input";
import Textarea from "../../modal/Textarea";
import {useForm} from "react-hook-form";

const ModelModal = ({ modal, toggle }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Model</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input
                                labelName={"Name"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter model name"}
                                validation={{ ...register("name", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Textarea
                                labelName={"Description"}
                                inputName={"description"}
                                height={"5"}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button color="danger" onClick={toggle} className="me-2">
                                Cancel
                            </Button>
                            <Button color="primary" type="submit">
                                Create
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModelModal;
import React from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import Input from "../../modal/Input";
import Textarea from "../../modal/Textarea";
import {useForm} from "react-hook-form";
import Select from "../../modal/Select";

const SubCategoryModal = ({ modal, toggle }) => {
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
                <ModalHeader toggle={toggle}>Add Sub-category</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input
                                labelName={"Name"}
                                inputName={"name"}
                                inputType={"text"}
                                placeholder={"Enter sub-category name"}
                                validation={{ ...register("gift", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Input
                                labelName={"Code"}
                                inputName={"code"}
                                inputType={"text"}
                                placeholder={"Enter sub-category code"}
                                validation={{ ...register("gift", { required: true }) }}
                            />
                        </div>
                        <div>
                            <Select
                                name={"category"}
                                labelName={"Select Parent Category"}
                                placeholder={"Select a option"}
                                options={["category1", "category2", "category3"]}
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

export default SubCategoryModal;
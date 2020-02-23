import React from 'react';
import {MODAL_ADD, MODAL_EDIT, MODAL_SHOW} from "../../Constants";
import DrivingCourseData from "./DrivingCourseData";
import CreateDrivingCourse from "./CreateDrivingCourse";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/es/Modal";


const DrivingCourseModal = (props) => {
    const {modalType, drivingCourse, close, save, userId} = props;

    const getComponent = () => {
        if (modalType === MODAL_SHOW) {
            return <DrivingCourseData drivingCourse={drivingCourse}/>
        } else if (modalType === MODAL_EDIT || modalType === MODAL_ADD) {
            return <CreateDrivingCourse drivingCourse={drivingCourse} userId={userId} type={modalType} close={close}/>
        } else {
            console.log("Invalid value for modal type");
            return <div></div>
        }
    };

    return (
        <Modal show={modalType !== ""}  animation={true} size="lg">
            <Modal.Header>
                <Modal.Title> Возачки курс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {getComponent()}
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-danger" onClick={close}>Затвори</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DrivingCourseModal;
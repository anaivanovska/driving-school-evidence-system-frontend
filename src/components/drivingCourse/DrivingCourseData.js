import React from 'react';
import VehicleData from "../vehicle/VehicleData";
import MedicalCertificateData from "./medicalCertificate/MedicalCertificateData";
import QualificationData from "./qualification/QualificationData";
import TrialTestData from "./trialTest/TrialTestData";

const DrivingCourseData = ({drivingCourse}) => {

    return (
        <div>
            <div className="row">
                <h5 className="col-3"> Реден број: </h5>
                <div className="col-9">{drivingCourse.ordinalNumber}</div>
            </div>
            <hr className="border"/>
            <div className="row">
                <h5 className="col-3"> Предавач: </h5>
                <div className="col-9">{drivingCourse.lecturer.firstName} {drivingCourse.lecturer.lastName}</div>
            </div>
            <hr className="border"/>
            <div className="row">
                <h5 className="col-3"> Возило: </h5>
                <VehicleData vehicle = {drivingCourse.vehicle} className="col-9" />
            </div>
            <hr className="border"/>
            <div className="row">
                <h5 className="col-3"> Медицинско уверение: </h5>
                <MedicalCertificateData medicalCertificate = {drivingCourse.medicalCertificate} className="col-9" />
            </div>
            <hr className="border"/>
            <div className="row">
                <h5 className="col-3"> Теориско оспособување: </h5>
                {drivingCourse.qualifications !== undefined && drivingCourse.qualifications.size >= 1 && <QualificationData qualification={drivingCourse.qualifications[0]} className="col-9" />}
            </div>
            <hr className="border"/>
            <div className="row">
                <h5 className="col-3"> Практично оспособување: </h5>
                {drivingCourse.qualifications !== undefined && drivingCourse.qualifications.length <= 2 && <QualificationData qualification={drivingCourse.qualifications[1]} className="col-9" />}
            </div>
            <hr className="border"/>
            <div className="row">
                <h5 className="col-3"> Пробен тест: </h5>
                {drivingCourse.trialTests !== undefined && drivingCourse.trialTests.length >= 1 && <TrialTestData trialTest={drivingCourse.trialTests[0]} className="col-9" />}
            </div>
        </div>
    );

};

export default DrivingCourseData;
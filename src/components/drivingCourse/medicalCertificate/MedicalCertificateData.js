import React from 'react';


const MedicalCertificateData = ({medicalCertificate}) => {
    return (
        <div>
            <div className="row">
                <div className="col-7"> Број на уверение: </div>
                {medicalCertificate.number && <div className="col-5"> {medicalCertificate.number} </div>}
            </div>
            <div className="row">
                <div className="col-7"> Датум на издавање: </div>
                {medicalCertificate.issueDate && <div className="col-5"> {medicalCertificate.issueDate} </div>}
            </div>
            <div className="row">
                <div className="col-7"> Место на издавање: </div>
                {medicalCertificate.issuePlace && <div className="col-5"> {medicalCertificate.issuePlace} </div>}
            </div>
        </div>
    );
}

export default MedicalCertificateData;
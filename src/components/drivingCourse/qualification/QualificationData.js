import React from 'react';


const QualificationData = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col-7"> Тип: </div>
                {props.type && <div className="col-5"> {props.type}</div>}
            </div>
            <div className="row">
                <div className="col-7"> Датум на почнување: </div>
                {props.startDate && <div className="col-5"> {props.startDate} </div>}
            </div>
            <div className="row">
                <div className="col-7"> Датум на завршување: </div>
                {props.endDate && <div className="col-5"> {props.endDatе} </div>}
            </div>
            <div className="row" >
                <div className="col-7"> Вкупен број на часови: </div>
                {props.totalHours && <div className="col-5"> {props.totalHours} </div>}
            </div>
        </div>
    );
}

export default QualificationData;

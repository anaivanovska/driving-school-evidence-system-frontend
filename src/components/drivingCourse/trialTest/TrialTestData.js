import React from 'react';


const TrailTestData = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col-6"> Број на тест: </div>
                {props.testNumber && <div className="col-6"> {props.testNumber} </div>}
            </div>
            <div className="row">
                <div className="col-6"> Датум на полагање: </div>
                {props.examinationDate && <div className="col-6"> {props.examinationDate} </div>}
            </div>
            <div className="row">
                <div className="col-6"> Поени: </div>
                {props.points && <div className="col-6"> {props.points} </div>}
            </div>
        </div>
    );
}

export default TrailTestData;

import React from 'react';


const VehicleData = ({vehicle}) => {

    return (
        <div>
            <br/>
            <div className="row">
                <div className="col-7"> Тип на возило: </div>
                <div className="col-5"> {vehicle.type} </div>
            </div>
            <div className="row">
                <div className="col-7"> Марка: </div>
                <div className="col-5"> {vehicle.brand} </div>
            </div>
            <div className="row">
                <div className="col-7"> Број на регистрација: </div>
                <div className="col-5"> {vehicle.registrationNumber} </div>
            </div>
            <div className="row">
                <div className="col-7"> Име на категорија: </div>
                <div className="col-5"> {vehicle.categoryName} </div>
            </div>
        </div>
    );
}

export default VehicleData;

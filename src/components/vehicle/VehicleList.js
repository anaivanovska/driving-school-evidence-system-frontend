import React from 'react';
import { connect} from 'react-redux';
import {fetchAllVehicles} from "../../actions/vehicle";
import Vehicle from "./Vehicle";
import {Card, Button} from 'react-bootstrap'

class VehicleList extends React.Component {
    componentWillMount() {
        this.props.getAllVehicles();
    }

    handleOnClick = () => {
        const {push, location} = this.props;
        push(location.pathname + "/newVehicle");
    };

    render() {
        const {vehicles} = this.props;
        return (
            <Card>
                <Card.Header>
                    Возила
                </Card.Header>
                {(vehicles == undefined || vehicles.length == 0) &&
                <Card.Body>
                    <p>
                        Не се пронајдени возила.
                    </p>
                    <p>
                        За да додадете ново возило притиснете на копчето
                    </p>
                </Card.Body>
                }
                {vehicles.length > 0 &&
                <Card.Body>
                    <table className="table" style={{border: 0}}>
                        <thead>
                        <tr>
                            <th scope="col-2">Марка</th>
                            <th scope="col-4">Тип</th>
                            <th scope="col-4">Регистрација</th>
                            <th scope="col-4">Дата на регистрирање</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            vehicles.map(vehicle => {
                                return (
                                    <Vehicle key={vehicle.registrationNumber} {...vehicle} />
                                );
                            })
                        }
                        </tbody>
                    </table>
                </Card.Body>
                }
                <Card.Footer>
                    <Button variant="secondary" onClick={this.handleOnClick}> Ново возило </Button>
                </Card.Footer>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        vehicles: state.vehicleList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllVehicles: () => dispatch(fetchAllVehicles())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList)


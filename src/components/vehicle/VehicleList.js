import React from 'react';
import {connect} from 'react-redux';
import {fetchAllVehiclesPagination} from "../../actions/vehicle";
import Vehicle from "./VehicleRow";
import {Button} from 'react-bootstrap'
import '../../index.css'
import {DEFAULT_PAGE_SIZE, Roles, SERVER_URL} from "../../Constants";
import Pagination from 'react-js-pagination';
import pageHOC from "../custom/pageHOC";


class VehicleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        }
    }

    fetchVehicles = () => {
        const {activePage} = this.state;
        this.props.getVehicles(activePage - 1);
    };

    handlePageChange = (pageNumber) => {
        if (this.state.activePage != pageNumber) {
            this.setState(
                {
                    activePage: pageNumber
                },
                () => {
                    this.fetchVehicles();
                }
            )
        }
    };

    componentWillMount() {
        this.fetchVehicles();
    }

    handleOnClick = () => {
        const {history, location} = this.props;
        history.push(location.pathname + "/new");
    };


    render() {
        const {activePage} = this.state;
        const {role} = this.props.match.params;
        const {totalElements, content} = this.props.vehicles;
        console.log("Vehicle list");
        console.log(role)
        return (
            <div>
                {(totalElements == undefined || totalElements == 0) &&
                <div>
                    <p>
                        Не се пронајдени возила.
                    </p>
                </div>
                }
                {totalElements > 0 &&
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Марка</th>
                            <th scope="col">Тип</th>
                            <th scope="col">Регистрација</th>
                            <th scope="col">Дата на регистрирање</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            content.map(vehicle => {
                                return (
                                    <Vehicle key={vehicle.registrationNumber} {...vehicle} />
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
                }
                <div className="card-footer row justify-content-between align-items-center">
                    {(totalElements !== undefined && totalElements > 0) &&
                    <Pagination
                        innerClass="custom-pagination col-3"
                        activePage={activePage}
                        onChange={this.handlePageChange}
                        totalItemsCount={totalElements}
                        itemsCountPerPage={DEFAULT_PAGE_SIZE}
                    />}
                    <br/>
                    {role === Roles.admin &&
                    <Button variant="secondary" onClick={this.handleOnClick}> Ново возило </Button>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({vehicleList}) => {
    return {
        vehicles: vehicleList.pagination
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getVehicles: (pageNumber) => dispatch(fetchAllVehiclesPagination(pageNumber))
    }
};

const VehicleListScene = pageHOC(connect(mapStateToProps, mapDispatchToProps)(VehicleList));
export default VehicleListScene;


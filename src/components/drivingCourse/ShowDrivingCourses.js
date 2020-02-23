import React from 'react';
import {axiosAuthenticated} from "../../service/UserAuthentication";
import {DEFAULT_PAGE_SIZE, MODAL_ADD, MODAL_EDIT, MODAL_SHOW, Roles, SERVER_URL} from "../../Constants";
import DrivingCourseRow from "./DrivingCourseRow";
import DrivingCourseModal from "./DrivingCourseModal";
import pageHOC from "../custom/pageHOC";
import Pagination from "react-bootstrap/es/Pagination";

class ShowDrivingCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drivingCourses: {},
            activePage: 1,
            modalType: "",
            selectedDrivingCourse: {}
        }
    }

    componentWillMount() {
       this.fetchCourses();
    }

    toggleModal = (modalType, selectedDrivingCourse) => {
        console.log("Toggle modal");
        console.log(modalType);
        console.log(selectedDrivingCourse)
        this.setState({
          modalType,
          selectedDrivingCourse
        })
        console.log(this.state);
    };

    fetchCourses = () => {
        const {activePage} = this.state;
        const {userId} = this.props;
        let url = SERVER_URL + "/api/drivingCourse/all";
        if (userId) {
            url += `/${userId}`
        }
        url += `?page=${activePage-1}`;

        axiosAuthenticated().get(`${url}`)
            .then(response => {
                this.setState({
                    drivingCourses: response.data
                })
            }).catch(error => alert(error));
    };


    handlePageChange = (pageNumber) => {
        if (this.state.activePage != pageNumber) {
            this.setState(
                {
                    activePage: pageNumber
                },
                () => {
                    this.fetchCourses();
                }
            )
        }
    };

    handleRemove = (drivingCourseId) => {
        axiosAuthenticated().delete(`${SERVER_URL}/api/drivingCourse/remove/${drivingCourseId}`)
            .then(response => {
                this.fetchCourses();
            })
            .catch(error => {
                throw(error);
            })
    }

    render() {
        const {activePage, drivingCourses, modalType, selectedDrivingCourse} = this.state;
        const {role, userId} = this.props.match.params;
        const {totalElements, content} = drivingCourses;
        return (

            <div className="col-10 ml-6 mt-5">
                <div>
                    <div>
                        {(totalElements === undefined || totalElements === 0) &&
                        <div>
                            Не постојат возачки курсеви.
                        </div>
                        }
                        {(totalElements !== undefined && totalElements > 0) &&
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Реден број</th>
                                <th scope="col">Категорија</th>
                                <th scope="col">Возило</th>
                                <th scope="col">Предавач</th>
                                <th scope="col"></th>
                                {role === Roles.admin && <th scope="col"></th>}
                                {role === Roles.admin && <th scope="col"></th>}

                            </tr>
                            </thead>
                            <tbody>
                            {
                                content.map(drivingCourse => {
                                    return (
                                        <DrivingCourseRow key={drivingCourse.id} role={role} drivingCourse={drivingCourse} handleOnClick={() => this.toggleModal(MODAL_SHOW, drivingCourse)}
                                                 handleRemove={(drivingCourseId) => this.handleRemove(drivingCourseId)} handleEdit={() => this.toggleModal(MODAL_EDIT, drivingCourse)}/>
                                    );
                                })
                            }
                            </tbody>
                        </table>

                        }
                    </div>
                    <div className="card-footer w-100 row justify-content-between align-items-center">
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
                        <button className="btn btn-secondary btn-lg h-50px col-1" onClick={() => this.toggleModal(MODAL_ADD, {})}>
                            Додај</button>}
                    </div>
                </div>
                <DrivingCourseModal role={role} modalType={modalType} drivingCourse={selectedDrivingCourse} userId={userId} close={() => this.toggleModal("",{})}/>
            </div>
        );
    }

}
const ShowDrivingCoursesPage = pageHOC(ShowDrivingCourses);
export default ShowDrivingCoursesPage;
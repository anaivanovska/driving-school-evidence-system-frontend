import React, {Component} from 'react';
import SideNav, {Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../../index.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { faUser, faCar, faCaravan, faUsers, faChalkboardTeacher, faCog, faFont} from '@fortawesome/free-solid-svg-icons'
import SearchComponent from "../custom/SearchComponent";
import {Roles} from "../../Constants";

const pageHOC = (WrappedComponent) => {
    return (
        class extends Component {
            handleSelected = (selected) => {
                const pathname = this.props.location.pathname;
                if (!pathname.includes(selected)) {
                    return pathname + '/' + selected
                }

                return pathname
            };
            render() {
                const role = this.props.match.params.role;
                return (
                    <div>
                        <SearchComponent/>
                        <div className="row">
                            <SideNav
                                onSelect={(selected) => {
                                    if (selected === 'profile') {
                                        this.props.history.push(this.handleSelected(selected) + '/' + role);
                                    } else if (selected === 'instructors' || selected ==='candidate') {
                                        this.props.history.push(this.handleSelected(selected) + '/all');
                                    } else {
                                        this.props.history.push(this.handleSelected(selected))
                                    }
                                }}
                                className="col-2 blue-background"
                            >

                                <SideNav.Nav defaultSelected="profile">
                                    <div className="text-white mb-5 row mt-4">
                                        <FontAwesomeIcon icon={faCaravan} className="h1 ml-5 col-3 mt-3 fa"/>
                                        <h5 className="col-7">Систем за евиденција на кандидати</h5>
                                    </div>
                                    <NavItem eventKey="profile" active={true}>
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faUser} className="text-white" />
                                        </NavIcon>
                                        <NavText>
                                            Профил
                                        </NavText>
                                    </NavItem>
                                    {role !== Roles.instructor.toLowerCase() && <NavItem eventKey="instructor" style={{display: "block"}}>
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faChalkboardTeacher} className="text-white" />
                                        </NavIcon>
                                        <NavText>
                                            Инструктор
                                        </NavText>
                                    </NavItem>}
                                    {role !== Roles.candidate.toLowerCase() &&
                                    <NavItem eventKey="candidate" style={{display: "block"}}>
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faUsers} className="text-white"/>
                                        </NavIcon>
                                        <NavText>
                                            Кандидати
                                        </NavText>
                                    </NavItem>
                                    }
                                    <NavItem eventKey="vehicles" style={{display: "block"}}>
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faCar} className="text-white" />
                                        </NavIcon>
                                        <NavText>
                                            Возила
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="categories" style={{display: "block"}}>
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faFont} className="text-white" />
                                        </NavIcon>
                                        <NavText>
                                            Категории
                                        </NavText>
                                    </NavItem>
                                    <NavItem eventKey="settings" style={{display: "block"}}>
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faCog} className="text-white" />
                                        </NavIcon>
                                        <NavText>
                                            Подесувања
                                        </NavText>
                                    </NavItem>
                                </SideNav.Nav>
                            </SideNav>
                            <div className="col-8 ml-10 mt-5">
                                <WrappedComponent {...this.props}/>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    );

};

export default pageHOC;
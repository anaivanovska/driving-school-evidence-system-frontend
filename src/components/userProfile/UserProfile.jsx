import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchUserByUsername} from "../../actions/user";
import CategoryList from "../category/CategoryList";

const UserProfile = ({history, user}) => {
        return (
            <div className="row">
                <div className="card col-4">
                    <div className="card-header">
                    </div>
                    <div className="card-body">
                        {user.firstName &&
                            <div className="row">
                                <div className="col-5">
                                    Име:
                                </div>
                                <div className="col-5">
                                    {user.firstName}
                                </div>
                            </div>
                        }
                        {user.lastName &&
                            <div className="row">
                                <div className="col-5">
                                    Презиме:
                                </div>
                                <div className="col-5">
                                    {user.lastName}
                                </div>
                            </div>
                        }
                        {user.parentName &&
                            <div className="row">
                                <div className="col-5">
                                    Име на родител:
                                </div>
                                <div className="col-5">
                                    {user.parentName}
                                </div>
                            </div>
                        }
                        {user.embg &&
                            <div className="row">
                                <div className="col-5">
                                    ЕМБГ:
                                </div>
                                <div className="col-5">
                                    {user.embg}
                                </div>
                            </div>
                        }
                        {user.gender &&
                            <div className="row">
                                <div className="col-5">
                                    Пол:
                                </div>
                                <div className="col-5">
                                    {user.gender}
                                </div>
                            </div>
                        }
                        {user.proffession &&
                            <div className="row">
                                <div className="col-5">
                                    Професија:
                                </div>
                                <div className="col-5">
                                    {user.proffession}
                                </div>
                            </div>
                        }
                        {user.birthDate &&
                            <div className="row">
                                <div className="col-5">
                                    Дата на раѓање:
                                </div>
                                <div className="col-5">
                                    {user.birthDate}
                                </div>
                            </div>
                        }
                        {user.birthPlace &&
                            <div className="row">
                                <div className="col-5">
                                    Место на раѓање:
                                </div>
                                <div className="col-5">
                                    {user.birthPlace}
                                </div>
                            </div>
                        }
                        {user.address &&
                            <div className="row">
                                <div className="col-5">
                                    Адреса на живеење:
                                </div>
                                <div className="col-5">
                                    {user.address}
                                </div>
                            </div>
                        }
                        {user.email &&
                            <div className="row">
                                <div className="col-5">
                                    Емаил адреса:
                                </div>
                                <div className="col-5">
                                    {user.email}
                                </div>
                            </div>
                        }
                        {user.phoneNumber &&
                            <div className="row">
                                <div className="col-5">
                                    Телефонски број:
                                </div>
                                <div className="col-5">
                                    {user.phoneNumber}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="card-footer">
                    </div>
                </div>
                <div className="col-4">
                    <CategoryList {...history}/>
                </div>
    </div>)
};


const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(UserProfile);
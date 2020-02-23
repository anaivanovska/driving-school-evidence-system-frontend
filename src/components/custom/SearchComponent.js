import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import {faSearch} from '@fortawesome/free-solid-svg-icons'



class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleChange = (value) => {
        this.setState({
            value
        })
    }



    render () {
        const {value} = this.state;
        console.log("Value" + value);

        return (
            <div className="row blue-background w-100 h-60px justify-content-center pt-2 pb-3">
                <form>
                    <div className="input-group-append">
                        <input type="text" className="form-control" value={value} placeholder="Search ..." onChange={(event) => this.handleChange(event.target.value)}/>
                        <FontAwesomeIcon icon={faSearch} className="text-white mt-2 ml-1 h4"/>
                    </div>
                </form>
            </div>
        )
    }

}

export default SearchComponent;
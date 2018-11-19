import React, { Component}  from 'react';
import { Button, Thumbnail, Col } from "react-bootstrap";
import LoginService from '../service/login-service';

class Getdata extends Component {
    constructor() {
        super();
        this.state = {
            pictures: [],
        };
    }

    componentDidMount() {
        const LoginServiceInstance = new LoginService();
        LoginServiceInstance.getUser().then(result => {
            return result;
        }).then(data => {
            let pictures = data.results.map((pic) => {
                return(
                    { 'pic':pic.picture.large,
                      'name':`${pic.name.title} ${pic.name.first} ${pic.name.last}`,
                      'email': pic.email 
                    }
                )
            })
            this.setState({pictures: pictures, name : pictures});
            console.log("state", this.state.pictures);
        })
    };

    render() {
        return(
            this.state.pictures.map( pic => 
                <Col xs={6} md={4}>
                    <Thumbnail src={pic.pic} alt="242x200">
                        <h3> {pic.name} </h3>
                        <p>{pic.email}</p>
                        <p>
                        <Button bsStyle="primary">Seguir</Button>
                        &nbsp;
                        <Button bsStyle="default">Mensaje</Button>
                        </p>
                    </Thumbnail>
                </Col>
            )   
        )
    }
}

export default Getdata;
import React, { Component } from "react";
import { Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';


export default class MessageComponent extends Component{
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      message: "",
      error: false,
      myData: []
    }; 
  }

  render() {
    return (
      this.state.myData.map( mess => 
        <Col xs="2" sm="2" md="2">
          <Card>
            <CardImg top width="100%" src={mess.foto} alt="Card image cap" />
            <CardBody>
              <CardTitle> {mess.email}  </CardTitle>
              <CardSubtitle>{mess.date}</CardSubtitle>
              <CardText>{mess.message}</CardText>
            </CardBody>
          </Card>
        </Col> 
      )
    )
  }
}
      
    
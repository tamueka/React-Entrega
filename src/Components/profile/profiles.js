import React from 'react';
import { Col} from 'reactstrap';
import store from 'store'
import './profile.css'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: store.get('User').name.title + ' ' + store.get('User').name.first + ' ' + store.get('User').name.last,
      email: store.get('User').email ,
      location:  store.get('User').location.street,
      photo:  store.get('User').picture.large,
      myData: [],
      res: []
    }
  }

  componentWillMount() { 
    const getToken = store.get('loggedIn');
    if(!getToken) { 
      this.props.history.replace({pathname: '/Login'}); 
  }} 

  componentDidMount () {
    const myData =  store.get('message') || [{ email: store.get('User').email, message:'Mensaje de prueba', date: '2018-11-18', foto:store.get('User').picture.large }] ;
    var result = []
    result = myData.filter(newe => newe.email === this.state.email )
    this.setState({res:result });
  }
  
  render() {
    return (
      <div className="Row">
        <Col xs="12" sm="12" md="12">
          <article id="top" className="wrapper style1">
            <div className="container">
              <div className="row">
                <div className="col-4 col-5-large col-12-medium">
                  <span className="image fit"><img src={ this.state.photo } alt="" /></span>
                </div>
                <div className="col-8 col-7-large col-12-medium text-center">
                  <header>
                    <h1><strong>{ this.state.name }</strong>.</h1>
                  </header>
                  <p>{this.state.email}</p>
                  <p>{this.state.location}</p>
                </div>
              </div>
            </div>
          </article>
        </Col>
        <Col xs="4" sm="4" md="4"></Col>
        <Col className="Row">
          <section id="timeline">
            { this.state.res  && 
              this.state.res.map( mess => 
                <article key={mess.message}>
                  <div className="inner">
                    <span className="date">
                      <span className="day">{ new Date(mess.date).getDate()}<sup>th</sup></span>
                      <span className="month">{new Date(mess.date).getMonth()}</span>
                      <span className="year">{new Date(mess.date).getFullYear()}</span>
                    </span>
                    <h2>{mess.email}</h2> 
                    <p> {mess.message}</p>
                  </div>
                </article>
            )}
          </section>
        </Col>
    </div>
    );
  }
}

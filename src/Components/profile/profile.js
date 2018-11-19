import React from 'react';
import { Col } from 'reactstrap';
import LoginService from '../../service/login-service';
import store from 'store'
import './profile.css'


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     user: [],
     name: '',
     locations: '',
     picture: '',
     emaul: '',
     following: [],
     myData: [],
     res: [],
    }
  }

  componentWillMount() { 
    const getToken = store.get('loggedIn');
    if(!getToken) { 
       this.props.history.replace({pathname: '/Login'}); 
  }} 

  componentDidMount () {
    const { handle } = this.props.match.params
    const myData =  store.get('message') || [{ email: store.get('User').email, message: 'Mensaje de prueba', date: '2018-11-18', foto:store.get('User').picture.large }] ;
    const follow =  store.get('following') || {user:store.get('User').email, followed: 'louane.vidal@example.com', date: '2018-11-18'} ;
    this.setState({following: follow});
    var result = []
    result = myData.filter(newe => newe.email === handle )
    this.setState({myData});
    this.setState({res:result });
    const LoginServiceInstance = new LoginService();
    LoginServiceInstance.Profile(handle).then(result => {
      return result;
    }).then(data => {
      this.setState({ error: false });
      if (!data) {
        this.setState({ redirectToReferrer: false });
        return this.setState({ error: true });
      }
    const name = data.name.title + ' ' + data.name.first + ' ' + data.name.last
    this.setState({ user: name, email: data.email, location: data.location.street, picture: data.picture.large  });
    })
  }

  render() {
    return (
      <div className="Row">
        <Col xs="12" sm="12" md="12">
          <article id="top" className="wrapper style1">
            <div className="container">
              <div className="row">
                <div className="col-4 col-5-large col-12-medium">
                  <span className="image fit"><img src={ this.state.picture } alt="" /></span>
                </div>
                <div className="col-8 col-7-large col-12-medium text-center">
                  <header>
                    <h1><strong>{ this.state.user }</strong>.</h1>
                  </header>
                  <p>{this.state.email}</p>
                  <p>{ this.state.location}</p> 
                </div>
              </div>
            </div>
          </article>
        </Col>
        <Col xs="4" sm="4" md="4"></Col>
        <Col className="Row">
          {this.state.myData   ? 
            <section id="timeline">
            {this.state.res && this.state.following   && 
            this.state.res.map( mess => 
              this.state.following.find(foll => foll.followed === mess.email & foll.user === store.get('User').email  )  ? 
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
              </article> : <Col className="textr" xs="12" sm="12" md="12">user not followed</Col> 
            )}
            </section>:<h1>no tienes mensajes</h1> }  
        </Col>
      </div>
    );
  }
}

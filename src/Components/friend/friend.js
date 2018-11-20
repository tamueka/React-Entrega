import React, { Component}  from 'react';
import { Col,Card,  CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Link} from 'react-router-dom'
import './friend.css'
import store from 'store';


class friend extends Component {
    constructor(props) {
        super(props);
        this.follow = this.follow.bind(this); 
        this.state = {
            pictures: [],
            following_list:[],
            myData: [],
            res: [],
            email: [],
            showResults: false             
        };
    }

    componentDidMount() {
        const data = require('../../Data/user.json')
        var  res = []
        data.results.map((pic)  => {
            store.get('following').map((foll) => {
            if(pic.email === foll.followed && store.get('User').email === foll.user && foll.state !== 'refuse' )
                res.push(pic)
                return res    
            })
            return res
        })
        let pictures = res.map((pic) => {
            return(
                { 'pic':pic.picture.large,
                'name':`${pic.name.title} ${pic.name.first} ${pic.name.last}`,
                'email': pic.email }  
            )
            })
        this.setState({pictures: pictures, name : pictures});
    };

    componentWillMount() { 
        const getToken = store.get('loggedIn');
        const follwed = store.get('following') 
        this.setState({following_list: follwed  });
        if(!getToken) { 
           this.props.history.replace({pathname: '/Login'}); 
        }} 

    follow = user =>  {
        const today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();          
        store.set('following', {user:store.get('User').email, followed: user, date: date })
        var myData_post =  this.state.following_list;
        myData_post.push(store.get('following'));
        this.setState({ following_list:   myData_post });
        store.set('following',this.state.following_list)
        this.state.res.push(myData_post)
    }

    render() {
        return(
            this.state.pictures &&
            this.state.pictures.map( pic => 
                <Col key={pic.email} className="div" xs={2} md={2} xl={2}>
                    <Card>
                        <CardBody>
                            <CardTitle>{pic.name}</CardTitle>
                            <CardSubtitle> </CardSubtitle>
                            </CardBody>
                                <CardImg width="100%" src={pic.pic}  alt="Card image cap" />
                            <CardBody>
                            <CardText>{pic.email}</CardText>
                            {this.state.following_list.length > 0  && this.state.following_list.find(foll => foll.followed === pic.email & foll.user === store.get('User').email & foll.state === 'accepted'  )  ? 
                                <Link to={'/Profile/' + pic.email } >  Profile  </Link> :null        
                            } 
                            {this.state.following_list.length > 0  && this.state.following_list.find(foll => foll.followed === pic.email & foll.user === store.get('User').email & foll.state === 'sent'  )  ? 
                                 <p className="status">  Sent Requests  </p> :null                
                            } 
                        </CardBody>
                    </Card>       
                </Col>
            ) 
            
        )
    }
}

export default friend;
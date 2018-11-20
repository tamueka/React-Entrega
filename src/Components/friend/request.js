import React, { Component}  from 'react';
import { Col,Card,  CardImg, CardText, CardBody, CardTitle, CardSubtitle , Button} from 'reactstrap';
import './friend.css'
import store from 'store';


class Home extends Component {
    constructor(props) {
        super(props);
        this.Request_ac = this.Request_ac.bind(this);
        this.Request_de = this.Request_de.bind(this);  
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
        store.get('following').map((foll)  => {
            data.results.map((pic) => {
            if(store.get('User').email === foll.followed && foll.state === 'sent' && pic.email === foll.user)
            {
                res.push(pic)
                return res  
            }     
            else{
                return res  
                }
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

    Request_ac = user =>  {
        var myData_post =  this.state.following_list;
        for (var i in myData_post) {
            if (myData_post[i].user === user && myData_post[i].followed === store.get('User').email ) {
                myData_post[i].state = "accepted";
            }
            if (myData_post[i].user === store.get('User').email && myData_post[i].followed === user ) {
                myData_post[i].state = "accepted";
            }
        }
        store.set('following',this.state.following_list)
        this.state.res.push(myData_post)
        this.setState({ following_list:   myData_post });
    }

    Request_de = user =>  {
        var myData_post =  this.state.following_list;
        for (var i in myData_post) {
            if (myData_post[i].user === user && myData_post[i].followed === store.get('User').email ) {
                myData_post[i].state = "refuse";
            }
            if (myData_post[i].user === store.get('User').email && myData_post[i].followed === user ) {
                myData_post[i].state = "refuse";
            }
        }
        store.set('following',this.state.following_list)
        this.state.res.push(myData_post)
        this.setState({ following_list:   myData_post });
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
                            {this.state.following_list.length > 0  && this.state.following_list.find(foll => foll.followed === store.get('User').email & foll.user === pic.email & foll.state === 'sent'  )  ? 
                                <div><Button className="btn" size="lg" color="info" onClick={() => this.Request_ac(pic.email)}>Accept </Button> 
                                <Button className="btn" size="lg" color="danger" onClick={() => this.Request_de(pic.email)}>Cancel</Button> </div>
                                : null        
                            } 
                        </CardBody>
                    </Card>       
                </Col>
            ) 
            
        )
    }
}

export default Home;
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import moment from "moment";
import Pusher from 'pusher-js';
import { Button, notification } from 'antd';
const myContext = React.createContext();


export const googleVM = '35.234.217.67:80/';

const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };


const openNotification = (data) => {
    console.log(data);
    const key = `open${Date.now()}`;
    console.log(data['timeSlot']);
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Confirm
      </Button>
    );
    notification.open({
      message: `Your ticket for slots ${data['timeSlot']} has been confirmed at ${data['venueId']['venueName']}`,
      description:
        `Your booked for the event ${data['venueId']['eventType']} Ticket Price is ${data['soldPrice']} at ${data['date']}
        If you need more details about the venue you can contact to ${data['venueId']['venueContact']}
        `,
      btn,
      key,
      onClose:close,
      duration:0
    });
  };

class ContextProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            location:'',
            price:0,
            selectNumberOfSeats:1,
            date:moment().format('YYYY-MM-DD'),
            eventType:'',
            venues:'',
            bookedSlots:[],
            selectedRowKeys: [], // Check here to configure the default column,
            selectedRows: [],
            selectedData:[],
            token:localStorage.getItem("token") || "",
            fastFilling:false,
            soldPrice:0,
            couponId:'5d4a3b3c3d428b2456ed2288',
            ticketId:'',
            email:''
         }
         this.handleButtonClick = this.handleButtonClick.bind(this);
         this.handleLocationClick = this.handleLocationClick.bind(this);
         this.handleEventTypeClick = this.handleEventTypeClick.bind(this);
         this.onChange = this.onChange.bind(this);
         this.updateBookings = this.updateBookings.bind(this);
         this.updateticketId = this.updateticketId.bind(this);
        // this.openNotification = this.openNotification.bind(this);
         //this.close = this.close.bind(this);

    }
    componentDidMount(){
        //if(this.state.location==='' && this.state.date==='' && this.state.eventType===''){
        fetch(`http://${googleVM}/user/venues/all`)
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                venues:data
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    changePrice = () => {
        if(this.state.fastFilling){
        this.setState({fastFilling:false});
        this.setState({
            price: this.state.selectedData.reduce((acc, curr) => acc + parseInt(curr.price), 0)
            })
        }
        else{
        this.setState({fastFilling:true});
        this.setState({
          price: Math.max(...this.state.selectedData.map(sel => sel.price))
        });
        }
      };
      decrement = () => {
        if (this.state.selectNumberOfSeats > 0)
          this.setState({
            selectNumberOfSeats: this.state.selectNumberOfSeats - 1
          });
      };
      increment = () => {
        this.setState({ selectNumberOfSeats: this.state.selectNumberOfSeats + 1 });
      };
     handleButtonClick(e) {
        //message.info('Click on left button.');
        //console.log('searching data');
        /*console.log(this.state.location,this.state.eventType
            ,this.state.date);*/

        var data = {
            location:this.state.location,
            eventType:this.state.eventType,
            date:this.state.date,
        }
        fetch(`http://${googleVM}/user/venues/search/`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                venues:data.filteredVenues
            })
        })
        .catch(err=>{
            console.log(err);
        })

    }
     handleLocationClick(e) {
        // message.info('Click on menu item.');
        this.setState({
            location:e.key
        })
     }

     onChange(date, dateString) {
       //  console.log(date,dateString);
        this.setState({
            date:dateString
        })
    }
    handleEventTypeClick(e){
        //console.log('click event',e);
        this.setState({
            eventType:e.key
        })
    }
    updateBookings(selectedRowKeys){
        console.log(selectedRowKeys);
        /*this.setState({
            bookedSlots:bookings
        })*/
       /* this.setState({
            bookedSlots:bookings
        })*/
    }


    onSelectChange = (selectedRowKeys, selectedRows) => {
        //  console.log("selectedRowKeys changed: ", selectedRowKeys, selectedRows);
        this.setState({
          selectedRowKeys,
          selectedData: selectedRows,
          price: selectedRows.reduce((acc, curr) => acc + parseInt(curr.price), 0)
        });
    }

    updateticketId = (ticketId) => {
        this.setState({ticketId:ticketId});
    }

    signup = (userInfo) => {
        /*return axios.post("localhost:5000/user/signup", userInfo)
            .then(response => {
                //const { user, token } = response.data
                //localStorage.setItem("token", token);
                //localStorage.setItem("user", JSON.stringify(user));
                /*this.setState({
                    user,
                    token
                });
                // forward the response, just in case
                // it's needed down the promise chain
                return response;*/
              //  console.log(response);
            //})
            console.log(userInfo);
            return fetch(`http://${googleVM}/user/signup`,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(userInfo)
                })
                .then(response=>response.json())
                .catch(err=>{
                    console.log(err)
                })

            }

    login = (credentials) => {
        /*return axios.post("https://localhost:5000/user/login", credentials)
            .then(response => {
              /*  const { token, user } = response.data;
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                this.setState({
                    user,
                    token
                });
                */
                /*// Don't forget to get this newly-logged-in user's todos!
                this.getTodos();
                return response;*/
               // console.log(response);
           // })
           console.log(credentials);
           return fetch(`http://${googleVM}/user/login`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(credentials)
            })
            .then(response=>response.json())
            .then(data=>{
                const {token,body} = data;
                localStorage.setItem("token",token);
                this.setState({
                    token,
                    email:body['email']
                });
                console.log(data,this.state.email);
                return data;
            })
            .catch(err=>{
                console.log(err);
            })

    }
    updateNumberOfSeats = e => {
        if (e.target.value)
          this.setState({
            selectNumberOfSeats: parseInt(e.target.value)
          });
        else
          this.setState({
            selectNumberOfSeats: ""
          });
      }

    logout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState({
            token: ""
        })
    }



    render() {
        console.log(this.state);
        Pusher.logToConsole = true;
        var pusher = new Pusher('2650b5b1610744e74733',{
            cluster:'ap2',
            forceTLS:true
        });
        var channel = pusher.subscribe('booking');
        channel.bind(this.state.email,function(data){
            const st = JSON.stringify(data);
            const s = JSON.parse(st);
            console.log(s);
            openNotification(s.message);
            //alert(data);
            console.log(data);
        })
        return (
            <myContext.Provider value={{
                ...this.state,
                handleButtonClick:this.handleButtonClick,
                handleLocationClick:this.handleLocationClick,
                handleEventTypeClick:this.handleEventTypeClick,
                onChange:this.onChange,
                updateBookings:this.updateBookings,
                onSelectChange:this.onSelectChange,
                signup:this.signup,
                login:this.login,
                logout:this.logout,
                updateNumberOfSeats:this.updateNumberOfSeats,
                changePrice:this.changePrice,
                increment:this.increment,
                decrement:this.decrement,
                updateticketId:this.updateticketId

            }}>
                {this.props.children}
            </myContext.Provider>
         );
    }
}

export const withContext = Component => {
    return props => {
        return (
            <myContext.Consumer>
                {
                    globalState => {
                        return (
                            <Component
                                {...globalState}
                                {...props}
                            />
                        )
                    }
                }
            </myContext.Consumer>
        )
    }
}

const ContextConsumer = myContext.Consumer;


export {ContextConsumer,ContextProvider,myContext}
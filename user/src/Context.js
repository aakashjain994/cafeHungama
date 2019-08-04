import React, { Component } from 'react';
import axios from 'axios';
const myContext = React.createContext();

class ContextProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            location:'',
            price:0,
            selectNumberOfSeats:1,
            date:'',
            eventType:'',
            venues:'',
            bookedSlots:[],
            selectedRowKeys: [], // Check here to configure the default column,
            selectedRows: [],
            selectedData:[],
            token:localStorage.getItem("token") || ""
         }
         this.handleButtonClick = this.handleButtonClick.bind(this);
         this.handleLocationClick = this.handleLocationClick.bind(this);
         this.handleEventTypeClick = this.handleEventTypeClick.bind(this);
         this.onChange = this.onChange.bind(this);
         this.updateBookings = this.updateBookings.bind(this);

    }
    componentDidMount(){
        //if(this.state.location==='' && this.state.date==='' && this.state.eventType===''){
        fetch(`https://cafehungama.herokuapp.com/user/venues/all`)
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
        this.setState({
          price: Math.max(...this.state.selectedData.map(sel => sel.price))
        });
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
        fetch(`https://cafehungama.herokuapp.com/user/venues/search/`,{
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
            return fetch(`http://localhost:5000/user/signup`,{
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
           return fetch(`http://localhost:5000/user/login`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(credentials)
            })
            .then(response=>response.json())
            .then(data=>{
                const {token} = data;
                localStorage.setItem("token",token);
                this.setState({
                    token
                });
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
                decrement:this.decrement


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
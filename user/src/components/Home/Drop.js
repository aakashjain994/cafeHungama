import React from 'react';
import { Menu, Dropdown, Button, Icon, message, DatePicker } from 'antd';
import './Home.css'
import {ContextConsumer} from '../../Context';



const menu = (
    <ContextConsumer>
        {
            (value)=>{
                return (<Menu onClick={value.handleLocationClick}>
                <Menu.Item key="delhi">
                    Delhi
            </Menu.Item>
                <Menu.Item key="hyderabad">
                    Hyderabad
            </Menu.Item>
                <Menu.Item key="mumbai">
                    Mumbai
            </Menu.Item>
                <Menu.Item key="bangalore">
                    Bangalore
            </Menu.Item>
            </Menu>)
            }
        }

    </ContextConsumer>

);
const menu2 = (
    <ContextConsumer>
        {(value)=>{
            return (
            <Menu onClick={value.handleEventTypeClick}>
            <Menu.Item key="comedy">
                <Icon type="smile" />
                Comedy
        </Menu.Item>
            <Menu.Item key="movie">
                <Icon type="video-camera" />
                Movie
        </Menu.Item>
        </Menu>);
        }
        }

    </ContextConsumer>
);
class Drop extends React.Component{
    render(){
        return(
            <React.Fragment>
            <ContextConsumer>
            {
                (value)=>{
                    console.log(value);
                    return (
                        <div className="loc-event-date" >
                        <Dropdown overlay={menu} >
                            <Button className="butcss" size="large">
                                {(value.location===''?"Location":value.location)}<Icon type="down" />
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={menu2}>
                            <Button className="butcss" size="large">
                                {(value.eventType===''?"Event Type":value.eventType)} <Icon type="down" />
                            </Button>
                        </Dropdown>
                        <DatePicker size="large" onChange={value.onChange} className="butcss" />
                        <Button onClick = {value.handleButtonClick} className="butcss" size="large" style={{ background:'#cfcebe'}}>
                            Search
                        </Button>
                    </div>
                    );
                }

            }
            </ContextConsumer>
            </React.Fragment>
        )
    }

    }
   export default Drop;
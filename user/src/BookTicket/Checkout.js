import React,{Component} from 'react';
import {Row,Col} from 'antd';
import {Card,Button} from 'antd';
import './Checkout.css';
import { ContextConsumer } from '../Context';
import googleVM from '../Context';
import CountDown from 'ant-design-pro/lib/CountDown';
import {withContext} from '../Context';
import Pusher from 'pusher-js';
class Checkout extends Component{

    constructor(props){
        super(props);
        this.state={
            data:[{
                slot:'12-13',
                price:100,
                left:'12/15',
                remaining:'3'
            },
            {
                slot:'12-13',
                price:100,
                left:'12/15',
                remaining:'3'
            }]

    }
    }
    Request = () => {
        console.log(this.props.ticketId);
        const ticketInfo = {
            ticketId:this.props.ticketId
        }
        const bearer = 'Bearer ' + this.props.token;
        fetch(`http://${googleVM}/user/bookings/delete`,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":bearer
                },
                body:JSON.stringify(ticketInfo)
                })
                .then(response=>response.json())
                .catch(err=>{
                    console.log(err)
                })

    }
    confirm = () => {
        const ticketInfo = {
            ticketId:this.props.ticketId,
            fastFilling:this.props.fastFilling
        }
        const bearer = 'Bearer ' + this.props.token;
        fetch(`http://${googleVM}/user/bookings/confirm`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "Authorization":bearer
            },
            body:JSON.stringify(ticketInfo)
            })
            .then(response=>response.json())
            .then(data=>console.log(data))
            .catch(err=>{
                console.log(err)
            })

    }
    render(){
        const {data} = this.state;
        const targetTime = new Date().getTime() + 180000;

        return(
            <ContextConsumer>
                {(value)=>{
                    console.log(value.selectedData);
                    return (
                        <div>
                        <Row type="flex" justify="end">
                            <Button  size="large" style={{background:'red',fontSize:20,paddingLeft:'10%',paddingRight:'10%',color:'white'}}>
                                <span>START PAYMENT IN</span>
                                <CountDown onEnd = {this.Request} style={{marginLeft:'5%'}} target={targetTime} />
                            </Button>

                        </Row>
                        <h2 style={{textAlign:'center'}}>Pay for your selected slots</h2>
                        <div style={{width:'75%',margin:'auto'}}>
                        {value.selectedData.map(d=>(
                            <Row type="flex" justify="space-between" className="checkout" >
                            <Col span={4} style={{fontSize:17}}>{d.name}</Col>
                            <Col span={4} style={{fontSize:17}}>{d.price}</Col>
                            <Col span={4} style={{fontSize:17}}>{d.address} filled</Col>
                            <Col span={4} style={{fontSize:17}}>{d.remaining}</Col>
                            </Row>
                        ))}
                        </div>
                        <Card size="small" bordered={false} style={{ width: 300,margin:'auto' }}>
                            <Row type="flex" justify="space-between" >
                            <p>Total Amount</p>
                            <p>{value.price}</p>
                            </Row>
                            <Row type="flex" justify="space-between" >
                            <p>Voucher</p>
                            <p>{value.voucherId || 'NA'}</p>
                            </Row>
                            <Row type="flex" justify="space-between" >
                            <p>Coupon</p>
                            <p>{value.couponId || 'NA'}</p>
                            </Row>

                            <Button onClick={this.confirm} type="primary">Pay</Button>
                        </Card>
                    </div>
                    )

                }

                }

            </ContextConsumer>

        )
    }
}

export default withContext(Checkout);
import React from 'react';
import {Form,Button,Select,Checkbox,Row,Col,Input} from 'antd';
import './Modal.css';
import API from '../../api/API';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
let childrenloc = [];
let childrencity = []; 
let childrenamenties = []; 

class Demo extends React.Component {
  state ={
    venueName:"",
    venueContact:"",  
    city:"",
    state:"",
    pinCode:"",
    noOfScreens: "",
    line1:"",
    landmark:"",
    eventType:"",
    amenities:[],
    image:"",
    locality:"",
    localities:[],
    cities: [],
    country: "India",
    amentiess:[]      // retrieving amenties from superadmin api
  }
  
  componentDidMount(){
    API
    .get(`/superadmin/superadminid/localities/get`)
    .then(res=>{
      res.data.map(response => {
        console.log(response.locality)
        childrenloc.push(<Option key={response.locality}>{response.locality}</Option>)
      })
      //this.setState({ localities: childrenloc });
      
       // childrenloc.push(<Option key={this.state.localities}>{this.state.localities}</Option>);
    
    }
    );
    //console.log(this.state.localities);
    API.get(`/user/cities/get`
    ).then(res =>{
      res.data.map(response => {
        childrencity.push(<Option key={response.city}>{response.city}</Option>)
      })
     // this.setState({ cities:childrencity})
    //  console.log(res.data[0]);
    //  childrencity.push(<Option key={this.state.cities}>{this.state.cities}</Option>);

    });
    API.get(`/user/amenities/get`
    ).then(res =>{
      /* this.setState({amentiess: res.data.amenity_name})
      console.log(res.data.amenity_name);
      console.log(this.state.amentiess); */
      res.data.map(response=>{
        childrenamenties.push(response.amenity_name)   
      })
    //  this.setState({amentiess:childrenamenties})
     })
  }
  onInputChange =e=>{
    this.setState({
      [e.target.name]: e.target.value
    });
    //console.log(this.state.amenties);
  }
  onAmentiesChange =e =>{
    //console.log(e);
   this.setState({
     amenities: e//.target.checked ? this.state.amentiess.amenity_name : []
   }//,()=>console.log(this.state.amenties)
   )
  }
  onCityChange = e => {
    this.setState({
      city: e
    });
    console.log(e);
  }
  onLocalityChange = e =>{
    this.setState ({
      locality:e
    });
    console.log(e);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const data=[];
    data.push({
      venueName: this.state.venueName,
      venueContact: this.state.venueContact,
      city: this.state.city,
      line1: this.state.line1,
      pinCode: this.state.pinCode,
      noOfScreens: this.state.noOfScreens,
      landmark: this.state.landmark,
      eventType: this.state.eventType,
      amenities: this.state.amenities,
      image: this.state.image,
      locality: this.state.locality,
      country: "India",
      state: this.state.city
    })
    console.log(data.amenities);
    this.props.onSubmit(data);
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Row>
          <Col span={12}>
        <Form.Item label="Name">
        {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your name',
              },
            ],
          })(<Input placeholder="Please input your name" required name="venueName" onChange={this.onInputChange} />)}
        </Form.Item>
      
        <Form.Item label="No of Screens">
              {getFieldDecorator('no-of-screen', { initialValue: 0 })(<Input pattern="[1-9]" min={1} name="noOfScreens" onChange={this.onInputChange}/>)}
        </Form.Item>

        <Form.Item label="Event Arrangement">
          {getFieldDecorator('event-arrange')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}>
                  <Checkbox value="A">A</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="B">
                    B
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="C">C</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>,
          )}
        </Form.Item>

        <Form.Item label="Line 1">
        {getFieldDecorator('line1', {
            rules: [
              {
                required: true,
                message: 'Please input line1',
              },
            ],
        })(<Input placeholder="Please input your line 1" name="line1" onChange={this.onInputChange}/>)}
        </Form.Item>

            

        <Form.Item label="City/State">
        {getFieldDecorator('city', {
            rules: [
              {
                required: true,
                message: 'Please input your city',
              },
            ],
        })(/*<Input placeholder="Please input your city" name="city" onChange={this.onInputChange}/>*/
          <Select placeholder="Select a city/state" style={{ width: 150 }} onChange={this.onCityChange}>
            {childrencity}
          </Select>
        )}
        </Form.Item>

            <Form.Item label="Locality">
              {getFieldDecorator('locality', {
                rules: [
                  {
                    required: true,
                    message: 'Please input line1',
                  },
                ],
              })//(<Input placeholder="Please input your locality" name="locality" onChange={this.onInputChange} />)
                (<Select placeholder="Select a locality" style={{ width: 150 }} onChange={this.onLocalityChange}>
                  {childrenloc}
                </Select>)
              }
            </Form.Item>

        <Form.Item label="Country">
        {getFieldDecorator('country', {
            initialValue:"India"
        })(<Input  name="country" disabled />)}
        </Form.Item>

        <Form.Item label="Pin code">
          {getFieldDecorator('pin', {
            rules: [
              {
                required: true,
                message: 'Please input your pin code',
              },
            ],
          })(<Input pattern="[0-9]{6}" maxLength={6} name="pinCode" placeholder="Please input your pincode" onChange={this.onInputChange}/>)}
        </Form.Item>


        <Form.Item label="Landmark">
        {getFieldDecorator('landmark', {
            rules: [
              {
                required: false,
                message: 'Please input landmark',
              },
            ],
          })(<Input placeholder="Please input your landmark" name="landmark"/>)}
        </Form.Item>

        <Form.Item label="Phone no">
              {getFieldDecorator('phone')(<Input pattern="[1-9][0-9]{9}" maxLength={10} name="venueContact" required onChange={this.onInputChange}/>)}
        </Form.Item>
        </Col>
         <Col span={12}>

        <Form.Item label="Select Amenties">
          {getFieldDecorator('amenities')
            (<CheckboxGroup style={{ width: '100%' }} options={this.state.amentiess} onChange={this.onAmentiesChange}>
              </CheckboxGroup>)}
        </Form.Item>

        <Form.Item label="Upload Image" disabled>
          {getFieldDecorator('upload', {
            valuePropName: 'image',
            getValueFromEvent: this.normFile,
          })(
            <Input type="file" name="image" disabled accept="image/jpg,image/png"/>
              
          )}
        </Form.Item>
        </Col>
         </Row>
         <Row>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </Row>
      </Form>

    );
  }
}

const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);

//ReactDOM.render(<WrappedDemo />, mountNode);
export default WrappedDemo;
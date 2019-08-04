import React from "react";
import moment from "moment";
import { Table, DatePicker, Button, Row, Col, Card } from "antd";
import VenueDetails from "./VenueDetails";
import NearestVenues from "./NearestVenues";
import "../index.css";
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';
import {ContextConsumer} from '../Context';
const availability = ["Booked", "Normal", "NA", "Selected"];

/*for (let i = 0; i < 24; i++) {
  data.push({
    key: i,
    name: `${i} - ${i + 1}`,
    price: Math.floor(Math.random() * 500 + 100),
    address: `${i}/${i + 10}`,
    status: availability[Math.floor(Math.random() * 4)]
  });
}*/

class BookSlots extends React.Component {
  state = {
    selectNumberOfSeats: 1,
    price: 0,
    data:[],
    columns: [
      {
        title: "Time Slot",
        dataIndex: "name"
      },
      {
        title: "Price",
        dataIndex: "price"
      },
      {
        title: " Seats Filled",
        dataIndex: "address"
      },
      {
        title: " Status",
        dataIndex: "status"
      }
    ]
  };


  componentDidMount(){
    const {id} = this.props.match.params;
    fetch(`https://cafehungama.herokuapp.com/user/venues/${id}`)
    .then(response=>response.json())
    .then(s=>{
       const slot_tables = s[0].slot_price_table;
       const data =[];
        slot_tables[0].map(slots=>{
          data.push({
            key:slots.time_slot,
            price:slots.ticket_price,
            name:slots.time_slot,
            status:slots.ticket_sold

          })
          this.setState({data:data})
        })
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    })
  }

  /*onSelectChange = (selectedRowKeys, selectedRows) => {
    //  console.log("selectedRowKeys changed: ", selectedRowKeys, selectedRows);

    this.setState({
      selectedRowKeys,
      selectedData: selectedRows,
      price: selectedRows.reduce((acc, curr) => acc + curr.price, 0)
    });


    // console.log(...selectedRows.map(sel => sel.price));
  };*/

  /* getPrice = record => {
    this.setState({
      price: record.price
    });
  };*/

  disabledDate = current => {
    // Can not select days before today and after 15 days
    return (
      current < moment().startOf("day") || current > moment().add(14, "days")
    );
  };

  render() {
    console.log(this.state.price);

    /*const { selectedRowKeys, columns } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.status === "NA" // Column configuration not to be checked
      })
    };*/
    const {data,columns} = this.state;
    console.log(data);
    return (
      <ContextConsumer>
        {
          (value)=>{
            return ( <div>
              <Row>
                <Col lg={{ span: 2 }} />
                <Col lg={{ span: 20 }}>
                  <VenueDetails />
                  <Row>
                    <Col lg={{ span: 13 }}>
                      <h2 className="note">
                        <b>Note : </b>You Can Select Multiple Seats{" "}
                      </h2>
                    </Col>
                  </Row>
                  <br />
                  <DatePicker
                    size="large"
                    disabledDate={this.disabledDate}
                    defaultValue={moment()}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Button onClick={value.decrement}> - </Button>
                  &nbsp;&nbsp;
                  <input
                    type="text"
                    value={value.selectNumberOfSeats}
                    id="selectNumberOfSeats"
                    onChange={value.updateNumberOfSeats}
                  />{" "}
                  &nbsp;&nbsp;
                  <Button onClick={value.increment}> + </Button>
                  <br />
                  <Row>
                    <Col lg={{ span: 13 }}>
                      {data.length === 0 ?( <div style={{textAlign:'center'}}><Loader type="ThreeDots" color="#000000" height={200} width={200} /></div>):(
                        <Table
                        rowSelection={{
                          selectedRowKeys:value.selectedRowKeys,
                          onChange:value.onSelectChange,
                          getCheckboxProps: record => ({
                            disabled: record.status === "NA" // Column configuration not to be checked
                          })}}
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                      ></Table>
                      )}
                    </Col>
                    <Col lg={{ span: 1 }} />
                    <Col lg={{ span: 10 }}>
                      <NearestVenues />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col lg={{ span: 10 }}>
                      <Table
                        /* rowSelection={rowSelection1} */
                        columns={columns}
                        dataSource={value.selectedData}
                        pagination={false}
                      />
                    </Col>
                    <Col lg={{ span: 1 }} />
                    <Col lg={{ span: 2 }}>
                      <Button onClick={value.changePrice} type="primary" shape="round">
                        Select 1 slot of all the slots
                      </Button>
                    </Col>
                    <Col lg={{ span: 4 }} />
                    <Col lg={{ span: 3 }}>
                      <Card>
                        When minimum criteria reaches, your slot will get finalised
                      </Card>
                    </Col>
                  </Row>
                  <span className="note">
                    Total Price: {value.selectNumberOfSeats * value.price}
                  </span>
                  <br />
                  <Row>
                    <Col lg={{ offset: 6 }}>
                      <Button type="primary" size="large">
                        <Link to="/checkout">Book Tickets and Pay</Link>
                      </Button>
                    </Col>
                  </Row>
                </Col>

                <Col lg={{ span: 2 }} />
              </Row>
              <br />
              <br />
            </div>)
          }
        }
      </ContextConsumer>
    );
    }
  }

export default BookSlots;

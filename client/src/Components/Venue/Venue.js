import React, { Component } from "react";
import { Card, Icon, Row, Col, Modal, Button, Tag } from "antd";
import AddVenue from "./AddVenue";
import "./venue.css";
import API from "../../api/API";
class Venue extends Component {
  state = {
    visible: false,
    data: []
  };

  componentDidMount() {
    API.get(`/client/5d09067224036b46e40f8d30/venues`).then(res => {
      this.setState({ data: res.data });
    });
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  renderData = venues => {
    if (venues.length > 0)
      return venues.map(venue => {
        return (
          <div>
            <Card.Grid className="venueslist">
              {" "}
              <div className="vimage">{venue.image}</div>
              <div className="vdetail">
                <h4>Name:{venue.venueName}</h4>
                <h4>
                  Address:{venue.line1},{venue.city},{venue.state}
                </h4>
                <h4>Ratings:</h4>
                <h4>Screens:{venue.noOfScreens}</h4>
                <h4>Amenties:{venue.amenties}</h4>
                <h4>Contact:{venue.venueContact}</h4>
              </div>
            </Card.Grid>
          </div>
        );
      });
    else return <div>No Venues Registered</div>;
  };
  onSubmit = props => {
    console.log(props);
    API.post(`/client/5d09067224036b46e40f8d30/venues`, props[0]).then(function (
      response
    ) {
      console.log(response);
      console.log(response.data);
    });
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Row>
            <Tag color="geekblue" className="listofvenues">
              List of Venues
            </Tag>
            <Row />
            <Col>
              <Card>{this.renderData(this.state.data)}</Card>
            </Col>
            <br />
            <Row>
              <Button
                type="primary"
                onClick={this.showModal}
                style={{ margin: "10px" }}
              >
                <Icon type="environment" />
                Add new Venue
              </Button>
            </Row>
            <Modal
              title="Add Venue"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <AddVenue onSubmit={this.onSubmit} />
            </Modal>

            <Col span={12} />
          </Row>
          <div>
            <Modal
              title="Venue Detail"
              visible={this.state.visibleDetails}
              onOk={this.handleOkDetails}
              onCancel={this.handleCancelDetails}
            />
          </div>
        </Row>
      </div>
    );
  }
}
export default Venue;

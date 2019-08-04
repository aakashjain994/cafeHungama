import React from "react";
import { Card } from "antd";
import "./Cards.css";

const Cards = props => {
  console.log(props.data);
  return (
    <div className="clearfix">
      <div className="event-card V">
        <Card
          title="Successful Bookings"
          style={{
            textAlign: "center",
            height: "150px",
            borderBottom: "5px solid #52780a"
          }}
        >
          <p>{props.data.total_successful_events} Total Successful bookings</p>
          <p>Comedy: 60 &nbsp; &nbsp; &nbsp; &nbsp; Movie: 40</p>
        </Card>
      </div>
      <div className="event-card  I">
        <Card
          title="Upcoming Bookings"
          style={{
            textAlign: "center",
            height: "150px",
            borderBottom: "5px solid #7d4604"
          }}
        >
          <p>{props.data.total_upcoming_events}Total Events done</p>
          <p>Comedy: &nbsp; &nbsp; &nbsp; &nbsp;Movie: </p>
        </Card>
      </div>
      <div className="event-card B">
        <Card
          title="Total business done"
          style={{
            textAlign: "center",
            height: "150px",
            borderBottom: "5px solid #52780a"
          }}
        >
          <p>{props.data.total_business_done}</p>
        </Card>
      </div>
      <div className="event-card G">
        <Card
          title="Venues"
          style={{
            textAlign: "center",
            height: "150px",
            borderBottom: "5px solid #0a6278"
          }}
        >
          <p>{props.data.total_venues_registered} venues registered</p>
        </Card>
      </div>
      <div className="event-card Y">
        <Card
          title="Cancelled Bookings"
          style={{
            textAlign: "center",
            height: "150px",
            borderBottom: "5px solid #7d4604"
          }}
        >
          <p>{props.data.total_cancelled_events} Total Events done</p>
          <p>Comedy: &nbsp; &nbsp; &nbsp; &nbsp;Movie: </p>
        </Card>
      </div>
      <div className="event-card O">
        <Card
          title="Total tickets sold"
          style={{
            textAlign: "center",
            height: "150px",
            borderBottom: "5px solid #0a6278"
          }}
        >
          <p>{props.data.total_tickets_sold}</p>
        </Card>
      </div>
    </div>
  );
};
export default Cards;

import React, { useState } from "react";
import Sidebar from "../../widget/Sidebar";
import { EventList } from "../../widget/Events/EventList";
import LatestOrder from "../../widget/LatestOrder";
import "./Home.css";
import Drop from './Drop';
import Carousel from './Carousel';

const BackgroundImage = () => {
  return (
    <div>
      {/*<LatestOrder visible= {true} />*/}

        <div className="carousel">
          <Carousel />
        </div>
       <div className="background-img">
        <Drop />
      </div>
      { /*    <div className="Image-container">
          <img
          className="background-img"
          src="https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj4zLDm7q7jAhWOaCsKHYhtCwIQjRx6BAgBEAU&url=https%3A%2F%2Fwww.crucial.com.au%2Fblog%2F2014%2F12%2F16%2Fa-5-step-guide-to-organising-your-next-business-event%2F&psig=AOvVaw35IgDC8gltKemDNXvIEkZB&ust=1563003182724608"
        />

        <div className="SearchBar">

            <input type="text" name="location" placeholder="Location" />
            <input type="text" name="event_type" placeholder="Event Type" />
            <input type="date" name="date" placeholder="Date" />
            <button>Search</button>
      </div>
      */}
    </div>
  );
};

class Home extends React.Component {
  render(){
    return (
      <div >
        <div className="homepage">
          <BackgroundImage />
        </div>

        <div className="SEContainer">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="event-list">
            <EventList />
          </div>
        </div>
      </div>
    );
  }

}

export default Home;

import React, { useState } from "react";
import { Slider } from "antd";
import "./Sidebar.css";
import { Menu, Icon, Form, Input } from "antd";
import { Rate } from "antd";
import {Select} from 'antd';
import {Switch} from 'antd';

const Option = Select.Option;

const { SubMenu } = Menu;

function Sidebar() {
  const [pricerange, setPriceRange] = useState([200, 500]);
  const [ratevalue, setRateValue] = useState(3);
  const [toggle, setToggle] = useState(true);
  const rates = ["terrible", "bad", "normal", "good", "wonderful"];
  const [distancerange, setDistanceRange] = useState([200, 500]);

  const pricemarks = {
    0: "0",
    1000: "1000"
  };
  const distancemarks = {
    0: "0",
    50: "50"
  };

  const handleClick = e => {
    console.log("click ", e);
  };

  function handleamentiesChange(value) {
    console.log(value);
  }

  function onAfterpriceChange(value) {
    console.log(value);
    setPriceRange(value);
  }
  function onAfterChangeDistance(value) {
    setDistanceRange(value);
  }

  function handleChangeRate(value) {
    console.log(value);
    setRateValue(value);
  }
  function ontoggleChange(value){
    console.log(value);
  }

  function handleChange(value) {
    console.log(value);
  }

  function togglebutton() {
    setToggle(!toggle);
  }

  return (
    <div className="SidebarContainer">
      <h1>Filters</h1>
      <div className="SidebarFilter">
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu
            key="price-range"
            title={
              <span>
                <Icon type="dollar" />
                <span>Price Range</span>
              </span>
            }
          >
            <Menu key="price-range">
              {" "}
              <div className="price-range">
                <Slider
                  range
                  marks={pricemarks}
                  step={100}
                  defaultValue={pricerange}
                  onAfterChange={onAfterpriceChange}
                  max={1000}
                  min={0}
                />
              </div>
            </Menu>
          </SubMenu>

          <SubMenu
            key="rating"
            title={
              <span>
                <Icon type="star" />
                <span>Rating</span>
              </span>
            }
          >
            <Menu key="rating">
              {" "}
              <div className="rating">
                <Rate
                  allowHalf
                  defaultValue={2.5}
                  tooltips={rates}
                  onChange={handleChangeRate}
                  value={ratevalue}
                />
              </div>
            </Menu>
          </SubMenu>

          <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Filter by amenties"
              defaultValue={['AC', 'wifi']}
              onChange={handleamentiesChange}
              key="amenities"
              title={
              <span>
                <Icon type="shop" />
                <span>Amenities</span>
              </span>
              }
          >
            <Option key="AC">AC</Option>
            <Option key="eating facility">Eating Facility</Option>
            <Option key="washroom">Washroom</Option>
            <Option key="wifi">WiFi</Option>
          </Select>
          {/*<SubMenu
            key="amenities"
            title={
              <span>
                <Icon type="shop" />
                <span>Amenities</span>
              </span>
            }
          >
            <Menu.Item key="AC">
              {" "}
              <label>
                <input
                  type="checkbox"
                  name="ammenities"
                  value="AC"
                  onChange={handleChangeAmmenities}
                />
                AC
              </label>
            </Menu.Item>
            <Menu.Item key="eating">
              <label>
                <input
                  type="checkbox"
                  name="ammenities"
                  value="Eating facility"
                  onChange={handleChangeAmmenities}
                  defaultChecked
                />
                Eating facility
              </label>
            </Menu.Item>
            <Menu.Item key="washroom">
              {" "}
              <label>
                <input
                  type="checkbox"
                  name="ammenities"
                  value="Washroom"
                  onChange={handleChangeAmmenities}
                />
                Attach Washroom
              </label>
            </Menu.Item>
            <Menu.Item key="wifi">
              <label>
                <input
                  type="checkbox"
                  name="ammenities"
                  value="Wifi"
                  onChange={handleChangeAmmenities}
                  defaultChecked
                />
                Wifi
              </label>
            </Menu.Item>
          </SubMenu>
          */}


          {/*<SubMenu
            key="sort_by_distance"
            title={
              <span>
                <Icon type="sort-ascending" />
                <span>Sort By Distance</span>
              </span>
            }
          >
            <Menu key="sort_by_distance">
              {" "}
              <div className="sort_by_distance">
                <Slider
                  range
                  marks={distancemarks}
                  step={100}
                  defaultValue={distancerange}
                  onChange={onChange}
                  onAfterChange={onAfterChangeDistance}
                  max={50}
                  min={0}
                />
              </div>
            </Menu>
          </SubMenu>*/}
           <Menu.Item key="sort_by_distance">
                Sort By distance
                <Switch style={{marginLeft:'50px'}} onChange={ontoggleChange} />
            </Menu.Item>


          <SubMenu
            key="map_view"
            title={
              <span>
                <Icon type="shop" />
                <span>Map View</span>
              </span>
            }
          >
          </SubMenu>

          <SubMenu
            key="place"
            title={
              <span>
                <Icon type="shop" />
                <span>Place (sort by particular place)</span>
              </span>
            }
          >
            <Form layout="inline" style={{ marginLeft: '40px'}}>
                <Form.Item >
                    <Input
                      prefix={<Icon type="place" style={{ color: 'rgba(0,0,0,.25)'}} />}
                      placeholder="Place"
                    />
                </Form.Item>
            </Form>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}
export default Sidebar;

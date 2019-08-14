import "./Header.css";
import React, { useState } from "react";
import { Icon } from "antd";
import { Menu } from "antd";
import { nominalTypeHack } from "prop-types";
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import {withContext} from '../../Context';

const { SubMenu } = Menu;

function Header(props) {
  const [is_login, setLogin] = useState(true);
  const ToggleLogin = () => {
    setLogin(!is_login);
  };

  const [current, setCurrent] = useState("mail");

  const handleClick = e => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="header">
      <div className="header-logo">
      <Link to="/" style={{display:'inline',color:'white'}}><img src="" alt="LOGO" /></Link>
      </div>
      <div className="header-menu">

          {
            !props.token?(
              <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              mode="horizontal"
              style = {{
                background:'#292a2b',
                color: 'white',
                border:'none'
              }}
            >
              <Menu.Item key="login">
                <div>
                <Icon type="login" />
                <Link to="/login">Login</Link>
                </div>
              </Menu.Item>
              <Menu.Item key="signup">
                <div>
                <Icon type="login" />
                <Link to="/signup">Sign Up</Link>
                </div>
              </Menu.Item>
            </Menu>

            ):(
              <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              mode="horizontal"
              style = {{
                background:'#292a2b',
                color: 'white',
                border:'none'
              }}
            >
              <Menu.Item key="notification">
              <Icon type="mail" />
              <Link to="/notifications" style={{display:'inline',color:'white'}}>Notifications</Link>
              </Menu.Item>
              <Menu.Item key="offers">
              <Icon type="appstore" />
              <Link to="/offers" style={{display:'inline',color:'white'}}>Offers</Link>
              </Menu.Item>
              <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <i className="fa fa-user-circle" aria-hidden="true" />
                </span>
              }
             >
              <Menu.Item key="setting:1"><Link to="/myWallet">Wallet</Link></Menu.Item>
              <Menu.Item key="setting:2"><Link to="/profile">My Profile</Link></Menu.Item>
              <Menu.Item key="setting:3"><Link to="/myorders">My orders</Link></Menu.Item>
              <Menu.Item key="setting:4"><Link to="/pastbookings">Past Bookings</Link></Menu.Item>
              <Menu.Item key="setting:5"><Link to="/vouchers">Vouchers</Link></Menu.Item>
              <Menu.Item key="setting:6">Support</Menu.Item>
              <Menu.Item key="setting:7">Newsfeed</Menu.Item>
              </SubMenu>
              <Menu.Item key="logout">
              <Icon type="logout" />
                <Button type="link" style={{color:'white'}} onClick={()=>{props.logout();}}>Logout</Button>
              </Menu.Item>
           </Menu>
            )
          }
      </div>
    </div>
  );
}

export default withContext(Header);

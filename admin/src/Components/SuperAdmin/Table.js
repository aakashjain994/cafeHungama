import React from 'react'
// eslint-disable-next-line
import { Table, Button } from 'antd';



// const buttonClick = () => {
//   return alert("connectAPI");  // api
// }
const ReqTable = (props) => {

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Phone Number",
      dataIndex: "contact",
      key: "contact",
    },
    // {
    //   title: "Action",
    //   key: "buttons",
    //   render: () => (<div>
    //     <Button style={{ margin: "1px auto", width: "80%" }} type="primary" onClick={buttonClick}>Details</Button><br />
    //     <Button style={{ margin: "1px auto", width: "80%" }} type="primary" onClick={buttonClick}>button2</Button>
    //   </div>
    //   ),
    // },
  ];
  return <Table columns={columns} dataSource={props.data} />

}

export default ReqTable

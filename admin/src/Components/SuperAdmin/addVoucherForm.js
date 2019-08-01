import React from 'react'

class AddVoucherForm extends React.Component {
    state = {
        vouchername: "",
        amount: "",
        description: "",
        validity: ""
    };
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleFormSubmit = e => {
        e.preventDefault();
        const data = {
            vouchername: this.state.vouchername,
            amount: this.state.amount,
            description: this.state.description,
            validity: this.state.validity
        }
        //  console.log(data);   This will call the API
        this.setState({
            vouchername: "",
            amount: "",
            description: ""
        });
    };
    render() {
        return (
            <div id="Form">
                <h3>Add Voucher:</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="vouchername">
                        Voucher Name: &nbsp;&nbsp;
                    <input
                            id="vouchername"
                            value={this.state.vouchername}
                            type="text"
                            name="vouchername"
                            onChange={this.handleInputChange}
                        />
                    </label>
                    &nbsp;&nbsp;
          <label htmlFor="amount">
                        Voucher Amount: &nbsp;&nbsp;
            <input
                            id="amount"
                            value={this.state.amount}
                            type="text"
                            name="amount"
                            onChange={this.handleInputChange}
                        />
                    </label>
                    &nbsp;&nbsp;
          <label htmlFor="description">
                        Voucher Description: &nbsp;&nbsp;
            <input
                            id="description"
                            value={this.state.description}
                            type="text"
                            name="description"
                            onChange={this.handleInputChange}
                        />
                    </label>
                    &nbsp;&nbsp;<br /><br />
                    <label htmlFor="amount">
                        Voucher Validity: &nbsp;&nbsp;
            <input
                            id="validity"
                            value={this.state.validity}
                            type="date"
                            name="validity"
                            onChange={this.handleInputChange}
                        />
                    </label>&nbsp;&nbsp;
          <button type="submit" value="Save">
                        Add Item
          </button>
                </form>
            </div>
        );
    }
}

export default AddVoucherForm;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addClient = e => {
    e.preventDefault();
    const newClient = this.state;

    // if no balance make 0
    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    this.props.firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => this.props.history.push('/'));

    // Clear form fields
    this.setState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      balance: ''
    });
  };

  render() {
    const { firstName, lastName, phone, email, balance } = this.state;

    const { disableBalanceOnAdd } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.addClient}>
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={firstName}
                />
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={lastName}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  onChange={this.onChange}
                  value={email}
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="10"
                  required
                  onChange={this.onChange}
                  value={phone}
                />
              </div>

              {/* Balance */}
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  disabled={disableBalanceOnAdd}
                  onChange={this.onChange}
                  value={balance}
                />
              </div>

              {/* Submit */}
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);

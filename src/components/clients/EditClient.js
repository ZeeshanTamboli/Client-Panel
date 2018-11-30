import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
  render() {
    const { client } = this.props;

    if (client) {
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
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.updateClient}>
                {/* First Name */}
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    defaultValue={client.firstName}
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
                    defaultValue={client.lastName}
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
                    defaultValue={client.email}
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
                    defaultValue={client.phone}
                  />
                </div>

                {/* Balance */}
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    defaultValue={client.balance}
                  />
                </div>

                {/* Submit */}
                <input
                  type="submit"
                  defaultValue="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  client: PropTypes.object,
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: 'clients',
      storeAs: 'client',
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);

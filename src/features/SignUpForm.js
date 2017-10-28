import React, { Component } from 'react';
import './SignUpForm.css';

import { provinces } from '../data/provinces';

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        fname: '',
        lname: '',
        pword: '',
        pword2: '',
        bday: '',
        province: 'Select Province',
        municipality: 'Select Municipality'
      },
      municipalities: [],
      invalidInput: []
    };
  }

  handleFormUpdate = e => {
    if (e.target.name === 'province') {
      const province = provinces.filter(
        province => province.name === e.target.value
      );
      this.setState({ municipalities: province[0].municipalities });
    }

    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const dateMultiplier = 31557600000;
    let invalidInput = [];

    for (let i = 0; i < e.target.length - 1; i++) {
      const { name, value } = e.target[i];
      const { form } = this.state;

      if (
        value === '' ||
        (name === 'pword2' && value !== form.pword) ||
        (name === 'province' && value === 'Select Province') ||
        (name === 'municipality' && value === 'Select Municipality') ||
        (name === 'bday' &&
          (new Date() - new Date(value)) / dateMultiplier < 18)
      ) {
        invalidInput.push(name);
      }
    }

    this.setState({ invalidInput }, () => {
      if (!this.state.invalidInput.length)
        window.alert('Thank you for signing up!');
    });
  };

  render() {
    const { municipalities, invalidInput } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="input-row">
          <div className="meta">
            <label htmlFor="fname">First Name</label>
            <span
              className="error-message"
              hidden={invalidInput.indexOf('fname') === -1}>
              First Name is required
            </span>
          </div>
          <input
            id="fname"
            type="text"
            placeholder="First Name"
            name="fname"
            value={this.state.form.fname}
            onChange={this.handleFormUpdate}
          />
        </div>
        <div className="input-row">
          <div className="meta">
            <label htmlFor="lname">Last Name</label>
            <span
              className="error-message"
              hidden={invalidInput.indexOf('lname') === -1}>
              Last Name is required
            </span>
          </div>
          <input
            id="lname"
            type="text"
            placeholder="Last Name"
            name="lname"
            value={this.state.form.lname}
            onChange={this.handleFormUpdate}
          />
        </div>
        <div className="input-row">
          <div className="meta">
            <label htmlFor="pword">Password</label>
            <span
              className="error-message"
              hidden={invalidInput.indexOf('pword') === -1}>
              Password is required
            </span>
          </div>
          <input
            id="pword"
            type="password"
            placeholder="Password"
            name="pword"
            value={this.state.form.pword}
            onChange={this.handleFormUpdate}
          />
        </div>
        <div className="input-row">
          <div className="meta">
            <label htmlFor="pword2">Repeat Password</label>
            <span
              className="error-message"
              hidden={invalidInput.indexOf('pword2') === -1}>
              Passwords do not match
            </span>
          </div>
          <input
            id="pword2"
            type="password"
            placeholder="Repeat Password"
            name="pword2"
            value={this.state.form.pword2}
            onChange={this.handleFormUpdate}
          />
        </div>
        <div className="input-row">
          <div className="meta">
            <label htmlFor="bday">Birthday</label>
            <span
              className="error-message"
              hidden={invalidInput.indexOf('bday') === -1}>
              You must be at least 18 to sign up
            </span>
          </div>
          <input
            id="bday"
            type="date"
            name="bday"
            value={this.state.form.bday}
            onChange={this.handleFormUpdate}
          />
        </div>
        <div className="half-grid">
          <div className="input-row">
            <div className="meta">
              <label htmlFor="province">Province</label>
              <span
                className="error-message"
                hidden={invalidInput.indexOf('province') === -1}>
                Province is required
              </span>
            </div>
            <select
              id="province"
              name="province"
              value={this.state.form.province}
              onChange={this.handleFormUpdate}>
              <option disabled>Select Province</option>
              {provinces.map(province => (
                <option value={province.name} key={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-row">
            <div className="meta">
              <label htmlFor="municipality">Municipality</label>
              <span
                className="error-message"
                hidden={invalidInput.indexOf('municipality') === -1}>
                Municipality is required
              </span>
            </div>
            <select
              id="municipality"
              disabled={!this.state.municipalities.length}
              name="municipality"
              value={this.state.form.municipality}
              onChange={this.handleFormUpdate}>
              <option disabled>Select Municipality</option>
              {municipalities.map((municipality, i) => (
                <option value={municipality} key={i}>
                  {municipality}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-row center">
          <button type="submit">Create Account</button>
        </div>
      </form>
    );
  }
}

export default SignUpForm;

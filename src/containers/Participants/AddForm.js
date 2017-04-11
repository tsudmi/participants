import React, {Component} from 'react';

import {Button, Input} from 'components';

const inputStyles = {margin: '16px 0px 16px 16px'};
const formStyles = {backgroundColor: '#FFFFFF'};
const buttonStyles = {margin: '16px', float: 'right'};

// input fields width
const FULLNAME_WIDTH = '150px';
const EMAIL_WIDTH = '260px';
const PHONE_WIDTH = '180px';

class AddForm extends Component {
  constructor(props) {
    super(props);
    // Reflects validity of fields
    this.state = {
      fullNameValid: false,
      emailValid: false,
      phoneValid: false,
    };
    this.validateInput = this.validateInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validateInput(event){
    // use HTML5 input validation
    if (event.target.checkValidity() === true) {
      this.setState({[event.target.name + 'Valid']: true});
    } else {
      this.setState({[event.target.name + 'Valid']: false});
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const participant = {
      fullName: event.target.fullName.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    this.props.onSubmit(participant);
    // reset form
    this.setState({fullNameValid: false, emailValid: false, phoneValid: false});
    event.target.reset();
  }

  render() {
    return (
      <form style={formStyles} onSubmit={this.onSubmit}>
        <Input style={inputStyles} width={FULLNAME_WIDTH}
          name='fullName' type='text' placeholder='Full name'
          onChange={this.validateInput} required
        />
        <Input style={inputStyles} width={EMAIL_WIDTH}
          name='email' type='email' placeholder='E-mail address'
          onChange={this.validateInput} required
        />
        <Input style={inputStyles} width={PHONE_WIDTH}
          name='phone' type='tel' pattern='\+?\d{5,15}' placeholder='Phone number'
          onChange={this.validateInput} required
        />
        <Button style={buttonStyles} type='submit'
          disabled={!Object.keys(this.state).every(k => this.state[k])}
        >
          Add new
        </Button>
      </form>
    );
  };
}

AddForm.propTypes = {
  onSubmit: React.PropTypes.func,
};

export default AddForm;

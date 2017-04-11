import React, {Component} from 'react';

import initialParticipants from 'data.json';

import {
  Button,
  IconButton,
  Input,
  PrimaryButton,
  Table,
  Td,
  Title,
  Th,
  Tr,
} from 'components';

import AddForm from './AddForm';
import Wrapper from './Wrapper';
import ascIcon from './icons/up-arrow.png';
import descIcon from './icons/down-arrow.png';
import pencilIcon from './icons/pencil.png';
import trashIcon from './icons/trash.png';

// input fields and table columns width
const FULLNAME_WIDTH = '150px';
const EMAIL_WIDTH = '260px';
const PHONE_WIDTH = '180px';


class Participants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participants: initialParticipants,
      sort: {
        id: -1,
        isAsc: true,
      },
      updateId: -1,
      updateForm: {
        fullNameValid: true,
        emailValid: true,
        phoneValid: true,
      },
    };
    this.addParticipant = this.addParticipant.bind(this);
    this.updateParticipant = this.updateParticipant.bind(this);
    this.deleteParticipant = this.deleteParticipant.bind(this);
    this.validateUpdate = this.validateUpdate.bind(this);
    this.setSort = this.setSort.bind(this);
    this.setUpdateId = this.setUpdateId.bind(this);
  }

  addParticipant(participant) {
    const newParticipant = {
      ...participant,
      id: this.state.participants.length + 1,
    };
    this.setState({participants: this.state.participants.concat([newParticipant])});
  }

  updateParticipant(event) {
    event.preventDefault();
    const updatedParticipants = this.state.participants.map(p => {
      if (p.id === this.state.updateId) {
        return {
          id: this.state.updateId,
          fullName: event.target.fullName.value,
          email: event.target.email.value,
          phone: event.target.phone.value,
        };
      }
      return p;
    });
    this.setState({participants: updatedParticipants, updateId: -1});
  }

  deleteParticipant(participantId) {
    const updatedParticipants = this.state.participants.filter(p => p.id !== participantId);
    this.setState({participants: updatedParticipants});
  }

  setSort(fieldId) {
    if (fieldId === this.state.sort.id) {
      this.setState({sort: {...this.state.sort, isAsc: !this.state.sort.isAsc}});
    } else {
      this.setState({sort: {id: fieldId, isAsc: true}});
    }
  }

  validateUpdate(event) {
    // HTML5 input validation is used
    if (event.target.checkValidity() === true) {
      this.setState({updateForm: {...this.state.updateForm, [event.target.name + 'Valid']: true}});
    } else {
      this.setState({updateForm: {...this.state.updateForm, [event.target.name + 'Valid']: false}});
    }
  }

  setUpdateId(id) {
    if (id !== -1 && this.state.updateId !== -1) {
      alert('You are already editing one of the participants');
    } else {
      this.setState({updateId: id});
    }
  }

  render() {
    let sortedParticipants = this.state.participants;
    if (this.state.sort.id !== -1) {
      sortedParticipants = sortedParticipants.sort((p1, p2) => {
        if (this.state.sort.id === 1) {
          return p1.fullName.localeCompare(p2.fullName);
        } else if (this.state.sort.id === 2) {
          return p1.email.localeCompare(p2.email);
        } else {
          return p1.phone.localeCompare(p2.phone);
        }
      });

      if (!this.state.sort.isAsc) {
        sortedParticipants = sortedParticipants.reverse();
      }
    }

    const participants = sortedParticipants.map(({id, fullName, email, phone}) => {
      if (this.state.updateId === id) {
        return (
          <Tr key={id}>
            <Td input>
              <Input
                name='fullName' type='text' defaultValue={fullName} width={FULLNAME_WIDTH}
                onChange={this.validateUpdate} required
              />
            </Td>
            <Td input>
              <Input
                name='email' type='email' defaultValue={email} width={EMAIL_WIDTH}
                onChange={this.validateUpdate} required
              />
            </Td>
            <Td input>
              <Input
                name='phone' type='tel' pattern='\+?\d{5,15}' defaultValue={phone} width={PHONE_WIDTH}
                onChange={this.validateUpdate} required
              />
            </Td>
            <Td input>
              <Button onClick={() => this.setUpdateId(-1)}>Cancel</Button>
              <PrimaryButton
                marginLeft='10px' type='submit'
                disabled={!Object.keys(this.state.updateForm).every(k => this.state.updateForm[k])}
              >
                Save
              </PrimaryButton>
            </Td>
          </Tr>
        );
      }
      return (
        <Tr key={id}>
          <Td width={FULLNAME_WIDTH}>{fullName}</Td>
          <Td width={EMAIL_WIDTH}>{email}</Td>
          <Td width={PHONE_WIDTH}>{phone}</Td>
          <Td textAlign='center'>
            <IconButton src={pencilIcon} alt='Edit' onClick={() => this.setUpdateId(id)}/>
            <IconButton src={trashIcon} alt='Remove' onClick={() => this.deleteParticipant(id)}/>
          </Td>
        </Tr>
      );
    });
    const sortIcon = this.state.sort.isAsc ? <img src={ascIcon} alt='ASC'/> : <img src={descIcon} alt='DESC'/>;
    return (
      <Wrapper>
        <Title>List of participants</Title>
        <AddForm onSubmit={this.addParticipant}/>
        <form onSubmit={this.updateParticipant}>
          <Table>
            <thead>
              <Tr header>
                <Th onClick={() => this.setSort(1)}>Name {this.state.sort.id === 1 && sortIcon}</Th>
                <Th onClick={() => this.setSort(2)}>E-mail address {this.state.sort.id === 2 && sortIcon}</Th>
                <Th onClick={() => this.setSort(3)}>Phone number {this.state.sort.id === 3 && sortIcon}</Th>
                <Th />
              </Tr>
            </thead>
            <tbody>
              {participants}
            </tbody>
          </Table>
        </form>
      </Wrapper>
    );
  }
}

export default Participants;

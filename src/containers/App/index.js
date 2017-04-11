import React, { PureComponent } from 'react';

import Avatar from 'components/Avatar';
import Author from 'components/Author';

import Participants from '../Participants';
import Wrapper from './Wrapper';
import avatarIcon from './avatar.jpg';

class App extends PureComponent {
  render() {
    return (
      <Wrapper>
        <div style={{backgroundColor: '#B3B3B3'}}>
          <Avatar src={avatarIcon} alt="Avatar Icon" />
          <Author>Dmitri Tsumak</Author>
        </div>
        <Participants />
      </Wrapper>
    );
  }
}

export default App;

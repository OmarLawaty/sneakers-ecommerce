import React from 'react';
import { connect } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';

import { signIn, signOut } from '../actions';
import { Box, Button, Image } from '@chakra-ui/react';
import LogOut from './logOut/LogOut';

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpened: false };
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn)
      this.props.signIn({
        name: this.auth.currentUser.get().getBasicProfile().getName(),
        id: this.auth.currentUser.get().getId(),
        picture: this.auth.currentUser.get().getBasicProfile().getImageUrl(),
        email: this.auth.currentUser.get().getBasicProfile().getEmail()
      });
    else this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <Box w={['8', null, '12']} pos="relative">
          <Box
            transition="outline 0.1s"
            outline={this.state.isOpened ? '2px solid hsl(26, 100%, 55%)' : '0px solid hsl(26, 100%, 55%)'}
            rounded="50px"
            overflow="hidden"
            cursor="pointer"
            onClick={() => this.setState({ isOpened: !this.state.isOpened })}
            pos="absolute"
            top={['-4', null, '-6']}
            zIndex="dropdown"
          >
            <Image src={this.auth.currentUser.get().getBasicProfile().getImageUrl()} alt="avatar" />
          </Box>

          <LogOut
            isOpened={this.state.isOpened}
            signOut={this.onSignOutClick}
            setIsOpened={isOpened => this.setState({ isOpened })}
          />
        </Box>
      );
    } else {
      return (
        <Button bg="0" p="0" rounded="full" onClick={this.onSignInClick}>
          <FcGoogle size={40} />
        </Button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

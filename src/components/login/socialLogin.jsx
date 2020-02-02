import React, { Component } from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  @media only screen and (max-width: 399px) {
    width: 10%;
  }
`;

const BtnFacebook = styled.button`
  width: 165px;
  height: 35px;
  border-radius: 4px;
  background: #3b5998;
  color: white;
  border: 0px transparent;
  text-align: center;
  margin: 5px;
  display: inline-block;

  &:hover {
    background: #3b5998;
    opacity: 0.6;
  }
`;
const BtnGoogle = styled.button`
  margin: 2px;
  width: 380px;
  height: 35px;
  border-radius: 4px;
  background: #3f51b5;
  color: white;
  border: 0px transparent;
  text-align: center;
`;
class SocialLogin extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Wrapper>
          {/* <BtnFacebook>&nbsp;&nbsp;Sign In with Facebook</BtnFacebook> */}

          <BtnGoogle onClick={this.props.clickHandler}>
            <img
              width="20px"
              alt='Google "G" Logo'
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            &nbsp;&nbsp;&nbsp; Sign In with Google
          </BtnGoogle>
        </Wrapper>
      </div>
    );
  }
}

export default SocialLogin;

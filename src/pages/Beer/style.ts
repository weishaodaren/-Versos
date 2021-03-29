import styled from 'vue3-styled-components';

const WrappedInput = styled.input`
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;

  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #666;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
  &:hover {
    background-color: #126;
  }
  &:active {
    background-color: #666;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;

export { WrappedInput, Button };

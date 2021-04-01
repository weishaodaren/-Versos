import styled from 'vue3-styled-components';

const color = `#c9d1d9`;

const Container = styled.div`
  background: #0d1117;
`;

const Avatar = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  background-color: #0d1117;
  border-color: #30363d;
  border-color: #30363d;
  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  box-shadow: #f0f6fc 0px 0px 0px 1px;
  color: #58a6ff;
  display: inline-block;
  font-size: 14px;
  gap: normal;
  line-height: 14px;
`;

const Describe = styled.div`
  font-size: 26px;
  border-color: ${color};
  color: ${color};
  font-size: 14px;
  gap: normal;
  line-height: 21px;
  padding: 16px 0px;
`;

const Name = styled.div`
  border-color: ${color};
  color: ${color};
  font-size: 26px;
  font-weight: 600;
  gap: normal;
  line-height: 32.5px;
`;

const NickName = styled(Name)`
  border-color: #8b949e;
  color: #8b949e;
  font-size: 20px;
  font-weight: 300;
  gap: normal;
  line-height: 24px;
`;

const Profile = styled.div`
  border-color: ${color};
  color: ${color};
  flex-direction: column;
  font-size: 14px;
  gap: normal;
  line-height: 21px;

  div:first-child {
    border-color: ${color};
    color: ${color};
    gap: normal;
    line-height: 24px;
  }

  button {
    align-items: flex-start;
    background-color: #21262d;
    border-color: #30363d;
    border-color: #30363d;
    border-radius: 6px;
    border-style: solid;
    border-width: 1px;
    box-shadow: #000000 0px 0px 0px 0px;
    color: #c9d1d9;
    font-family: -apple-system;
    font-size: 14px;
    font-weight: 500;
    gap: normal;
    line-height: 20px;
    padding: 5px 16px;
    text-align: center;
  }

  div:nth-child(3) {
    border-color: ${color};
    color: ${color};
    font-size: 14px;
    gap: normal;
    line-height: 21px;
    margin: 0px 0px 16px;
  }
`;

export { Container, Avatar, Describe, Name, NickName, Profile };

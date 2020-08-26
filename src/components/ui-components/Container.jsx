import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  max-height: 800px;
  padding: 20px 40px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.7);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default Container;

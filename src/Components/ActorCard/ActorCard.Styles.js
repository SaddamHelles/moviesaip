import styled from "styled-components";
import { FlexRow } from "../../Global.Styles";

export const CardContainer = styled(FlexRow)`
  width: 280px;
  height: 100px;
  background: #353535;
  justify-content: start;
  align-items: start;
  margin: 0 30px 30px 0px;
`;

export const ActorImage = styled.img`
  width: 100px;
  height: 100px;
  padding: 5px;
  margin: auto;
  margin-top: 0px;
  border-radius: 40%;
  object-fit: contain;
`;

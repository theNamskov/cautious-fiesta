import styled from "styled-components";
import { Input } from "./Input";

const CustomStyledInput = styled(Input)`
  border: 1px solid #F1F1F1;
  background: transparent;
`;

export function SearchBar(props) {
  return <CustomStyledInput {...props} />
}
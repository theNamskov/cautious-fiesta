import styled from "styled-components";

const InputWrapper = styled.div`
  border-radius: .25em;
  position: relative;
  display: inline-block;

  ${({icon}) => icon && `
    ::before {
      content: '';
      display: block;
      width: 1em;
      height: 1em;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 1.75em;
      background-image: url('${icon}');
    }
  `}
`;

const StyledInput = styled.input`
  padding: 1.125em 1.75em;
  ${({icon}) => icon && `
    padding-left: 4.5em;
  `}
  border-radius: inherit;
  width: 100%;
  color: inherit;
  background-color: #F1F1F1;

  ::placeholder {
    opacity: .3;
  }
`;

export function Input(props) {
  return (
    <InputWrapper icon={props.icon}>
      <StyledInput {...props}/>
    </InputWrapper>
  );
}
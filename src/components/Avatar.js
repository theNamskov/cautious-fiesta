import styled from "styled-components";
import { Caption } from "./Typography";

const Square = styled.div`
  ${({size}) => `
    width: ${size || '1.5em'};
    height: ${size || '1.5em'};
  `}
  background: ${({background}) => background};
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: #ddd;
  display: grid;
  justify-items: center;
  align-items: center;
  overflow: hidden;

  ${({text}) => text && `
    width: unset;
    border-radius: 10000px;
    padding: 0 .4em;
    user-select: none;
  `}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  border-radius: inherit;
`;

export function Avatar(props) {
  return (
    <Square {...props}>
      { props.text
        ? <Caption bold
            style={{opacity: .6}}
          >
            {props.children}
          </Caption>
        : <Image src={props.imageUrl} alt="avatar" />
      }
    </Square>
  );
}
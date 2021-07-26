import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import { Anchor } from "./common"
import { resolveColor } from "../util";


const StyledButton = styled.button`
  padding: 1.125em 1.75em;
  position: relative;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: .25em;
  cursor: pointer;
  white-space: nowrap;
  color: #fff;
  background-color: ${props =>
    props.color
  };

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    border-radius: inherit;
    opacity: 0;
    transition: .2s cubic-bezier(.4,0,.6,1);
  }

  &:hover {
    &::before {
      opacity: .1;
    }
  }

  ${props => props.small &&
    'font-size: 0.75em'
  };

  ${props => props.outlined && `
    background-color: transparent;
    border: 1px solid ${props.color};
    color: ${props.color};
    &::before {
      background-color: ${props.color};
    }
  `}
`;

export function Button(props) {
  const { theme } = useContext(ThemeContext);
  const color = resolveColor(props.color, theme);
  const main =
    <StyledButton
      {...props}
      theme={theme}
      color={color}
    >
      {
        <span style={{position: 'relative'}}>
          { props.children || 'button' }
        </span>
        // <div>
        //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="21.904761904761905 21.904761904761905 43.80952380952381 43.80952380952381" style={{transform: 'rotate(0deg)', width: '100%', height: '100%', strokeLinecap: 'round', strokeDasharray: '80,200', strokeDashoffset: '0px'}}><circle fill="transparent" cx="43.80952380952381" cy="43.80952380952381" r="20" strokeWidth="3.8095238095238093" strokeDasharray="125.664" strokeDashoffset="125.66370614359172px"></circle></svg>
        // </div>
      }
    </StyledButton>

  return (
    props.link
      ? <Anchor href={props.to}>{ main }</Anchor>
      : main
  );
}
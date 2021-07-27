import { useContext } from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import { resolveColor } from "../util";

/* Global */

/* Shared */
const sharedFontStyle = css`
  font-weight: ${props => props.bold ? '500' : '400'};
  color: ${({color, theme}) => color ? resolveColor(color, theme) : 'inherit'};
`;

/* Headline 1 */

const StyledH1 = styled.h1`
  ${sharedFontStyle}
  font-size: 2.5em;
`;
export function H1(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <StyledH1
      {...props}
      theme={theme}
    >
      { props.children }
    </StyledH1>
  );
}

/* Headline 2 */

const StyledH2 = styled.h2`
  ${sharedFontStyle}
  font-size: 1.5em;
`;
export function H2(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <StyledH2
      {...props}
      theme={theme}
    >
      { props.children }
    </StyledH2>
  )
}

/* Paragraph */

const StyledP = styled.p`
  ${sharedFontStyle}
  font-size: 1em;
`;
export function P(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <StyledP
      {...props}
      theme={theme}
    >
      { props.children }
    </StyledP>
  )
}

/* Paragraph 2 */

const StyledP2 = styled.p`
  ${sharedFontStyle}
  font-size: 0.875em;
`;
export function P2(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <StyledP2
      {...props}
      theme={theme}
    >
      { props.children }
    </StyledP2>
  )
}

/* Caption */

const StyledCaption = styled.p`
  ${sharedFontStyle}
  font-size: 0.75em;
`;
export function Caption(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <StyledCaption
      {...props}
      theme={theme}
    >
      { props.children }
    </StyledCaption>
  )
}
import { useContext } from "react";
import styled from "styled-components";
import { resolveColor } from "../util";
import { Anchor } from "./common";
import { ThemeContext } from "../contexts/ThemeContext"

const SVGWrapper = styled.div`
  display: inline-grid;
  align-items: center;
  justify-items: center;
  position: relative;
  ${({dimension}) => `
    width: ${dimension};
    height: ${dimension};
  `}
  ${({link}) => link && 'cursor: pointer;'}

  & svg {
    transition: .2s;
    fill: ${({fill}) => fill};
  }

  ${({hoverFill}) => `
    &:hover svg {
      fill: ${hoverFill}
    }
  `}
`;

export function SVG(props) {
  const dimension = (props.size || 24) + 'px';
  const { theme } = useContext(ThemeContext);
  const fill = resolveColor(props.fill, theme);
  const hoverFill = resolveColor(props.hoverFill, theme);
  const wrapper =
    <SVGWrapper
      {...props}
      dimension={dimension}
      fill={fill}
      hoverFill={hoverFill}
    >
      { props.children }
    </SVGWrapper>

  return (
    props.link
      ? <Anchor href={props.to}>{wrapper}</Anchor>
      : wrapper
  );
}
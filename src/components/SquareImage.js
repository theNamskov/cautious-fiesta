import styled from "styled-components";

const SquareDiv = styled.div`
  ${({size}) => `
    width: ${size};
    height: ${size};
    position: inline-block;
  `}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export function SquareImage(props) {
  return (
    <SquareDiv size={props.size}>
      <Image {...props} src={props.src || 'http://avatars.githubusercontent.com/u/42612171?s=48&v=4'} />
    </SquareDiv>
  );
}
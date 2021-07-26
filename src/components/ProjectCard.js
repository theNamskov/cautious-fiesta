import styled from "styled-components";
import { H2, P, P2 } from "./Typography";
import { SVG } from "./SVG"
import { Avatar } from "./Avatar";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Card = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.777em;
  display: grid;
  gap: 1em .5em;
  grid-template: auto 1fr auto / 1fr auto;
  justify-items: start;

  // background-color: #E2E2E2;
  background-color: ${({theme}) => theme.warning};
  color: #FFF;

  .card-title {
    grid-column: span 2;
  }
  .card-description {
    grid-column: span 2;
  }
`;

const ContributorAvatars = styled.div`
  display: grid;
  grid-auto-flow: column;
  margin-right: .5em;
  color: #000;
`;

const Contributors = styled.div`
  display: flex;
  align-items: center;
`;

export function ProjectCard(props) {
  const num_contributors = props.contributors.length;
  const { theme } = useContext(ThemeContext);
  const handleDelete = () => {
    /* Delete project here */
  }

  return (
    <Card {...props} theme={theme}>
      <H2 className="card-title" bold>{props.projTitle}</H2>
      <P className="card-description">{props.desc}</P>
      <Contributors>
        { !!num_contributors &&
          <ContributorAvatars>
            {props.contributors.slice(0,2).map(contributor => {
              return <Avatar key={contributor.avatar} imageUrl={contributor.avatar}/>
            })}
            {num_contributors > 2 &&
              <Avatar text background="#fff">+{num_contributors - 2}</Avatar>
            }
          </ContributorAvatars>
        }
        <P2>{num_contributors || 'No'} Contributor{(num_contributors > 1 || num_contributors === 0) && 's'}</P2>
      </Contributors>
      <SVG link title="Delete project" className="delete-button" fill="#000" hoverFill="error" onClick={handleDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18">
          <g id="ic_delete_24px" transform="translate(-5 -3)">
            <path id="Path_4" data-name="Path 4" d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM19,4H15.5l-1-1h-5l-1,1H5V6H19Z"/>
          </g>
        </svg>
      </SVG>
    </Card>
  );
}
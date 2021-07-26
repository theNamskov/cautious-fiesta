import styled from "styled-components";
import { SquareImage } from "./components/SquareImage";
import { P } from "./components/Typography";
import { ExpansionPanel } from "./components/ExpansionPanel"
import { ProjectCard } from "./components/ProjectCard";

const Main = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  gap: 1em;
  height: 100%;
`;

const Profile = styled.div`
  display: grid;
  gap: 1em;
  grid-template: none / auto 1fr;
`;

const EmployeeProjectCards = styled.div`
  display: grid;
  align-content: start;
  gap: 1em;
`;

function EmployeeDetails(props) {
  const EmployeeProjects = [
    {
      projTitle: 'My second project',
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
      contributors: [
        { avatar: 'http://avatars.githubusercontent.com/u/42612171?s=48&v=4' },
        { avatar: 'https://avatars.githubusercontent.com/u/41073590?v=4' },
        {}
      ]
    },
    {
      projTitle: 'My third project',
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
      contributors: [
        { avatar: 'http://avatars.githubusercontent.com/u/42612171?s=48&v=4' },
        { avatar: 'https://avatars.githubusercontent.com/u/41073590?v=4' },
        {}
      ]
    },
  ];
  const ProjectPanel = [
    {
      title: 'Projects',
      content: (
        <EmployeeProjectCards>
          {EmployeeProjects.map(project => {
            return <ProjectCard
              key={project.projTitle}
              {...project}
            />
          })}
        </EmployeeProjectCards>
      )
    }
  ];

  return (
    <Main>
      <Profile>
        <SquareImage size="5em" />
        <div>
          <P>John Doe</P>
          <P>Software Engineer</P>
        </div>
      </Profile>
      <ExpansionPanel
        panels={ProjectPanel}
        style={{fontSize: '.875em'}}
      />
    </Main>
  );
}

export default EmployeeDetails;
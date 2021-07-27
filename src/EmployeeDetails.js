import styled from "styled-components";
import { SquareImage } from "./components/SquareImage";
import { P } from "./components/Typography";
import { ExpansionPanel } from "./components/ExpansionPanel"
import { ProjectCard } from "./components/ProjectCard";
import { makeOptions, useFetch } from "./hooks/useFetch";

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
  const [employeeProjects] = useFetch('https://principal-serve.herokuapp.com/api/v1/employee-project/' + props.employeeId, makeOptions('GET', true));

  const ProjectPanel = [
    {
      title: 'Projects',
      content: (
        <EmployeeProjectCards>
          {employeeProjects?.map(project => {
            return <ProjectCard
              key={project.projectId.name}
              projTitle={project.projectId.name}
              desc={project.projectId.description}
              contributors={project.contributors}
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
          <P>{props.employeeName}</P>
          <P>{props.employeeRole}</P>
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
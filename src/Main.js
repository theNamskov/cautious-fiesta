import { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle"
import { ThemeContext } from "./contexts/ThemeContext";
import { H1, H2, P } from "./components/Typography";
import { Button } from "./components/Button";
import { SquareImage } from "./components/SquareImage";
import { ProjectCard } from "./components/ProjectCard";
import { SearchBar } from "./components/SearchBar";
import { ExpansionPanel } from "./components/ExpansionPanel";
import EmployeeDetails from "./EmployeeDetails";
import cx from "classnames";


const UserDetails = styled.div`
  margin: 4em 0 0;
  display: grid;
  grid-template: none / auto 1fr;
  align-items: center;
  gap: 1.5em;
`;

const SignOutBtn = styled(Button)`
  margin-top: 1em;
`;

const SectionHeader = styled(H1)`
  margin-top: 2.6em;
`;

const Projects = styled.div`
  margin-top: 4em;
  display: grid;
  gap: 1em;
  grid-template: none / repeat(3, 1fr);
`;

const OverviewHeader = styled.div`
  margin-top: 10.5em;
  display: flex;
  align-items: center;

  .tabTitle {
    opacity: .3;
    cursor: pointer;
  }
  .tabTitle.active {
    opacity: 1;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const AddBtn = styled(Button)`
  margin-left: 2em;
`;

const OverviewContainer = styled.div`
  margin-top: 4.5em;
  min-height: 70vh;
  height: 70vh;
  max-width: 800px;
`;

const ProjectCards = styled.div`
  display: grid;
  grid-template: none / 1fr 1fr;
  gap: 1em;
`;

function Main() {
  const { theme } = useContext(ThemeContext);
  const projects = [
    {
      projTitle: 'My first project',
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
      contributors: [
        { avatar: 'http://avatars.githubusercontent.com/u/42612171?s=48&v=4' },
        { avatar: 'https://avatars.githubusercontent.com/u/41073590?v=4' },
        {}, {}, {}
      ]
    },
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
        { avatar: 'http://avatars.githubusercontent.com/u/42612171?s=48&v=4' }
      ]
    },
  ];
  const panelData = [
    {
      title: 'Employee 1',
      content: <EmployeeDetails />
    },
    {
      title: 'Employee 2',
      content: <div>eish waaaaa</div>
    },
  ];
  const [activeTab, setActiveTab] = useState('Employees');
  const handleChangeTab = (e) => {
    setActiveTab(e.target.innerHTML);
  }


  return (
    <div className="App">
      <GlobalStyle theme={theme} />
      <div className="container">
        <H1>Welcome to User Portal</H1>
        <UserDetails>
          <SquareImage size="10em" src="" />
          <div>
            <H2>Doe John</H2>
            <P>Administrator</P>
            <SignOutBtn small outlined
              color="fontColor"
            >
              SIGN OUT
            </SignOutBtn>
          </div>
        </UserDetails>
        <SectionHeader>Your Projects</SectionHeader>
        <Projects>
          {projects.map(project => {
            return <ProjectCard key={project.projTitle} {...project}></ProjectCard>
          })}
        </Projects>
        <OverviewHeader>
          <H2
            onClick={handleChangeTab}
            className={cx('tabTitle', {'active': activeTab === 'Employees'})}
          >Employees</H2>
          <H2
            style={{marginLeft: '2em'}}
            onClick={handleChangeTab}
            className={cx('tabTitle', {'active': activeTab === 'Projects'})}
          >Projects</H2>
          <Spacer />
          <SearchBar
            placeholder="Find Employee"
            icon="/icons/search.svg"
            style={{width: '27em'}}
          />
          <AddBtn color="">ADD EMPLOYEE</AddBtn>
        </OverviewHeader>
        <OverviewContainer>
          { activeTab === 'Employees'
            ? <ExpansionPanel panels={panelData} />
            : <ProjectCards>
              {projects.map(project => {
                return <ProjectCard key={project.projTitle} {...project} />
              })}
            </ProjectCards>
          }
        </OverviewContainer>
      </div>
    </div>
  )
}

export default Main;
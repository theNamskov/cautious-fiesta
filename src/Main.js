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
import { useFetch, makeOptions } from "./hooks/useFetch";
import { AuthContext } from "./contexts/AuthContext";


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
  height: 60em;
  max-width: 800px;
`;

const ProjectCards = styled.div`
  display: grid;
  grid-template: none / 1fr 1fr;
  gap: 1em;
`;

function Main() {
  const { theme } = useContext(ThemeContext);
  const fetchOptions = makeOptions('GET', true);
  const [adminDetails] = useFetch('https://principal-serve.herokuapp.com/api/v1/employees/auth/login', makeOptions('POST', false, JSON.stringify({email: 'johndoe@test.com', password: 'password123'})));
  const [adminProjects, isAdminProjectsPending] = useFetch('https://principal-serve.herokuapp.com/api/v1/employee-project/60fe5dd74e250b42fa7fdecc', fetchOptions);
  const [employees] = useFetch('https://principal-serve.herokuapp.com/api/v1/employees', fetchOptions);
  const [allProjects] = useFetch('https://principal-serve.herokuapp.com/api/v1/projects', fetchOptions);

  const otherEmployees = employees?.filter(e => e._id !== adminDetails?.employee._id)?.map(e => ({
    title: e.firstName + ' ' + e.lastName,
    content: <EmployeeDetails employeeName={e.firstName + ' ' + e.lastName} employeeId={e._id} employeeRole={e.role.title}/>
  }));

  const [activeTab, setActiveTab] = useState('Employees');
  const { authenticate } = useContext(AuthContext);
  const handleChangeTab = (e) => {
    setActiveTab(e.target.innerHTML);
  }
  const handleSignOut = () => {
    localStorage.clear();
    authenticate();
  }


  return (
    <div className="App">
      <GlobalStyle theme={theme} />
      <div className="container">
        <H1>Welcome to User Portal</H1>
        <UserDetails>
          <SquareImage size="10em" src="" />
          <div>
            <H2>{adminDetails && `${adminDetails.employee.firstName} ${adminDetails.employee.lastName}`}</H2>
            <P>{adminDetails?.role.title}</P>
            <SignOutBtn small outlined
              color="fontColor"
              onClick={handleSignOut}
            >
              SIGN OUT
            </SignOutBtn>
          </div>
        </UserDetails>
        <SectionHeader>Your Projects</SectionHeader>

        <Projects>
          {isAdminProjectsPending
          ? <div>Loading Projects...</div>
          : !adminProjects
            ? <div>No data available.</div>
            : adminProjects.map(project => {
                return (
                  <ProjectCard
                    key={project.projectId.name}
                    projTitle={project.projectId.name}
                    desc={project.projectId.description}
                    contributors={project.contributors}
                  ></ProjectCard>
                );
              })
          }
        </Projects>

        <OverviewHeader>
          <H2
            onClick={handleChangeTab}
            className={cx('tabTitle', {'active': activeTab === 'Employees'})}
          >Employees</H2>
          <H2
            style={{margin: '0 1em'}}
            onClick={handleChangeTab}
            className={cx('tabTitle', {'active': activeTab === 'Projects'})}
          >Projects</H2>
          <Spacer />
          <SearchBar
            placeholder="Find Employee"
            icon="/icons/search.svg"
            style={{width: '27em'}}
            disabled
          />
          <AddBtn disabled>{activeTab === 'Employees' ? 'ADD EMPLOYEE' : 'ADD PROJECT'}</AddBtn>
        </OverviewHeader>
        <OverviewContainer>
          { activeTab === 'Employees'
            ? <ExpansionPanel panels={otherEmployees||[]} />
            : <ProjectCards>
              {allProjects?.map(project => {
                return <ProjectCard key={project.name}
                projTitle={project.name}
                desc={project.description}
                contributors={project.contributors} />
              })}
            </ProjectCards>
          }
        </OverviewContainer>
      </div>
    </div>
  )
}

export default Main;
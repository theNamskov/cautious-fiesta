import styled from "styled-components";
import { Button } from "./components/Button";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { H1, H2, P, P2, Caption } from "./components/Typography";
import { ProjectCard } from "./components/ProjectCard";
import { SearchBar } from "./components/SearchBar";
import { GlobalStyle } from "./components/GlobalStyle"
import { ExpansionPanel } from "./components/ExpansionPanel"


const ButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  & > * {
    margin-right: 16px;
    margin-bottom: 16px;
  }
`;

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App">
      <GlobalStyle theme={theme} />
      <H1>Heading 1 (40px)</H1>
      <H2>Heading 2 (24px)</H2>
      <H2 bold>Bold Heading 2 (24px)</H2>
      <P>Body text (16px)<br />Lorem ipsum dolor color</P>
      <P2>Body 2 text (14px)<br />Sit amet consectecteur</P2>
      <Caption>Caption text (12px)<br />Elitr sed diam nonumy eirmod</Caption>
      <ButtonsDiv>
        <Button color="primary">primary</Button>
        <Button color="success">success</Button>
        <Button color="warning">warning</Button>
        <Button color="error">error</Button>
        <Button outlined>Outlined button</Button>
        <Button small>Small button</Button>
        <Button small link to="/">link</Button>
      </ButtonsDiv>
      <div style={{ width: '365px'}}>
        {(() => {
          const projDetails = {
            projTitle: 'My first project',
            desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
            contributors: [
              { avatar: 'http://avatars.githubusercontent.com/u/42612171?s=48&v=4' },
              { avatar: 'https://avatars.githubusercontent.com/u/41073590?v=4' },
              {}, {}, {}
            ]
          }
          return <ProjectCard {...projDetails}></ProjectCard>
        })()}
      </div>
      <div style={{width: '400px'}}>
        <SearchBar placeholder="Search" icon="/icons/search.svg"/>
      </div>
      <div style={{width: '500px', maxHeight: '500px'}}>
        <ExpansionPanel></ExpansionPanel>
      </div>


      <div style={{height: '50vh'}}></div>
    </div>
  );
}

export default App;

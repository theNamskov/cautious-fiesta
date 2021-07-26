import { useState } from "react";
import styled from "styled-components";
import { P } from "./Typography";

const Panels = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Panel = styled.div`
  display: grid;
  grid-template: auto 1fr / none;
  transition: .2s;
  flex-grow: 0;

  &:first-of-type {
    border-top-left-radius: .25em;
    border-top-right-radius: .25em;
    .panel-header {
      border: 1px solid #F1F1F1;
    }
  }
  &:last-of-type {
    border-bottom-left-radius: .25em;
    border-bottom-right-radius: .25em;
  }

  &:not(first-of-type) .panel-header {
    border-bottom: 1px solid #F1F1F1;
    border-left: 1px solid #F1F1F1;
    border-right: 1px solid #F1F1F1;
  }

  ${({isActive}) => isActive && `
    flex-grow: 1;
  `}
`;

const PanelHeader = styled.div`
  padding: 1.125em 2em;
  border-radius: inherit;
  border: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({isActive}) => isActive && `
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  `}

  &:hover {
    background: rgba(241,241,241,.3);
  }
  &::after {
    content: '';
    display: block;
    width: 1em;
    height: 1em;
    transition: .2s;
    background-image: url('/icons/chevron.svg');
    background-repeat: no-repeat;
    background-position: center;
    transform: rotateZ(${({isActive}) => isActive ? '270deg' : '90deg'});
  }
`;

const PanelContentWrapper = styled.div`
  border-left: 1px solid #F1F1F1;
  border-right: 1px solid #F1F1F1;
  ${({isActive}) => isActive && `
    border-bottom: 1px solid #F1F1F1;
  `}
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  position: relative;
  overflow-y: auto;
  transition: .2s;
`;

const PanelContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1em 2em;
  height: 100%;
`;

export function ExpansionPanel(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleToggle = (clickedIndex) => {
    if (clickedIndex === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(clickedIndex);
    }
  }

  return (
    <Panels {...props}>
      {props.panels.map((panel, index) => {
        const isActive = index === activeIndex;
        return (
          <Panel key={panel.title} isActive={isActive}>
            <PanelHeader
              className="panel-header"
              onClick={() => handleToggle(index)}
              isActive={isActive}
            >
              <P>{panel.title}</P>
            </PanelHeader>
            <PanelContentWrapper isActive={isActive}>
              <PanelContent>
                {panel.content}
              </PanelContent>
            </PanelContentWrapper>
          </Panel>
        );
      })}
    </Panels>
  );
}
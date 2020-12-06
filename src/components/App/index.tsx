import React, { useState } from 'react';

import { Layout, Menu, } from 'antd';
import {
  SettingFilled,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import Logo from '../LogoWithText';
// import TailWhite from '../../assets/FBW-Tailwhite.svg'
// import { ReactComponent as PlaneSVG } from '../../assets/Plane.svg'
// import A320SVG from '../../assets/a320.svg'
import { Container, PageHeader, HomeMenuItem, PageContent, PageSider, SettingsMenuItem, MainLayout, AircraftSubMenuItem, AircraftMenuItem, AircraftInstalledVersion, AircraftName, AircraftDetailsContainer } from './styles';
import HomeSection from '../HomeSection'
import SettingsSection from '../SettingsSection'
import AircraftSection from '../AircraftSection'

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<String>('1');

  function toggleCollapse() {
    setCollapsed(value => !value)
  }

  let sectionToShow;
  switch (selectedItem) {
    case 'home':
      sectionToShow = <HomeSection />
      break;
    case 'a32nx':
      sectionToShow = <AircraftSection aircraftModel="A320neo" />
      break;
    case 'settings':
      sectionToShow = <SettingsSection />
      break;

    default:
      break;
  }

  return (
    <Container>
      <MainLayout>
        <PageHeader>
          <Logo />
        </PageHeader>

        <Layout className="site-layout">
          <PageSider onCollapse={toggleCollapse} collapsible collapsed={collapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} onSelect={selectInfo => setSelectedItem(selectInfo.key.toString())}>
              <HomeMenuItem key="home" icon={<img  />}>
                Home
              </HomeMenuItem>
              <AircraftSubMenuItem key="aircrafts" icon={<Icon  />} title="Aircraft's">
                <AircraftMenuItem key="a32nx">
                  <AircraftDetailsContainer>
                    <AircraftName>A320neo</AircraftName>
                  </AircraftDetailsContainer>
                  <img  />
                </AircraftMenuItem>
              </AircraftSubMenuItem>
              <SettingsMenuItem key="settings" icon={<SettingFilled />}>
                Settings
              </SettingsMenuItem>
            </Menu>
          </PageSider>
          <PageContent>
            {sectionToShow}
          </PageContent>
        </Layout>
      </MainLayout>
    </Container >
  );
}

export default App;

// import { hot } from 'react-hot-loader';
//  import * as React from 'react';

//  const App = () => <div>Hi from react!</div>;

// export default hot(module)(App);
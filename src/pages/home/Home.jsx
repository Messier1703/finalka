import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function MainSection() {
  return (
    <Layout>
      <Content style={{ height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <h1>Разделяй и властвуй</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </Content>
    </Layout>
  );
}

export default MainSection;

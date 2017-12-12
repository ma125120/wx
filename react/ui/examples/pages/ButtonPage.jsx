
import React, { Component } from 'react';
import hljs from 'highlight.js';
import Document from '../components/Document';
import Button from '../../components/Button';

import '../../styles/index.scss';
import '../styles/pages/example.scss';

class ButtonPage extends Component {

  componentDidMount() {
    hljs.initHighlightingOnLoad();
  }

  render() {

    return (
      <div className="example">
        <div className="title">
          <h1>Button</h1>
          <p>按钮</p>
        </div>

        <Document title="按钮主题" 
          demo={
            <div>
              <div className="demo-inline">
                <Button>Default</Button>
                <Button theme="info">Info</Button>
                <Button theme="success">Success</Button>
                <Button theme="warning">Warning</Button>
                <Button theme="error">Danger</Button>
              </div>
            </div>
          }
          code={
`import { Button } from 'dragon-ui';

ReactDOM.render(
  <div>
    <Button>Default</Button>
    <Button theme="info">Info</Button>
    <Button theme="success">Success</Button>
    <Button theme="warning">Warning</Button>
    <Button theme="error">Danger</Button>
  </div>
, document.getElementById('button-theme-demo'));`
        } />

        <Document title="圆角按钮"
          demo={
            <div>
              <div className="demo-inline">
                <Button radius>Default</Button>
                <Button radius theme="info">Info</Button>
                <Button radius theme="success">Success</Button>
                <Button radius theme="warning">Warning</Button>
                <Button radius theme="error">Danger</Button>
              </div>
            </div>
          }
          code={
`import { Button } from 'dragon-ui';

ReactDOM.render(
  <div>
    <Button radius>Default</Button>
    <Button radius theme="info">Info</Button>
    <Button radius theme="success">Success</Button>
    <Button radius theme="warning">Warning</Button>
    <Button radius theme="error">Danger</Button>
  </div>
, document.getElementById('button-radius-demo'));`
          } />

        <Document title="椭圆按钮"
          demo={
            <div>
              <div className="demo-inline">
                <Button round>Default</Button>
                <Button round theme="info">Info</Button>
                <Button round theme="success">Success</Button>
                <Button round theme="warning">Warning</Button>
                <Button round theme="error">Danger</Button>
              </div>
            </div>
          }
          code={
`import { Button } from 'dragon-ui';

ReactDOM.render(
  <div>
    <Button round>Default</Button>
    <Button round theme="info">Info</Button>
    <Button round theme="success">Success</Button>
    <Button round theme="warning">Warning</Button>
    <Button round theme="error">Danger</Button>
  </div>
, document.getElementById('button-round-demo'));`
          } />

        <Document title="块级显示"
          demo={
            <div>
              <div className="demo-inline">
                <Button block>Default - block</Button>
              </div>
              <div className="demo-inline">
                <Button block theme="info">Info - block</Button>
              </div>
            </div>
          }
          code={
`import { Button } from 'dragon-ui';

ReactDOM.render(
  <div>
    <Button block>Default - block</Button>
    <Button block theme="info">Info - block</Button>
  </div>
, document.getElementById('button-block-demo'));`
          } />

        <Document title="禁用状态"
          demo={
            <div>
              <div className="demo-inline">
                <Button disabled>Default - disabled</Button>
                <Button disabled theme="info">Info - disabled</Button>
              </div>
            </div>
          }
          code={
`import { Button } from 'dragon-ui';

ReactDOM.render(
  <div>
    <Button disabled>Default - disabled</Button>
    <Button disabled theme="info">Info - disabled</Button>
  </div>
, document.getElementById('button-disabled-demo'));`
          } />

        <Document title="激活状态"
          demo={
            <div>
              <div className="demo-inline">
                <Button active>Default - active</Button>
                <Button active theme="info">Info - active</Button>
              </div>
            </div>
          }
          code={
`import { Button } from 'dragon-ui';

ReactDOM.render(
  <div>
    <Button active>Default - active</Button>
    <Button active theme="info">Info - active</Button>
  </div>
, document.getElementById('button-active-demo'));`
          } />

        <Document title="按钮尺寸"
          demo={
            <div>
              <div className="demo-inline">
                <Button size="xl">Default - xl</Button>
                <Button theme="info" size="xl">Info - xl</Button>
              </div>
              <div className="demo-inline">
                <Button size="lg">Default - lg</Button>
                <Button theme="info" size="lg">Info - lg</Button>
              </div>
              <div className="demo-inline">
                <Button>Default</Button>
                <Button theme="info">Info</Button>
              </div>
              <div className="demo-inline">
                <Button size="sm">Default - sm</Button>
                <Button theme="info" size="sm">Info - sm</Button>
              </div>
              <div className="demo-inline">
                <Button size="xs">Default - xs</Button>
                <Button theme="info" size="xs">Info - xs</Button>
              </div>
            </div>
          }
          code={
`import { Button } from 'dragon-ui';

ReactDOM.render(
  <div>
    <Button size="xl">Default - xl</Button>
    <Button theme="info" size="xl">Info - xl</Button>
  </div>
  <div>
    <Button size="lg">Default - lg</Button>
    <Button theme="info" size="lg">Info - lg</Button>
  </div>
  <div>
    <Button>Default</Button>
    <Button theme="info">Info</Button>
  </div>
  <div>
    <Button size="sm">Default - sm</Button>
    <Button theme="info" size="sm">Info - sm</Button>
  </div>
  <div>
    <Button size="xs">Default - xs</Button>
    <Button theme="info" size="xs">Info - xs</Button>
  </div>
, document.getElementById('button-size-demo'));`
          } />

      </div>
    );
  }
}

export default ButtonPage;
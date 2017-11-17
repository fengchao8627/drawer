import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import Drawer from '../src';
import '../assets/index.less';

describe('rc-drawer-menu', () => {
  let div;
  let instance;

  function createDrawerInstance(props) {
    class DrawerDeom extends React.PureComponent {
      constructor(childrenProps) {
        super(childrenProps);
        this.state = {
          open: childrenProps.open,
        };
      }
      switchMenu = () => {
        this.setState({
          open: !this.state.open,
        });
      }
      render() {
        return (
          <Drawer
            width={this.props.width}
            open={this.state.open}
            defaultOpen={this.props.defaultOpen}
            level={this.props.level}
            iconChild={props.iconChild}
          >
            <div>
              test
            </div>
          </Drawer>
        );
      }
    }
    return ReactDom.render(<DrawerDeom {...props} />, div);
  }

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    try {
      ReactDom.unmountComponentAtNode(div);
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  });

  function getFloat(str) {
    return parseFloat(str);
  }

  it('single drawer', () => {
    instance = createDrawerInstance({
      width: '200px',
    });
    const drawer = document.getElementsByClassName('drawer');
    console.log(drawer.length);
    expect(drawer.length).to.be(1);
    const drawerDom = drawer[0].children[1];
    console.log(drawerDom.style.left);
    expect(getFloat(drawerDom.style.left)).to.be(-200);
  });

  it('default open drawer', () => {
    instance = createDrawerInstance({
      defaultOpen: true,
      level: [],
      iconChild: (<i className="a">a</i>),
    });
    const drawer = document.getElementsByClassName('drawer-content-wrapper')[0];
    expect(drawer.style.transform).to.eql('translateX(60vw)');
  });

  it('switch open drawer', (done) => {
    instance = createDrawerInstance({});
    const drawer = document.getElementsByClassName('drawer-content-wrapper')[0];
    console.log(drawer.style.transform);
    expect(drawer.style.transform).to.eql('');
    instance.switchMenu();
    setTimeout(() => {
      console.log(drawer.style.transform);
      expect(drawer.style.transform).to.eql('translateX(60vw)');
      instance.switchMenu();
      setTimeout(() => {
        console.log(drawer.style.transform);
        expect(drawer.style.transform).to.eql('');
        done();
      }, 500);
    }, 500);
  });

  it('icon child is array', (done) => {
    instance = createDrawerInstance({
      iconChild: [<i className="a">a</i>, <i className="b">b</i>],
    });
    const icon = document.getElementsByClassName('drawer-button')[0];
    const iconChild = icon.children[0];
    expect(iconChild.className).to.eql('a');
    instance.switchMenu();
    setTimeout(() => {
      expect(iconChild.className).to.eql('b');
      instance.switchMenu();
      done();
    });
  });
});

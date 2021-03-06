# analysis-ui-components

React components to build analysis UI

<h3 align="center">

  <a href="https://www.zakodium.com">
    <img src="https://www.zakodium.com/brand/zakodium-logo-white.svg" width="50" alt="Zakodium logo" />
  </a>

  <p>
    Maintained by <a href="https://www.zakodium.com">Zakodium</a>
  </p>
</h3>

# Installation

```
> npm i analysis-ui-components
> npm i react-icons
```

## Basic example

```tsx
import {
  Accordion,
  Header,
  RootLayout,
  SplitPane,
  Toolbar,
} from 'analysis-ui-components';

import {
  FaMeteor,
  FaBook,
  FaCogs,
  FaTabletAlt,
  FaGlasses,
  FaArrowsAlt,
} from 'react-icons/fa';

function BasicExample() {
  return (
    <RootLayout
      style={{
        borderStyle: 'solid',
        borderColor: 'rgb(213, 213, 213)',
        borderWidth: '1px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header>
          <Toolbar orientation="horizontal">
            <Toolbar.Item titleOrientation="horizontal" id="logo" title="Logo">
              <FaMeteor />
            </Toolbar.Item>
          </Toolbar>
          <Toolbar orientation="horizontal">
            <Toolbar.Item id="a" title="User manual">
              <FaBook />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="General settings">
              <FaCogs>
            </Toolbar.Item>
            <Toolbar.Item id="c" title="Full screen">
              <FaTabletAlt />
            </Toolbar.Item>
          </Toolbar>
        </Header>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <Toolbar orientation="vertical">
            <Toolbar.Item id="a" title="Glasses" active>
              <FaGlasses />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="Open in large mode">
              <FaArrowsAlt />
            </Toolbar.Item>
          </Toolbar>
        </div>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '300px',
          }}
        >
          <SplitPane initialSeparation="35%">
            <div style={{ padding: 5 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              earum omnis, et voluptatum veniam repellendus similique! Sunt
              nostrum necessitatibus reprehenderit asperiores excepturi
              corrupti? Optio soluta illo quae ex nam nulla.
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                flex: '1 1 0%',
              }}
            >
              <Accordion>
                <Accordion.Item title="Spectra" defaultOpened>
                  <p style={{ padding: 5 }}>Spectra lorem</p>
                </Accordion.Item>
                <Accordion.Item title="Integral">
                  <p style={{ padding: 5 }}>Integral lorem</p>
                </Accordion.Item>
              </Accordion>
            </div>
          </SplitPane>
        </div>
      </div>
    </RootLayout>
  );
}
```

![image](https://user-images.githubusercontent.com/30870051/133239548-fe002213-53e5-44ab-8d44-39aaebe65152.png)

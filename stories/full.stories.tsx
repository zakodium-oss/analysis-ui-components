import { Meta } from '@storybook/react';
import React, { useRef } from 'react';
import {
  FaMeteor,
  FaBook,
  FaCogs,
  FaTabletAlt,
  FaGlasses,
} from 'react-icons/fa';

import { Accordion, Header, SplitPane, Tabs, Toolbar } from '../src';
import { TabItem } from '../src/layout/Tabs';

export default {
  title: 'Layout/Full',
  args: {
    height: 300,
  },
} as Meta;

const toolbar: Array<TabItem> = [
  { id: 'a', title: 'Glasses', content: <FaGlasses /> },
  { id: 'b', title: 'Open in large mode', content: <FaTabletAlt /> },
  ...Array(3)
    .fill(0)
    .map((_, index) => {
      const element = String(index);
      return { id: element, content: element, title: element };
    }),
];

export function FullExample(props: { height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const items: Array<TabItem> = [
    {
      id: '1h',
      title: '1H',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem odit nulla delectus rem et non quis animi molestias pariatur tempora. Corporis consequuntur asperiores odio officia minima fugiat, corrupti hic illum!',
    },
    { id: '13c', title: '13C', content: 'Hello, World! [b]' },
    { id: '1h,1h', title: '1H,1H', content: 'Hello, World! [c]' },
    { id: '1h,13c', title: '1H,13C', content: 'Hello, World! [d]' },
  ];

  return (
    <>
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
              <FaCogs />
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
          height: props.height,
        }}
      >
        <div>
          <Toolbar orientation="vertical">
            {toolbar.map(({ id, title, content }) => (
              <Toolbar.Item key={id} id={id} title={String(title)}>
                {content}
              </Toolbar.Item>
            ))}
          </Toolbar>
        </div>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '300px',
            maxHeight: '100%',
          }}
        >
          <SplitPane initialSeparation="50%">
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
                  <div>
                    {Array(10)
                      .fill(0)
                      .map((a, i) => (
                        <p key={i} style={{ padding: 5 }}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Nostrum quos soluta animi accusantium ipsum
                          delectus facilis! Modi quis tenetur enim aut beatae
                          deleniti aspernatur reprehenderit distinctio rerum
                          eius. Quidem, nam?
                        </p>
                      ))}
                  </div>
                </Accordion.Item>
                <Accordion.Item title="Integral">
                  <div
                    style={{
                      flex: '1 1 0%',
                      width: '100%',
                    }}
                  >
                    <Tabs
                      orientation="horizontal"
                      items={items}
                      opened={items[0]}
                    />
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
}

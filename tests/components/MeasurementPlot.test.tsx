/* eslint-disable jest/no-standalone-expect */
import { test, expect } from '@playwright/experimental-ct-react';

import { MeasurementPlot } from '../../src';
import measurement from '../../stories/data/measurement.json';

const beforeZoom = [
  // horizontal axis default values
  500,
  1000,
  1500,
  2000,
  2500,
  3000,
  3500,
  '1/CM',

  // vertical axis default values
  40,
  45,
  50,
  55,
  60,
  65,
  70,
  75,
  80,
  85,
  '% Transmittance',
].join('');

test.describe('MeasurementPlot', () => {
  test('default props', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} />,
    );
    const xAxis = component.locator('_react=Axis >> nth=0');
    const yAxis = component.locator('_react=Axis >> nth=1');

    //default variables
    await expect(xAxis).toContainText('1/CM');
    await expect(yAxis).toContainText('% Transmittance');
    await expect(component).toContainText('Mattson Instruments');
    await expect(component.locator('_react=Axis[id="x-x"]')).toBeEnabled();
    await expect(component.locator('_react=Axis[id="y-y"]')).toBeEnabled();

    // axis

    await expect(component.locator('_react=Axis[id=/-x$/]')).toHaveText(/.+/);
    await expect(component.locator('_react=Axis[id=/-y$/]')).toHaveText(/.+/);

    // flip
    await component
      .locator('_react=Axis[flip=true] >> nth=0')
      .waitFor({ state: 'detached' });

    // crossHair
    await component.hover({ position: { x: 200, y: 200 } });
    await expect(component.locator('_react=Text')).toBeEnabled();
    await expect(component.locator('_react=Line')).toHaveCount(2);
    // grids

    // vertical grid
    await expect(
      component.locator('_react=line[y2="0"][strokeDasharray= "2,2"]'),
    ).toHaveCount(7);

    // horizontal grid
    await expect(
      component.locator('_react=line[x1="0"][strokeDasharray= "2,2"]'),
    ).toHaveCount(10);

    // zoom (horizontal zoom)

    await expect(component).toContainText(beforeZoom);
    await component.dragTo(component, {
      sourcePosition: { x: 100, y: 100 },
      targetPosition: { x: 200, y: 200 },
    });
    const afterZoom = [
      // new horizontal axis values after zoom
      700,
      750,
      800,
      850,
      900,
      950,
      1000,
      1050,
      1100,
      '1/CM',

      // vertical axis default values
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      '% Transmittance',
    ].join('');
    await expect(component).toContainText(afterZoom);

    // double Click
    await component.dblclick();
    await expect(component).toContainText(beforeZoom);
  });
  test('change variables', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot
        measurement={measurement}
        xVariableName="y"
        yVariableName="a"
        dataIndex={1}
      />,
    );
    const xAxis = component.locator('_react=Axis >> nth=0');
    const yAxis = component.locator('_react=Axis >> nth=1');

    await expect(component.locator('_react=Axis[id="y-x"]')).toBeEnabled();
    await expect(component.locator('_react=Axis[id="a-y"]')).toBeEnabled();

    await expect(xAxis).toContainText('TRANSMITTANCE');
    await expect(yAxis).toContainText('Absorbance');
  });
  test('flip axis', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} flipHorizontalAxis />,
    );
    const xAxis = component.locator('_react=Axis[flip=true] >> nth=0');
    await expect(xAxis).toBeEnabled();
  });
  test('remove horizontal axis', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} showHorizontalAxis={false} />,
    );

    await expect(component.locator('_react=Axis[id=/-x$/]')).toHaveText('');
  });
  test('remove vertical axis', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} showVerticalAxis={false} />,
    );

    await expect(component.locator('_react=Axis[id=/-y$/]')).toHaveText('');
  });
  test('vertical zoom', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} zoom="vertical" />,
    );
    await expect(component).toContainText(beforeZoom);
    await component.dragTo(component, {
      sourcePosition: { x: 100, y: 100 },
      targetPosition: { x: 200, y: 200 },
    });
    const afterZoom = [
      // horizontal axis default values
      500,
      1000,
      1500,
      2000,
      2500,
      3000,
      3500,
      '1/CM',

      // new vertical axis values after zoom
      62,
      64,
      66,
      68,
      70,
      72,
      74,
      '% Transmittance',
    ].join('');
    await expect(component).toContainText(afterZoom);
  });
  test('rectangular zoom', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} zoom="rectangular" />,
    );
    await expect(component).toContainText(beforeZoom);
    await component.dragTo(component, {
      sourcePosition: { x: 100, y: 100 },
      targetPosition: { x: 200, y: 200 },
    });
    const afterZoom = [
      // horizontal axis default values
      700,
      750,
      800,
      850,
      900,
      950,
      1000,
      1050,
      1100,
      '1/CM',

      // new vertical axis values after zoom
      62,
      64,
      66,
      68,
      70,
      72,
      74,
      '% Transmittance',
    ].join('');
    await expect(component).toContainText(afterZoom);
  });
  test('remove horizontal grid', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} showHorizontalGrid={false} />,
    );

    await expect(
      component.locator('_react=line[x1="0"][strokeDasharray= "2,2"]'),
    ).toHaveCount(0);
  });
  test('remove vertical grid', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} showVerticalGrid={false} />,
    );

    await expect(
      component.locator('_react=line[y2="0"][strokeDasharray= "2,2"]'),
    ).toHaveCount(0);
  });
  test('crossHair', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} crossHair={false} />,
    );
    await component.hover({ position: { x: 200, y: 200 } });
    await expect(component.locator('_react=Text')).toHaveCount(0);
    await expect(component.locator('_react=Line')).toHaveCount(0);
  });
});

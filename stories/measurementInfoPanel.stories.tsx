import { Meta } from '@storybook/react';
import { useState, useEffect } from 'react';

import {
  MeasurementInfoPanel as MeasurementInfoPanelComponent,
  MeasurementInfoPanelProps,
} from '../src';
import { MeasurementBase } from '../src/components/context/data/DataState';

export default {
  title: 'Layout/Panels/MeasurementInfoPanel',
  component: MeasurementInfoPanelComponent,
  args: {
    metaStyle: {
      backgroundColor: 'red',
      padding: '0px 6px',
    },
    infoStyle: {
      backgroundColor: 'green',
      padding: '0px 6px',
    },
  },
} as Meta<Omit<MeasurementInfoPanelProps, 'measurement'>>;
export function MeasurementInfoPanel(
  props: Omit<MeasurementInfoPanelProps, 'measurement'>,
) {
  return <MeasurementInfoPanelControl {...props} />;
}
function MeasurementInfoPanelControl(
  props: Omit<MeasurementInfoPanelProps, 'measurement'>,
) {
  const [{ loaded, measurement }, setData] = useState<{
    measurement: MeasurementBase;
    loaded: boolean;
  }>({ measurement: { id: '', meta: {}, info: {}, data: [] }, loaded: false });

  useEffect(() => {
    fetch('/measurements.json')
      .then((response) => {
        response
          .json()
          .then((dataState) => {
            const measurement = dataState.measurements.ir.entries[0];
            setData({ measurement, loaded: true });
          })
          .catch((e) => {
            throw Error(e);
          });
      })
      .catch((e) => {
        throw Error(e);
      });
  }, []);
  return loaded ? (
    <MeasurementInfoPanelComponent measurement={measurement} {...props} />
  ) : null;
}

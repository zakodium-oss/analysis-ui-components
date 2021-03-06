import { xyToXYObject } from 'ml-spectra-processing';
import { useMemo } from 'react';
import {
  Annotations,
  Axis,
  Heading,
  LineSeries,
  Plot,
  PlotController,
  useAxisWheelZoom,
  useAxisZoom,
  useCrossHair,
  usePan,
  useRectangularZoom,
} from 'react-plot';

interface Variable {
  label: string;
  data: number[];
  units?: string;
  symbol?: string;
}
interface Data {
  variables: Record<string, Variable>;
}
export interface Measurement {
  meta?: object;
  filename?: string;
  info?: object;
  title?: string;
  data: Data[];
}
export interface MeasurementPlotProps {
  measurement: Measurement;
  dataIndex?: number;
  xVariableName?: string;
  yVariableName?: string;
  width?: number;
  height?: number;
  zoom?: 'horizontal' | 'vertical' | 'rectangular' | '';
  wheelZoom?: 'vertical' | 'horizontal' | '';
  crossHair?: boolean;
  showHorizontalAxis?: boolean;
  showVerticalAxis?: boolean;
  showHorizontalGrid?: boolean;
  showVerticalGrid?: boolean;
  flipHorizontalAxis?: boolean;
}
export function MeasurementPlot(props: MeasurementPlotProps) {
  return (
    <PlotController>
      <MeasurementComponent {...props} />
    </PlotController>
  );
}
function MeasurementComponent(props: MeasurementPlotProps) {
  const {
    measurement,
    dataIndex = 0,
    xVariableName = 'x',
    yVariableName = 'y',
    width = 800,
    height = 400,
    zoom = 'horizontal',
    wheelZoom = 'vertical',
    crossHair = true,
    showHorizontalAxis = true,
    showVerticalAxis = true,
    showHorizontalGrid = true,
    showVerticalGrid = true,
    flipHorizontalAxis = false,
  } = props;
  const { title = '', data } = measurement;

  const xAxis = `${xVariableName}-x`;
  const yAxis = `${yVariableName}-y`;
  const { x, y } = useMemo(() => {
    const { variables } = data[dataIndex];
    const { [xVariableName]: x, [yVariableName]: y } = variables;
    if (x === undefined || y === undefined) {
      throw new Error(
        `Variable "${
          x === undefined ? xVariableName : yVariableName
        }" is not available in data. Only ${Object.keys(
          data[dataIndex].variables,
        ).join(', ')} are available`,
      );
    }
    return { x, y };
  }, [data, dataIndex, xVariableName, yVariableName]);

  const direction = ['vertical', 'horizontal'];
  const rectZoom = useRectangularZoom({
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: zoom !== 'rectangular',
  });
  const axisZoom = useAxisZoom({
    direction: zoom === 'vertical' ? 'vertical' : 'horizontal',
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: !direction.includes(zoom),
  });
  useAxisWheelZoom({
    direction: wheelZoom === 'vertical' ? 'vertical' : 'horizontal',
    axisId: wheelZoom === 'vertical' ? yAxis : xAxis,
    disabled: !direction.includes(wheelZoom),
  });
  const crossHairAnnot = useCrossHair({
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: !crossHair,
  });
  usePan({ horizontalAxisId: xAxis, verticalAxisId: yAxis });
  return (
    <Plot width={width} height={height}>
      <Heading title={title} />
      <LineSeries
        data={xyToXYObject({
          x: x.data,
          y: y.data,
        })}
        xAxis={xAxis}
        yAxis={yAxis}
      />
      <Annotations>
        {rectZoom.annotations}
        {axisZoom.annotations}
        {crossHairAnnot.annotations}
      </Annotations>
      <Axis
        id={xAxis}
        hidden={!showHorizontalAxis}
        displayPrimaryGridLines={showVerticalGrid}
        flip={flipHorizontalAxis}
        position="bottom"
        label={`${x.label}${x.units ? `(${x.units})` : ''}`}
      />
      <Axis
        id={yAxis}
        hidden={!showVerticalAxis}
        displayPrimaryGridLines={showHorizontalGrid}
        position="left"
        label={`${y.label}${y.units ? `(${y.units})` : ''}`}
      />
    </Plot>
  );
}

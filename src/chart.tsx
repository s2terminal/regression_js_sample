import * as React from "react";
import {
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

interface IChartProps {
  data: Array<{
    x: number;
    y: number;
    predictedY?: number | null;
  }>;
}

export class Chart extends React.Component<IChartProps, any> {
  public render() {
    return (
      <ComposedChart
        data={this.props.data}
        width={400}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis dataKey={"x"} type="number" name="x" />
        <YAxis dataKey={"y"} type="number" name="y" />
        <Scatter data={this.props.data} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Line
          type="linear"
          dataKey="predictedY"
          connectNulls={true}
          stroke="#8884d8"
        />
      </ComposedChart>
    );
  }
}

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SimpleStatistics from "simple-statistics";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { initializeIcons } from "@uifabric/icons";
import { Point } from "./point";
import { Chart } from "./chart";
import "./index.scss";
// Office UI fabricのアイコン初期化
initializeIcons();

interface IMainState {
  data: Array<{
    x: number;
    y: number;
  }>;
  slope: number | null;
  yIntercept: number | null;
}
class Main extends React.Component<any, IMainState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ],
      slope: null,
      yIntercept: null
    };
  }

  public render() {
    const points = this.state.data.map((xy, index) => {
      return (
        <Point
          key={index}
          index={index}
          x={xy.x}
          y={xy.y}
          onChangeX={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeXY(e, index)}
          onChangeY={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChangeXY(e, index)}
        />
      );
    });

    let chartData: Array<{x: number, y: number, predictedY?: number | null }> = JSON.parse(JSON.stringify(this.state.data));
    const lr: (x: number) => number = (x: number) => {
      if (this.state.slope && this.state.yIntercept) {
        return x * this.state.slope + this.state.yIntercept;
      } else {
        return 0;
      }
    };
    chartData = this.state.data.map(xy => {
      return { x: xy.x, y: xy.y, predictedY: lr(xy.x) };
    });

    return (
      <form action="javascript:void(0)">
        {points}
        <DefaultButton text="減らす" onClick={e => this.removePoint()} />
        <DefaultButton text="増やす" onClick={e => this.addPoint()} />
        <DefaultButton
          primary={true}
          text="計算"
          iconProps={{ iconName: "Diagnostic" }}
          onClick={e => this.calculate()}
        />
        <p>y={this.state.slope}x+{this.state.yIntercept}</p>
        <Chart data={chartData} />
      </form>
    );
  }

  private handleChangeXY(event: React.ChangeEvent<HTMLInputElement>, key: number) {
    const data = this.state.data;
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) { return; }
    if (event.target.name === `x${key}`) { data[key].x = value; }
    if (event.target.name === `y${key}`) { data[key].y = value; }
    this.setState({ data });
  }

  private calculate() {
    const data = this.state.data.map(xy => {
      return [xy.x, xy.y];
    });
    const mb = SimpleStatistics.linearRegression(data); // m:slope, b:y-intercept
    this.setState({ slope: mb.m });
    this.setState({ yIntercept: mb.b });
  }

  private addPoint() {
    const data = this.state.data;
    data.push({ x: 0, y: 0 });
    this.setState({ data });
  }

  private removePoint() {
    const data = this.state.data;
    data.pop();
    this.setState({ data });
  }
}

ReactDOM.render(<Main />, document.getElementById("main"));

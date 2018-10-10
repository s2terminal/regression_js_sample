import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SimpleStatistics from "simple-statistics";

interface IPointProps {
  index: number;
  onChangeX: any;
  onChangeY: any;
  x: number;
  y: number;
}

class Point extends React.Component<IPointProps, any> {
  public render() {
    return (
      <div>
        <label htmlFor={`x${this.props.index}`}>X{this.props.index}</label>
        <input
          type="text"
          name={`x${this.props.index}`}
          value={this.props.x}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            this.props.onChangeX(event)
          }
        />
        <label htmlFor={`y${this.props.index}`}>Y{this.props.index}</label>
        <input
          type="text"
          name={`y${this.props.index}`}
          value={this.props.y}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            this.props.onChangeY(event)
          }
        />
      </div>
    );
  }
}

interface IMainProps {
}
interface IMainState {
  data: Array<{
    x: number;
    y: number;
  }>;
  slope: number | null;
  yIntercept: number | null;
}
class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
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

  public handleChange(event: React.ChangeEvent<HTMLInputElement>, key: number) {
    const data = this.state.data;
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) { return; }
    if (event.target.name === `x${key}`) { data[key].x = value; }
    if (event.target.name === `y${key}`) { data[key].y = value; }
    this.setState({ data });
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const data = this.state.data.map(xy => {
      return [xy.x, xy.y];
    });
    const mb = SimpleStatistics.linearRegression(data); // m:slope, b:y-intercept
    this.setState({ slope: mb.m });
    this.setState({ yIntercept: mb.b });
  }

  public render() {
    const points = this.state.data.map((xy, index) => {
      return (
        <Point
          key={index}
          index={index}
          x={xy.x}
          y={xy.y}
          onChangeX={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e, index)}
          onChangeY={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e, index)}
        />
      );
    });
    return (
      <form action="javascript:void(0)" onSubmit={e => this.handleSubmit(e)}>
        {points}
        <button type="submit">計算</button>
        <p>y={this.state.slope}x+{this.state.yIntercept}</p>
      </form>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("main"));

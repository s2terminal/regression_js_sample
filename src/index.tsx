import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SimpleStatistics from "simple-statistics";

interface IPointProps {
  index: number,
  onChangeX: any,
  onChangeY: any,
  x: number,
  y: number
}

class Point extends React.Component<IPointProps, any> {
  render() {
    return (<div>
      <label htmlFor="x">X{this.props.index}</label>
      <input type="text" name="x" value={this.props.x} onChange={(event:React.ChangeEvent<HTMLInputElement>): void => this.props.onChangeX(event)} />
      <label htmlFor="y">Y{this.props.index}</label>
      <input type="text" name="y" value={this.props.y} onChange={(event: React.ChangeEvent<HTMLInputElement>): void => this.props.onChangeY(event)} />
    </div>);
  }
}

export interface IMainProps {
}
interface IMainState {
  data: {
    x: number,
    y: number
  }[],
  slope: number | null,
  yIntercept: number | null
}
class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    this.state = {
      data: [
        {x: 0,y: 0},
        {x: 0,y: 0}
      ],
      slope: null,
      yIntercept: null
    };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>, key: number) {
    let data = this.state.data;
    const value = +event.target.value;
    if (isNaN(value)) { return; }
    if (event.target.name === 'x') { data[key].x = value; }
    if (event.target.name === 'y') { data[key].y = value; }
    this.setState({data: data});
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const data = this.state.data.map((xy) => {
      return [xy.x, xy.y];
    });
    const mb = SimpleStatistics.linearRegression(data); // m:slope, b:y-intercept
    this.setState({slope: mb.m});
    this.setState({yIntercept: mb.b});
  }

  render() {
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
    })
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

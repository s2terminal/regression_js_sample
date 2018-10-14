// 座標ひとつ分の入力フォームを扱うクラス
import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

export interface IPointProps {
  index: number;
  onChangeX: any;
  onChangeY: any;
  x: number;
  y: number;
}

export class Point extends React.Component<IPointProps, any> {
  public render() {
    return (
      <div className="point">
        <label htmlFor={`x${this.props.index}`}>
          <TextField
            prefix={`x${this.props.index}:`}
            name={`x${this.props.index}`}
            value={`${this.props.x}`}
            onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
              this.props.onChangeX(event)
            }
          />
        </label>
        <label htmlFor={`y${this.props.index}`}>
          <TextField
            prefix={`y${this.props.index}:`}
            name={`y${this.props.index}`}
            value={`${this.props.y}`}
            onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
              this.props.onChangeY(event)
            }
          />
        </label>
      </div>
    );
  }
}

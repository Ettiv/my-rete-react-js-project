import ReactRenderPlugin, { Node, Socket, Control } from 'rete-react-render-plugin';
import "./CustomCompareNode.scss";

export class CustomCompareNode extends Node {
  render() {
    const { node, bindSocket, bindControl } = this.props;
    const { outputs, controls, inputs, selected } = this.state;

    return (
      <div className={`customCompareNode ${selected}`}>
        <div className="title">{node.name}</div>
        {/* Outputs */}
        {outputs.map((output) => (
          <div className="output" key={output.key}>
            <div className="output-title">{output.name}</div>
            <Socket type="output" socket={output.socket} io={output} innerRef={bindSocket} />
          </div>
        ))}
        {/* Controls */}
        {controls.map(control => (
          <Control className="control" key={control.key} control={control} innerRef={bindControl} />
        ))}
        {/* Inputs */}
        {inputs.map(input => (
          <div className="input" key={input.key}>
            <Socket type="input" socket={input.socket} io={input} innerRef={bindSocket} />
            {!input.showControl() && <div className="input-title">{input.name}</div>}
            {input.showControl() && <Control className="input-control" control={input.control} innerRef={bindControl} />}
          </div>
        ))}
      </div>
    )
  }
}
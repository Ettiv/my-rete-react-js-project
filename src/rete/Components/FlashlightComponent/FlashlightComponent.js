import { boolSocket } from '../sockets/sockets';
import Rete from 'rete';
import ReteBoolControl from '../controls/BoolControl';
import ReteFlashlightControl from '../controls/FlashlightControl';

class FlashlightComponent extends Rete.Component {
  constructor() {
    super("Flashlight");
  }

  builder(node) {
    const input = new Rete.Input("bool", "Turn on?", boolSocket);
    input.addControl(new ReteBoolControl(this.editor, "bool", node));
    const control = new ReteFlashlightControl(this.editor, "view", node)

    return node
      .addInput(input)
      .addControl(control);
  }

  worker(node, inputs, outputs) {
    const bool = inputs["bool"].length ? inputs["bool"][0] : node.data.bool;

    this.editor.nodes
      .find((n) => n.id == node.id)
      .controls.get("view")
      .setValue(bool);
  }
}

export default FlashlightComponent;
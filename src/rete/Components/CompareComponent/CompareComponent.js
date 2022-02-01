import React from 'react';
import { numSocket, boolSocket } from '../sockets/sockets';
import Rete from 'rete';
import ReteNumControl from '../controls/NumControl';
import {CustomCompareNode} from '../../CustomNodes/CustomCompareNode/CustomCompareNode';

class CompareComponent extends Rete.Component {
  constructor() {
    super('A > B?');
    this.data.component = CustomCompareNode;
  }

  builder(node) {

    let input = new Rete.Input('num1', 'A' , numSocket);
    let input2 = new Rete.Input('num2', 'B' , numSocket);
    let out = new Rete.Output('bool', 'Boolean', boolSocket);

    input.addControl(new ReteNumControl(this.editor, "num1", node));
    input2.addControl(new ReteNumControl(this.editor, "num2", node));

    node.addInput(input);
    node.addInput(input2);
    node.addOutput(out);
  }

  worker(node, inputs, outputs) {
    const A = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
    const B = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;

    let bool = true;

    if(A > B) {
      bool = true;
    } else {
      bool = false;
    }

    outputs['bool'] = bool;
  }
}

export default CompareComponent;
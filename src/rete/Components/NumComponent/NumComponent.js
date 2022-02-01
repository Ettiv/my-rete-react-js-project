import React from 'react';
import { numSocket } from '../sockets/sockets';
import Rete from 'rete';
import ReteNumControl from '../controls/NumControl';

class NumComponent extends Rete.Component {
  constructor() {
    super('Number');
  }

  builder(node) {
    let out = new Rete.Output('num', 'Number', numSocket);
    let control = new ReteNumControl(this.editor,'num', node);

    node.addOutput(out);
    node.addControl(control);
  }

  worker(node, inputs, outputs) {
    outputs['num'] = node.data.num;
  }
}

export default NumComponent;
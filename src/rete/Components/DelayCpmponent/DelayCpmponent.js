import React from 'react';
import { numSocket, boolSocket } from '../sockets/sockets';
import Rete from 'rete';
import ReteNumControl from '../controls/NumControl';
import DelayControl from '../controls/DelayControl';

class DelayCpmponent extends Rete.Component {
  constructor() {
    super('Delay');
  }

  builder(node) {

    let input = new Rete.Input('time', 'delay', numSocket);
    let Indicator = new DelayControl(this.editor, "delayProgress", node);
    let out = new Rete.Output('bool', 'true', boolSocket);
    node.data.progress = 0;

    input.addControl(new ReteNumControl(this.editor, "time", node));

    node.addInput(input);
    node.addControl(Indicator);
    node.addOutput(out);
  }

  worker(node, inputs, outputs) {
    const delay = inputs["time"].length ? inputs["time"][0] : node.data.time;
    const deleyTic = 25 / delay;

    if (delay && delay !== node.data.old) {

      outputs['bool'] = false;

      let timerId = setInterval(() => {
        node.data.progress = node.data.progress+deleyTic;
        this.editor.nodes
          .find((n) => n.id == node.id)
          .controls.get("delayProgress")
          .setProgress(node.data.progress);
      }, 250);

      setTimeout(() => {
        node.data.progress = 0;
        node.data.old = delay;
        node.data.bool1 = true;
        clearInterval(timerId);
        outputs['bool'] = node.data.bool1 ;
        this.editor.nodes
          .find((n) => n.id == node.id)
          .controls.get("delayProgress")
          .triggerEmitter();

      }, delay * 1000 );
    }
  }
}

export default DelayCpmponent;
import React from "react"
import Rete from "rete";
import Indicator from "../../../components/Indicator/Indicator";

class DelayControl extends Rete.Control {
  constructor(emitter, key, node, readonly = false){
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = Indicator;

    const initial  = node.data[key] || 0;
    node.data[key] = initial;

    this.props = {
      persentageCount: initial
    }
  }

  setProgress = (value) => {
    this.props.persentageCount = value;
    this.putData(this.key, value);
    this.update();
    //this.emitter.trigger('process')
  }

  triggerEmitter = () => {
    this.emitter.trigger('process');
  }
}

export default DelayControl;  
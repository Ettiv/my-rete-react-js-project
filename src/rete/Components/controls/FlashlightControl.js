import React from "react"
import Rete from "rete";

const FlashlightControl = (props) => {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: props.value ? 'green' : 'red',
        borderRadius: '50%'
      }}
    />
  )
}

class ReteFlashlightControl extends Rete.Control {
  constructor(emitter, key, node){
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = FlashlightControl;

    const initial  = node.data[key] || false;
    node.data[key] = initial;

    this.props = {
      value: initial
    }
  }

  setValue = (value) => {
    this.props.value = value;
    this.putData(this.key, value);
    this.update();
    //this.emitter.trigger('process')
  }
}

export default ReteFlashlightControl;  
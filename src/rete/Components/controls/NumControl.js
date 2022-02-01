import React from "react"
import Rete from "rete";

const NumControl = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value);
  }

  return (
    <input
      type="number"
      value={props.value}
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (event) => event.stopPropagation());
      }}
      onChange={(event) => onChange(event)}
    />
  )
}

class ReteNumControl extends Rete.Control {
  constructor(emitter, key, node, readonly = false){
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = NumControl;

    const initial  = node.data[key] || 0;
    node.data[key] = initial;

    this.props = {
      readonly,
      value: initial,
      onChange: (value) =>{
        this.setNumberValue(value);
      }
    }
  }

  setNumberValue = (value) => {
    this.props.value = value;
    this.putData(this.key, value);
    this.update();
    this.emitter.trigger('process')
  }
}

export default ReteNumControl;  
import React from "react"
import Rete from "rete";

const BoolControl = (props) => {

  const onChange = () => {
    props.onChange();
  }

  return (
    <input
      type="checkbox"
      value={props.value}
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (event) => event.stopPropagation());
      }}
      onChange={onChange}
    />
  )
}

class ReteBoolControl extends Rete.Control {
  constructor(emitter, key, node, readonly = false){
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = BoolControl;

    const initial  = node.data[key] || false;
    node.data[key] = initial;

    this.props = {
      readonly,
      value: initial,
      onChange: () =>{
        this.onChange();
      }
    }
  }

  onChange = () => {
    const newValue = !this.props.value;
    this.props.value = newValue;
    this.putData(this.key, newValue);
    this.update();
    this.emitter.trigger('process')
  }
}

export default ReteBoolControl;  
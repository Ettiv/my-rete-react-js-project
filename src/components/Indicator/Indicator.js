import React from 'react';

const Indicator = (props) => {
  return (
    <div
      style={{
        marginTop: props.marginTop,
        marginRight: props.marginRight,
        marginLeft: props.marginLeft,
        marginBottom: props.marginBottom,
        width: props.width,
        height: props.height,
        borderRadius: props. height,
        backgroundColor: props.backgroundColor
      }}
    >
      <div
        style={{
          width: props.persentageCount + "%",
          height: props.height,
          borderRadius: props. height,
          backgroundColor: props.color
        }}
      ></div>
    </div>
  );
}

Indicator.defaultProps = {
  width: '450px',
  height: '8px',
  persentageCount: '100',
  marginBottom: '0px',
  marginLeft: '0px',
  marginTop: '0px',
  marginRight: '0px',
  backgroundColor: 'rgba(43, 75, 242, 0.2)',
  color: '#2B4BF2'
}

export default Indicator;

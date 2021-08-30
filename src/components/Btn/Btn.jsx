import React from 'react';
import Button from '@material-ui/core/Button';

const Btn = (props) => {
  return (
    <Button
      type={props.type ? props.type : null}
      style={{
        margin: '10px 0',
        color: '#0c4a48',
        border: '1px solid #0c4a48',
      }}
      variant="outlined"
      color="primary"
      onClick={props.handler}
    >
      {props.title}
    </Button>
  );
};

export default Btn;

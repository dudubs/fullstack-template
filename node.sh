  if [ "$mon" ]; then
    _node="nodemon $DABSI_MON -e ts,tsx"
  else
    _node="node"
  fi

 export NODE_OPTIONS=" -r source-map-support/register -r ts-node/register"

export TS_NODE_TRANSPILE_ONLY=true

 $_node $*


import React from "react";
import { Text } from "vcc-ui";
import { useParams } from "react-router-dom";

function Shop() {
  let { id } = useParams();

  return (
    <Text variant="hillary" subStyle="emphasis">
      Shop car {id}
    </Text>
  );
}

export default Shop;

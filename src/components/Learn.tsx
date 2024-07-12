import React from "react";
import { Text } from "vcc-ui";
import { useParams } from "react-router-dom";

const Learn = () => {
  let { id } = useParams();

  return (
    <Text variant="hillary" subStyle="emphasis">
      Learn about car {id}
    </Text>
  );
};

export default Learn;

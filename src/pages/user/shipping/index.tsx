import { useRouter } from "next/router";
import { useEffect } from "react";

import React from "react";

function Shipping() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/user");
  }, []);

  return <div></div>;
}

export default Shipping;

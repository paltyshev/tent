import { useState } from "react";

import { Invoice } from "./invoice";
import { PaymentProps } from "./types";
import React from "react";

export const Payments = (props: PaymentProps) => {
  const [payment, setPayment] = useState("");

  return (
    <>
      {<Invoice {...props} />}
    </>
  );
};
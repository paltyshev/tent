import { useBasket } from "../components/basket";
import { Form } from "remix";
import { Payments } from "../components/payments";
import { useState } from "react";
import { CheckoutModelInput } from "../service-api/types.generated";
import React from "react";

export default function Checkout() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
  });

  const { firstName, lastName, phone, street, city, postalCode } = state;

  const basket = useBasket();

  function getURL(path: string) {
    if (typeof window === "undefined") return "";
    return `${location?.protocol}//${location?.host}${path}`;
  }

  const checkoutModel: CheckoutModelInput = {
    basketModel: basket.basketModel,
    customer: {
      firstName,
      lastName,
      addresses: [
        { type: "billing", phone },
        {
          type: "delivery",
          street,
          city,
          postalCode,
        },
      ],
    },
    confirmationURL: getURL(`/confirmation/{crystallizeOrderId}`),
    checkoutURL: getURL(`/checkout`),
    termsURL: getURL(`/terms`),
  };

  return (
    <div className="p-10 mx-auto bg-background1 w-auto md:w-128 lg:w-128 mt-20">
      <h1 className="text-text text-3xl font-bold mb-10 text-center">
        Оформление заказа
      </h1>
      <div className="mx-auto">
        <Form method="post" className="flex flex-wrap gap-5">
          <input
            type="text"
            name="Имя"
            placeholder="Имя"
            className="w-full"
            onChange={(e) => setState({ ...state, firstName: e.target.value })}
          />
          <input
            type="text"
            name="Фамилия"
            placeholder="Фамилия"
            className="w-full"
            onChange={(e) => setState({ ...state, lastName: e.target.value })}
          />
          <input
            type="tel"
            name="Телефон"
            placeholder="Телефон"
            className="w-full"
            onChange={(e) => setState({ ...state, phone: e.target.value })}
          />
           <input
            type="text"
            name="Адрес доставки"
            placeholder="Адрес доставки"
            className="w-full"
            onChange={(e) => setState({ ...state, street: e.target.value })}
          />
        </Form>
      </div>
      <Payments
        checkoutModel={checkoutModel}
        onSuccess={() => console.log("success")}
        onError={() => {}}
      />
    </div>
  );
}
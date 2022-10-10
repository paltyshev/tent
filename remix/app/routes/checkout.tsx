import { useBasket } from "../components/basket";
import { Form, Link } from "remix";
import { Payments } from "../components/payments";
import { useState } from "react";
import { CheckoutModelInput } from "../service-api/types.generated";


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
    <div>
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="mx-auto flex items-center space-x-2 lg:max-w-7xl"
        >
          <li>
            <div className="flex items-center">
              <Link to="/" className="mr-2 text-sm font-medium text-gray-900">
                Главная
              </Link>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-5 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li className="text-sm">
            <div className="flex items-center">
              <Link to="/cart" className="mr-2 text-sm font-medium text-gray-900">
                Корзина
              </Link>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-5 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li className="text-sm">
            <p className="font-medium text-gray-500 hover:text-gray-600">
              Оформление
            </p>
          </li>
        </ol>
      </nav>
      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
        <h1 className="font-extrabold pb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-none text-text">
          Оформление заказа
        </h1>
        <div className="flex flex-col w-full md:w-1/2 gap-5 bg-background1 mt-5 p-5 md:max-w-xs">
          <Form method="post" className="flex flex-wrap gap-5">
            <input
              type="text"
              name="Имя"
              placeholder="Имя"
              className="input w-full md:max-w-xs"
              onChange={(e) => setState({ ...state, firstName: e.target.value })}
            />
            <input
              type="text"
              name="Фамилия"
              placeholder="Фамилия"
              className="input w-full md:max-w-xs"
              onChange={(e) => setState({ ...state, lastName: e.target.value })}
            />
            <input
              type="tel"
              name="Телефон"
              placeholder="Телефон"
              className="input w-full md:max-w-xs"
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
            <input
              type="text"
              name="Адрес доставки"
              placeholder="Адрес доставки"
              className="input w-full md:max-w-xs"
              onChange={(e) => setState({ ...state, street: e.target.value })}
            />
          </Form>
          <Payments
            checkoutModel={checkoutModel}
            onSuccess={() => console.log("success")}
            onError={() => { }}
          />
        </div>
      </div>
    </div>
  );
}
import { useBasket } from "../components/basket";
import { Link } from "remix";
import { Breadcrumb } from "~/components/breadcrumb";

export default function Cart() {
  let basket = useBasket();
  const title = "Корзина";
  if (!basket.cart.length) {
    return (
      <div>
        <Breadcrumb title={title} />
        <h1 className="py-20 font-extrabold pb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-none text-text">Корзина пуста.</h1>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb title={title} />
      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
        <h1 className="font-extrabold pb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-none text-text">
          Ваша корзина ({basket.cart.length})
        </h1>
        <div className="flex flex-col w-full md:w-1/2 gap-5 bg-background1 mt-5 p-5">
          {basket.cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="font-semibold text-xl">
                  {item.name} × {item.quantity}
                </p>
                <div className="flex gap-3">
                  {item.attributes?.map((attr, index) => (
                    <div
                      className="even:after:content-['\00a0-'] even:before:content-['-\00a0']"
                      key={index}
                    >
                      {attr.value}
                    </div>
                  ))}
                </div>
              </div>
              <p>{item.price.gross * item.quantity} ₽</p>
            </div>
          ))}
          <div className="flex justify-between items-center border-t-2 border-text pt-4">
            <p className="font-semibold text-xl">Итого</p>
            <p>{basket.total.gross} ₽</p>
          </div>
          <Link
            to="/checkout"
            className="btn btn-block"
          >
            Перейти к оформлению заказа
          </Link>
        </div>
      </div>
    </div>
  );
}
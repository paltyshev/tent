import { useBasket } from "../components/basket";
import { Link } from "remix";
import { Breadcrumb } from "~/components/breadcrumb";
import { Image } from "@crystallize/react-image";

export default function Cart() {
  let basket = useBasket();
  const title = "Корзина";

  const removeItem = (item) => {
    basket?.actions?.removeItem({
      id: item.id,
      sku: item.sku,
      path: item.path,
      priceVariantIdentifier: "default",
      stock: item.stock,
    });
  };

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

        <div className="mt-8 w-full sm:w-96">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {basket.cart.map((item, index) => (
                <li key={index} className="flex py-6">
                  <Link to={item.path}>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        {...item.images[0]}
                        sizes="100px"
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={item.path}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">{item.price.gross * item.quantity}</p>
                      </div>
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
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">{item.quantity} шт.</p>

                      <div className="flex">
                        <button
                          onClick={() => removeItem(item)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="border-t border-gray-200 mt-14 py-6 w-full sm:w-96">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Итого</p>
            <p>{basket.total.gross} ₽</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Доставка 0 руб. Оплата при получении.</p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="btn btn-secondary btn-block"
            >
              Перейти к оформлению заказа
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              или
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Продолжить покупки
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
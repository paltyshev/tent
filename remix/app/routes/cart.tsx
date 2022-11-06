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
            <ul role="list" className="-my-6">
              {basket.cart.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <div className="flex">
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
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <Link to={item.path}>{item.name}</Link>
                          </h3>
                          <p className="ml-4">{item.price.gross * item.quantity}&nbsp;₽</p>
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
                        <p className="">{item.quantity} шт.</p>

                        <div className="flex">
                          <button
                            onClick={() => removeItem(item)}
                            className="link link-accent link-hover font-medium"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="divider"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6"></div>
        <div className="w-full sm:w-96">
          <div className="flex justify-between text-base font-medium">
            <p>Итого</p>
            <p>{basket.total.gross} ₽</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Доставка 0 руб.</p>
          <p className="mt-0.5 text-sm text-gray-500">Оплата при получении.</p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="btn btn-primary btn-block"
            >
              Перейти к оформлению заказа
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              или
              <Link
                to="/"
                className="font-medium link link-accent link-hover ml-1"
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
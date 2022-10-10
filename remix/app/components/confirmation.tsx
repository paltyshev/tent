import { useEffect } from "react";
import { useBasket } from "./basket";
import React from "react";

export default function Confirmation({ order, success }) {
  const basket = useBasket();

  if (success) {
    basket.actions.empty();
  }

  useEffect(() => {
    if (!order) {
      const t = setTimeout(() => window.location.reload(), 5000);

      return () => clearTimeout(t);
    }
  }, [order]);

  if (!order) {
    return <p>Загрузка...</p>;
  }

  const cart = order.cart.map((item) => ({
    ...item,
    image: {
      url: item.imageUrl,
    },
  }));

  const { total } = order;

  const delivery = 350;

  return (
    <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
      <h1 className="font-extrabold pb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-none text-text">Заказ принят</h1>
      <div className="flex flex-col w-full md:w-1/2 gap-5 bg-background3 mt-5 p-5">
        <p className="mb-5">Мы уже получили ваш заказ № {order.id}.</p>
        <div>
          {cart.map((item, index) => {
            return (
              <div key={index} className="flex justify-between mb-4">
                <div>
                  <p>
                    {item.name} x {item.quantity}
                  </p>
                </div>
                <p>{item.price.gross * item.quantity} ₽</p>
              </div>
            );
          })}
          <div className="flex flex-col gap-3 border-t-2 pt-5">
            <div className="flex justify-between">
              <p>Сумма</p>
              <p>{total.gross} ₽</p>
            </div>
            <div className="flex justify-between">
              <p>Доставка Почтой России</p>
              <p>{delivery} ₽</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Итого</p>
              <p>{total.net + delivery} ₽</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
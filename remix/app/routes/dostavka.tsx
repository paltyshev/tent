import { Breadcrumb } from "~/components/breadcrumb";

export default function Dostavka() {
  const title="Доставка";
  return (
    <div>
      <Breadcrumb title={title} />

      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
        <div className="font-extrabold pb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-none text-text">
          Доставка по России
        </div>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-text font-normal text-md">
          Все товары надежно упаковываются в картонные коробки. При отправлении, вместе с сотрудниками отделения Почты России, составляется опись содержимого посылки.
        </p>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-text font-normal text-md">
          Опись даёт вам возможность вскрыть послыку до оплаты и убедиться в качестве товара.
        </p>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-text font-normal text-md">
          В среднем, доставка Почтой России занимает от 5 до 14 дней.
        </p>
      </div>
    </div>
  );
}
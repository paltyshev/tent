import { Breadcrumb } from "../components/breadcrumb";

export default function Oplata() {
  const title="Оплата";
  return (
    <div>
      <Breadcrumb title={title} />

      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
        <div className="font-extrabold pb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-none text-text">
          Оплата товара
        </div>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-text font-normal text-md">
          Оплата осуществляется по наложенному платежу в вашем отделении Почты России при получении товара.
        </p>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-text font-normal text-md">
          Все посылки мы отправляем с описью, что позволяет вам вскрыть посылку в присутствии работника почты и убедиться в содержании отправления.
        </p>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-text font-normal text-md">
          После осмотра товара, вы можете оплатить наложенный платеж и забрать товар или отказаться от получения посылки. Расходы на возврат отправления ложаться на нас.
        </p>
      </div>
    </div>
  );
}
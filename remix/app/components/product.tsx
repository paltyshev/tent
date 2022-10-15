import { ContentTransformer } from "@crystallize/react-content-transformer";
import { Image } from "@crystallize/react-image";
import { ProductQuery } from "../crystallize/queries/product.generated";
import { componentContent } from "../crystallize/utils/componentContent";
import { ProductBody } from "./product-body";
import { VariantSelector } from "./variant-selector";
import { RelatedProducts } from "./related-products";
import { useBasket } from "./basket";
import { useState } from "react";
import { useNavigate } from "remix";
import { StarIcon } from '@heroicons/react/20/solid'
import { MapPinIcon } from '@heroicons/react/24/outline'

interface ProductProps {
  product: ProductQuery["product"];
}

export const Product = ({ product }: ProductProps) => {
  let item = componentContent(product, "Product");
  let navigate = useNavigate();

  const [selectedVariant, setSelectedVariant] = useState(item.variants[0]);
  const basket = useBasket();

  const onVariantChange = (variant) => setSelectedVariant(variant);

  const buy = () => {
    basket?.actions?.addItem({
      id: selectedVariant.id,
      sku: selectedVariant.sku,
      path: item.path,
      priceVariantIdentifier: "default",
      stock: selectedVariant.stock,
    });
    navigate("/cart", { replace: false });
  };

  const reviews = { href: '#', average: 4, totalCount: 17 }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function dateFormat(date: Date, days): String {
    date.setDate(date.getDate() + days);
    let day = date.getDate();
    let month = date.getMonth();
    let fmonth = "";
    switch (month) {
      case 0: fmonth = "января"; break;
      case 1: fmonth = "февраля"; break;
      case 2: fmonth = "марта"; break;
      case 3: fmonth = "апреля"; break;
      case 4: fmonth = "мае"; break;
      case 5: fmonth = "июня"; break;
      case 6: fmonth = "июля"; break;
      case 7: fmonth = "августа"; break;
      case 8: fmonth = "сентября"; break;
      case 9: fmonth = "октября"; break;
      case 10: fmonth = "ноября"; break;
      case 11: fmonth = "декабря"; break;
    }
    return day + " " + fmonth;
  }

  return (
    <div>
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="mx-auto flex items-center space-x-2 lg:max-w-7xl"
        >
          <li>
            <div className="flex items-center">
              <a href="/" className="mr-2 text-sm font-medium text-gray-900">
                Главная
              </a>
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
            <a
              href={item.path}
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {item.name}
            </a>
          </li>
        </ol>
      </nav>

      {/* Image gallery */}
      <div className="mt-6 mx-auto lg:max-w-7xl">
        <div className="sm:rounded-lg sm:overflow-hidden">
          <Image
            {...selectedVariant.images[0]}
            className="w-full h-full object-center object-cover rounded-md overflow-hidden"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto pt-10 pb-16 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {item.name}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:mt-0 lg:row-span-3">
          <h2 className="sr-only">Product information</h2>
          <p className="tracking-tight text-3xl text-gray-900 font-semibold">
            {selectedVariant.price} ₽
          </p>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating ? 'text-yellow-400' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
              <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {reviews.totalCount} отзывов
              </a>
            </div>
          </div>

          {/* Delivery */}
          <div className="mt-5">
            <h2 className="font-semibold text-2xl mb-4">
              Информация о доставке
            </h2>
            <MapPinIcon className="h-6 w-6 inline-block" />
            <p className="text-sm inline-block">Почта России</p>
            <p className="text-sm">с <span className="underline decoration-indigo-500">{dateFormat(new Date, 7)}</span> по <span className="underline decoration-indigo-500">{dateFormat(new Date, 14)}</span> - <span className="text-lime-500">бесплатно</span> </p>
          </div>

          {/* Variants */}
          <div className="mt-10">
            <VariantSelector
              variants={item.variants}
              selectedVariant={selectedVariant}
              onVariantChange={onVariantChange}
            />
          </div>

          <button
              onClick={() => buy()}
              className="hidden md:block my-10 btn btn-secondary btn-wide"
            >
              В корзину
            </button>

          <div className="btm-nav mb-12 md:hidden px-3 z-10">
            <button
              onClick={() => buy()}
              className="btn btn-secondary normal-case"
            >
              В корзину
              <p className="normal-case text-xs">Доставим с {dateFormat(new Date, 7)}</p>
            </button>
          </div>
        </div>

        <div className="lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6 text-base text-gray-900">
              <ContentTransformer
                json={
                  componentContent(item.summary.content, "RichTextContent")
                    ?.json as [any]
                }
              />
            </div>
            <ProductBody body={item.body} table={item.table} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-text mb-4 font-semibold">Похожие букеты</p>
      </div>
      <RelatedProducts related={item.related} />
    </div>
  );
};
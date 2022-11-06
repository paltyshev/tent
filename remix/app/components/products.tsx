import { componentContent } from "../crystallize/utils/componentContent";
import { FrontpageQuery } from "../crystallize/queries/frontpage.generated";
import { Image } from "@crystallize/react-image";
import { Link } from "remix";
import React from "react";

interface ProductsProps {
  donuts: FrontpageQuery["donuts"];
}

export const Products = ({ donuts }: ProductsProps) => {
  return (
    <div className="mt-20">
      <p className="text-lg font-semibold mb-10">Новые палатки</p>
      <div className="flex w-full items-start flex-wrap gap-5 grid md:grid-cols-2 lg:grid-cols-3">
        {donuts?.children?.map((donut, index) =>
          !componentContent(donut?.bundle?.content, "BooleanContent")?.value &&
            donut.bundle ? (
            <Link to={componentContent(donut, "Product").path} prefetch="none" key={index}>
              <div className="aspect-square relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  {...componentContent(donut, "Product")?.defaultVariant
                    .firstImage}
                  loading="lazy"
                  className="w-full h-full object-center object-cover"
                />
                <div className="absolute bottom-0 left-0 justify-between place-items-end">
                  <div className="flex gap-1 mb-1 ml-1">
                    {donut?.topics?.map((topic, index) => (
                      <div
                        className="text-xs badge badge-accent"
                        key={topic.name}
                      >
                        {topic.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <h2 className="mt-1 text-sm truncate">
                {componentContent(donut, "Product")?.name}
              </h2>
              <p className="text-lg font-medium">
                {componentContent(donut, "Product")?.defaultVariant.price} ₽
              </p>
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
};
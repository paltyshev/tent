import { componentContent } from "../crystallize/utils/componentContent";
import { ProductQuery } from "../crystallize/queries/product.generated";
import { Image } from "@crystallize/react-image";
import { Link } from "remix";
import React from "react";

interface RelatedProductProps {
  related: ProductQuery["product"]["related"];
}

export const RelatedProducts = ({ related }: RelatedProductProps) => {

  return (
    <div className="flex w-full items-start flex-wrap gap-5 grid md:grid-cols-2 lg:grid-cols-3 pb-12">
      {componentContent(related.content, "ItemRelationsContent").items.map(
        (item, index) => (
          <Link to={item.path} key={index} prefetch="intent">
            <div className="aspect-square relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
              <Image
                {...componentContent(item, "Product").defaultVariant.firstImage}
                loading="lazy"
                className="w-full h-full object-center object-cover"
              />
              <div className="absolute bottom-0 left-0 justify-between place-items-end">
                <div className="flex gap-1 mb-1 ml-1">
                  {item.topics?.map((topic) => (
                    <div
                      className="text-xs bg-gray-100 px-2 py-1 rounded-2xl"
                      key={topic.name}
                    >
                      {topic.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h2 className="mt-1 text-sm text-gray-700 truncate ">{item.name}</h2>
            <p className="text-lg font-medium text-gray-900">
              {componentContent(item, "Product").defaultVariant.price} ₽
            </p>
          </Link>
          // <Link
          //   prefetch="intent"
          //   to={item.path}
          //   key={index}
          //   className="bg-primary px-4 py-3 rounded-xl border-2 border-grey md:w-80 w-full h-80"
          // >
          //   <div className="flex flex-col">
          //     <div className="flex justify-between">
          //       <div className="flex gap-1">
          //         {item.topics?.map((topic) => (
          //           <div
          //             className="text-sm bg-grey px-2 py-1 rounded-2xl"
          //             key={topic.name}
          //           >
          //             {topic.name}
          //           </div>
          //         ))}
          //       </div>
          //       <div>
          //         ${componentContent(item, "Product").defaultVariant.price}
          //       </div>
          //     </div>

          //     <Image
          //       {...componentContent(item, "Product").defaultVariant.firstImage}
          //       sizes="300px"
          //       loading="lazy"
          //     />
          //     <h2 className="text-l text-center m-auto">{item.name}</h2>
          //   </div>
          // </Link>
        )
      )}
    </div>
  );
};
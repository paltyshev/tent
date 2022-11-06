import { Image } from "@crystallize/react-image";
import { Link } from "remix";
import React from "react";

export const GridItem = ({ cell }) => {
  return (
    <Link to={cell.item.path} prefetch="none">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          {...cell.item.variants[0]?.images[0]}
          loading="lazy"
          className="w-full h-full object-center object-cover"
        />
        <div className="flex justify-between place-items-end">
          <div className="flex gap-1 mb-1 ml-1">
            {cell.item.topics?.map((topic) => (
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
      <h2 className="mt-1 text-sm truncate ">{cell.item.name}</h2>
      <p className="text-lg font-medium">
        {cell.item.variants[0]?.price} ₽
      </p>
    </Link>
  );
};
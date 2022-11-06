import { Link } from "remix";
import Error from "../../assets/error.svg";
import React from "react";

export const ErrorComponent = () => {
  return (
    <div className="lg:w-content w-full mx-auto flex flex-col mt-20 gap-5 items-center justify-center">
      <img src={`${Error}`} />
      <p className="text-text text-center">Похоже это не та страница.</p>
      <Link prefetch="none" to="/" className="bg-white font-semibold px-5 py-3 w-60 text-center">
        На главную
      </Link>
    </div>
  );
};
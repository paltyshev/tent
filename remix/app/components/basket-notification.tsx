import { Link } from "remix";

export const Notification = () => {
  return (
    <div className="text-center text-text">
      <p className="my-3">Букет добавлен в корзину!</p>
      <div className="">
        <Link to="/cart">Перейти в корзину</Link>
      </div>
    </div>
  );
};
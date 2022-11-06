import { Link } from "remix";
import { useBasket } from "./basket/index";
import { HomeIcon } from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { CreditCardIcon } from '@heroicons/react/24/outline'
import { TruckIcon } from '@heroicons/react/24/outline'

export const BottomNavigation = () => {
  let totalQuantity;
  const basket = useBasket();

  if (basket) {
    totalQuantity = basket.totalQuantity;
  } else {
    totalQuantity = "0";
  }

  return (
    <div className="btm-nav btm-nav-md md:hidden">
      <Link to="/">
        <button>
          <HomeIcon className="h-5 w-5 mx-auto" />
          <span className="btm-nav-label">Главная</span>
        </button>
      </Link>
      <Link to="/oplata">
        <button>
          <CreditCardIcon className="h-5 w-5 mx-auto" />
          <span className="btm-nav-label">Оплата</span>
        </button>
      </Link>
      <Link to="/dostavka">
        <button>
          <TruckIcon className="h-5 w-5 mx-auto" />
          <span className="btm-nav-label">Доставка</span>
        </button>
      </Link>
      <Link to="/cart">
        <button>
          <div>
            <ShoppingBagIcon className="h-5 w-5 inline-block" />
            {totalQuantity > 0 ? <div className="badge badge-accent badge-xs text-xs h-4 absolute -pl-2 ">{totalQuantity}</div> : null}
          </div>
          <span className="btm-nav-label">Корзина</span>
        </button>
      </Link>
    </div>
  );
};
import { useParams } from "react-router-dom";
import { getMenuById } from "../apis";
import { useShoppingCart } from "../hooks/UseShoppingCart";
import { IItem } from "../models/item.model";
import { Item } from "../reducers";
import { CartItemsList } from "../components/Cart/CartItemsList";
import { StoreItem } from "../components/MenuItems/StoreItem";
import { AddToCartButton } from "../components/Cart/AddToCart";

const mapItems = (items: IItem[]): Item[] => {
  const stateItem =
    items &&
    items.map((item) => {
      const { id, name, price, maximumPermitted } = item;
      return {
        id,
        name,
        price,
        maximumPermitted,
      };
    });
  return stateItem;
};

export const FoodMenu = () => {
  const { id } = useParams();
  let response;
  if (id) {
    const { isLoading, data: menu } = getMenuById(id);
    const { addToCart, quantity, totalPrice } = useShoppingCart();
    const items = mapItems(menu?.data?.items!);

    if (isLoading) {
      response = <p>...Loading</p>;
    } else {
      if (menu) {
        const { name, description, imageUrl, basePrice } = menu.data;
        return (
          <div>
            <StoreItem
              quantity={quantity}
              items={items}
              name={name}
              description={description}
              imageUrl={imageUrl}
              basePrice={basePrice}
              id={id}
            />
            <div className="elBg addToCart">
              <div className=" pt-2 pb-2">
                <CartItemsList />
              </div>
              <AddToCartButton
                onAddMenuToCartClick={() => addToCart({ id, name, basePrice, quantity, items })}
                amount={totalPrice > 0 ? totalPrice : basePrice}
                onAddItemToCartClick={() => addToCart({ id, name, basePrice, quantity, items })}
                onRemoveItemFromCartClick={() => addToCart({ id, name, basePrice, quantity, items })}
              />
            </div>
          </div>
        );
      }
    }
  }

  return <>{response}</>;
};

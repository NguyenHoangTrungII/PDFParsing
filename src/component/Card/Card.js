import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import CartItem from "../CartItem/CartItem";

const cx = classNames.bind(styles);

function Card({ name, isCart = false, data = [], inCart = false }) {
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    data.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    const formattedPrice = parseFloat(totalPrice.toFixed(2));

    return formattedPrice;
  };

  return (
    <div className={cx("wrapper")}>
      {/* Header */}
      <div className={cx("card_Header")}>
        <div className={cx("logo")}>
          <img src={require("../../assets/icons/nike.png")} />
        </div>
        <div className={cx("title")}>
          <label>{name}</label>
          {isCart && <label>{"$" + calculateTotalPrice()}</label>}
        </div>
      </div>
      {/* Body */}
      <div className={cx("card_Body")}>
        {data.length === 0
          ? isCart
            ? "Your cart is empty"
            : " "
          : data.map((item, index) =>
              isCart ? (
                <CartItem key={index} itemData={item} />
              ) : (
                <ProductCard key={index} itemData={item} inCart={item.inCart} />
              )
            )}
      </div>
    </div>
  );
}

export default Card;

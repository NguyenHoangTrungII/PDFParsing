import classNames from "classnames/bind";
import styles from "./CartPage.module.scss";
import Card from "../Card/Card";
import { useEffect } from "react";
import { getAllProduct } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/actions/cartAction";

const cx = classNames.bind(styles);

function CartPage() {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.store.products);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetching = async () => {
      try {
        await Promise.all([dispatch(getAllProduct()), dispatch(fetchCart())]);
        console.log(cartItems);
      } catch (err) {
        console.log(err);
      }
    };

    fetching();
  }, [dispatch]);

  return (
    <div className={cx("Wrapper")}>
      <div className={cx("container")}>
        <Card name={"Our Product"} data={shoes} inCart={shoes.inCart} />
        <Card name={"Your Cart"} data={cartItems} isCart={true} />
      </div>
    </div>
  );
}

export default CartPage;

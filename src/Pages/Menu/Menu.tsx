import Headling from "../../Components/Headling/Headling";
import Search from "../../Components/search/Search";
import styles from "./Menu.module.css";
import { PREFIX } from "../../helpers/api";
import { Product } from "../../interfaces/product.interface";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);

      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: { name },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      console.error(e);
      setIsLoading(false);
      return;
    }

    // try {
    //   const res = await fetch(`${PREFIX}/products`);
    //   if (!res.ok) {
    //     return;
    //   }
    //   const data = (await res.json()) as Product[];
    //   setProducts(data);
    // } catch (e) {
    //   console.error(e);
    //   return;
    // }
  };

  const unpadateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  return (
    <div className={styles["container"]}>
      <div className={styles["head"]}>
        <Headling>Menu</Headling>
        <Search
          placeholder="Enter food or ingridients"
          onChange={unpadateFilter}
        />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {!isLoading && products.length === 0 && <>Nothing Found</>}
        {isLoading && <>loading products...</>}
      </div>
    </div>
  );
}

export default Menu;

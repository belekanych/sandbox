import { db } from "@/vendor/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Card from "@/components/layout/blocks/Card";
import ShoppingListItem from "@/modules/shoppingList/entities/ShoppingListItem";
import { useStore } from "@/contexts/StoreContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  item: ShoppingListItem;
}

const ShoppingCartListItem: React.FC<Props> = ({ item }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(item.checked);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);

    await updateDoc(doc(db, `/shoppingLists/${item.id}`), {
      checked: e.target.checked,
    });
  }

  const { products } = useStore();

  return (
    <Card el="li">
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
      </label>
      <div>
        <p>
          {products.filter((product) => product.id === item.productId)[0]?.name}
        </p>
        <span>
          {t("labels.amountLabel", {
            amount: item.amount,
            type: item.amountType,
          })}
        </span>
      </div>
    </Card>
  );
};

export default ShoppingCartListItem;

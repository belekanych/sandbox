import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import ShoppingListItem from "@/modules/shoppingList/entities/ShoppingListItem";
import { useStore } from "@/contexts/StoreContext";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

interface Props {
  item: ShoppingListItem;
}

const ShoppingCartListItem: React.FC<Props> = ({ item }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(item.checked);

  async function handleChange(checked: CheckedState) {
    setChecked(!!checked);

    await updateDoc(doc(db, `/shoppingLists/${item.id}`), {
      checked: !!checked,
    });
  }

  const { products } = useStore();

  const product = useMemo(() => {
    return products.filter((product) => product.id === item.productId)[0];
  }, [products, item]);

  return (
    <Card className="items-center flex space-x-4 p-4">
      <Checkbox
        id={item.productId}
        checked={checked}
        onCheckedChange={handleChange}
        className="scale-110"
      />
      <div className={`grid gap-1.5 leading-none ${checked && "line-through"}`}>
        <label
          htmlFor={item.productId}
          className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {product.name}
        </label>
        <p className="text-sm text-muted-foreground">
          {t("labels.amountLabel", {
            amount: item.amount,
            unit: t(`labels.units.${product.unit}`),
          })}
        </p>
      </div>
    </Card>
  );
};

export default ShoppingCartListItem;

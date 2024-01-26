import * as stylex from "@stylexjs/stylex";
import { db } from "../../../../vendor/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { colors, spacing } from "../../../../styles/tokens.stylex";
import Card from "../../../../components/layout/blocks/Card";
import ShoppingListItem from "../../entities/ShoppingListItem";
import { useStore } from "../../../../contexts/StoreContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const styles = stylex.create({
  item: {
    padding: spacing.base,
    margin: `calc(${spacing.base} * 4) 0`,
    display: "flex",
  },
  checkbox: {
    marginRight: spacing.md,
  },
  title: {
    margin: 0,
    paddingBottom: spacing.md,
    fontWeight: "bold",
  },
  amount: {
    color: colors.gray40,
  },
});

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
    <Card el="li" {...stylex.props(styles.item)}>
      <label {...stylex.props(styles.checkbox)}>
        <input type="checkbox" checked={checked} onChange={handleChange} />
      </label>
      <div>
        <p {...stylex.props(styles.title)}>
          {products.filter((product) => product.id === item.productId)[0]?.name}
        </p>
        <span {...stylex.props(styles.amount)}>
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

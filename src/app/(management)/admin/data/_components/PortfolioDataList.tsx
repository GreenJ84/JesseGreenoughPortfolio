import React from 'react'

import type { BasePortfolioItem } from '@/app/_lib/_types';
import css from './DataPage.module.css';


interface PortfolioDataListProps<T extends BasePortfolioItem> {
  items: T[];
  openModal: (proj: T) => void;
  itemDisplay: (item: T) => React.JSX.Element;
}
const PortfolioDataList = <T extends BasePortfolioItem>({ items, openModal, itemDisplay }: PortfolioDataListProps<T>) => {
  return (
    <ul className={css.dataList}>
        {items.map((item: T) => (
          <li
            key={item.id}
            className={css.dataCard}
            onClick={() => openModal(item)}
            tabIndex={0}
          >
            {itemDisplay(item)}
          </li>
        ))}
      </ul>
  )
}

export default PortfolioDataList
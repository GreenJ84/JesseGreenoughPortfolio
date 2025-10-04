import React from 'react'

import type { PortfolioData } from '@/app/_lib/_types';
import css from './DataPage.module.css';


interface PortfolioDataListProps<T extends PortfolioData> {
  items: T[];
  openModal: (proj: T) => void;
  itemDisplay: (item: T) => JSX.Element;
}
const PortfolioDataList = <T extends PortfolioData>({ items, openModal, itemDisplay }: PortfolioDataListProps<T>) => {
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
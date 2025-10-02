import { useState } from 'react';

import { PortfolioData } from '@/app/_lib/_types';

export default function useDataManager<T extends PortfolioData>(initial_items?: T[]) {
  const [items, setItems] = useState<T[]>(initial_items || []);
  const [selected, setSelected] = useState<T | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const openModal = (item?: T) => {
    setSelected(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelected(undefined);
  };

  return {
    items,
    setItems,
    selected,
    setSelected,
    showModal,
    openModal,
    closeModal,
  };
}
'use client';
import type { MouseEventHandler } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
const css = require('./Shared.module.css');

export default function AddItemsButton({ itemType, clickHandler, pending = false }: { itemType: string; clickHandler: MouseEventHandler<HTMLButtonElement>; pending?: boolean }) {
  return <button id="AddItem" type="button" aria-label={`Load More ${itemType} Items`} aria-busy={pending} disabled={pending} onClick={clickHandler} className={css.add_item_button}>
    <span>{pending ? 'Loading…' : `Load More ${itemType}`}</span><BsPlusCircleFill className={css.addIcon} />
  </button>;
}

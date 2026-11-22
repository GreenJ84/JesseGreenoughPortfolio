'use client';

const css = require('./Shared.module.css');
interface DataFilterProps {
  titles: [string, string?];
  options: [string[], string[]?];
  values: [string, string?];
  firstHandler: (value: string) => void;
  secondHandler?: (value: string) => void;
}
export default function DataFilter({ titles, options, values, firstHandler, secondHandler }: DataFilterProps) {
  const paired = Boolean(titles[1] && options[1] && secondHandler);
  return <nav id="dataFilter" className={css.itemFilter}>
    {titles.map((title, index) => title && (index === 0 || paired) && <div key={title}>
      <h2><label htmlFor={index === 0 ? 'firstSelector' : 'secondSelector'}>Filter by <span className="detail">{title}</span></label></h2>
      <select id={index === 0 ? 'firstSelector' : 'secondSelector'} name={index === 0 ? 'firstSelector' : 'secondSelector'} value={values[index] ?? ''} onChange={event => (index === 0 ? firstHandler : secondHandler)?.(event.currentTarget.value)}>
        <option value="" disabled>...</option>
        {paired && <option value="top">Top 10</option>}
        <option value="all">All</option>
        {(options[index] ?? []).map(option => <option key={option} value={option}>{index === 0 ? option.toUpperCase() : option}</option>)}
      </select>
    </div>)}
  </nav>;
}

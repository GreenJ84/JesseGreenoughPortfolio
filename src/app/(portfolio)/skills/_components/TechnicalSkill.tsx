/** @format */


import type { Skill } from '@/app/_lib/_types';
import { skillIconRegistry } from '@/app/_lib/skillCatalog';

const css = require("./Skill.module.css");

const TechnicalSkill = ({title, rating, image_url}: Skill) => {
  const Icon = Object.hasOwn(skillIconRegistry, image_url) ? skillIconRegistry[image_url] : skillIconRegistry.General;

  return (
    <li className={css.skillContainer}>
      <div className={css.skillHead}>
        <span className={css.iconFrame}><Icon aria-hidden="true" /></span>
        <strong className={css.skillName}>{title}</strong>
      </div>
      <div className={css.ratingLabel}><span>Proficiency</span><strong>{rating}/5</strong></div>
      <div className={css.segments} aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => <span key={index} className={index < rating ? css.filled : ''} />)}
      </div>
      <meter className={css.accessibleMeter} min={0} max={5} value={rating} aria-label={`${title} proficiency: ${rating} out of 5`} />
    </li>
  );
};

export default TechnicalSkill;

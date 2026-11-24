'use client';

import Link from 'next/link';

import { DataType } from '@/app/_lib/_types';

import css from './Data.module.css';

const cards = [
	{
		label: 'Skills',
		description: 'Manage skill ratings, icons, visibility, and display order.',
		href: '/admin/data/skills',
		type: 'skills',
		icon: '🧰',
	},
	{
		label: 'Projects',
		description:
			'Manage your portfolio projects, add new work, edit details, and showcase your best builds.',
		href: '/admin/data/projects',
		type: DataType.Project,
		icon: '🛠️',
	},
	{
		label: 'Certifications',
		description:
			'Track your certifications, add new achievements, and keep your credentials up to date.',
		href: '/admin/data/certifications',
		type: DataType.Certification,
		icon: '🎓',
	},
	{
		label: 'Education',
		description: 'Edit your education history, degrees, and academic highlights.',
		href: '/admin/data/education',
		type: DataType.Education,
		icon: '🏫',
	},
	{
		label: 'Work',
		description: 'Update your work experience, roles, and professional journey.',
		href: '/admin/data/work',
		type: DataType.Work,
		icon: '💼',
	},
];

export default function DataPage() {
	return (
		<main className={css.dataNavMain}>
			<h1 className={css.dataNavTitle}>Manage Portfolio Data</h1>
			<div className={css.dataNavGrid}>
				{cards.map((card) => (
					<Link
						key={card.type}
						href={card.href}
						className={css.dataNavCard}
					>
						<div className={css.cardIcon}>{card.icon}</div>
						<div>
							<h2 className={css.cardTitle}>{card.label}</h2>
							<p className={css.cardDesc}>{card.description}</p>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
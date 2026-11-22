// Keep every cached view of a domain in the same invalidation contract.
export const cacheTags = {
  education: { list: 'educationData', all: 'allEducationData', count: 'totalEducation' },
  projects: { count: 'totalProjects', list: 'allProjects', top: 'topProjects', filters: 'projectFilters', category: 'projectsByCategory', tech: 'projectsByTech' },
} as const;

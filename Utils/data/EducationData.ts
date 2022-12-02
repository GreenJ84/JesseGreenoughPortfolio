export interface educationType{
    college: string
    degree: string
    date: string
    description: string[]
    icon: string
    website: string
}
export const education: educationType[] = [
    {
        college: 'Coding Dojo',
        degree: 'Full-stack Web Development',
        date: 'June 2022 - Oct 2022',
        description: ['Full Stack Web Development Bootcamp Covering: HTML, CSS, JS, Python, MERN, Java', '16 weeks, 1000+ hours of coding', 'Attained a 4.0gpa equivalent with 3 fully deployed applications'],
        icon: 'https://imgs.search.brave.com/pJbqUwV7oeJx5RVdjiBKtKLWp9Ap5IRvXs07qF1Z0nw/rs:fit:900:900:1/g:ce/aHR0cHM6Ly95dDMu/Z2dwaHQuY29tL2Ev/QUFUWEFKenI3bklI/X084WEZ2WElsRG9x/UDV6MUNkZ2pDbldO/UkExSjB3PXM5MDAt/Yy1rLWMweGZmZmZm/ZmZmLW5vLXJqLW1v',
        website: 'https://www.codingdojo.com/'
    },
    {
        college: 'El Paso Community College',
        degree: 'General Science',
        date: 'August 2011 - June 2014',
        description: ['High School Running-Start achievement', 'Attained a 3.77gpa equivalent while attending High School'],
        icon: 'https://imgs.search.brave.com/9IYyCIJWnuyqyRa_ra07V9gzckNS_5UkNHJnqtWC1n4/rs:fit:800:613:1/g:ce/aHR0cHM6Ly93d3cu/ZGlnaWUub3JnL21l/ZGlhX2NhY2hlLzcx/OTYxLzcxOTYxX2xh/cmdlLmpwZw',
        website: 'https://www.epcc.edu/'
    }
]

export interface certificationType{
    title: string
    issuer: string
    date: string
    description: string
    image: string
    url: string
}

export const certifications: certificationType[] = [
    {
        title: 'Apolllo GraphQL Developer - Professional',
        issuer: 'Apollo GraphQL',
        date: 'Nov 2022',
        description: 'Developers who obtain this certification demonstrate strong familiarity with Apollo Federation concepts. They can apply those concepts to build a federated supergraph or move an existing monolithic graph to federation.',
        image: 'https://imgs.search.brave.com/Z0eF_FPhimio7OYISGFmjCftZGXZtQuEgf2HFVUKtjk/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L21lZGlhLXAuc2xp/ZC5lcy91cGxvYWRz/LzM0NTY3Ny9pbWFn/ZXMvMzA5NDQyOC9h/Z2NkZ3YwajZ2aDJx/NTV5Z3U5aS5wbmc',
        url: 'https://www.apollographql.com/tutorials/certifications/39b422d7-10f0-4ccb-bc91-8b08207fe102',
    },
    {
        title: 'Apolllo Developer - Professional',
        issuer: 'Apollo GraphQL',
        date: 'Nov 2022',
        description: 'Developers who obtain this certification demonstrate strong familiarity with Apollo Federation concepts. They can apply those concepts to build a federated supergraph or move an existing monolithic graph to federation.',
        image: 'https://imgs.search.brave.com/Z0eF_FPhimio7OYISGFmjCftZGXZtQuEgf2HFVUKtjk/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L21lZGlhLXAuc2xp/ZC5lcy91cGxvYWRz/LzM0NTY3Ny9pbWFn/ZXMvMzA5NDQyOC9h/Z2NkZ3YwajZ2aDJx/NTV5Z3U5aS5wbmc',
        url: 'https://www.apollographql.com/tutorials/certifications/39b422d7-10f0-4ccb-bc91-8b08207fe102',
    },
    {
        title: 'Apolllo GraphQL - Associate',
        issuer: 'Apollo GraphQL',
        date: 'Nov 2022',
        description: 'Developers who obtain this certification demonstrate strong familiarity with Apollo Federation concepts. They can apply those concepts to build a federated supergraph or move an existing monolithic graph to federation.',
        image: 'https://imgs.search.brave.com/Z0eF_FPhimio7OYISGFmjCftZGXZtQuEgf2HFVUKtjk/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L21lZGlhLXAuc2xp/ZC5lcy91cGxvYWRz/LzM0NTY3Ny9pbWFn/ZXMvMzA5NDQyOC9h/Z2NkZ3YwajZ2aDJx/NTV5Z3U5aS5wbmc',
        url: 'https://www.apollographql.com/tutorials/certifications/39b422d7-10f0-4ccb-bc91-8b08207fe102',
    },
    {
        title: 'Not Apolllo GraphQL Developer',
        issuer: 'Apollo GraphQL',
        date: 'Nov 2022',
        description: 'Developers who obtain this certification demonstrate strong familiarity with Apollo Federation concepts. They can apply those concepts to build a federated supergraph or move an existing monolithic graph to federation.',
        image: 'https://imgs.search.brave.com/Z0eF_FPhimio7OYISGFmjCftZGXZtQuEgf2HFVUKtjk/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L21lZGlhLXAuc2xp/ZC5lcy91cGxvYWRz/LzM0NTY3Ny9pbWFn/ZXMvMzA5NDQyOC9h/Z2NkZ3YwajZ2aDJx/NTV5Z3U5aS5wbmc',
        url: 'https://www.apollographql.com/tutorials/certifications/39b422d7-10f0-4ccb-bc91-8b08207fe102',
    },
    {
        title: 'GraphQL Not Developer - Professional',
        issuer: 'Apollo GraphQL',
        date: 'Nov 2022',
        description: 'Developers who obtain this certification demonstrate strong familiarity with Apollo Federation concepts. They can apply those concepts to build a federated supergraph or move an existing monolithic graph to federation.',
        image: 'https://imgs.search.brave.com/Z0eF_FPhimio7OYISGFmjCftZGXZtQuEgf2HFVUKtjk/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L21lZGlhLXAuc2xp/ZC5lcy91cGxvYWRz/LzM0NTY3Ny9pbWFn/ZXMvMzA5NDQyOC9h/Z2NkZ3YwajZ2aDJx/NTV5Z3U5aS5wbmc',
        url: 'https://www.apollographql.com/tutorials/certifications/39b422d7-10f0-4ccb-bc91-8b08207fe102',
    },
    {
        title: 'Apolllo Professional',
        issuer: 'Apollo GraphQL',
        date: 'Nov 2022',
        description: 'Developers who obtain this certification demonstrate strong familiarity with Apollo Federation concepts. They can apply those concepts to build a federated supergraph or move an existing monolithic graph to federation.',
        image: 'https://imgs.search.brave.com/Z0eF_FPhimio7OYISGFmjCftZGXZtQuEgf2HFVUKtjk/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L21lZGlhLXAuc2xp/ZC5lcy91cGxvYWRz/LzM0NTY3Ny9pbWFn/ZXMvMzA5NDQyOC9h/Z2NkZ3YwajZ2aDJx/NTV5Z3U5aS5wbmc',
        url: 'https://www.apollographql.com/tutorials/certifications/39b422d7-10f0-4ccb-bc91-8b08207fe102',
    },
]


export interface workItem{
    company: string
    logo: string
    position: string
    location: string
    date: string
    details: string[]
}

export const workHistory: workItem[] = [
    {
        company: 'Fred Meyer',
        position: 'Retail Manager',
        logo: 'https://media.glassdoor.com/sqll/14993/fred-meyer-stores-squarelogo.png', location: 'Shoreline, WA',
        date: '2021-2022',
        details: ['string','string']
    },
    {
        company: 'Fred Meyer',
        position: 'Retail Clerk',
        logo: 'https://media.glassdoor.com/sqll/14993/fred-meyer-stores-squarelogo.png',
        location: 'Shoreline, WA',
        date: '2019-2021',
        details: ['string','string']
    },
    {
        company: 'Chipotle Mexican Grill, Inc',
        position: 'Apprentice',
        logo: 'https://media.glassdoor.com/sqll/14993/fred-meyer-stores-squarelogo.png',
        location: 'Seattle, WA',
        date: '2018-2019',
        details: ['string','string']
    },
    {
        company: 'Chipotle Mexican Grill, Inc',
        position: 'Service Manager',
        logo: 'https://media.glassdoor.com/sqll/14993/fred-meyer-stores-squarelogo.png',
        location: 'Seattle, WA',
        date: '2017-2018',
        details: ['string','string']
    },
]
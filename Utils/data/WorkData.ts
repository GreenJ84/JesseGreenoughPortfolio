
export interface workItem{
    company: string
    position: string
    location: string
    date: string
    details: string[]
}

export const workHistory: workItem[] = [
    {
        company: 'Fred Meyer',
        position: 'Retail Manager',
        location: 'Shoreline, WA',
        date: '2021-2022',
        details: ['string','string']
    },
    {
        company: 'Fred Meyer',
        position: 'Retail Clerk',
        location: 'Shoreline, WA',
        date: '2019-2021',
        details: ['string','string']
    },
    {
        company: 'Chipotle Mexican Grill, Inc',
        position: 'Apprentice',
        location: 'Seattle, WA',
        date: '2018-2019',
        details: ['string','string']
    },
    {
        company: 'Chipotle Mexican Grill, Inc',
        position: 'Service Manager',
        location: 'Seattle, WA',
        date: '2017-2018',
        details: ['string','string']
    },
]
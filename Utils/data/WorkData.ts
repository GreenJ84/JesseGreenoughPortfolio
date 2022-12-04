
export interface workItem{
    company: string
    logo: string
    position: string
    location: string
    date: string
    details: string[]
}

const workHistory: workItem[] = [
    {
        company: 'Fred Meyer',
        position: 'Retail Manager',
        logo: 'https://media.glassdoor.com/sqll/14993/fred-meyer-stores-squarelogo.png', location: 'Shoreline, WA',
        date: '2021-2022',
        details: ['Oversaw all daily operations, scheduling, training, sales and inventory for a produce department'," Managed all communications for merchandising, operational systems implementations, and employee relations for the department, in accordance with corporate guidelines"]
    },
    {
        company: 'Fred Meyer',
        position: 'Retail Clerk',
        logo: 'https://media.glassdoor.com/sqll/14993/fred-meyer-stores-squarelogo.png',
        location: 'Shoreline, WA',
        date: '2019-2021',
        details: ['Reorganized departments layouts for increased efficiency in operations, storage space allocation, and backstock management for the departments',' Delivered exceptional customer service to 1000+ customers per week, provided customer conflict resolution, and maintained store/department standards resulting in a increase in repeat customers and efficiency of customer engagement']
    },
    {
        company: 'Chipotle Mexican Grill, Inc',
        position: 'Apprentice',
        logo: 'https://imgs.search.brave.com/V4IOaPEpH6FAc2V1TMFSq63vGCQk3ncByYhLkKchs98/rs:fit:1024:1024:1/g:ce/aHR0cDovL3NpdGVz/LnBzdS5lZHUvYWxl/eHNtaXRocmNsL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9zaXRlcy8x/NTM4MC8yMDE0LzA5/L0NoaXBvdGxlLUxv/Z28ucG5n',
        location: 'Seattle, WA',
        date: '2018-2019',
        details: ['Achieved an 25% increase in overall daily sales','mproved employee retention by 50% throughout management term by facilitating team cohesion, supporting employees individually, and fostering an environment of employee support','Managed whole store operations including certifications, licensing, hiring, training implementation, scheduling, and financial reporting.']
    },
    {
        company: 'Chipotle Mexican Grill, Inc',
        position: 'Service Manager',
        logo: 'https://imgs.search.brave.com/V4IOaPEpH6FAc2V1TMFSq63vGCQk3ncByYhLkKchs98/rs:fit:1024:1024:1/g:ce/aHR0cDovL3NpdGVz/LnBzdS5lZHUvYWxl/eHNtaXRocmNsL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9zaXRlcy8x/NTM4MC8yMDE0LzA5/L0NoaXBvdGxlLUxv/Z28ucG5n',
        location: 'Seattle, WA',
        date: '2017-2018',
        details: ['Oversaw restaurant daily operations including food and safety procedures management, inventory management, facilities management, employee relations management and equipment management',' Led store training regimens and performed operational repair services']
    },
    {
        company: 'Dick\'s Barbacue Restaurants, Inc',
        position: 'Shift Team Lead',
        logo: 'https://media.glassdoor.com/sql/426187/dickey-s-barbecue-squarelogo-1510254543373.png',
        location: 'Kent, WA',
        date: '2016-2017',
        details: ['Oversaw restaurant daily operations including food and safety procedures management, inventory management, facilities management, employee relations management and equipment management','Conducted end of day fnacial reporting and store closing.']
    },
    {
        company: 'University of Washington',
        position: 'Assistant Athletic Director',
        logo: 'https://imgs.search.brave.com/k_E6ct6HJMFle0P0lnr_0Ag46xZZItkHVIsG7dlQKA0/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/bG9nb2x5bnguY29t/L2ltYWdlcy9sb2dv/bHlueC9iOS9iOWFl/NGQwNjRiNGFkZTI2/ZWI5ZDUwNmViYjA4/MGY4Ni5qcGVn',
        location: 'Seattle, WA',
        date: '2015-2016',
        details: ['Set-up and managed athletic events','Conducted gym matenance', 'Assisted with inventory manageent']
    },
]

export default workHistory;
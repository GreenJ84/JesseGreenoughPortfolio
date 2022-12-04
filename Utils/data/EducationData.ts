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
        icon: 'https://imgs.search.brave.com/UKmdtKq28j7FeRAeAkVppZDMqOztfxTSrnEt1tpFTv4/rs:fit:1200:1200:1/g:ce/aHR0cDovL21lZGlh/ZC5wdWJsaWNicm9h/ZGNhc3RpbmcubmV0/L3Ava3J3Zy9maWxl/cy8yMDE0MTIvRVBD/Q19sb2dvLXBuZy5w/bmc',
        website: 'https://www.epcc.edu/'
    }
]

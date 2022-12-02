interface educationType{
    college: string
    degree: string
    date: string
    description: string[]
}
export const education: educationType[] = [
    {
        college: 'Coding Dojo',
        degree: 'Full-stack Web Development',
        date: 'June 2022 - Oct 2022',
        description: ['Full Stack Web Development Bootcamp Covering: HTML, CSS, JS, Python, MERN, Java', '16 weeks, 1000+ hours of coding', 'Attained a 4.0gpa equivalent with 3 fully deployed applications']
    },
    {
        college: 'El Paso Community College',
        degree: 'General Science',
        date: 'August 2011 - June 2014',
        description: ['High School Running-Start achievement', 'Attained a 3.77gpa equivalent while attending High School']
    }
]

interface certificationType{
    title: string
    issuer: string
    date: string
    description: string
    url: string
}
export const certifications: certificationType[] = [
    {
        title: 'string',
        issuer: 'string',
        date: 'string',
        description: 'string',
        url: 'string',
    },
]

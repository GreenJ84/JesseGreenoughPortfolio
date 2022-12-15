export interface certificationType{
    priority?: number;
    title: string;
    issuer: string;
    date: string;
    description: string;
    image: string;
    url: string;
}

export const certifications: certificationType[] = [
    {
        title: 'GraphQL Developer - Professional',
        issuer: 'Apollo GraphQL',
        date: 'Nov 2022',
        description: 'Developers who obtain this certification demonstrate strong familiarity with Apollo Federation concepts. They can apply those concepts to build a federated supergraph or move an existing monolithic graph to federation.',
        image: 'https://imgs.search.brave.com/Z0eF_FPhimio7OYISGFmjCftZGXZtQuEgf2HFVUKtjk/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L21lZGlhLXAuc2xp/ZC5lcy91cGxvYWRz/LzM0NTY3Ny9pbWFn/ZXMvMzA5NDQyOC9h/Z2NkZ3YwajZ2aDJx/NTV5Z3U5aS5wbmc',
        url: 'https://www.apollographql.com/tutorials/certifications/39b422d7-10f0-4ccb-bc91-8b08207fe102',
    },
    {
        title: 'GraphQL Developer - Associate',
        issuer: 'Apollo GraphQL',
        date: 'Nov 2022',
        description: 'Developers who obtain this certification possess a solid foundational knowledge of GraphQL and the Apollo tool suite to design a schema, run an Apollo Server, and perform queries with Apollo Client on the frontend.',
        image: 'https://imgs.search.brave.com/Z0eF_FPhimio7OYISGFmjCftZGXZtQuEgf2HFVUKtjk/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L21lZGlhLXAuc2xp/ZC5lcy91cGxvYWRz/LzM0NTY3Ny9pbWFn/ZXMvMzA5NDQyOC9h/Z2NkZ3YwajZ2aDJx/NTV5Z3U5aS5wbmc',
        url: 'https://www.apollographql.com/tutorials/certifications/39900977-87e3-435f-aa45-12f052f68817',
    },
    {
        title: 'Become a Web Devloper',
        issuer: 'LinkedIn Learning',
        date: 'Nov 2022',
        description: 'Kick-start your career building powerful and attractive apps and sites. This learning path will provide you with the foundational skills you need to begin mastering the core technologies to become a web developer, from HTML and CSS to JavaScript and much more!',
        image: 'https://imgs.search.brave.com/nT2yIOplv3iBDEXlB5liPfdcavLRq6-Mz9mIRMIaC94/rs:fit:840:879:1/g:ce/aHR0cHM6Ly9nYXJ0/bWFuLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wOC81/Ny01NzE5MzVfbGlu/a2VkaW4taWNvbi12/ZWN0b3ItcG5nLWxp/bmtlZGluLWNpcmNs/ZS1sb2dvLXRyYW5z/cGFyZW50LmpwZw',
        url: 'https://www.linkedin.com/learning/certificates/e39a500919bd723fc8b77dd35b5cc7df74279c31cb9719e03125bd775e619565?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BB7kOAUaNRsGp%2BdoDFKQTvQ%3D%3D',
    },
    {
        title: 'GitHub Essential Training',
        issuer: 'LinkedIn Learning',
        date: 'Nov 2022',
        description: 'This course teaches how to use features that support and enhance the modern software pipelines. It shows developers how to extend their use of GitHub and leverage the GitHub ecosystem to customize and enhance existing workflows. The course explains important concepts such as managing organizations and teams, enabling continuous integration and delivery, conducting code reviews, using branch protections, and exploring the inner-source culture, which can transform the way you collaborate within an organization—even when the software you\'re developing is proprietary.',
        image: 'https://imgs.search.brave.com/nT2yIOplv3iBDEXlB5liPfdcavLRq6-Mz9mIRMIaC94/rs:fit:840:879:1/g:ce/aHR0cHM6Ly9nYXJ0/bWFuLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wOC81/Ny01NzE5MzVfbGlu/a2VkaW4taWNvbi12/ZWN0b3ItcG5nLWxp/bmtlZGluLWNpcmNs/ZS1sb2dvLXRyYW5z/cGFyZW50LmpwZw',
        url: 'https://www.linkedin.com/learning/certificates/1bf8d34a959a112be7697ba6b74daf3b03d837d4951828b154dfe8df4a917ff9?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BB7kOAUaNRsGp%2BdoDFKQTvQ%3D%3D',
    },
    {
        title: 'ReactJS Essential Training',
        issuer: 'LinkedIn Learning',
        date: 'Nov 2022',
        description: 'This course covers the basics of the React library using the most modern syntax and best practices for creating React components. You learn how to set up Chrome tools for React; create new components; work with the built-in Hooks in React; use the Create React App to run tests, and more. By the end of the course, you\'ll be armed with the essentials of React.js and better prepared to build your own browser-based projects.',
        image: 'https://imgs.search.brave.com/nT2yIOplv3iBDEXlB5liPfdcavLRq6-Mz9mIRMIaC94/rs:fit:840:879:1/g:ce/aHR0cHM6Ly9nYXJ0/bWFuLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wOC81/Ny01NzE5MzVfbGlu/a2VkaW4taWNvbi12/ZWN0b3ItcG5nLWxp/bmtlZGluLWNpcmNs/ZS1sb2dvLXRyYW5z/cGFyZW50LmpwZw',
        url: 'https://www.linkedin.com/learning/certificates/c19bf7c2b12c11e7adf29bbc2fabf37619b9dfd7853fd4dc51f046498af1d1cd?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BB7kOAUaNRsGp%2BdoDFKQTvQ%3D%3D',
    },
    {
        title: 'Agile Software Development Architecture',
        issuer: 'LinkedIn Learning',
        date: 'Nov 2022',
        description: 'This course covers how to use the cloud to architect your applications and infrastructure to enhance agile software development practices through a case study of a fictional financial advisory company, highlighting the planning and implementation of cloud architecture to improve agility. He shows how to build a microservices-based architecture and deploy it in the cloud to achieve automatic scaling and minimize downtime.',
        image: 'https://imgs.search.brave.com/nT2yIOplv3iBDEXlB5liPfdcavLRq6-Mz9mIRMIaC94/rs:fit:840:879:1/g:ce/aHR0cHM6Ly9nYXJ0/bWFuLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wOC81/Ny01NzE5MzVfbGlu/a2VkaW4taWNvbi12/ZWN0b3ItcG5nLWxp/bmtlZGluLWNpcmNs/ZS1sb2dvLXRyYW5z/cGFyZW50LmpwZw',
        url: 'https://www.linkedin.com/learning/certificates/66642d256d1681873a17a85049c3e25d0cefa97d9a35c57d8d9b2b14b496561b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BB7kOAUaNRsGp%2BdoDFKQTvQ%3D%3D',
    },
    {
        title: 'Testing React with Jest and React Testing Library',
        issuer: 'Udemy',
        date: 'Nov 2022',
        description: 'React Testing Library has become an extremely popular option for testing React, and with good reason! This detailed, comprehensive course  provides a solid foundation for React app tests.',
        image: 'https://imgs.search.brave.com/Z0COuUuFwK_Clu8tOGSh4m4pUMUGjnfUXXIr_hzlCUQ/rs:fit:128:128:1/g:ce/aHR0cHM6Ly9sb2dv/LmNsZWFyYml0LmNv/bS91ZGVteS5jb20',
        url: 'https://ude.my/UC-125da1a9-77a4-4deb-9871-ac358b7fd44e/',
    },
    {
        title: 'React - The Complete Guide',
        issuer: 'Udemy',
        date: 'Nov 2022',
        description: 'This course teaches you React in-depth, from the ground up, step by step by diving into all the core basics, exploring tons of examples and also introducing you to advanced concepts as well. You\'ll get theory,examples, demos, assignments and exercises with tons of important knowledge that is skipped by most other resources.',
        image: 'https://imgs.search.brave.com/Z0COuUuFwK_Clu8tOGSh4m4pUMUGjnfUXXIr_hzlCUQ/rs:fit:128:128:1/g:ce/aHR0cHM6Ly9sb2dv/LmNsZWFyYml0LmNv/bS91ZGVteS5jb20',
        url: 'https://ude.my/UC-2d90a06d-e7ba-422c-9c9c-771440b8dd8e',
    },
    {
        title: 'Tailwind CSS From Scratch',
        issuer: 'Udemy',
        date: 'Dec 2022',
        description: 'This is a project-based course to learn how to create awesome layouts using the Tailwind CSS framework and get comfortable using utility classes over something like Bootstrap, which uses component-based classes. ',
        image: 'https://imgs.search.brave.com/Z0COuUuFwK_Clu8tOGSh4m4pUMUGjnfUXXIr_hzlCUQ/rs:fit:128:128:1/g:ce/aHR0cHM6Ly9sb2dv/LmNsZWFyYml0LmNv/bS91ZGVteS5jb20',
        url: 'https://www.udemy.com/certificate/UC-95d8a351-10ea-4b83-b9c1-01b0f4fd10da/',
    },
]
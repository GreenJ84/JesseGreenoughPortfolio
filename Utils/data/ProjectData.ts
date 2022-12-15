export type Category = "react" | "python" | "java";
export interface IProject {
    priority?: number;
    name: string;
    description: string;
    image_path: string;
    deployed_url: string | null;
    github_url: string;
    category: Category[];
    key_techs: string[];
}

const projects: IProject[] = [
    {
        name: "Adventure Connect",
        description: "Adventure Connect is an application for users within the Pacific NorthWest to create, arrange, and join Outdoor Activities.",
        image_path: "https://github.com/GreenJ84/GreenJ84.github.io/raw/main/portfolioDataAssets/AdventureConnect.png",
        deployed_url: "http://adventure-connect.vercel.app/",
        github_url: "https://github.com/czmud/adventureConnect#-adventure-connect-",
        category: ["react"],
        key_techs: ["TypeScript", "NodeJS", "ReactJS", 'ExpressJS', "MongoDB"],
    },
    {
        name: "Next Meetups",
        description: "Next Meetups is an exclusive application for logging the hottest places for people to experience.",
        image_path: "https://github.com/GreenJ84/GreenJ84.github.io/raw/main/portfolioDataAssets/NextMeetups.png",
        deployed_url: "next-meetups-gamma.vercel.app",
        github_url: "https://github.com/GreenJ84/Next_Meetups#next-meetups",
        category: ["react"],
        key_techs: ["TypeScript", "NodeJS", "ReactJS", 'NextJS', "MongoDB Atlas"],
    },
    {
        name: "Catstronauts",
        description: "Demo educational site that provides CatASA Quality research for Catstronauts in training.",
        image_path: "https://github.com/GreenJ84/GreenJ84.github.io/raw/main/portfolioDataAssets/Catstronauts.png",
        deployed_url: "https://catstronauts-client-production-d30a.up.railway.app/",
        github_url: "https://github.com/GreenJ84/GraphQL/tree/main/OdyssySeries",
        category: ["react"],
        key_techs: ['GraphQL', 'Apollo Services','ReactJS'],
    },
    {
        name: "FlyBy",
        description: "A wonderous intergalatic cosmonaut review platform to view the personal feedback our trip experts have to say.",
        image_path: "https://github.com/GreenJ84/GreenJ84.github.io/raw/main/portfolioDataAssets/FlyBy.png",
        deployed_url: "https://odyssey-flyby.netlify.app/",
        github_url: "https://github.com/GreenJ84/GraphQL/tree/main/VoyagerSeries/FlyBy#voyage-i-federation-from-day-one",
        category: ["react"],
        key_techs: ['GraphQL', 'Apollo Services','ReactJS'],
    },
    {
        name: "Airlock",
        description: "The best intergalactic booking site around. View reviews from previous members, filter through locations, and get detailed overviews before booking your next best trip!",
        image_path: "https://github.com/GreenJ84/GreenJ84.github.io/raw/main/portfolioDataAssets/Airlock.png",
        deployed_url: "https://odyssey-airlock.netlify.app/",
        github_url: "https://github.com/GreenJ84/GraphQL/tree/main/VoyagerSeries/Voyage2",
        category: ["react"],
        key_techs: ['GraphQL', 'Apollo Services', 'ReactJS'],
    },
    {
        name: "Pet Shelter",
        description: "This application was built to help manage local animals needing homes. It was built so that User's could register pets that they knew needed a home in the hopes the community can help adopt!",
        image_path: "https://github.com/GreenJ84/Pet_Shelter/raw/main/projectPhotos/petShelterMain.png",
        deployed_url: "",
        github_url: "https://github.com/GreenJ84/Pet_Shelter#pet-shelter",
        category: ["react"],
        key_techs: ['ReactJS','Materials-UI', 'ExpressJS', 'MongoDB'],
    },
    {
        name: "Pirate Crew",
        description: "With this application you are able to build your own 'Priate Crew'. Give your crew members attributes like: an eye patch, a peg leg, or a hook hand! Go wild and bring all your closest 'mates and enjoy the fun! But don't forget their catch phrases!",
        image_path: "https://github.com/GreenJ84/Pirate_Crew/raw/main/project_Images/pirateCrewMain.png",
        deployed_url: "",
        github_url: "https://github.com/GreenJ84/Pirate_Crew#-pirate-crew-",
        category: ["react"],
        key_techs: ['ReactJS', 'ExpressJS', 'MongoDB'],
    },
    {
        name: "Green Exchange",
        description: "Green Exchange is a crypto exchange simulation built uzing Java Spring Boot. Users can register for an account to gain the ability to deposit USd funds and trade amongst limited crypto currencies.",
        image_path: "https://github.com/GreenJ84/Green_Exhange/raw/main/projectImages/greenExchange_registered.png",
        deployed_url: "",
        github_url: "https://github.com/GreenJ84/Green_Exhange#green_exhange",
        category: ["java"],
        key_techs: ['Java', 'Spring Boot', 'Bootstrap', 'SQL'],
    },
    {
        name: "Comunity Center Courses",
        description: "A Community Center course regitry. Registered members can create classes they wish to host and other mebers can view and select courses to join.",
        image_path: "https://github.com/GreenJ84/Green_Exhange/raw/main/projectImages/greenExchange_registered.png",
        deployed_url: "",
        github_url: "https://github.com/GreenJ84/Community_Class_Center#community_class_center",
        category: ["java"],
        key_techs: ['Java', 'Spring Boot', 'Bootstrap', 'SQL'],
    },
    {
        name: "Project Manager",
        description: "A project organizer tracker that allows you to create entries with details and descriptions for all projects you are on.",
        image_path: "https://github.com/GreenJ84/Green_Exhange/raw/main/projectImages/greenExchange_registered.png",
        deployed_url: "",
        github_url: "/projects",
        category: ["java"],
        key_techs: ['Java', 'Spring Boot', 'Bootstrap', 'SQL'],
    },
    {
        name: "Pie Derby",
        description: "An amazing pie registry where users can add their favorite pies and look at other great kinds of pies that get posted!",
        image_path: "https://github.com/GreenJ84/Pie_Derby/raw/main/ProjectPhotos/PieDerby.png",
        deployed_url: "",
        github_url: "https://github.com/GreenJ84/Pie_Derby#pie-derby",
        category: ["python"],
        key_techs: ['Python', 'Flask', 'SQL'],
    },
    {
        name: "Horoscopes",
        description: "A horoscope giving application that details multiple astrological attributes for all 12 astrological signs on a rolling 3 day period.",
        image_path: "https://github.com/GreenJ84/Horoscopes/raw/master/application_Images/horoscopes_main.png",
        deployed_url: "",
        github_url: "https://github.com/GreenJ84/Horoscopes#-horoscopes-",
        category: ["python"],
        key_techs: ['Python', 'Flask', 'SQL'],
    },
]

export default projects;
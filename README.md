# My Personal Portfolio

My personalized portfolio is a captivating showcase of my professional journey. It serves as a living testament to my accomplishments and experiences from my educational background to my practical experiences. With a user-friendly interface and engaging visuals, my portfolio invites viewers to delve into the realm of my professional growth and discover the innovative solutions I have created. 

Whether you're an employer, a colleague, or simply someone curious about my work, my portfolio offers an authentic and personalized representation of my journey in the software development industry.

This application utilizes:
- A NextJS serverless application architecture written in TypeScript with NodeJS. 
- A front-end that utilizes ReactJS, CSS modules, styled components, and other component libraries for design. 
- Personal data stored and maintained in separate collections on a MongoDB Atlas cluster with server-side rendering and serverless RESTApi function to request and paginate resource assets.
- The Cypress testing framework for component and E2E testing.
- A GitHub CI/CD pipeline with Vercel to test code and deployment success for all main branch changes against production.
- Docker containerization for functional testing of production environments

<img style="margin-left: 100px" width="500" height="300" src="https://github.com/GreenJ84/JesseGreenoughPortfolio/raw/main/public/projectImages/myPortfolio.png" alt="My Portfolio Screenshot" />

## 💻 Local Development

*** A [.env file]() and a [MongoDB connection]() (or its replacement/removal) will be required to functionally run the application ***

To run this application locally, you need to:

**1.** [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the code from this repository to your local maching: 
(Do this from the directory you want the project located)
```
git clone https://github.com/GreenJ84/JesseGreenoughPortfolio.git
```

**2.** Enter the new project folder:
```
cd JesseGreenoughPortfolio
```
<hr/>
<details>
  <summary style="color: lightyellow; font-weight: 900; letter-spacing: 2px;">Are you building this for your own personal porfolio?</summary>
  <br/>
  <p style="color: lightsalmon; font-weight: 900; letter-spacing: 2px;">This is the best time to make some changes for that</p>
  
  **1.** Remove git tracking for the entire folder and cd out
  
  ```rm -rf .git && cd ..```
  
  **2.** Rename the project folder
  
  Either with your IDE UI or from the termial ```mv ./JesseGreenoughPortfolio ./<newProjectName>```
  
  **3.** Enter your project and Initialize Git
  
  ``` cd <newProjectName> && git init ```
  
  **4.** [Create your own repository through your GitHub](https://docs.github.com/en/get-started/quickstart/create-a-repo?tool=webui) or publish it to GitHub through an Git GUI like [GitKraken](https://www.gitkraken.com/)
</details>
<hr/>
<br/>
<br/>

**3.** Install all application dependencies:
```
npm install
yarn install
pnpm install
```

**4.** Run the development start script:
```
npm run dev
```

This will start the development application using NextJS scripts and you will be able to access it at http://localhost:3000 (Note: If you intend to contribute to this project, plese first view the [Contribution Guide](https://github.com/GreenJ84/GreenJ84/blob/main/profile_contributions.md.md#profile-contributions-guidline))

## 🌍 Deployment

*** A [.env file]() and a [MongoDB connection]() (or its replacement/removal) will be required to functionally run the application ***

Once you have a the application working and testing as expected, you can deploy your application with easy using Vercel.

**1.** Build the application locally
- Build the NextJS application
```
npm run build
```

**2.** Inspect the build output and bundle sizes
Look for bundle optimization, code reductions, performance limitations

**3.** Start the production application locally
```
npm run start
```

**4.** Inspect the application in production
Styling inconsistancies, unflagged build errors, production security or networking errors, performance / load balance testing

**5.** Deply to [Vercel](https://vercel.com/docs/concepts/deployments/overview) services for free, with an amazing CI/CD already implemented and ease of mind for the devloper (YOU!).



## 🤗 Contributing

Contributions are welcome! 

Please refer to my profile [Code of Conduct](https://github.com/GreenJ84/GreenJ84/blob/main/profile_code_of_conduct.md#contributor-code-of-conduct) for before contributing to this project.

My [Contribution Guide](https://github.com/GreenJ84/GreenJ84/blob/main/profile_contributions.md.md#profile-contributions-guidline) has more details on how to Get Started contrubitung

 Feel free to at any time [open an issue](https://github.com/GreenJ84/github-readme-streak-typescript/issues/new/choose) or submit a [pull request](https://github.com/GreenJ84/github-readme-streak-typescript/compare) if you have a way to improve this project.

Make sure your request is meaningful, thought out and you have tested the app locally before submitting a pull request.

## 🙋‍♂️ Support

💙 If you like this project, give it a ⭐ and share it with friends!

<p align="left">
  <a href="https://github.com/sponsors/GreenJ84">
    <img alt="Sponsor with Github" title="Sponsor with Github" src="https://img.shields.io/badge/-Sponsor-ea4aaa?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
</p>

<!-- [☕ Buy me a coffee]() -->

---
Made with TypeScript, NextJS, Vercel, MongoDB Atlas and ❤️‍🔥

<a href="https://vercel.com/"><img alt="Powered by Vercel" title="Powered by Vercel" src="https://img.shields.io/badge/-Powered%20by%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/></a>
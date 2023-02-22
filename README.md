# My Personal Portfolio

A recreation of the stunning user experience provided by Tesla.

- A serverless application written in TypeScript with NodeJS. 
- A front-end that utilizes ReactJS, NextJS, CSS modules, styled components, and other component libraries for design. 
- Education, project data, work experience and resumes are store in seperate collections on a MongoDB Atlas cluster.
- A GitHub CI/CD pipeline with Vercel to test code and deployment success for all main branch changes against production.

![My Portfolio](https://github.com/GreenJ84/JesseGreenoughPortfolio/raw/main/public/projectImages/myPortfolio.png)

# Run locally

**1.**  [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this project repo.

```
git clone https://github.com/GreenJ84/JesseGreenoughPortfolio.git
```

**2.**  Install all dependencies.
```
npm i
```
or
```
yarn install
```

**3.** Change directories into the project

```cd JesseGreenoughPortfolio```

<details>
  <summary>Are you building this for your own personal porfolio?</summary>
  <hr/>
  This is the best time to make some changes for that
  
  **1.** Remove git tracking for the entire folder and cd out
  
  ```rm -rf .git && cd ..```
  
  **2.** Rename the project folder
  
  Either with your IDE UI or from the termial ```mv ./JesseGreenoughPortfolio ./<newProjectName>```
  
  **3.** Enter your project and Initialize Git
  
  ``` cd <newProjectName> && git init ```
  
  **4.** [Create your own repository through your GitHub](https://docs.github.com/en/get-started/quickstart/create-a-repo?tool=webui) or publish it to GitHub through an Git GUI like [GitKraken](https://www.gitkraken.com/)
  <hr/>
</details>

**4.** Run the application in developent

```npm run start```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Care to contribute?

Checkout these Docs:
  - [Contribution Guide](https://github.com/GreenJ84/GreenJ84/blob/main/profile_contributions.md.md#profile-contributions-guidline)
  - [Code of Conduct](https://github.com/GreenJ84/GreenJ84/blob/main/profile_code_of_conduct.md#contributor-code-of-conduct)

## Learn More about Next

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


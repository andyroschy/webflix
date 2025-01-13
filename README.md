# Getting setup

1. Fork the project and run it locally
2. Ensure you are logged in in Figma. You can check the figma we are going to use [Here](https://www.figma.com/design/8IrWHW2aUQZN6ILycX6ug7/Liteflix-Challenge?node-id=0-1&node-type=canvas)
Before starting this challenge, please ensure you have forked this repository and can run it locally.

To run the project:

```bash
npm install
npx prisma db push
npm run dev
```

## Webflix - Live Coding Challenge

### Featured Films

The featured film is the movie that covers the entire page on the figma design.

1. Fetch the featured film from the remote api at `src/pages/index.tsx`
2. Store the featured films that are not currently on the database every time we fetch them. (`prisma/schema.prisma`)
3. Implement the desktop UI here: [Figma UI](https://www.figma.com/design/8IrWHW2aUQZN6ILycX6ug7/Liteflix-Challenge?node-id=0-1&node-type=canvas)
  a. Focus only on the Desktop Landing page
  b. Use featured films data to populate the imagery / film rendering
  c. Focus on structure first, featured films second and icons last.

To handle the endpoint's images correctly, please refer to the developer documentation: https://developer.themoviedb.org/docs/image-basics

### Evaluation
- Communication: how fluidly you express ideas and communicate while coding.
- Problem Solving: how you overcome obstacles consistently.
- Code Fluency: how quickly, correctly and idiomatically you write code to fulfill requirements.

#### Tips & Tricks
- We want to see an implementation as pixel perfect as possible.
- The project uses Next.js Pages & Prisma. Leveraging its specific features is encourange but not required
- You may consult outside sources like documentation, web search or AI but absolutely cannot copy-paste code of any sort.
- Tailwind is available and optional

This project uses next.js pages, prisma & sqlite.

You can view the database with
```
npx prisma studio
```
Documentation for Prisma is viewable at https://www.prisma.io/docs

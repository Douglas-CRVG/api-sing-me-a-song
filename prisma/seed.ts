import { prisma } from "../src/database.js";

async function main() {
  await prisma.recommendation.upsert({
    where: {
      name: "vídeo de teste",
    },
    update: {},
    create: {
      name: "vídeo de teste",
      youtubeLink: "https://www.youtube.com/watch?v=aGSYKFb_zxg",
      id: 1,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

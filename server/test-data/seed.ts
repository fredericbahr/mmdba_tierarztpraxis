import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import PdfParse from "pdf-parse";

const prisma = new PrismaClient();

interface IPDF {
  content: string;
  data: Buffer;
}

const pdf: IPDF[] = [];
const photos: Buffer[] = [];
const videos: Buffer[] = [];

async function deleteAllEntries() {
  //delete all table entries
  try {
    await prisma.treatment.deleteMany({});
    await prisma.animal.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.medicine.deleteMany({});
    await prisma.race.deleteMany({});
    await prisma.species.deleteMany({});
    await prisma.photo.deleteMany({});
    await prisma.video.deleteMany({});
    await prisma.finding.deleteMany({});

    await prisma.$queryRaw`DROP INDEX IF EXISTS  medicine_description_index`;
    await prisma.$queryRaw`DROP INDEX IF EXISTS medicine_name_index`;
  } catch (e) {
    console.log("Failure in deleting entries");
  }
}

const readPDFs = async () => {
  try {
    for (let i = 0; i < 3; i++) {
      const pdfData = readFileSync(`${__dirname}/pdf/pdf${i + 1}.pdf`);
      const pdfContent = (await PdfParse(pdfData)).text;
      pdf.push({
        content: pdfContent,
        data: pdfData,
      });
    }
  } catch (e) {
    console.log("Fehler beim Lesen der PDFs");
  }
};

const readPhotos = async () => {
  try {
    photos.push(readFileSync(`${__dirname}/photos/cat.jpg`));
    photos.push(readFileSync(`${__dirname}/photos/dog.jpg`));
    photos.push(readFileSync(`${__dirname}/photos/bird.jpg`));
  } catch (e) {
    console.log("Fehler beim lesen der Fotos");
  }
};

const readVideos = async () => {
  try {
    videos.push(readFileSync(`${__dirname}/videos/cat.mp4`));
    videos.push(readFileSync(`${__dirname}/videos/dog.mp4`));
    videos.push(readFileSync(`${__dirname}/videos/bird.mp4`));
  } catch (e) {
    console.log("Fehler beim lesen der Videos");
  }
};

async function readFiles() {
  await readPDFs();
  await readPhotos();
  await readVideos();
}

async function repopulate() {
  try {
    const newSpecies = await prisma.species.createMany({
      data: [{ name: "Hunde" }, { name: "Katze" }, { name: "Vogel" }],
    });

    const speciesId = await prisma.species.findMany({
      select: {
        id: true,
      },
    });

    console.log("Passed species");

    const schaeferhund = await prisma.race.create({
      data: {
        name: "Schäferhund",
        species: {
          connect: {
            id: speciesId[0].id,
          },
        },
      },
    });
    const ocicat = await prisma.race.create({
      data: {
        name: "Ocicat",
        species: {
          connect: {
            id: speciesId[1].id,
          },
        },
      },
    });
    const wellensittich = await prisma.race.create({
      data: {
        name: "Wellensittich",
        species: {
          connect: {
            id: speciesId[2].id,
          },
        },
      },
    });

    console.log("Passed races");

    const newCustomers = await prisma.customer.createMany({
      data: [
        {
          city: "Berlin",
          name: "Tom Schuster",
          phoneNumber: "+49 16031679",
          plz: 42307,
          street: "Nihil-Straße",
        },
        {
          city: "Köln",
          name: "Anna Brand",
          phoneNumber: "+45 1624579",
          plz: 22337,
          street: "Carian-Straße",
        },
        {
          city: "München",
          name: "Sophia Linger",
          phoneNumber: "+47 12278979",
          plz: 81237,
          street: "Haligbaum-Straße",
        },
      ],
    });

    console.log("Passed customer");

    const ownerId = await prisma.customer.findMany({
      select: {
        id: true,
      },
    });
    const raceId = await prisma.race.findMany({
      select: {
        id: true,
      },
    });

    const coots = await prisma.animal.create({
      data: {
        name: "Coots",
        birthdate: new Date(),
        weight: 4,
        owner: {
          connect: {
            id: ownerId[0].id,
          },
        },
        race: {
          connect: {
            id: raceId[1].id,
          },
        },
      },
    });
    const rex = await prisma.animal.create({
      data: {
        name: "Rex",
        birthdate: new Date(),
        weight: 5,
        owner: {
          connect: {
            id: ownerId[1].id,
          },
        },
        race: {
          connect: {
            id: raceId[0].id,
          },
        },
      },
    });
    const max = await prisma.animal.create({
      data: {
        name: "Max",
        birthdate: new Date(),
        weight: 1,
        owner: {
          connect: {
            id: ownerId[2].id,
          },
        },
        race: {
          connect: {
            id: raceId[2].id,
          },
        },
      },
    });

    const animalId = await prisma.animal.findMany({
      select: {
        id: true,
      },
    });

    console.log("Passed animals");

    const laeuse = await prisma.treatment.create({
      data: {
        diagnosis: "Läuse",
        notes: "Kleiner unkritischer Befall",
        costs: 25,
        date: new Date(),
        animal: {
          connect: {
            id: animalId[0].id,
          },
        },
        customer: {
          connect: {
            id: ownerId[0].id,
          },
        },
      },
    });
    const zahn = await prisma.treatment.create({
      data: {
        diagnosis: "Eiternder Zahn",
        notes: "",
        costs: 40,
        date: new Date(),
        animal: {
          connect: {
            id: animalId[1].id,
          },
        },
        customer: {
          connect: {
            id: ownerId[1].id,
          },
        },
      },
    });
    const erkaeltung = await prisma.treatment.create({
      data: {
        diagnosis: "Erkältung",
        notes: "",
        costs: 40,
        date: new Date(),
        animal: {
          connect: {
            id: animalId[2].id,
          },
        },
        customer: {
          connect: {
            id: ownerId[2].id,
          },
        },
      },
    });
    console.log("Passed treatment");

    const treatmentId = await prisma.treatment.findMany({
      select: {
        id: true,
      },
    });

    const medicineToTreatment_laeuse = await prisma.medicine.create({
      data: {
        description: "Läuse-Medizin",
        dosis: 12,
        name: "Permethrin",
        treatments: {
          connect: {
            id: treatmentId[0].id,
          },
        },
      },
    });
    const medicineToTreatment_zahn = await prisma.medicine.create({
      data: {
        description: "Anti-Infekt",
        dosis: 3,
        name: "Angocin",
        treatments: {
          connect: {
            id: treatmentId[1].id,
          },
        },
      },
    });
    const medicineToTreatment_erkalt = await prisma.medicine.create({
      data: {
        description: "Ambiotika",
        dosis: 7,
        name: "Roxithromycin",
        treatments: {
          connect: {
            id: treatmentId[1].id,
          },
        },
      },
    });
    console.log("Passed medicine");

    const lauesePhoto = await prisma.photo.create({
      data: {
        blob: photos[0],
        mimeType: "image/jpeg",
        description: "Läuse-Befall, linkes Ohr",
        treatment: {
          connect: {
            id: laeuse.id,
          },
        },
      },
    });
    const canisPhoto = await prisma.photo.create({
      data: {
        blob: photos[1],
        mimeType: "image/jpeg",
        description: "Canis maior, eiternd",
        treatment: {
          connect: {
            id: zahn.id,
          },
        },
      },
    });
    const erkaltPhoto = await prisma.photo.create({
      data: {
        blob: photos[2],
        mimeType: "image/jpeg",
        description: "Erkältung",
        treatment: {
          connect: {
            id: erkaeltung.id,
          },
        },
      },
    });
    console.log("Passed photos");

    const laueseVideo = await prisma.video.create({
      data: {
        blob: videos[0],
        mimeType: "video/mp4",
        description: "Läuse-Befall, linkes Ohr",
        treatment: {
          connect: {
            id: laeuse.id,
          },
        },
      },
    });

    const canisVideo = await prisma.video.create({
      data: {
        blob: videos[1],
        mimeType: "video/mp4",
        description: "Canis maior, eiternd",
        treatment: {
          connect: {
            id: zahn.id,
          },
        },
      },
    });
    const erkaltVideo = await prisma.video.create({
      data: {
        blob: videos[2],
        mimeType: "video/mp4",
        description: "Erkältung",
        treatment: {
          connect: {
            id: erkaeltung.id,
          },
        },
      },
    });
    console.log("Passed videos");

    const ohrFinding = await prisma.finding.create({
      data: {
        blob: pdf[0].data,
        description: "Läuse-Befall, linkes Ohr",
        content: pdf[0].content,
        treatment: {
          connect: {
            id: laeuse.id,
          },
        },
      },
    });
    const canisFinding = await prisma.finding.create({
      data: {
        blob: pdf[1].data,
        description: "Canis maior, eiternd",
        content: pdf[1].content,
        treatment: {
          connect: {
            id: zahn.id,
          },
        },
      },
    });
    const erkaltFinding = await prisma.finding.create({
      data: {
        blob: pdf[2].data,
        description: "Erkältung",
        content: pdf[2].content,
        treatment: {
          connect: {
            id: erkaeltung.id,
          },
        },
      },
    });
    console.log("Passed findings");
  } catch (e) {
    console.log("Failure in repopulating entries");
    console.log(e);
  }
}

async function createIndexes() {
  try {
    await prisma.$queryRaw`CREATE INDEX medicine_description_index ON "Medicine" USING GIN (to_tsvector('german', description))`;
    await prisma.$queryRaw`CREATE INDEX medicine_name_index ON "Medicine" USING GIN (to_tsvector('german', name))`;
    console.log("passed index creation");
  } catch (e) {
    console.log("Failure in creating indexes");
    console.log(e);
  }
}

async function main() {
  await deleteAllEntries();
  await readFiles();
  await createIndexes();
  await repopulate();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

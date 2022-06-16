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
    const deleteTreatment = await prisma.treatment.deleteMany({});
    const deleteAnimal = await prisma.animal.deleteMany({});
    const deleteCustomer = await prisma.customer.deleteMany({});
    const deleteMedicine = await prisma.medicine.deleteMany({});
    const deleteRace = await prisma.race.deleteMany({});
    const deleteSpecies = await prisma.species.deleteMany({});
    const deletePhoto = await prisma.photo.deleteMany({});
    const deleteVideo = await prisma.video.deleteMany({});
    const deleteFinding = await prisma.finding.deleteMany({});
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
        name: "coots",
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

    const newMedicine = await prisma.medicine.createMany({
      data: [
        { description: "Läuse-Medizin", dosis: 12, name: "Permethrin" },
        { description: "Ambiotika", dosis: 7, name: "Roxithromycin" },
        { description: "Anti-Infekt", dosis: 3, name: "Angocin" },
      ],
    });
    console.log("Passed medicine");

    const lauesePhoto = await prisma.photo.create({
      data: {
        blob: photos[0],
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

async function main() {
  await deleteAllEntries();
  await readFiles();
  await repopulate();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

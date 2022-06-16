import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { connect } from "http2";
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
    const deleteAnimal = await prisma.animal.deleteMany({});
    const deleteCustomer = await prisma.customer.deleteMany({});
    const deleteTreatment = await prisma.treatment.deleteMany({});
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

async function readFiles() {
  for (let i = 0; i < 3; i++) {
    const pdfData = readFileSync(`./pdf/pdf${i + 1}.pdf`);
    const pdfContent = (await PdfParse(pdfData)).text;
    pdf.push({
      content: pdfContent,
      data: pdfData,
    });
  }
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
    console.log(speciesId);
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

    const canis = await prisma.photo.create({
      data: {
        blob: Buffer.from("", "binary"),
        description: "Canis maior, eiternd",
        treatment: {
          connect: {
            id: 2,
          },
        },
      },
    });
    const ohr = await prisma.photo.create({
      data: {
        blob: Buffer.from("", "binary"),
        description: "Läuse-Befall, linkes Ohr",
        treatment: {
          connect: {
            id: 1,
          },
        },
      },
    });
    const erkalt = await prisma.photo.create({
      data: {
        blob: Buffer.from("", "binary"),
        description: "Erkältung",
        treatment: {
          connect: {
            id: 3,
          },
        },
      },
    });
    console.log("Passed photos");

    const canisVideo = await prisma.video.create({
      data: {
        blob: Buffer.from("", "binary"),
        description: "Canis maior, eiternd",
        treatment: {
          connect: {
            id: 2,
          },
        },
      },
    });
    const ohrVideo = await prisma.video.create({
      data: {
        blob: Buffer.from("", "binary"),
        description: "Läuse-Befall, linkes Ohr",
        treatment: {
          connect: {
            id: 1,
          },
        },
      },
    });
    const erkaltVideo = await prisma.video.create({
      data: {
        blob: Buffer.from("", "binary"),
        description: "Erkältung",
        treatment: {
          connect: {
            id: 3,
          },
        },
      },
    });
    console.log("Passed videos");

    const canisFinding = await prisma.finding.create({
      data: {
        blob: Buffer.from("", "binary"),
        description: "Canis maior, eiternd",
        treatment: {
          connect: {
            id: 2,
          },
        },
      },
    });
    const ohrFinding = await prisma.finding.create({
      data: {
        blob: Buffer.from("", "binary"),
        description: "Läuse-Befall, linkes Ohr",
        treatment: {
          connect: {
            id: 1,
          },
        },
      },
    });
    const erkaltFinding = await prisma.finding.create({
      data: {
        blob: Buffer.from("", "binary"),
        description: "Erkältung",
        treatment: {
          connect: {
            id: 3,
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
  await repopulate();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

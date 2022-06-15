import {PrismaClient} from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

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
    }
    catch(e){
      console.log("Failure in deleting entries");
    }
}

async function repopulate() {
  try {
    const newSpecies = await prisma.species.createMany({
      data: [{name: "Hunde"}, {name: "Katze"}, {name: "Vogel"}]
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
            id: speciesId[0].id
          },
        },
      }
    });
    const ocicat = await prisma.race.create({
      data: {
        name: "Ocicat",
        species: {
          connect: {
            id: speciesId[1].id
          }
        }
      }
    });
    const wellensittich = await prisma.race.create({
      data: {
        name: "Wellensittich",
        species: {
          connect: {
            id: speciesId[2].id
          }
        }
      }
    });
  
    const newCustomers = await prisma.customer.createMany({
      data: [{city: "Berlin", createdAt: new Date(), name: "Tom Schuster", phoneNumber: "+49 16031679", plz: 42307, street: "Nihil-Straße"},
      {city: "Köln", createdAt: new Date(), name: "Anna Brand", phoneNumber: "+45 1624579", plz: 22337, street: "Carian-Straße"},
      {city: "München", createdAt: new Date(), name: "Sophia Linger", phoneNumber: "+47 12278979", plz: 81237, street: "Haligbaum-Straße"}
    ]
    });
  
    const ownerId = await prisma.customer.findMany({
      select: {
        id: true
      }
    });
    const raceId = await prisma.race.findMany({
      select: {
        id: true
      }
    });

    const coots = await prisma.animal.create({
      data: {
        birthdate: new Date(),
        owner: {
          connect: {
            id: ownerId[0].id
          }
        },
        name: "coots",
        race: {
          connect: {
            id: raceId[1].id
          }
        },
        weight: 4
      }
    });
    const rex = await prisma.animal.create({
      data: {
        birthdate: new Date(),
        owner: {
          connect: {
            id: ownerId[1].id
          }
        },
        name: "Rex",
        race: {
          connect: {
            id: raceId[0].id
          }
        },
        weight: 5
      }
    });
    const max = await prisma.animal.create({
      data: {
        birthdate: new Date(),
        owner: {
          connect: {
            id: ownerId[2].id
          }
        },
        name: "Max",
        race: {
          connect: {
            id: raceId[2].id
          }
        },
        weight: 1
      }
    });

    const animalId = await prisma.animal.findMany({
      select: {
        id: true
      }
    });

    const laeuse = await prisma.treatment.create({
      data: {
        animal: {
          connect: {
            id: animalId[0].id
          }
        },
        costs: 25,
        customer: {
          connect: {
            id: ownerId[0].id
          }
        },
        date: new Date(),
        diagnosis: "Läuse",
        notes: "Kleiner unkritischer Befall"
      }
    });
    const zahn = await prisma.treatment.create({
      data: {
        animal: {
          connect: {
            id: animalId[1].id
          }
        },
        costs: 40,
        customer: {
          connect: {
            id: ownerId[1].id
          }
        },
        date: new Date(),
        diagnosis: "Eiternder Zahn",
        notes: ""
      }
    });
    const erkaeltung = await prisma.treatment.create({
      data: {
        animal: {
          connect: {
            id:  animalId[2].id
          }
        },
        costs: 40,
        customer: {
          connect: {
            id: ownerId[2].id
          }
        },
        date: new Date(),
        diagnosis: "Erkältung",
        notes: ""
      }
    });
    console.log("Passed treatment");
  
    const newMedicine = await prisma.medicine.createMany({
    data: [{description: "Läuse-Medizin", dosis: 12, name: "Permethrin"},
           {description: "Ambiotika", dosis: 7, name: "Roxithromycin"},
           {description: "Anti-Infekt", dosis: 3, name: "Angocin"}]
    });
    console.log("Passed medicine");

    const canis = await prisma.photo.create({
      data: {
        blob: Buffer.from("", "binary"), 
        description:"Canis maior, eiternd", 
        treatment: {
          connect: {
            id: 2
          }
        }
      }
    });
    const ohr = await prisma.photo.create({
      data: {
        blob: Buffer.from("", "binary"), 
        description:"Läuse-Befall, linkes Ohr", 
        treatment: {
          connect: {
            id: 1
          }
        }
      }
    });
    const erkalt = await prisma.photo.create({
      data: {
        blob: Buffer.from("", "binary"), 
        description:"Erkältung", 
        treatment: {
          connect: {
            id: 3
          }
        }
      }
    });
    console.log("Passed photos");

    const canisVideo = await prisma.video.create({
      data: {
        blob: Buffer.from("", "binary"), 
        description:"Canis maior, eiternd", 
        treatment: {
          connect: {
            id: 2
          }
        }
      }
    });
    const ohrVideo = await prisma.video.create({
      data: {
        blob: Buffer.from("", "binary"), 
        description:"Läuse-Befall, linkes Ohr", 
        treatment: {
          connect: {
            id: 1
          }
        }
      }
    });
    const erkaltVideo = await prisma.video.create({
      data: {
        blob: Buffer.from("", "binary"), 
        description:"Erkältung", 
        treatment: {
          connect: {
            id: 3
          }
        }
      }
    });
    console.log("Passed videos");

    const canisFinding = await prisma.finding.create({
      data: {
        blob: Buffer.from("", "binary"), 
        description:"Canis maior, eiternd", 
        treatment: {
          connect: {
            id: 2
          }
        }
      }
    });
    const ohrFinding = await prisma.finding.create({
      data: {
        blob: Buffer.from("", "binary"), 
        description:"Läuse-Befall, linkes Ohr", 
        treatment: {
          connect: {
            id: 1
          }
        }
      }
    });
    const erkaltFinding = await prisma.finding.create({
      data: {
        blob: Buffer.from("", "binary"), 
        description:"Erkältung", 
        treatment: {
          connect: {
            id: 3
          }
        }
      }
    });
    console.log("Passed findings");
  }
  catch(e){
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
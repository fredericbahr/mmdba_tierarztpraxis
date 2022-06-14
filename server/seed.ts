import {PrismaClient} from "@prisma/client";
import { faker } from "@faker-js/faker/locale/de";

type User = {
    city: string,
    createdAt: Date,
    name: string,
    phoneNumber: string,
    plz: number,
    street: string
}

function createRandomUser(): User {
    return {
      city: faker.address.city(),
      createdAt: faker.date.past(),
      name: faker.name.firstName(),
      phoneNumber: faker.phone.phoneNumber(),
      plz: parseInt(faker.address.zipCode(), 10),
      street: faker.address.street()
    };
  }

function genUsers() {
    const USERS: User[] = []; 

    Array.from({ length: 3 }).forEach(() => {
        USERS.push(createRandomUser());
      });
    return USERS
}


const prisma = new PrismaClient();

const deleteAnimal = await prisma.animal.deleteMany({})
const deleteCustomer = await prisma.customer.deleteMany({})
const deleteTreatment = await prisma.treatment.deleteMany({})
const deleteMedicine = await prisma.medicine.deleteMany({})
const deleteRace = await prisma.race.deleteMany({})
const deleteSpecies = await prisma.species.deleteMany({})
const deletePhoto = await prisma.photo.deleteMany({})
const deleteVideo = await prisma.video.deleteMany({})
const deleteFinding = await prisma.finding.deleteMany({}) 

async function deleteAllEntries() {
    //delete all table entries
    deleteAnimal
    deleteCustomer
    deleteTreatment
    deleteMedicine
    deleteRace
    deleteSpecies
    deletePhoto
    deleteVideo
    deleteFinding
}

const newSpecies = await prisma.species.createMany({
    data: [{name: "Hunde"}, {name: "Katze"}, {name: "Vogel"}]
})

const newRaces = await prisma.race.createMany({
    data: [{name: "Schäferhund", speciesId: 1}, {name: "Ocicat", speciesId: 2}, {name: "Wellensittich", speciesId: 3},]
})

const newCustomers = await prisma.customer.createMany({
    data: genUsers()
})

const newAnimals = await prisma.animal.createMany({
    data: [{}]
})

async function repopulate() {
    newSpecies
    newRaces
    newCustomers 
}

async function main() {
    deleteAllEntries()
    repopulate()
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number()
    .min(1886)
    .max(new Date().getFullYear() + 1),
  miles: Joi.number().required().min(0),
  city: Joi.string().min(2).required(),
  numberOfSeats: Joi.number().max(1000).min(1).required(),
  description: Joi.string().min(20).required(),
  features: Joi.array().items(Joi.string()).required(),
  image: Joi.string().required(),
  price: Joi.number().min(0).required(),
  name: Joi.string().required(),
  listerId: Joi.string().required(),
});

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { error, value } = await schema.validate(body);

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const { image, name, numberOfSeats, year, features, description, miles, price, listerId, city, make, model } = body;

  const car = await prisma.car.create({
    data: {
      image,
      name,
      year,
      numberOfSeats,
      features,
      description,
      miles,
      price,
      listerId,
      city: city.toLowerCase(),
      make,
      model,
    },
  });

  return car;
});

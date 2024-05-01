export default async (city, filters) => {
  console.log(':>  useFetchCars  filters:', filters);
  console.log(':>  useFetchCars  city:', city);
  const { data, error, refresh } = await useFetch(`/api/cars/${city}`, {
    params: {
      ...filters,
    },
  });

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: 'Unable to fetch cars',
    });
  }

  console.log(':>  useFetchCars  data:', data.value);
  return { data, refresh };
};

export const getTemperature = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
  const data = await response.json();
  return data.main.temp;
};

export const getMotion = async () => {
  const response = await fetch("http://localhost:3000/motion");
  const data = await response.json();
  return data;
};

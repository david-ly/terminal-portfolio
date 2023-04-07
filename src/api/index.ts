import config from '../../config.json';

export const getProjects = async () => {
  const response = await fetch(
    `https://api.github.com/users/${config.social.github}/repos`,
  );

  return response.json();
};

export const getWeather = async (city: string) => {
  const response = await fetch(`https://wttr.in/${city}?ATm`);

  return response.json();
};

export const getQuote = async () => {
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();

  return {
    quote: `“${data.content}” — ${data.author}`,
  };
};

// export const getBio = async () => {
//   const { data } = await fetch(config.bioUrl);

//   return data;
// };

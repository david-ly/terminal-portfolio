import config from '../../config.json';

const gh_api_prof_url = 'https://api.github.com/users/david-ly'

export const getBio = async () => {
  const response = await fetch(gh_api_prof_url);
  // console.dir({response})
  const { bio } = response.json()

  return bio;
};

export const getProjects = async () => {
  const response = await fetch(
    `https://api.github.com/users/${config.social.github}/repos`,
  );

  return response.json();
};

// export const getWeather = async (city: string) => {
//   const response = await fetch(`https://wttr.in/${city}?ATm`);

//   return response.json();
// };

// export const getQuote = async () => {
//   const response = await fetch('https://api.quotable.io/random');
//   const data = await response.json();

//   return {
//     quote: `“${data.content}” — ${data.author}`,
//   };
// };

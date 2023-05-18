import config from '../../config.json';

const gh_user = config.social.github;
const gh_api_uri = `https://api.github.com/users/${gh_user}`;

export const getBio = async () => {
  const response = await fetch(gh_api_uri);
  return response.json();
};

export const getProjects = async () => {
  const response = await fetch(`${gh_api_uri}/repos`);
  return response.json();
};

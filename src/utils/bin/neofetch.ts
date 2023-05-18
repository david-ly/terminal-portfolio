import { formatDistanceToNow } from 'date-fns';
import pkg_json from '../../../package.json';
import themes from '../../../themes.json';

const mac_logo = `
                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.
`;
const win_logo = `
                                ..,
                    ....,,:;+ccllll
      ...,,+:;  cllllllllllllllllll
,cclllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll

llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
\`'ccllllllllll  lllllllllllllllllll
       \`' \*::  :ccllllllllllllllll
                       \`\`\`\`''*::cll
`;
const lnx_logo = `
            .-/+oossssoo+/-.
        \`:+ssssssssssssssssss+:\`
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssssdMMMNysssso.
   /ssssssssssshdmmNNmmyNMMMMhssssss/
  +ssssssssshmydMMMMMMMNddddyssssssss+
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +sssssssssdmydMMMMMMMMddddyssssssss+
   /ssssssssssshdmNNNNmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.
`;

function getPlatform(): 'Windows' | 'MacOS' | 'Linux' {
  const user_agent = navigator.userAgent;

  if (user_agent.includes('Windows')) return 'Windows';
  if (user_agent.includes('Macintosh')) return 'MacOS';
  if (user_agent.includes('Linux')) return 'Linux';
}

function getMainColor() {
  const platform = getPlatform();
  const cached = localStorage.getItem('theme');
  const scheme = themes.find((theme) => theme.name.toLowerCase() === cached);

  switch (platform) {
    case 'Windows':
      return scheme.blue;
    case 'MacOS':
      return scheme.cyan;
    case 'Linux':
      return scheme.red;
    default:
      return scheme.purple;
  }
}

const getArt = () => {
  const platform = getPlatform();
  const main_color = getMainColor();

  switch (platform) {
    case 'Windows':
      return `<p style="color: ${main_color}">${win_logo}</p>`;
    case 'MacOS':
      return `<p style="color: ${main_color}">${mac_logo}</p>`;
    case 'Linux':
      return `<p style="color: ${main_color}">${lnx_logo}</p>`;
  }
};

const getInfo = () => {
  const platform = getPlatform();
  const visited = new Date(
    localStorage.getItem('visited') || new Date().toString(),
  );
  const hostname = window.location.hostname;
  const theme = localStorage.getItem('theme');
  const resolution = `${window.screen.availWidth}x${window.screen.availHeight}`;
  const packages = Object.keys(pkg_json.dependencies);
  const dev_pkgs = Object.keys(pkg_json.devDependencies);
  const main_color = getMainColor();

  let message = '';

  message += `<span style="color: ${main_color}">Host</span>: ${hostname}\n`;
  message += `<span style="color: ${main_color}">OS</span>: ${platform}\n`;
  message += `<span style="color: ${main_color}">Packages</span>: ${
    packages.length + dev_pkgs.length
  } (npm)\n`;
  message += `<span style="color: ${main_color}">Resolution</span>: ${resolution}\n`;
  message += `<span style="color: ${main_color}">Shell</span>: m4tt72-web\n`;
  message += `<span style="color: ${main_color}">Theme</span>: ${theme}\n`;
  message += `<span style="color: ${main_color}">License</span>: ${pkg_json.license}\n`;
  message += `<span style="color: ${main_color}">Version</span>: ${pkg_json.version}\n`;
  message += `<span style="color: ${main_color}">Repo</span>: <a href="${pkg_json.repository.url}" target="_blank">${pkg_json.repository.url}</a>\n`;
  message += `<span style="color: ${main_color}">Uptime</span>: ${formatDistanceToNow(
    visited,
  )}\n`;
  message += `<span style="color: ${main_color}">Author</span>: ${pkg_json.author.name} (${pkg_json.author.email})\n`;

  return message;
};

export const neofetch = async (args?: string[]): Promise<string> => {
  const art = getArt();
  const info = getInfo();

  return `
  <table>
    <tr>
      <td>${art}</td>
      <td>${info}</td>
    <tr>
  </table>
  `;
};

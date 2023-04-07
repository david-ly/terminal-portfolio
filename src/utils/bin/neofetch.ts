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

const linux_logo = `
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

const getPlatform = (): 'Unknown' | 'Windows' | 'MacOS' | 'Linux' => {
  let os: 'Unknown' | 'Windows' | 'MacOS' | 'Linux' = 'Unknown';
  const user_agent = navigator.userAgent;

  // if (navigator.userAgent.indexOf('Win') != -1) {
  //   os = 'Windows';
  // }

  // if (navigator.userAgent.indexOf('Mac') != -1) {
  //   os = 'MacOS';
  // }

  // if (navigator.userAgent.indexOf('Linux') != -1) {
  //   os = 'Linux';
  // }

  switch (true) {
    case user_agent.includes('Win'):
      os = 'Windows';
    case user_agent.includes('Mac'):
      os = 'MacOS';
    case user_agent.includes('Linux'):
      os = 'Linux';
  }

  return os;
};

const getMainColor = () => {
  const platform = getPlatform();
  const name = localStorage.getItem('theme');
  const theme = themes.find((theme) => theme.name.toLowerCase() === name);

  switch (platform) {
    case 'MacOS':
      return theme.cyan;
    case 'Windows':
      return theme.blue;
    case 'Linux':
      return theme.red;
  }
};

const getArt = () => {
  const platform = getPlatform();
  const main_color = getMainColor();

  switch (platform) {
    case 'MacOS':
      return `<p style="color: ${main_color}">${mac_logo}</p>`;
    case 'Windows':
      return `<p style="color: ${main_color}">${win_logo}</p>`;
    case 'Linux':
      return `<p style="color: ${main_color}">${linux_logo}</p>`;
  }
};

const getInfo = () => {
  const os = getPlatform();
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
  message += `<span style="color: ${main_color}">OS</span>: ${os}\n`;
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
  message += `<span style="color: ${main_color}">Donate</span>: <a href="${pkg_json.funding.url}" target="_blank">${pkg_json.funding.type}</a>\n`;

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

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const nameOfComponent = process.argv[2];
const componentFolder = path.join(
  process.cwd(),
  'src',
  'components',
  `${nameOfComponent}`
);

const templates = {
  styles: `//Styles\nimport './${nameOfComponent}.scss';\n\n`,
  types: `//Types\nimport { ${nameOfComponent}Types } from './${nameOfComponent}Types';\n\n`,
  images: '//Images\n\n',
  mui: '//MUI\n\n',
  components: '//Components\n\n',
  react: '//React\n\n',
  hooks: '//Hooks\n\n',
  helpers: '//Helpers\n\n',
  handlers: '//Handlers\n\n',
};

function getFullStr() {
  let str = '';
  let key: keyof typeof templates;
  for (key in templates) {
    str += templates[key];
  }
  return str;
}

async function createFolder() {
  try {
    await mkdir(componentFolder);
    process.stdout.write(`\x1b[33mCreated ${nameOfComponent} folder\n`);
    next();
  } catch (err) {
    next(err);
  }
}

async function createStyleFile() {
  try {
    const pathToStyleFile = path.join(
      componentFolder,
      `${nameOfComponent}.scss`
    );
    const data = "@import '../../main';";
    await writeFile(pathToStyleFile, data).then(() => {
      next();
      process.stdout.write(`Created styles for ${nameOfComponent} component\n`);
    });
  } catch (err) {
    next(err);
  }
}

async function createTypesFile() {
  try {
    const pathToStyleFile = path.join(
      componentFolder,
      `${nameOfComponent}Types.ts`
    );
    const data = `export type ${nameOfComponent}Types = {};`;
    await writeFile(pathToStyleFile, data).then(() => {
      next();
      process.stdout.write(`Created types for ${nameOfComponent} component\n`);
    });
  } catch (err) {
    next(err);
  }
}

async function createComponentFile() {
  try {
    const pathToStyleFile = path.join(
      componentFolder,
      `${nameOfComponent}.tsx`
    );
    const componentStr = `export default function ${
      nameOfComponent[0].toUpperCase() + nameOfComponent.slice(1)
    }({}: ${nameOfComponent}Types) {}`;
    const fullStr = getFullStr() + componentStr;
    await writeFile(pathToStyleFile, fullStr).then(() => {
      next();
      process.stdout.write(`Created ${nameOfComponent} component\n`);
    });
  } catch (err) {
    next(err);
  }
}

const tasks = [
  createFolder,
  createStyleFile,
  createTypesFile,
  createComponentFile,
];

function next(err?: unknown) {
  if (err) throw err;
  const currentTask = tasks.shift();
  if (currentTask) {
    currentTask();
  }
}

next();

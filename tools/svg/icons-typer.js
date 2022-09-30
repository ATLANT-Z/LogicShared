const fs = require('fs');
const path = require('path');

const sharedConfig = require(path.join(process.cwd(), 'shared.config.js'));

const projectAssets = path.join(sharedConfig.assetsPath, 'icons');
const sharedAssets = path.join(sharedConfig.sharedPath, 'assets/icons');

console.log(projectAssets);
console.log(sharedAssets);

let iconsNames = [
    ...fs.readdirSync(projectAssets),
    ...fs.readdirSync(sharedAssets)
];

iconsNames = iconsNames.filter(el => /\.svg$/.test(el)).map(el => el.replace('.svg', ''));

const beginIconsType = `export enum projectIcons {\n`
const endIconsType = `}\n\n`;
const iconsType = 'export type Index = typeof projectIcons;\n'
const iconType = 'export type Icon = keyof Index;\n'

let fileTypeContent = '';

fileTypeContent += beginIconsType;
iconsNames.forEach(el => {
    fileTypeContent += `\t'${el}' = 1,\n`;
})
fileTypeContent += endIconsType;
fileTypeContent += iconsType;
fileTypeContent += iconType;

console.log(iconsNames);
console.log(fileTypeContent);


const typeFilePath = path.join(sharedConfig.sharedPath, 'type/index.ts')

fs.writeFileSync(typeFilePath, fileTypeContent);


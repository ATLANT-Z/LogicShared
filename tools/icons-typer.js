const fs = require('fs');

let iconsNames = fs.readdirSync('src/assets/icons');
iconsNames = iconsNames.filter(el => /\.svg$/.test(el)).map(el => el.replace('.svg', ''));

let beginIconsType = `export enum projectIcons {\n`
let endIconsType = `}\n\n`;
let iconsType = 'export type Icons = typeof projectIcons;\n'
let iconType = 'export type Icon = keyof Icons;\n'

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


///TODO поправить иконки, чтоб всё работало ровно, две папки теперь смотрим.

fs.writeFileSync('src/_shared/type/icons.ts', fileTypeContent)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.resolve(__dirname, '../build');
const indexFile = path.join(buildDir, 'index.js');

try {
    // 添加执行权限
    fs.chmodSync(indexFile, '755');
    console.log('已成功设置 index.js 文件的执行权限');
} catch (error) {
    console.error('设置文件权限时出错:', error);
}

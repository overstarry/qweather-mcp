import { chmod } from 'fs/promises';
import { platform } from 'os';

async function setPermissions() {
    // 只在非 Windows 平台上设置可执行权限
    if (platform() !== 'win32') {
        try {
            await chmod('./build/index.js', 0o755);
            console.log('Permissions set successfully for build/index.js');
        } catch (err) {
            console.error('Failed to set permissions:', err);
        }
    }
}

setPermissions();

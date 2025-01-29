const { execSync } = require('child_process');

try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    if (branch === 'develop') {
        execSync('cp .env.development .env');
        console.log('.env.development 파일을 사용합니다.');
    } else {
        execSync('cp .env.production .env');
        console.log('.env.production 파일을 사용합니다.');
    }
} catch (error) {
    console.error('환경 변수를 설정하는 중 오류 발생:', error.message);
}




//100% cient code
//webpack은 exported configuration object를 찾음.

//Node.js에는 파일과 디렉토리 경로를 absolute로 만들어주는 방법이있음
//컴퓨터나 서버에서의 전체 경로를 갖게됨
// user/nicalse/documents/wetube/assets
//이렇게 경로를 나타내는데 psth라는 걸로 할 수 있음.
// path는 node.js에 기본으로 깔린 패키지임
// __dirname은 현 프로젝트 디렉토리 이름 - 어디서든 접근 가능한 NODE.js의 변수임
const path = require("path");

const MODE =process.env.WEPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ENTRY_FILE,
    mode:MODE,
    output: {
    path :OUTPUT_DIR,
    filename :"[name].[format]"
    }
};

module.exports = config;

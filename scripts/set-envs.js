const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const basePath = "./src/environments";
const targetPath = "./src/environments/environments.ts";

const envFileContent = `
export const environments = {
  mapbox_key: "${process.env["MAPBOX_KEY"]}",
}
`;

mkdirSync(basePath, { recursive: true });

writeFileSync(targetPath, envFileContent);

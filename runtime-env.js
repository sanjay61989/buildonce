#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const templatePath = "/usr/share/nginx/html/assets/env.template.json";
const outputPath = "/usr/share/nginx/html/assets/env.json";

// read template and collect matching env vars
const template = JSON.parse(fs.readFileSync(templatePath, "utf8"));
const envData = Object.fromEntries(
  Object.keys(template)
    .filter((k) => process.env[k])
    .map((k) => [k, process.env[k]])
);

// write env.json
const json = JSON.stringify(envData);
fs.writeFileSync(outputPath, json);

console.log("✅ Generated env.json:", json);
console.log("Starting Nginx…", outputPath);
console.log("File content is", fs.readFileSync(outputPath, "utf8"));

#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Define paths
const templateFile = "/usr/share/nginx/html/assets/env.template.json";
const envJsonFile = "/usr/share/nginx/html/assets/env.json";

// Log that the script is running
console.log("Script is running");

// Read the template JSON file
let template;
try {
  template = JSON.parse(fs.readFileSync(templateFile, "utf8"));
} catch (err) {
  console.error("❌ Failed to read template file:", err);
  process.exit(1);
}

// Initialize the JSON string
let json = "{";

// Extract keys from the template
Object.keys(template).forEach((key) => {
  // Get environment variable value

  const value = process.env[key];
  console.log("✅", process.env, key, process.env[key]);
  // If value is undefined or empty, skip it
  if (value) {
    // Escape backslashes and double quotes
    const escapedValue = value
      ? value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
      : "";
    // Append key-value pair to JSON string
    json += `"${key}": "${escapedValue}", `;
  }
});

// Remove the trailing comma and close the JSON object
json = json.replace(/, $/, "");
json += "}";

// Write the generated JSON to the env.json file
try {
  fs.writeFileSync(envJsonFile, json, "utf8");
  console.log("✅ Generated env.json:", json);
} catch (err) {
  console.error("❌ Failed to write env.json:", err);
  process.exit(1);
}

// Execute the next process (Nginx)
console.log("Starting Nginx...", envJsonFile);
console.log("File content is", fs.readFileSync(envJsonFile, "utf8"));

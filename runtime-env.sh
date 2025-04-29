#!/bin/sh

echo "Script is running"

# Create an empty JSON object
json="{"

# Loop through environment variables and append them to the JSON object
for var in $(env | cut -d= -f1); do
  value=$(printenv "$var")

  # Escape double quotes and backslashes in the value
  value=$(echo "$value" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g')

  # Concatenate properly in POSIX sh
  json="$json\"$var\": \"$value\", "
done

# Remove the last comma and space
json=$(echo "$json" | sed 's/, $//')

# Close the JSON object
json="$json}"

# Write to env.json
echo "$json" > /usr/share/nginx/html/assets/env.json

# Log to debug
echo "Final JSON: $json"

# Execute the original CMD
exec "$@"

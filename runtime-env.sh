#!/bin/sh

echo "Script is running"

TEMPLATE_FILE="/usr/share/nginx/html/assets/env.template.json"
ENV_JSON_FILE="/usr/share/nginx/html/assets/env.json"

json="{"

# Extract only keys from template file using plain sed
keys=$(sed -n 's/^[[:space:]]*"\([^"]*\)".*:.*/\1/p' "$TEMPLATE_FILE")

for key in $keys; do
  value=$(printenv "$key")
  # Escape backslashes and double quotes
  escaped_value=$(echo "$value" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g')
  json="$json\"$key\": \"$escaped_value\", "
done

# Remove trailing comma and space
json=$(echo "$json" | sed 's/, $//')
json="$json}"

# Write to env.json
echo "$json" > "$ENV_JSON_FILE"

echo "Generated env.json:"
cat "$ENV_JSON_FILE"

exec "$@"

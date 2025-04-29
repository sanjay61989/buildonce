docker build --progress=plain --no-cache -t angular-app .

docker run --env-file environments\.env.prod -p 4200:80 angular-app

cls && clear 

docker build --progress=plain -t angular-app .

docker run --env-file environments\.env.dev -p 4200:80 angular-app

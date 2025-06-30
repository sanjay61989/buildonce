# 🚀 Angular Docker Starter

A lean recipe for containerising and running an Angular app with **Docker**, purpose‑built for both **development** and **production** environments.

---

## 📦 Prerequisites

* Docker installed and running
* Environments files has to be placed `environments/.env.dev` & `environments/.env.prod` present
* Keys inside `assets/env.template.json` mirror those in every `.env.*` file

---

## 👩‍💻 Development

```bash
docker build --progress=plain -t angular-app .
docker run --env-file environments/.env.dev -p 4200:80 angular-app
```

---

## 🚀 Production

```bash
docker build --progress=plain -t angular-app .
docker run --env-file environments/.env.prod -p 4200:80 angular-app
```
---

### 🔄 Switching Environments

Point the `--env-file` flag at any `.env.*` you like:

```bash
docker run --env-file environments/.env.staging -p 4200:80 angular-app
```

Just be sure every key inside `env.template.json` exists in the chosen `.env.*` file.

---

### 📝 How It Works

1. **Build** – The Dockerfile compiles your Angular project and bakes the static files into an Nginx image.
2. **Env Injection** – At runtime a Node script hydrates `assets/env.template.json` with variables from the selected env file, producing `assets/env.json`.
3. **Serve** – Nginx listens on **port 80** inside the container, which is mapped to **localhost:4200** on your machine.

---

Happy shipping! ☕️

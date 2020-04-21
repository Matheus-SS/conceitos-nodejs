const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url: url,
    techs: techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepository = repositories.findIndex((repo) => repo.id === id);

  if (findRepository < 0) {
    return response.status(400).json({ error: "Repositório não encontrado" });
  }

  const repository = {
    id: uuid(),
    title,
    url: url,
    techs: techs,
    likes: 0,
  };

  repositories[findRepository] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.findIndex((repo) => repo.id === id);

  if (findRepository < 0) {
    return response.status(400).json({ error: "Repositório não encontrado" });
  }

  repositories.splice(findRepository, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.findIndex((repo) => repo.id === id);

  if (findRepository < 0) {
    return response.status(400).json({ error: "Repositório não encontrado" });
  }

  const repository = repositories[findRepository];

  repository.likes = repository.likes + 1;

  return response.json(repository);
});

module.exports = app;

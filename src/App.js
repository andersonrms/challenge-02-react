import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      
      // repositories.push(response.data);
      setRepositories(response.data)
    })
  });

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: ["React, ReactJ"]
    });

    const repository = response.data;

    setRepositories( [...repositories, repository] );
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repositoriesFilter = repositories.filter(repositories => repositories.id != id)

    setRepositories(repositoriesFilter);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
              {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const RepoList = ({ username, filterBySize }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        let filteredRepos = response.data;

        // Aplicar el filtro según el tamaño si se especifica
        if (filterBySize) {
          filteredRepos = filteredRepos.filter((repo) => repo.size > filterBySize);
        }

        const sortedRepos = filteredRepos.sort((a, b) => b.size - a.size);
        const topRepos = sortedRepos.slice(0, 5);
        setRepos(topRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username, filterBySize]);

  return (
    <div>
      <h2>Top 5 repositorios de {username}</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - Tamaño: {repo.size}
          </li>
        ))}
      </ul>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
  filterBySize: PropTypes.number, // Nuevo prop para filtrar por tamaño
};
qA>zsqsA
export default RepoList;


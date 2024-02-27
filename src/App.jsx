import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
} from "@mui/material";
import RepoList from "./components/RepoList";

function App() {
  const [username, setUsername] = useState("");
  const [showRepoList, setShowRepoList] = useState(false);
  const [filterBySize, setFilterBySize] = useState(null); // Nuevo estado para el tamaño

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFilterChange = (event) => {
    const size = event.target.value === "all" ? null : parseInt(event.target.value, 10);
    setFilterBySize(size);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowRepoList(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Explorador de Repositorios
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <Select
            label="Filtrar por tamaño"
            value={filterBySize || "all"}
            onChange={handleFilterChange}
            fullWidth
            sx={{ marginBottom: "10px" }}
          >
            <MenuItem value="all">Todos los tamaños</MenuItem>
            <MenuItem value="1000">Tamaño mayor a 1000</MenuItem>
            <MenuItem value="5000">Tamaño mayor a 5000</MenuItem>
            {/* Agrega más opciones según sea necesario */}
          </Select>
          <Button type="submit" variant="contained" fullWidth>
            Buscar Repositorios
          </Button>
        </form>
        {showRepoList && <RepoList username={username} filterBySize={filterBySize} />}
      </Container>
    </div>
  );
}

export default App;


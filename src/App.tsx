import { Box, CssBaseline } from '@mui/material';
import Header from './Components/Header/Header';
import Content from './Components/Content/Content';
import { ToolProvider } from './context/ToolContext';

function App() {
  return (
    <ToolProvider>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Content />
      </Box>
    </ToolProvider>
  );
}

export default App;
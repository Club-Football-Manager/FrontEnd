import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  NotFoundPage,
  HomePage,
  DashBoardPage,
  RosterPage,
  MyPlayerListPage
} from "./Pages/Pages.ts"
import {
  DrawerComponent
} from "./Components/Components.ts"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {CssBaseline, Container} from '@mui/material';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container fixed sx={{ py: 7 }}><HomePage/></Container>
  },
  {
    path: "/DashBoard",
    element: <Container fixed sx={{ py: 7 }}><DashBoardPage/></Container>
  },
  {
    path: "/DashBoard/Roster",
    element: <Container fixed sx={{ py: 7 }}><MyPlayerListPage/></Container>
  },
  {
    path: "/DashBoard/Team",
    element: <Container fixed sx={{ py: 7 }}><RosterPage/></Container>
  },
  {
    path: "*",
    element: <Container fixed sx={{ py: 7 }}><NotFoundPage/></Container>
  },
]);

const Theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <DrawerComponent/>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)

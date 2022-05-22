import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import VideoPage from '../pages/videopage/Videopage.js';
import Homepage from '../pages/homepage/Homepage.js';
import ToDo from '../pages/ToDo.js';
import {
  Route,
  Routes,
  MemoryRouter,
} from "react-router-dom";

test('Renders Homepage', async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ToDo" element={<ToDo />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </MemoryRouter>);

  let homepage = await screen.findByTestId('homepage-main');

  expect(homepage).toBeInTheDocument;
})
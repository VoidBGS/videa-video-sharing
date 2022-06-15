import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import VideoPage from '../pages/videopage/Videopage.js';
import Homepage from '../pages/homepage/Homepage.js';
import ToDo from '../pages/ToDo.js';
import {
  Route,
  Routes,
  MemoryRouter,
} from "react-router-dom";

test('renders video page', async () => {
  render(
    <MemoryRouter initialEntries={["/video/1"]}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ToDo" element={<ToDo />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </MemoryRouter>);

  const videoPageDiv = await waitFor(() => screen.findAllByTestId("video-page-main"), {
    timeout: 3000
});

  expect(videoPageDiv).toBeInTheDocument;
});
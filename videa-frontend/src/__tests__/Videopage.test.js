import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import VideoPage from '../pages/videopage/Videopage.js';
import Homepage from '../pages/homepage/Homepage.js';
import ToDo from '../pages/ToDo.js';
import {
  Route,
  Routes,
  MemoryRouter,
} from "react-router-dom";

test('renders video page', () => {
  render(
    <MemoryRouter initialEntries={["/video/1"]}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ToDo" element={<ToDo />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </MemoryRouter>);
  let videoPageDiv = screen.getByTestId('video-page-main');

  expect(videoPageDiv).toBeInTheDocument;
});

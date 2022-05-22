import { render, screen } from '@testing-library/react';
import VideoPage from './src/pages/videopage/Videopage.js';

test('renders video page', () => {
  render(<VideoPage url="/greeting"/>);
  
  expect(screen.getAllByTestId("video-page-main")).toBeInTheDocument();
});

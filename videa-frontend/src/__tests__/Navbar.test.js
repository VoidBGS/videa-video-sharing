import { waitFor, findByText, fireEvent, render, screen } from '@testing-library/react';
import Navbar from "../components/navbar/Navbar.js";
import UploadVideoButton from '../components/navbar/UploadVideoButton.js';
import Homepage from '../pages/homepage/Homepage.js';
import axios from 'axios';
import {
    MemoryRouter,
    Routes,
    Route
} from "react-router-dom";

test('Clicks on add upload button', () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <Navbar />
        </MemoryRouter>
    );

    let navbar = screen.getByTestId('navbar-component');
    let uploadButton = screen.getByTestId('video-page-upload-video-button');

    expect(navbar).toBeInTheDocument;
    expect(uploadButton).toBeInTheDocument;

    fireEvent.click(uploadButton);

    let videoModal = screen.getByTestId('create-video-modal');

    expect(videoModal).toBeInTheDocument;
})

test('Clicks on add upload button and changes textbox', () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <Navbar />
        </MemoryRouter>
    );

    let navbar = screen.getByTestId('navbar-component');
    let uploadButton = screen.getByTestId('video-page-upload-video-button');

    expect(navbar).toBeInTheDocument;
    expect(uploadButton).toBeInTheDocument;

    fireEvent.click(uploadButton);

    let videoModal = screen.getByTestId('create-video-modal');

    expect(videoModal).toBeInTheDocument;

    let linkTb = screen.getByTestId('video-link-textbox');

    expect(linkTb);

    fireEvent.change(linkTb, { target: { value: 'test' } })

    expect(linkTb.value).toBe('test');
})


test('Clicks on add upload button and submits form', async () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
        </MemoryRouter>
    );

    let navbar = screen.getByTestId('navbar-component');
    let uploadButton = screen.getByTestId('video-page-upload-video-button');

    expect(navbar).toBeInTheDocument;
    expect(uploadButton).toBeInTheDocument;

    fireEvent.click(uploadButton);

    let videoModal = screen.getByTestId('create-video-modal');

    expect(videoModal).toBeInTheDocument;

    let linkTb = screen.getByTestId('video-link-textbox');
    let titleTb = screen.getByTestId('video-title-textbox');
    let thumbnailTb = screen.getByTestId('video-thumbnail-textbox');

    expect(linkTb);
    expect(titleTb);
    expect(thumbnailTb);

    fireEvent.change(linkTb, { target: { value: 'https://www.youtube.com/watch?v=CkECqIknhJk' } });
    expect(linkTb.value).toBe('https://www.youtube.com/watch?v=CkECqIknhJk');

    fireEvent.change(titleTb, { target: { value: 'Video Testing E2E' } });
    expect(titleTb.value).toBe('Video Testing E2E');

    fireEvent.change(thumbnailTb, { target: { value: 'https://ntvb.tmsimg.com/assets/p8696131_b_h10_aa.jpg' } });
    expect(thumbnailTb.value).toBe('https://ntvb.tmsimg.com/assets/p8696131_b_h10_aa.jpg');

    let submitBtn = screen.getByTestId('video-submit-button');
    expect(submitBtn);

    let uploadForm = screen.getAllByTestId('video-page-upload-video-form');
    expect(uploadForm);

    // fireEvent.submit(uploadForm);
    fireEvent.click(submitBtn);

    const successMessage = await waitFor(() => screen.findByText("Video has been posted successfully!"), {
        timeout: 3000
    });

    expect(successMessage).toBeInTheDocument;
})
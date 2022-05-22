import {fireEvent, render, screen } from '@testing-library/react';
import Navbar from "../components/navbar/Navbar.js";
import {
    MemoryRouter,
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

    fireEvent.change(linkTb,{target: {value: 'test'}} )

    expect(linkTb.value).toBe('test');
})


test('Clicks on add upload button and submits form', () => {
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
    let titleTb = screen.getByTestId('video-title-textbox');
    let thumbnailTb = screen.getByTestId('video-thumbnail-textbox');

    expect(linkTb);
    expect(titleTb);
    expect(thumbnailTb);

    fireEvent.change(linkTb, {target: {value: 'https://www.youtube.com/watch?v=CkECqIknhJk'}} );
    expect(linkTb.value).toBe('https://www.youtube.com/watch?v=CkECqIknhJk');

    fireEvent.change(titleTb,{target: {value: 'Video Testing'}} );
    expect(titleTb.value).toBe('Video Testing');

    fireEvent.change(thumbnailTb,{target: {value: 'https://media.moddb.com/images/mods/1/45/44306/gamejolt_thumbnail.1.png'}} );
    expect(thumbnailTb.value).toBe('https://media.moddb.com/images/mods/1/45/44306/gamejolt_thumbnail.1.png');

    let submitBtn = screen.getByTestId('video-submit-button');
    expect(submitBtn);
})
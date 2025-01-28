// src/routes/page.test.ts
import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

import Page from './+page.svelte';

describe('My Page', () => {
  it('shows "No file selected" if user clicks Upload with no file chosen', async () => {
    render(Page);

    // 1) Click "Upload" with no file
    const uploadBtn = screen.getByTestId('uploadBtn');
    await fireEvent.click(uploadBtn);

    // 2) Check the message
    const msg = screen.getByTestId('uploadMessage');
    expect(msg).toHaveTextContent('No file selected');
  });

  it('updates search display on input', async () => {
    render(Page);

    // 1) Type into the search input
    const searchInput = screen.getByTestId('searchInput') as HTMLInputElement;
    const display = screen.getByTestId('searchDisplay');
    expect(display).toHaveTextContent('Search: '); // initially empty

    await fireEvent.input(searchInput, { target: { value: 'Hello' } });

    // 2) The display text should update
    expect(display).toHaveTextContent('Search: Hello');
  });
});

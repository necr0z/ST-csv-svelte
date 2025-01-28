// src/routes/page.test.ts
import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

import Page from './+page.svelte';

describe('My Page', () => {
	it('shows "No file selected" if user clicks Upload with no file chosen', async () => {
		// 1) Render the page
		render(Page);

		// 2) Click "Upload" with no file
		const uploadBtn = screen.getByTestId('uploadBtn');
		await fireEvent.click(uploadBtn);

		// 3) Check the message
		const msg = screen.getByTestId('uploadMessage');
		expect(msg).toHaveTextContent('No file selected');
	});

	it('updates search display on typing into search input', async () => {
		// 1) Render the page
		render(Page);

		// 2) Type "Hello" into data-testid="searchInput"
		const searchInput = screen.getByTestId('searchInput') as HTMLInputElement;
		await fireEvent.input(searchInput, { target: { value: 'Hello' } });

		// 3) The display text should update
		const display = screen.getByTestId('searchDisplay');
		expect(display).toHaveTextContent('Search: Hello');
	});
});

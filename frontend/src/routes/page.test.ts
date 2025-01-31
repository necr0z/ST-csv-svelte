// src/routes/page.test.ts

import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

//  just in case;
import '@testing-library/jest-dom';

import Page from './+page.svelte';

describe('My Page', () => {
	it('shows "No file selected" if user clicks Upload with no file chosen', async () => {
		render(Page);

		const uploadBtn = screen.getByTestId('uploadBtn');
		await fireEvent.click(uploadBtn);

		const msg = screen.getByTestId('uploadMessage');
		expect(msg).toHaveTextContent('No file selected');
	});

	it('updates search display on typing', async () => {
		render(Page);

		const searchInput = screen.getByTestId('searchInput') as HTMLInputElement;
		await fireEvent.input(searchInput, { target: { value: 'Hello' } });

		const display = screen.getByTestId('searchDisplay');
		expect(display).toHaveTextContent('Search: Hello');
	});
});

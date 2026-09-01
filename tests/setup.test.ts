import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Setup', () => {
  it('renders application title', () => {
    render(<App />);
    expect(screen.getByText('Personal Homepage')).toBeInTheDocument();
  });
});

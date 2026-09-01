import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Integration', () => {
  it('renders all sections successfully', () => {
    render(<App />);
    expect(screen.getByText('關於我與技術專長')).toBeInTheDocument();
    expect(screen.getByText('精選 Side Projects')).toBeInTheDocument();
    expect(screen.getByText('經歷與里程碑')).toBeInTheDocument();
    expect(screen.getByText('與我聯繫')).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    expect(screen.getByText(/Full-Stack & AI Engineer/i)).toBeInTheDocument();
  });
});

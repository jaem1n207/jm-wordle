import React from 'react';

import { Board, Layout } from '@/components';

export default function HomePage() {
  return (
    <Layout
      title="JM Wordle"
      description="Let's play wordle now!"
      article={false}
    >
      <Board />
    </Layout>
  );
}

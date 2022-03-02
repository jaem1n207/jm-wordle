import React from 'react';

import Layout from '@/components/layout';

export default function HomePage() {
  return (
    <Layout
      title="JM Wordle"
      description="Let's play wordle now!"
      article={false}
    >
      wordle 보여줌
    </Layout>
  );
}

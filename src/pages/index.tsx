import React from 'react';

import Layout from '@/components/layout';

export default function HomePage() {
  return (
    <Layout title="Home" description="Let's play wordle now!" article={false}>
      wordle 보여줌
    </Layout>
  );
}

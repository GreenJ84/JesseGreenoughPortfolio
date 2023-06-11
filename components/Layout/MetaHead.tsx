import Head from 'next/head'
import React from 'react'

const MetaHead = ({title, description, keywords }:{title: string, description: string, keywords: string}) => {

  return (
    <Head>
        <title>{title}</title>
        <meta
          property="og:title"
          content={title}
        />
        <meta
          name="description"
          content={description}
          key="desc"
        />
        <meta
          property="og:description"
          content={description}
        />
        <meta
          name="keywords"
          content={keywords}
        ></meta>
      </Head>
  )
}

export default MetaHead
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

const features = [
    {
        title: 'Fácil de usar',
        imageUrl: 'img/undraw_docusaurus_mountain.svg',
        description: (
            <>
                A XDK foi desenvolvida desde sua base para ser fácil e intuitiva de usar.
                Um estrutura completa pronta em poucos cliques.
            </>
        ),
    },
    {
        title: 'Concentre-se no que importa',
        imageUrl: 'img/undraw_docusaurus_tree.svg',
        description: (
            <>
                A XDK permite que você se concentre no que importa, sua lógica de negócio.
                Deixe toda a parte repetitiva pra gente.
            </>
        ),
    },
    {
        title: 'Esteja sempre atualizado',
        imageUrl: 'img/undraw_docusaurus_react.svg',
        description: (
            <>
                Usando sempre as melhores e mais recentes tecnologias, seu projeto nunca
                ficará defasado e se manterá sempre seguro.
            </>
        ),
    },
];

function Feature({ imageUrl, title, description }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx('col col--4', styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img className={styles.featureImage} src={imgUrl} alt={title} />
                </div>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout
            title={`Home | ${siteConfig.title}`}
            description="XDK Docs">
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx(
                                'button button--outline button--secondary button--lg',
                                styles.getStarted,
                            )}
                            to={useBaseUrl('docs/getting-started')}>
                            Começar
            </Link>
                    </div>
                </div>
            </header>
            <main>
                {features && features.length > 0 && (
                    <section className={styles.features}>
                        <div className="container">
                            <div className="row">
                                {features.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
}

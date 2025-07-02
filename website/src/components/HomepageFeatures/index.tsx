import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

type FeatureItem = {
  title: string | ReactNode;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

// const FeatureList: FeatureItem[] = [
//   {
//     title: 'Easy to Use',
//     // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         Docusaurus was designed from the ground up to be easily installed and
//         used to get your website up and running quickly.
//       </>
//     ),
//   },
//   {
//     title: 'Focus on What Matters',
//     // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
//     description: (
//       <>
//         Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
//         ahead and move your docs into the <code>docs</code> directory.
//       </>
//     ),
//   },
//   {
//     title: 'Powered by React',
//     // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
//     description: (
//       <>
//         Extend or customize your website layout by reusing React. Docusaurus can
//         be extended while reusing the same header and footer.
//       </>
//     ),
//   },
// ];

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id='feature.chunkedUpload'>Chunked Upload</Translate>,
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate id='feature.chunkedUploadDescription'>
        Support to upload large file by chunk, and support custom chunk size
      </Translate>
    ),
  },
  {
    title: <Translate id='feature.autoRetry'>Auto Retry</Translate>,
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate id='feature.autoRetryDescription'>
        If some chunk upload failed, we will retry it automatically, and you can config retry times and retry interval
      </Translate>
    ),
  },
  {
    title: <Translate id='feature.manualRetry'>Manual Retry</Translate>,
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate id='feature.manualRetryDescription'>
        If auto retry failed, you can trigger retry manually
      </Translate>
    ),
  },
  {
    title: <Translate id='feature.concurrentRequest'>Concurrent Request</Translate>,
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate id='feature.concurrentRequestDescription'>
        Support to upload multiple chunk at the same time
      </Translate>
    ),
  },
  {
    title: <Translate id='feature.richConfiguration'>Rich configuration</Translate>,
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate id='feature.richConfigurationDescription'>
        Support custom request, such as custom headers, custom query params, enable hash calculation, etc.
      </Translate>
    ),
  },
  {
    title: <Translate id='feature.preCheck'>Pre-check</Translate>,
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate id='feature.preCheckDescription'>
        Support to pre-check file status, such as uploaded, partial uploaded, not uploaded, seconds upload etc.
      </Translate>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg && <Svg className={styles.featureSvg} role="img" />}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

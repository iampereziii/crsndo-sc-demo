import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import styles from '../../../styles/Hero.module.css';
import Image from 'next/image';

interface HeroProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: HeroProps): React.JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <section className={styles.hero} id={id ? id : undefined}>
      <div className={styles.backgroundImage}>
        <Image 
          alt="Woman with headphones" 
          loading="lazy" 
          width="1920" 
          height="1080" 
          decoding="async"
          src="/images/woman-with-headphones.jpg"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentInner}>
            <h2 className={styles.subtitle}>Monarch II</h2>
            <h3 className={styles.title}>A symphonic boom.</h3>
            <div className={styles.buttons}>
              <a href="/#" className={styles.btnPrimary}>Learn more</a>
              <a href="/#" className={styles.btnSecondary}>Buy</a>
            </div>
          </div>
        </div>
        <div className={styles.sideImage}>
          <Image 
          alt="Woman with headphones" 
          loading="lazy" 
          width="1920" 
          height="1080" 
          decoding="async"
          src="/images/woman-with-headphones.jpg"
        />
        </div>
      </div>
    </section>
  );
};

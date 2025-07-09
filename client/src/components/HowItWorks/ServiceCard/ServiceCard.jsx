import React, { memo } from 'react';
import styles from './ServiceCard.module.sass';

const ServiceCard = memo(({ icon, alt, title, desc, link, linkText }) => (
  <div className={styles.serviceCard}>
    <div className={styles.cardIcon}>
      <img src={icon} alt={alt} loading='lazy' />
    </div>
    <h3>{title}</h3>
    <p>{desc}</p>
    <a href={link} className={styles.cardButton}>
      <span>{linkText}</span>
    </a>
  </div>
));

export default ServiceCard;

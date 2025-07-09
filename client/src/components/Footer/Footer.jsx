import React, { Component } from 'react';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';

class Footer extends Component {
  topFooterItemsRender = item => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map(i => (
        typeof i === 'object' && i.label && i.href ? (
          <a key={i.label} href={i.href}>
            {i.label}
          </a>
        ) : (
          <a key={i} href='https://google.com'>
            {i}
          </a>
        )
      ))}
    </div>
  );

  topFooterRender () {
    return CONSTANTS.FooterItems.map(item => this.topFooterItemsRender(item));
  }

  render () {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div>{this.topFooterRender()}</div>
        </div>
      </div>
    );
  }
}

export default Footer;

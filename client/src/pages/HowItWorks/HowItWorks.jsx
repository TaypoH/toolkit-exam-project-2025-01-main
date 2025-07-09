import React, { useState } from 'react';
import styles from './HowItWorks.module.sass';
import ServiceCard from '../../components/HowItWorks/ServiceCard/ServiceCard';
import StepCard from '../../components/HowItWorks/StepCard/StepCard';
import FaqItem from '../../components/HowItWorks/FaqItem/FaqItem';
import {
  SERVICES,
  STEPS,
  FAQ_LAUNCHING,
  FAQ_MARKETPLACE,
  FAQ_MANAGED,
  FAQ_CREATIVES,
  FAQ_SECTIONS,
} from '../../components/HowItWorks/faqData';

const HowItWorks = () => {
  const scrollToSection = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [activeTab, setActiveTab] = useState(FAQ_SECTIONS[0].id);
  const [openLaunching, setOpenLaunching] = useState(
    Array(FAQ_LAUNCHING.length).fill(false)
  );
  const [openMarketplace, setOpenMarketplace] = useState(
    Array(FAQ_MARKETPLACE.length).fill(false)
  );
  const [openManaged, setOpenManaged] = useState(
    Array(FAQ_MANAGED.length).fill(false)
  );
  const [openCreatives, setOpenCreatives] = useState(
    Array(FAQ_CREATIVES.length).fill(false)
  );

  const toggleOpen = (arr, setArr, idx) => {
    setArr(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div className={styles.pageBg}>
      <section className={styles.heroSection}>
        <div className={styles.hhInner}>
          <div className={styles.hhContent}>
            <div className={styles.container}>
              <div className={styles.heroFlex}>
                <div className={styles.left}>
                  <h4 className={styles.badge}>World's #1 Naming Platform</h4>
                  <h1>How Does Atom Work?</h1>
                  <p>
                    Atom helps you come up with a great name for your business
                    by combining the power of crowdsourcing with sophisticated
                    technology and Agency-level validation services.
                  </p>
                </div>
                <div className={styles.right}>
                  <div className={styles.videoBoxHowItWork}>
                    <iframe
                      src='https://iframe.mediadelivery.net/embed/239474/327efcdd-b1a2-4891-b274-974787ae8362?autoplay=false&loop=false&muted=false&preload=true&responsive=true'
                      allow='accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;'
                      allowFullScreen
                      title='How Does Atom Work?'
                      loading='lazy'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.hbCaption}>
            <span>Our Services</span>
            <h2>3 Ways To Use Atom</h2>
            <p>
              Atom offers 3 ways to get you a perfect name for your business.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES.map(service => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.stepsSection}>
        <div className={styles.container}>
          <div className={styles.hbCaption}>
            <img
              className={styles.contestWorkImg}
              width='70'
              src='/staticImages/howItWorks/icon-27.svg'
              alt='How Do Naming Contests Work?'
              loading='lazy'
            />
            <h3>How Do Naming Contests Work?</h3>
          </div>
          <div className={styles.stepsGrid}>
            {STEPS.map((step, idx) => (
              <StepCard
                key={step.title}
                {...step}
                showArrow={idx !== STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.hbCaption}>
            <h3>Frequently Asked Questions</h3>
          </div>
          <div className={styles.faqTabs}>
            {FAQ_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                className={
                  styles.faqTab +
                  (activeTab === id ? ' ' + styles.faqTabActive : '')
                }
                type='button'
                onClick={() => {
                  setActiveTab(id);
                  scrollToSection(id);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className={styles.faqContent}>
            <div
              id='faq-launching'
              className={styles.faqCategory}
              style={{ paddingTop: 40 }}
            >
              <h4 className={styles.faqCategoryTitle}>Launching A Contest</h4>
              {FAQ_LAUNCHING.map((faq, idx) => (
                <FaqItem
                  key={faq.q}
                  question={faq.q}
                  answer={<span dangerouslySetInnerHTML={{ __html: faq.a }} />}
                  open={openLaunching[idx]}
                  onClick={() =>
                    toggleOpen(openLaunching, setOpenLaunching, idx)
                  }
                  id={`launching-${idx}`}
                />
              ))}
            </div>
            <div
              id='faq-marketplace'
              className={styles.faqCategory}
              style={{ paddingTop: 40 }}
            >
              <h4 className={styles.faqCategoryTitle}>
                Buying From Marketplace
              </h4>
              {FAQ_MARKETPLACE.map((faq, idx) => (
                <FaqItem
                  key={faq.q}
                  question={faq.q}
                  answer={<span dangerouslySetInnerHTML={{ __html: faq.a }} />}
                  open={openMarketplace[idx]}
                  onClick={() =>
                    toggleOpen(openMarketplace, setOpenMarketplace, idx)
                  }
                  id={`marketplace-${idx}`}
                />
              ))}
            </div>
            <div
              id='faq-managed'
              className={styles.faqCategory}
              style={{ paddingTop: 40 }}
            >
              <h4 className={styles.faqCategoryTitle}>Managed Contests</h4>
              {FAQ_MANAGED.map((faq, idx) => (
                <FaqItem
                  key={faq.q}
                  question={faq.q}
                  answer={<span dangerouslySetInnerHTML={{ __html: faq.a }} />}
                  open={openManaged[idx]}
                  onClick={() => toggleOpen(openManaged, setOpenManaged, idx)}
                  id={`managed-${idx}`}
                />
              ))}
            </div>
            <div
              id='faq-creatives'
              className={styles.faqCategory}
              style={{ paddingTop: 40 }}
            >
              <h4 className={styles.faqCategoryTitle}>For Creatives</h4>
              {FAQ_CREATIVES.map((faq, idx) => (
                <FaqItem
                  key={faq.q}
                  question={faq.q}
                  answer={<span dangerouslySetInnerHTML={{ __html: faq.a }} />}
                  open={openCreatives[idx]}
                  onClick={() =>
                    toggleOpen(openCreatives, setOpenCreatives, idx)
                  }
                  id={`creatives-${idx}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

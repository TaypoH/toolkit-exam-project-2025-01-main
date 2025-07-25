import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import { clearContestsList } from '../../store/slices/contestsSlice';
import { resetChat } from '../../store/slices/chatSlice';
import withRouter from '../../hocs/withRouter';
import Logo from '../Logo';
import { useEffect, useState } from 'react';

function getEventsBadgeCount () {
  const LOCAL_STORAGE_KEY = 'events-list';
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return 0;
  let notifiedIds = [];
  try {
    notifiedIds = JSON.parse(
      localStorage.getItem('events-notified-ids') || '[]'
    );
  } catch {
    notifiedIds = [];
  }
  try {
    const events = JSON.parse(stored);
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const notifyBeforeMs = (event.notifyBefore || 0) * 60 * 1000;
      const wasNotify = eventDate.getTime() - notifyBeforeMs <= Date.now();
      const isNew = !notifiedIds.includes(event.id);
      return wasNotify && isNew;
    }).length;
  } catch {
    return 0;
  }
}

function EventsMenuBadge () {
  const [count, setCount] = useState(getEventsBadgeCount());
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(getEventsBadgeCount());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  if (!count) return null;
  return (
    <span
      style={{
        background: '#CD5C5C',
        color: '#fff',
        borderRadius: '50%',
        padding: '2px 8px',
        fontSize: 12,
        fontWeight: 700,
        marginLeft: 6,
        verticalAlign: 'middle',
        lineHeight: '18px',
        display: 'inline-block',
        minWidth: 18,
        textAlign: 'center',
      }}
    >
      {count}
    </span>
  );
}

class Header extends React.Component {
  componentDidMount () {
    const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);

    if (token && !this.props.data) {
      this.props.getUser();
    } else {
      this.props.clearUserStore();
    }
  }

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.clearContestsList();
    this.props.resetChat();
    this.props.navigate('/login', { replace: true });
  };

  startContests = () => {
    this.props.navigate('/startContest');
  };

  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.data.avatar}`
              }
              alt='user'
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt='menu'
            />
            <ul>
              {this.props.data.role !== 'moderator' && (
                <li>
                  <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                    <span>View Dashboard</span>
                  </Link>
                </li>
              )}
              <li>
                <Link to='/account' style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to='http:/www.google.com'
                  style={{ textDecoration: 'none' }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to='http:/www.google.com'
                  style={{ textDecoration: 'none' }}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <span onClick={this.logOut} className={styles.logout}>
                  Logout
                </span>
              </li>
            </ul>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt='email'
          />
        </>
      );
    }
    return (
      <>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to='/registration' style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  render () {
    if (this.props.isFetching) {
      return null;
    }
    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <a href='http://www.google.com'>Read Announcement</a>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <a
              href={`tel:${CONSTANTS.CONTACTS.PHONE}`}
              className={styles.phoneLink}
            >
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`}
                alt='phone'
              />
              <span className={styles.phoneLinkSpan}>
                {CONSTANTS.CONTACTS.PHONE}
              </span>
            </a>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <Logo className={styles.logo} alt='squadhelp_logo' />
          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <ul>
                <li>
                  <span>NAME IDEAS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com'>Beauty</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Consulting</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>E-Commerce</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Fashion & Clothing</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Finance</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Real Estate</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>Tech</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>More Categories</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>CONTESTS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <Link
                        to='/how-it-works'
                        style={{ textDecoration: 'none' }}
                      >
                        HOW IT WORKS
                      </Link>
                    </li>
                    <li>
                      <a href='http://www.google.com'>PRICING</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>AGENCY SERVICE</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>ACTIVE CONTESTS</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>WINNERS</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>LEADERBOARD</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>BECOME A CREATIVE</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Our Work</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com'>NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>TAGLINES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>LOGOS</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>TESTIMONIALS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Names For Sale</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com'>POPULAR NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>SHORT NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>INTRIGUING NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>NAMES BY CATEGORY</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>VISUAL NAME SEARCH</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>SELL YOUR DOMAINS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Blog</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com'>ULTIMATE NAMING GUIDE</a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>
                        POETIC DEVICES IN BUSINESS NAMING
                      </a>
                    </li>
                    <li>
                      <a href='http://www.google.com'>CROWDED BAR THEORY</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com'>ALL ARTICLES</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to='/events' style={{ textDecoration: 'none' }}>
                    <span>EVENTS</span>
                    <EventsMenuBadge />
                  </Link>
                </li>
              </ul>
            </div>
            {this.props.data && this.props.data.role !== CONSTANTS.CREATOR && (
              <div
                className={styles.startContestBtn}
                onClick={() => {
                  if (this.props.data.role === 'moderator') {
                    this.props.navigate('/offersReview');
                  } else {
                    this.startContests();
                  }
                }}
              >
                {this.props.data.role === 'moderator'
                  ? 'REVIEW OFFERS'
                  : 'START CONTEST'}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.userStore;
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
  clearContestsList: () => dispatch(clearContestsList()),
  resetChat: () => dispatch(resetChat()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

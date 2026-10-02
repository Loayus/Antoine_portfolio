import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGS } from './i18n'

const EMAIL = 'ledouxantoine62@gmail.com'
const CV = '/cv/CV_Antoine_LEDOUX.pdf'
const SECTIONS = ['home', 'experience', 'projects', 'about', 'passions', 'contact']
const SKILLS = {
  front: ['Angular', 'React', 'Ember.js', 'HTML / CSS'],
  back: ['Java', 'Spring Boot', 'PHP', 'Python'],
  data: ['PostgreSQL', 'MongoDB', 'Ansible', 'GitLab', 'JUnit', 'Jira', 'Docker', 'CI/CD'],
}

function Title({ a, b }) {
  return (
      <h2>
        {a} <em>{b}</em>
      </h2>
  )
}

function PassionCarousel({ passion }) {
  const [current, setCurrent] = useState(0)
  const images = passion.images || []

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
      <figure className="passion">
        <div className="carousel-container">
          <div className="carousel">
            {images.map((img, idx) => (
                <img
                    key={img}
                    src={`/passions/${img}.jpg`}
                    alt={passion.alts?.[idx] || ''}
                    className={`carousel-img ${idx === current ? 'active' : ''}`}
                    loading="lazy"
                    onError={(e) => e.currentTarget.remove()}
                />
            ))}
          </div>
        </div>
        <figcaption>
          <h3>{passion.title}</h3>
          <p>{passion.desc}</p>
        </figcaption>
      </figure>
  )
}

function Header({ theme, setTheme }) {
  const { t, i18n } = useTranslation()
  const [active, setActive] = useState('home')

  useEffect(() => {
    const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
        { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((id) => io.observe(document.getElementById(id)))
    return () => io.disconnect()
  }, [])

  return (
      <header className="header">
        <a href="#home" className="logo" aria-label="Antoine Ledoux">A.</a>
        <nav aria-label="Main">
          {SECTIONS.map((id) => (
              <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>
                {t(`nav.${id}`)}
              </a>
          ))}
        </nav>
        <div className="tools">
          <div className="seg" role="group" aria-label="Language">
            {LANGS.map((l) => (
                <button key={l} className={i18n.language === l ? 'on' : ''} onClick={() => i18n.changeLanguage(l)}>
                  {l.toUpperCase()}
                </button>
            ))}
          </div>
          <button className="icon-btn" aria-label={t('theme')} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <span className="dot" />
          </button>
          <a className="pill sm" href={CV} download>{t('cv')}</a>
        </div>
      </header>
  )
}

export default function App() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const jobs = t('xp.jobs', { returnObjects: true })
  const projects = t('projects.items', { returnObjects: true })
  const edu = t('about.edu', { returnObjects: true })
  const langs = t('about.langs', { returnObjects: true })
  const passions = t('passions.items', { returnObjects: true })

  return (
      <>
        <Header theme={theme} setTheme={setTheme} />
        <main>
          <section id="home" className="hero">
            <div className="hero-text">
              <p className="eyebrow">{t('hero.eyebrow')}</p>
              <h1>
                {t('hero.title1')}
                <br />
                <em>{t('hero.title2')}</em>
              </h1>
              <p className="lead">{t('hero.text')}</p>
              <a className="pill" href="#projects">{t('hero.cta')}</a>
            </div>
            <div className="arch" aria-hidden="true">
              <img src="/passions/img.jpg" alt="Antoine Ledoux" />
            </div>
          </section>

          <section className="band split">
            <div>
              <p className="eyebrow">{t('skills.eyebrow')}</p>
              <h2>{t('skills.title')}</h2>
              <p className="muted">{t('skills.text')}</p>
            </div>
            <div className="skills">
              {Object.entries(SKILLS).map(([g, list]) => (
                  <div key={g}>
                    <h3>{t(`skills.groups.${g}`)}</h3>
                    <ul className="chips">
                      {list.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
              ))}
            </div>
          </section>

          <section id="experience" className="band">
            <p className="eyebrow">{t('xp.eyebrow')}</p>
            <Title a={t('xp.title1')} b={t('xp.title2')} />
            <ol className="timeline">
              {jobs.map((j) => (
                  <li key={j.period}>
                    <p className="period">{j.period}</p>
                    <h3>{j.role}</h3>
                    <p className="org">{j.org}</p>
                    <ul className="points">{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
                    {j.stack.length > 0 && <ul className="chips">{j.stack.map((s) => <li key={s}>{s}</li>)}</ul>}
                  </li>
              ))}
            </ol>
          </section>

          <section id="projects" className="band">
            <p className="eyebrow">{t('projects.eyebrow')}</p>
            <Title a={t('projects.title1')} b={t('projects.title2')} />
            <p className="muted">{t('projects.text')}</p>
            <div className="cards">
              {projects.map((p) => (
                  <article key={p.title} className="card">
                    <span className="tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                  </article>
              ))}
            </div>
          </section>

          <section id="about" className="band split">
            <div>
              <p className="eyebrow">{t('about.eyebrow')}</p>
              <Title a={t('about.title1')} b={t('about.title2')} />
              <p className="muted">{t('about.text')}</p>
              <h3 className="mt">{t('about.langsTitle')}</h3>
              <ul className="langs">
                {langs.map((l) => <li key={l.n}><strong>{l.n}</strong> {l.l}</li>)}
              </ul>
            </div>
            <ol className="timeline compact">
              {edu.map((e) => (
                  <li key={e.title}>
                    <p className="period">{e.year}</p>
                    <h3>{e.title}</h3>
                    <p className="org">{e.place}</p>
                  </li>
              ))}
            </ol>
          </section>

          <section id="passions" className="band">
            <p className="eyebrow">{t('passions.eyebrow')}</p>
            <Title a={t('passions.title1')} b={t('passions.title2')} />
            <p className="muted">{t('passions.text')}</p>
            <div className="passions">
              {passions.map((p) => (
                  <PassionCarousel key={p.key} passion={p} />
              ))}
            </div>
          </section>

          <section id="contact" className="band">
            <div className="cta">
              <div>
                <p className="eyebrow">{t('contact.eyebrow')}</p>
                <h2>{t('contact.title')}</h2>
                <p className="muted">{t('contact.text')}</p>
              </div>
              <a className="pill" href={`mailto:${EMAIL}`}>{t('contact.cta')}</a>
            </div>
          </section>
        </main>
        <footer className="footer">{t('footer', { year: new Date().getFullYear() })}</footer>
      </>
  )
}
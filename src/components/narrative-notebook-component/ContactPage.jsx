/**
 * ContactPage Component
 *
 * Displays one leaf of the Contact spread. The left leaf holds the heading,
 * e-mail address and primary CTA; the right leaf holds the social links.
 *
 * @param {Object} props
 * @param {'left'|'right'} [props.side='left']
 */
import React from 'react'

const ContactPage = ({
  side = 'left',
  heading,
  labels = {},
  linkedinUrl,
  githubUrl,
  email,
  socialLinks = [],
}) => {
  const mailto = email ? `mailto:${email}` : undefined

  if (side === 'right') {
    return (
      <div className="contact-page contact-page-right">
        <section className="social-links-section">
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
              aria-label="LinkedIn profile"
            >
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.561c0-1.428-.92-2.357-2.388-2.357-1.456 0-2.457.931-2.457 2.36v5.557h-3.554v-11h3.554V9.733c0-.448.198-.711.542-.884 1.664-.83 3.06-.245 3.06 1.205v1.431h3.554z" />
              </svg>
              <span className="link-text">LinkedIn</span>
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
              aria-label="GitHub profile"
            >
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.013-1.416-4.013-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.926.43.312.833 1.123.833 2.246v3.095c0 .319.193.694.802.576 4.765-1.589 8.199-6.086 8.199-11.388 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="link-text">GitHub</span>
            </a>
          )}

          {mailto && (
            <a href={mailto} className="social-link email" aria-label="Send email">
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span className="link-text">Email</span>
            </a>
          )}
        </section>

        {socialLinks.length > 0 && (
          <section className="social-links-section">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link external"
                aria-label={`Visit ${link.platform}`}
              >
                <span className="platform-name">{link.platform}</span>
              </a>
            ))}
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="contact-page contact-page-left">
      <h2>{heading}</h2>

      {email && <p className="contact-email">{email}</p>}

      {mailto && (
        <div className="contact-actions">
          <a className="contact-btn" href={mailto}>
            {labels.message}
          </a>
        </div>
      )}
    </div>
  )
}

export default ContactPage

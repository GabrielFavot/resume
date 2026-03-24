import React from 'react';
import styled from 'styled-components';

// ===== Colors & Theme =====
const colors = {
  primary: '#1e293b',
  secondary: '#475569',
  accent: '#3b82f6',
  text: '#1f2937',
  textLight: '#6b7280',
  bg: '#ffffff',
  border: '#e5e7eb',
  cardBg: '#f8fafc',
};

// ===== Layout =====
const Layout = styled.div`
  max-width: 210mm;
  margin: 0;
  padding: 0;
  background: ${colors.bg};
  color: ${colors.text};
  line-height: 1.45;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 8.5pt;

  @page {
    margin: 8mm;
  }
`;

// ===== Header (like ResumeHeader.vue) =====
const Header = styled.header`
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 2px solid ${colors.accent}40;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.accent}15, ${colors.accent}30);
  border: 2px solid ${colors.accent}30;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${colors.accent};
  font-weight: 600;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeaderInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled.h1`
  font-size: 17pt;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0 0 2px 0;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.15;
`;

const Label = styled.div`
  font-size: 10pt;
  color: ${colors.secondary};
  font-weight: 400;
`;

const Summary = styled.p`
  font-size: 8.5pt;
  line-height: 1.5;
  color: ${colors.text};
  margin: 0 0 8px 0;
`;

const ContactGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 7.5pt;
`;

const ContactBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px 8px;
  background: ${colors.cardBg};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  color: ${colors.secondary};

  a {
    color: ${colors.accent};
    text-decoration: none;
  }
`;

const LanguageBadge = styled(ContactBadge)`
  background: linear-gradient(135deg, ${colors.accent}08, ${colors.accent}03);
  border-color: ${colors.accent}25;
`;

// ===== Icons (Material Design Icons - matching Nuxt app) =====
const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  flex-shrink: 0;
`;

function Icon({ name }) {
  const icons = {
    email: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
    web: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.91-4.33-3.56zm2.95-8H5.08c.96-1.65 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.393-3.369-1.393-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
  };
  
  return <IconWrapper>{icons[name] || null}</IconWrapper>;
}

// ===== Main Grid - 2 Columns =====
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// ===== Section =====
const Section = styled.section`
  background: ${colors.cardBg};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 9.5pt;
  font-weight: 600;
  color: ${colors.primary};
  margin: 0 0 8px 0;
  padding-bottom: 5px;
  border-bottom: 1px solid ${colors.accent}40;
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;

// ===== Work Items with Logos =====
const WorkItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 2px;
`;

const CompanyLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: contain;
  flex-shrink: 0;
  background: white;
  border: 1px solid ${colors.border};
`;

const WorkItem = styled.div`
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
`;

const CompanyName = styled.h3`
  font-size: 9.5pt;
  font-weight: 600;
  color: ${colors.primary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Position = styled.div`
  font-size: 8.5pt;
  color: ${colors.secondary};
  font-weight: 500;
  margin: 2px 0;
`;

const DateRange = styled.div`
  font-size: 7.5pt;
  color: ${colors.textLight};
  font-weight: 400;
  white-space: nowrap;
  flex-shrink: 0;
`;

const WorkSummary = styled.p`
  font-size: 8pt;
  color: ${colors.text};
  line-height: 1.45;
  margin: 0 0 4px 0;
`;

const Highlights = styled.ul`
  margin: 4px 0 0 0;
  padding-left: 12px;
  list-style-type: disc;

  li {
    margin: 2px 0;
    color: ${colors.text};
    line-height: 1.35;
    font-size: 8pt;
  }
`;

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-top: 4px;
`;

const KeywordTag = styled.span`
  font-size: 7pt;
  color: ${colors.secondary};
  background: ${colors.bg};
  padding: 1px 5px;
  border-radius: 8px;
  border: 1px solid ${colors.border};
  font-weight: 500;
`;

// ===== Projects =====
const ProjectItem = styled.div`
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const ProjectName = styled.h3`
  font-size: 9pt;
  font-weight: 600;
  color: ${colors.primary};
  margin: 0 0 2px 0;

  a {
    color: ${colors.accent};
    text-decoration: none;
  }
`;

const ProjectDescription = styled.p`
  font-size: 7.5pt;
  color: ${colors.textLight};
  margin: 2px 0;
  line-height: 1.35;
`;

// ===== Education with Logos =====
const EducationItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 2px;
`;

const InstitutionLogo = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  object-fit: contain;
  flex-shrink: 0;
  background: white;
  border: 1px solid ${colors.border};
`;

const EducationItem = styled.div`
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const InstitutionInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
`;

const Institution = styled.h3`
  font-size: 9.5pt;
  font-weight: 600;
  color: ${colors.primary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Degree = styled.div`
  font-size: 8.5pt;
  color: ${colors.secondary};
  margin: 2px 0;
`;

const EducationMeta = styled.div`
  font-size: 7.5pt;
  color: ${colors.textLight};
  white-space: nowrap;
  flex-shrink: 0;
`;

// ===== Helper Functions =====
function formatDate(dateString) {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function formatDateRange(startDate, endDate) {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
}

// ===== Main Component =====
function getLogoUrl(url, apiKey) {
  if (!url || !apiKey) return null;
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    return `https://img.logo.dev/${domain}?token=${apiKey}`;
  } catch {
    return null;
  }
}

function getAvatarUrl(profile) {
  if (!profile?.url) return null;
  try {
    const url = new URL(profile.url);
    if (url.hostname.includes('github.com')) {
      const username = url.pathname.split('/').filter(Boolean)[0];
      return `https://api.github.com/users/${username}`;
    }
    if (url.hostname.includes('linkedin.com')) {
      return `https://unavatar.io/linkedin${url.pathname}`;
    }
    return `https://unavatar.io${url.pathname}`;
  } catch {
    return null;
  }
}

async function fetchGitHubAvatar(apiUrl) {
  if (!apiUrl) return null;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) return null;
    const data = await response.json();
    return data.avatar_url;
  } catch {
    return null;
  }
}

function AvatarComponent({ name, profile, logoDevKey }) {
  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'CV';
  
  // Get avatar URL from profile (prefer GitHub)
  const githubProfile = profile?.find(p => p.network?.toLowerCase() === 'github');
  const avatarApiUrl = getAvatarUrl(githubProfile);
  
  // For the PDF, we'll use unavatar directly or GitHub's public avatar URL
  let avatarUrl = null;
  if (githubProfile) {
    const username = githubProfile.url?.split('/').filter(Boolean).pop();
    if (username) {
      avatarUrl = `https://github.com/${username}.png`;
    }
  }
  
  return (
    <Avatar>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} />
      ) : (
        initials
      )}
    </Avatar>
  );
}

export default function Resume({ resume }) {
  const {
    basics = {},
    work = [],
    education = [],
    projects = [],
    languages = [],
    meta = {},
  } = resume;

  // Get logo.dev API key from meta or env (passed during PDF generation)
  const logoDevKey = meta.logoDevKey || process.env.LOGO_DEV_API_KEY;

  return (
    <Layout>
      {/* Header (like website) */}
      <Header>
        <HeaderTop>
          <AvatarComponent name={basics.name} profile={basics.profiles} logoDevKey={logoDevKey} />
          <HeaderInfo>
            <Name>{basics.name}</Name>
            {basics.label && <Label>{basics.label}</Label>}
          </HeaderInfo>
        </HeaderTop>

        {basics.summary && <Summary>{basics.summary}</Summary>}

        <ContactGrid>
          {basics.email && (
            <ContactBadge>
              <Icon name="email" />
              <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </ContactBadge>
          )}
          {basics.phone && (
            <ContactBadge>
              <Icon name="phone" />
              <span>{basics.phone}</span>
            </ContactBadge>
          )}
          {basics.url && (
            <ContactBadge>
              <Icon name="web" />
              <a href={basics.url} target="_blank" rel="noopener noreferrer">{basics.url}</a>
            </ContactBadge>
          )}
          {basics.location && (
            <ContactBadge>
              <Icon name="location" />
              <span>{[basics.location.city, basics.location.country].filter(Boolean).join(', ')}</span>
            </ContactBadge>
          )}
          {basics.profiles && basics.profiles.map((profile, index) => (
            <ContactBadge key={index}>
              <Icon name={profile.network?.toLowerCase()} />
              <a href={profile.url} target="_blank" rel="noopener noreferrer">{profile.username || profile.url}</a>
            </ContactBadge>
          ))}
          {languages.map((lang, index) => (
            <LanguageBadge key={index}>
              <span>{lang.language}</span>
              <span style={{ opacity: 0.7 }}>{lang.fluency}</span>
            </LanguageBadge>
          ))}
        </ContactGrid>
      </Header>

      {/* Main Content - 2 Columns like website */}
      <MainGrid>
        {/* Left Column: Work only */}
        <LeftColumn>
          {work.length > 0 && (
            <Section>
              <SectionTitle>Experience</SectionTitle>
              {work.map((job, index) => {
                const logoUrl = getLogoUrl(job.url, logoDevKey);
                return (
                  <WorkItem key={index}>
                    <WorkItemHeader>
                      {logoUrl && <CompanyLogo src={logoUrl} alt={`${job.name} logo`} />}
                      <CompanyInfo>
                        <CompanyName>{job.name}</CompanyName>
                        <DateRange>{formatDateRange(job.startDate, job.endDate)}</DateRange>
                      </CompanyInfo>
                    </WorkItemHeader>
                    <Position>{job.position}</Position>

                    {job.summary && <WorkSummary>{job.summary}</WorkSummary>}

                    {job.highlights && job.highlights.length > 0 && (
                      <Highlights>
                        {job.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </Highlights>
                    )}

                    {job.keywords && job.keywords.length > 0 && (
                      <Keywords>
                        {job.keywords.map((keyword, i) => (
                          <KeywordTag key={i}>{keyword}</KeywordTag>
                        ))}
                      </Keywords>
                    )}
                  </WorkItem>
                );
              })}
            </Section>
          )}
        </LeftColumn>

        {/* Right Column: Projects + Education */}
        <RightColumn>
          {projects.length > 0 && (
            <Section>
              <SectionTitle>Projects</SectionTitle>
              {projects.map((project, index) => (
                <ProjectItem key={index}>
                  <ProjectName>
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
                    ) : (
                      project.name
                    )}
                  </ProjectName>
                  {project.description && <ProjectDescription>{project.description}</ProjectDescription>}
                  {project.highlights && project.highlights.length > 0 && (
                    <Highlights>
                      {project.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </Highlights>
                  )}
                  {project.keywords && project.keywords.length > 0 && (
                    <Keywords>
                      {project.keywords.map((keyword, i) => (
                        <KeywordTag key={i}>{keyword}</KeywordTag>
                      ))}
                    </Keywords>
                  )}
                </ProjectItem>
              ))}
            </Section>
          )}

          {education.length > 0 && (
            <Section>
              <SectionTitle>Education</SectionTitle>
              {education.map((edu, index) => {
                const logoUrl = getLogoUrl(edu.url, logoDevKey);
                return (
                  <EducationItem key={index}>
                    <EducationItemHeader>
                      {logoUrl && <InstitutionLogo src={logoUrl} alt={`${edu.institution} logo`} />}
                      <InstitutionInfo>
                        <Institution>{edu.institution}</Institution>
                        <EducationMeta>{formatDateRange(edu.startDate, edu.endDate)}</EducationMeta>
                      </InstitutionInfo>
                    </EducationItemHeader>
                    <Degree>
                      {edu.studyType && edu.area
                        ? `${edu.studyType} in ${edu.area}`
                        : edu.studyType || edu.area}
                    </Degree>
                  </EducationItem>
                );
              })}
            </Section>
          )}
        </RightColumn>
      </MainGrid>
    </Layout>
  );
}

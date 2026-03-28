import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Minus, Warning } from '@phosphor-icons/react';
import Header from '../../components/Header/Header';
import sopData from '../../data/sop.json';
import styles from './SOPDetail.module.css';

function renderSection(section, idx) {
  if (section.type === 'steps') {
    return (
      <div key={idx} className={styles.stepsSection}>
        {section.heading && <h3 className={styles.subHeading}>{section.heading}</h3>}
        <div className={styles.stepsList}>
          {section.steps.map((step, i) => (
            <div key={i} className={styles.stepRow}>
              <span className={styles.stepNum}>{i + 1}</span>
              <p className={styles.stepText}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === 'table') {
    return (
      <div key={idx} className={styles.tableSection}>
        {section.heading && <h3 className={styles.subHeading}>{section.heading}</h3>}
        {section.note && <p className={styles.tableNote}>{section.note}</p>}
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            {section.headers.map((h, i) => (
              <span key={i} className={styles.tableHeaderCell}>{h}</span>
            ))}
          </div>
          {section.rows.map((row, i) => (
            <div key={i} className={styles.tableRow}>
              {row.map((cell, j) => (
                <span key={j} className={styles.tableCell}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === 'callout') {
    return (
      <div key={idx} className={styles.calloutSection}>
        {section.heading && <h3 className={styles.subHeading}>{section.heading}</h3>}
        <div className={styles.callout}>
          <Warning weight="light" size={16} color="var(--color-accent)" className={styles.calloutIcon} />
          <p className={styles.calloutText}>{section.text || section.items?.join('\n')}</p>
        </div>
      </div>
    );
  }

  return null;
}

export default function SOPDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const topic = sopData.find(t => t.id === id);
  if (!topic) {
    navigate('/sop');
    return null;
  }

  return (
    <div className={styles.screen}>
      <Header title={topic.title} showBack />

      <div className={styles.body}>
        {/* Summary card */}
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Summary</span>
          <div className={styles.inlineDivider} />
          <p className={styles.summaryText}>{topic.summary}</p>
        </div>

        <div className={styles.divider} />

        {/* Full SOP accordion */}
        <div className={styles.accordionHeader} onClick={() => setExpanded(e => !e)}>
          <span className={styles.accordionTitle}>Full SOP</span>
          {expanded
            ? <Minus weight="light" size={16} color="var(--color-text-primary)" />
            : <Plus weight="light" size={16} color="var(--color-text-primary)" />}
        </div>
        <div className={styles.divider} />

        {expanded && (
          <div className={styles.fullContent}>
            {topic.fullContent?.sections?.map((section, idx) => renderSection(section, idx))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';

const PatientProfile = ({ 
  patient, 
  triageRecords = [], 
  recordings = [], 
  onBack, 
  onNewTriage, 
  onNewRecording 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!patient) {
    return (
      <div style={styles.errorContainer}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3 style={styles.errorTitle}>Patient Not Found</h3>
        <p style={styles.errorText}>The patient you're looking for doesn't exist.</p>
        <button style={styles.primaryButton} onClick={onBack}>Back to Patients</button>
      </div>
    );
  }

  const handleNewTriage = () => {
    if (onNewTriage) {
      onNewTriage();
    }
  };

  const handleNewRecording = () => {
    if (onNewRecording) {
      onNewRecording();
    }
  };

  const totalEncounters = triageRecords.length + recordings.length;
  const abnormalResults = triageRecords.filter(t => 
    t.triage_color === 'Red' || t.triage_color === 'Orange'
  ).length;
  const totalRecordings = recordings.length;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.patientInfo}>
          <div style={styles.avatar}>
            {patient.name?.charAt(0) || 'P'}
          </div>
          <div style={styles.patientDetails}>
            <h1 style={styles.patientName}>{patient.name || 'Unnamed Patient'}</h1>
            <div style={styles.meta}>
              <span>ID: {patient.id}</span>
              <span style={styles.divider}>|</span>
              <span>{patient.age || '—'} years</span>
              <span style={styles.divider}>|</span>
              <span>{patient.gender || 'Not specified'}</span>
              <span style={styles.divider}>|</span>
              <span>{patient.contact || 'No contact'}</span>
            </div>
          </div>
        </div>
        <div style={styles.actions}>
          <button style={styles.secondaryButton} onClick={onBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
          </button>
          <button style={styles.primaryButton} onClick={handleNewTriage}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Triage
          </button>
          <button style={styles.primaryButton} onClick={handleNewRecording}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            New Recording
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button 
          style={activeTab === 'overview' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          style={activeTab === 'encounters' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('encounters')}
        >
          Encounters ({totalEncounters})
        </button>
        <button 
          style={activeTab === 'recordings' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('recordings')}
        >
          Recordings ({totalRecordings})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Grid */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{totalEncounters}</span>
              <span style={styles.statLabel}>Total Encounters</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{totalRecordings}</span>
              <span style={styles.statLabel}>RHD Screenings</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{abnormalResults}</span>
              <span style={styles.statLabel}>Abnormal Results</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{patient.age || '—'}</span>
              <span style={styles.statLabel}>Age</span>
            </div>
          </div>

          {/* Patient Information */}
          <div style={styles.infoCard}>
            <h3 style={styles.cardTitle}>Patient Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Full Name</span>
                <span style={styles.value}>{patient.name || '—'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Age</span>
                <span style={styles.value}>{patient.age || '—'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Gender</span>
                <span style={styles.value}>{patient.gender || '—'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Contact</span>
                <span style={styles.value}>{patient.contact || '—'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Address</span>
                <span style={styles.value}>{patient.address || '—'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Date of Birth</span>
                <span style={styles.value}>{patient.dob || '—'}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={styles.recentActivity}>
            <h3 style={styles.cardTitle}>Recent Activity</h3>
            {totalEncounters === 0 ? (
              <div style={styles.activityItem}>
                <div style={styles.activityIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div style={styles.activityContent}>
                  <span style={styles.activityTitle}>No recent activity</span>
                  <span style={styles.activityDate}>—</span>
                </div>
              </div>
            ) : (
              triageRecords.slice(0, 5).map((triage, index) => (
                <div key={index} style={styles.activityItem}>
                  <div style={styles.activityIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div style={styles.activityContent}>
                    <span style={styles.activityTitle}>Triage Assessment</span>
                    <span style={styles.activityDate}>
                      {triage.created_at ? new Date(triage.created_at).toLocaleDateString() : 'Recent'}
                      {triage.triage_color && (
                        <span style={{
                          ...styles.badge,
                          ...styles[`badge${triage.triage_color}`]
                        }}>
                          {triage.triage_color}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'encounters' && (
        <div style={styles.tableContainer}>
          <div style={styles.tabHeader}>
            <h2 style={styles.tabHeaderTitle}>Encounters</h2>
            <div style={styles.tabActions}>
              <button style={styles.primaryButton} onClick={handleNewTriage}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                New Triage
              </button>
            </div>
          </div>
          {triageRecords.length === 0 ? (
            <div style={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p>No encounters recorded yet</p>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Type</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {triageRecords.map((triage, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{triage.created_at ? new Date(triage.created_at).toLocaleDateString() : '—'}</td>
                    <td style={styles.tableCell}>Triage Assessment</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.badge,
                        ...styles[`badge${triage.triage_color}`]
                      }}>
                        {triage.triage_color || 'Pending'}
                      </span>
                    </td>
                    <td style={styles.tableCell}>{triage.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'recordings' && (
        <div>
          <div style={styles.tabHeader}>
            <h2 style={styles.tabHeaderTitle}>Heart Sound Recordings</h2>
            <div style={styles.tabActions}>
              <button style={styles.primaryButton} onClick={handleNewRecording}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                New Recording
              </button>
            </div>
          </div>
          {recordings.length === 0 ? (
            <div style={styles.recordingsGrid}>
              <div style={{...styles.recordingCard, textAlign: 'center', padding: '40px', color: '#94a3b8'}}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                <p style={{ marginTop: 16 }}>No recordings available</p>
              </div>
            </div>
          ) : (
            <div style={styles.recordingsGrid}>
              {recordings.map((recording, index) => (
                <div key={index} style={styles.recordingCard}>
                  <div style={styles.recordingHeader}>
                    <h4 style={styles.recordingTitle}>Recording #{index + 1}</h4>
                    <span style={{
                      ...styles.badge,
                      ...styles[`badge${recording.status}`]
                    }}>
                      {recording.status || 'Pending'}
                    </span>
                  </div>
                  <div style={styles.recordingDetails}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Date</span>
                      <span style={styles.detailValue}>
                        {recording.created_at ? new Date(recording.created_at).toLocaleDateString() : '—'}
                      </span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Duration</span>
                      <span style={styles.detailValue}>{recording.duration || '—'}</span>
                    </div>
                  </div>
                  {recording.file_url && (
                    <audio controls style={{ width: '100%', margin: '16px 0', borderRadius: '8px' }}>
                      <source src={recording.file_url} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  <div style={styles.recordingActions}>
                    <button style={styles.secondaryButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      Play
                    </button>
                    <button style={styles.secondaryButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Styles object
const styles = {
  container: {
    padding: '24px',
    background: '#f8fafc',
    minHeight: '100vh',
    marginLeft: '120px'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: '16px',
    textAlign: 'center'
  },
  errorTitle: {
    color: '#dc2626',
    margin: '16px 0 8px 0',
    fontSize: '1.25rem'
  },
  errorText: {
    color: '#64748b',
    margin: '0 0 20px 0'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    gap: '20px',
    flexWrap: 'wrap',
    background: 'white',
    padding: '24px 32px',
    borderRadius: '12px',
    border: '1px solid #e8edf2'
  },
  patientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  avatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: '#00464F',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    flexShrink: 0
  },
  patientDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  patientName: {
    margin: '0 0 6px 0',
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a1a2e',
    fontFamily: 'Playfair Display, serif'
  },
  meta: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    color: '#64748b',
    fontSize: '0.9rem'
  },
  divider: {
    color: '#e8edf2'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    fontWeight: '600',
    fontSize: '0.95rem',
    background: '#00464F',
    color: 'white'
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '1px solid #e8edf2',
    transition: 'all 0.2s ease',
    fontWeight: '600',
    fontSize: '0.95rem',
    background: 'white',
    color: '#1a1a2e'
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '32px',
    background: 'white',
    padding: '6px',
    borderRadius: '12px',
    border: '1px solid #e8edf2'
  },
  tab: {
    background: 'transparent',
    border: 'none',
    padding: '12px 24px',
    cursor: 'pointer',
    color: '#64748b',
    fontWeight: '500',
    fontSize: '0.95rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease'
  },
  activeTab: {
    background: 'transparent',
    border: 'none',
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.95rem',
    borderRadius: '8px',
    background: '#00464F',
    color: 'white'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
    margin: '32px 0'
  },
  statCard: {
    textAlign: 'center',
    padding: '24px',
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e8edf2',
    transition: 'all 0.2s ease'
  },
  statValue: {
    display: 'block',
    fontSize: '2rem',
    fontWeight: '700',
    color: '#00464F',
    lineHeight: '1.2'
  },
  statLabel: {
    color: '#64748b',
    fontSize: '0.9rem',
    marginTop: '4px'
  },
  infoCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #e8edf2',
    marginBottom: '24px'
  },
  cardTitle: {
    margin: '0 0 20px 0',
    color: '#1a1a2e',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    color: '#94a3b8',
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  value: {
    color: '#1a1a2e',
    fontSize: '1rem',
    fontWeight: '500'
  },
  recentActivity: {
    background: 'white',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e8edf2'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid #f1f5f9'
  },
  activityIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(0, 70, 79, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00464F',
    flexShrink: 0
  },
  activityContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  activityTitle: {
    fontWeight: '600',
    color: '#1a1a2e'
  },
  activityDate: {
    color: '#94a3b8',
    fontSize: '0.85rem'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 14px',
    borderRadius: '50px',
    fontSize: '0.8rem',
    fontWeight: '600',
    marginLeft: '12px'
  },
  badgeRed: {
    background: '#fef2f2',
    color: '#dc2626'
  },
  badgeOrange: {
    background: '#fffbeb',
    color: '#d97706'
  },
  badgeYellow: {
    background: '#fefce8',
    color: '#854d0e'
  },
  badgeGreen: {
    background: '#f0fdf4',
    color: '#16a34a'
  },
  badgeBlue: {
    background: '#eff6ff',
    color: '#2563eb'
  },
  badgeGray: {
    background: '#f1f5f9',
    color: '#64748b'
  },
  tableContainer: {
    overflowX: 'auto',
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e8edf2'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    padding: '14px 20px',
    textAlign: 'left',
    borderBottom: '1px solid #f1f5f9',
    background: '#f8fafc',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  tableCell: {
    padding: '14px 20px',
    borderBottom: '1px solid #f1f5f9'
  },
  tabHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  tabHeaderTitle: {
    margin: 0,
    color: '#1a1a2e',
    fontSize: '1.5rem',
    fontWeight: '700',
    fontFamily: 'Playfair Display, serif'
  },
  tabActions: {
    display: 'flex',
    gap: '12px'
  },
  recordingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '24px'
  },
  recordingCard: {
    padding: '24px',
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e8edf2',
    transition: 'all 0.2s ease'
  },
  recordingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    gap: '12px'
  },
  recordingTitle: {
    margin: 0,
    color: '#1a1a2e',
    fontWeight: '600'
  },
  recordingDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    margin: '16px 0'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    fontSize: '0.9rem'
  },
  detailLabel: {
    color: '#94a3b8'
  },
  detailValue: {
    color: '#1a1a2e',
    fontWeight: '500'
  },
  recordingActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#94a3b8'
  }
};

export default PatientProfile;

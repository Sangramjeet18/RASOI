// Shared dashboard CSS styles for Rasoimaker and Runner dashboards
export const dashboardCSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');
:root{--db-bg:#F8F5F0;--db-primary:#8B5E3C;--db-secondary:#E8DCCB;--db-text:#2D2A26;--db-muted:#6D6A66;--db-border:#E8E4DF;--db-white:#FFF;--db-r:12px;--db-green:#2D5A27;--db-red:#e53e3e;}
.db-app{display:flex;min-height:100vh;background:var(--db-bg);color:var(--db-text);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;}
.db-sidebar{width:240px;background:var(--db-white);border-right:1px solid var(--db-border);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;}
.db-sidebar-logo{padding:28px 24px;font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:var(--db-primary);}
.db-nav{flex:1;padding:0 12px;}
.db-nav-item{display:flex;align-items:center;gap:12px;padding:11px 16px;margin-bottom:3px;border-radius:var(--db-r);cursor:pointer;color:var(--db-muted);font-size:0.88rem;font-weight:500;transition:.2s;border:none;background:none;width:100%;text-align:left;position:relative;}
.db-nav-item:hover{background:var(--db-bg);color:var(--db-text);}
.db-nav-item.active{background:var(--db-secondary);color:var(--db-primary);font-weight:600;}
.db-nav-item .material-icons-round{font-size:20px;}
.db-badge{background:var(--db-red);color:#fff;font-size:.7rem;font-weight:700;padding:2px 7px;border-radius:10px;margin-left:auto;}
.db-main{flex:1;margin-left:240px;display:flex;flex-direction:column;}
.db-navbar{height:68px;background:var(--db-white);border-bottom:1px solid var(--db-border);display:flex;align-items:center;justify-content:flex-end;padding:0 36px;gap:20px;position:sticky;top:0;z-index:90;}
.db-avatar{width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid var(--db-secondary);}
.db-content{padding:40px 60px;max-width:1200px;}
.db-header{margin-bottom:36px;}
.db-header h1{font-family:'Playfair Display',serif;font-size:1.8rem;margin-bottom:6px;}
.db-header p{color:var(--db-muted);font-size:.92rem;}
.db-card{background:var(--db-white);border-radius:var(--db-r);border:1px solid var(--db-border);padding:28px;margin-bottom:20px;box-shadow:0 2px 4px rgba(0,0,0,.02);}
.db-card-title{font-size:1.05rem;font-weight:600;margin-bottom:20px;display:flex;align-items:center;gap:8px;}
.db-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;}
.db-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.db-stat{text-align:center;padding:20px;}
.db-stat .val{font-size:1.8rem;font-weight:700;margin-bottom:4px;}
.db-stat .lab{font-size:.8rem;color:var(--db-muted);font-weight:500;}
.db-input,.db-select,.db-textarea{width:100%;padding:11px 14px;border-radius:8px;border:1px solid var(--db-border);background:var(--db-bg);font-family:inherit;font-size:.92rem;outline:none;transition:border-color .2s;box-sizing:border-box;}
.db-input:focus,.db-textarea:focus{border-color:var(--db-primary);}
.db-textarea{resize:vertical;min-height:90px;}
.db-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.db-field{margin-bottom:16px;}
.db-field label{display:block;font-size:.83rem;font-weight:600;margin-bottom:6px;}
.db-btn{padding:11px 28px;border-radius:8px;border:none;font-weight:600;cursor:pointer;font-size:.92rem;transition:.2s;}
.db-btn-primary{background:var(--db-primary);color:#fff;box-shadow:0 4px 12px rgba(139,94,60,.15);}
.db-btn-primary:hover{opacity:.95;transform:translateY(-1px);}
.db-btn-outline{background:var(--db-white);color:var(--db-primary);border:1px solid var(--db-primary);}
.db-btn-danger{background:var(--db-red);color:#fff;}
.db-btn-success{background:var(--db-green);color:#fff;}
.db-toggle-group{display:flex;gap:8px;flex-wrap:wrap;}
.db-toggle{padding:7px 16px;border-radius:20px;border:1px solid var(--db-border);background:var(--db-white);font-size:.83rem;font-weight:500;cursor:pointer;transition:.2s;}
.db-toggle.active{background:var(--db-primary);color:#fff;border-color:var(--db-primary);}
.db-table{width:100%;text-align:left;border-collapse:collapse;}
.db-table th{padding:12px 0;border-bottom:2px solid var(--db-border);font-size:.83rem;color:var(--db-muted);font-weight:600;}
.db-table td{padding:14px 0;border-bottom:1px solid var(--db-border);font-size:.9rem;}
.db-status{padding:4px 10px;border-radius:20px;font-size:.75rem;font-weight:600;text-transform:uppercase;}
.db-status.pending{background:#FEF3C7;color:#D97706;}
.db-status.cooking{background:#DBEAFE;color:#2563EB;}
.db-status.ready{background:#D1FAE5;color:#059669;}
.db-status.picked{background:#E0E7FF;color:#4F46E5;}
.db-status.delivered{background:#D1FAE5;color:#059669;}
.db-status.completed{background:#D1FAE5;color:#059669;}
.db-chart-bar{display:flex;align-items:flex-end;gap:8px;height:160px;padding:12px 0;}
.db-chart-bar>div{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;}
.db-chart-bar .bar{width:100%;background:linear-gradient(to top,var(--db-primary),#C8956C);border-radius:6px 6px 0 0;min-height:8px;transition:height .5s ease;}
.db-chart-bar .bar-label{text-align:center;font-size:.68rem;color:var(--db-muted);margin-top:6px;font-weight:500;}
.db-otp-group{display:flex;gap:10px;justify-content:center;margin:20px 0;}
.db-otp-input{width:52px;height:56px;text-align:center;font-size:1.5rem;font-weight:700;border:2px solid var(--db-border);border-radius:10px;background:var(--db-bg);outline:none;transition:.2s;}
.db-otp-input:focus{border-color:var(--db-primary);}
.db-step{display:flex;gap:16px;margin-bottom:20px;position:relative;}
.db-step::after{content:'';position:absolute;left:15px;top:34px;bottom:-20px;width:1px;border-left:2px dashed var(--db-border);}
.db-step:last-child::after{display:none;}
.db-step-dot{width:32px;height:32px;border-radius:50%;background:var(--db-bg);display:flex;align-items:center;justify-content:center;font-size:1rem;z-index:1;border:1px solid var(--db-border);flex-shrink:0;}
.db-step.active .db-step-dot{background:var(--db-primary);color:#fff;border-color:var(--db-primary);}
.db-step.done .db-step-dot{background:var(--db-green);color:#fff;border-color:var(--db-green);}
.db-photo-box{width:100%;aspect-ratio:1;background:var(--db-bg);border-radius:var(--db-r);border:1px dashed var(--db-border);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;cursor:pointer;}
.db-photo-box img{width:100%;height:100%;object-fit:cover;}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(45,90,39,.4);}70%{box-shadow:0 0 0 15px rgba(45,90,39,0);}100%{box-shadow:0 0 0 0 rgba(45,90,39,0);}}
.db-pulse{animation:pulse 2s infinite;}
@media(max-width:768px){.db-sidebar{width:0;display:none;}.db-main{margin-left:0;}.db-content{padding:24px 16px;}.db-form-grid,.db-grid-3,.db-grid-2{grid-template-columns:1fr;}}
`;

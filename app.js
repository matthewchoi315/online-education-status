// Online Education Status - Main Application Logic (English Version & Secret Admin Entry)

// 12 Growth Stage Names in English
const STAGE_NAMES = [
  "Stage 1: Seed",
  "Stage 2: Sprout",
  "Stage 3: Stem",
  "Stage 4: Small Tree",
  "Stage 5: Reading Bible",
  "Stage 6: Praying Tree",
  "Stage 7: Going Out (Bible & Bag)",
  "Stage 8: Growing Sprouts",
  "Stage 9: Teaching Bible",
  "Stage 10: Unified Forest",
  "Stage 11: Heavenly Clouds",
  "Stage 12: Glory of Completion"
];

// Months names for English display
const MONTHS_ENGLISH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Default Sample Data in English
const DEFAULT_ZONES_DATA = [
  {
    id: 1,
    name: "Eden Zone",
    topicsCount: 8,
    members: [
      { name: "Sun-woo Kim", course: "New Testament Reading", completions: [true, true, true, false, false, false, false, false] }, 
      { name: "Min-ji Lee", course: "Romans Exposition", completions: [true, true, true, true, false, false, false, false] }, 
      { name: "Jun-seo Park", course: "Intro Discipleship Training", completions: [true, true, true, false, false, false, false, false] }, 
      { name: "Da-eun Jung", course: "New Testament Reading", completions: [true, true, true, false, false, false, false, false] }, 
      { name: "Yu-jin Choi", course: "Romans Exposition", completions: [true, true, false, false, false, false, false, false] }, 
      { name: "Hyun-woo Kang", course: "Intro Discipleship Training", completions: [true, true, true, false, false, false, false, false] }  
      // Total: 18 / 48 = 37.5% (Stage 4: Reading Bible)
    ]
  },
  {
    id: 2,
    name: "Onnuri Zone",
    topicsCount: 8,
    members: [
      { name: "Do-hyun Yoon", course: "Genesis Study", completions: [true, true, false, false, false, false, false, false] }, 
      { name: "Ji-min Han", course: "Basics of Prayer", completions: [true, true, false, false, false, false, false, false] }, 
      { name: "Min-ho Song", course: "Genesis Study", completions: [true, false, false, false, false, false, false, false] }, 
      { name: "Su-a Lim", course: "Basics of Prayer", completions: [true, true, false, false, false, false, false, false] }, 
      { name: "Won-woo Cho", course: "Introduction to Missions", completions: [true, true, false, false, false, false, false, false] }  
      // Total: 9 / 40 = 22.5% (Stage 2: Stem)
    ]
  },
  {
    id: 3,
    name: "Hallelujah Zone",
    topicsCount: 8,
    members: [
      { name: "Seung-woo Jung", course: "Gospel of John Study", completions: [true, true, true, true, false, false, false, false] }, 
      { name: "Ha-eun Oh", course: "Christian History", completions: [true, true, true, true, false, false, false, false] }, 
      { name: "Jae-hyun Bae", course: "Gospel of John Study", completions: [true, true, true, true, false, false, false, false] }, 
      { name: "Yu-na Seo", course: "Christian History", completions: [true, true, true, true, false, false, false, false] }, 
      { name: "Geon-woo Shin", course: "Prayer & Meditation", completions: [true, true, true, false, false, false, false, false] }, 
      { name: "Ri-na Yu", course: "Prayer & Meditation", completions: [true, true, true, false, false, false, false, false] }  
      // Total: 22 / 48 = 45.8% (Stage 5: Praying)
    ]
  },
  {
    id: 4,
    name: "Shalom Zone",
    topicsCount: 8,
    members: [
      { name: "Jun-young Baek", course: "Acts Reading", completions: [true, true, true, false, false, false, false, false] }, 
      { name: "Ha-ra Goo", course: "Faith and Life", completions: [true, true, false, false, false, false, false, false] }, 
      { name: "Min Namgoong", course: "Acts Reading", completions: [true, true, true, false, false, false, false, false] }, 
      { name: "Yu-ri Sung", course: "Faith and Life", completions: [true, true, false, false, false, false, false, false] }, 
      { name: "Sung-hoon Ji", course: "Acts Reading", completions: [true, true, false, false, false, false, false, false] }  
      // Total: 12 / 40 = 30.0% (Stage 3: Small Tree)
    ]
  },
  {
    id: 5,
    name: "Immanuel Zone",
    topicsCount: 8,
    members: [
      { name: "Jae-hyun Ahn", course: "Old Testament Overview", completions: [true, false, false, false, false, false, false, false] }, 
      { name: "Ji-yoon Hong", course: "Praise & Worship", completions: [true, false, false, false, false, false, false, false] }, 
      { name: "Seong-jae Moon", course: "Old Testament Overview", completions: [true, false, false, false, false, false, false, false] }, 
      { name: "So-min Jung", course: "Praise & Worship", completions: [true, false, false, false, false, false, false, false] }  
      // Total: 4 / 32 = 12.5% (Stage 1: Sprout)
    ]
  },
  {
    id: 6,
    name: "Somang Zone",
    topicsCount: 8,
    members: [
      { name: "Eun-a Ko", course: "Basics of Christianity", completions: [false, false, false, false, false, false, false, false] },
      { name: "Se-yoon Yoo", course: "New Believers Course", completions: [false, false, false, false, false, false, false, false] },
      { name: "Bo-ra Hwang", course: "Basics of Christianity", completions: [false, false, false, false, false, false, false, false] }
      // Total: 0 / 24 = 0% (Stage 0: Seed)
    ]
  }
];

// App State
let state = {
  currentMonth: "2026-06",
  zones: [],
  history: [],
  adminMode: false,
  resetOnMonth: true
};

// ----------------------------------------------------
// Character Image Display
// ----------------------------------------------------
function getCharacterSVG(stageIndex) {
  let animClass = "animate-tree";
  if (stageIndex === 0) animClass = "animate-seed";
  else if (stageIndex === 1 || stageIndex === 2) animClass = "animate-sprout";
  else if (stageIndex >= 10) animClass = "animate-cloud";
  
  // Custom stage images are stored as stage1.png to stage12.png (stageIndex ranges from 0 to 11)
  const imgNum = stageIndex + 1;
  return `<img src="images/stage${imgNum}.png" class="character-img ${animClass}" alt="${STAGE_NAMES[stageIndex]}" style="max-height: 155px; object-fit: contain;">`;
}

// ----------------------------------------------------
// State Management & LocalStorage
// ----------------------------------------------------

function loadState() {
  const savedState = localStorage.getItem("online_education_status_state");
  if (savedState) {
    try {
      state = JSON.parse(savedState);
      
      // Make sure all zones have correct stages based on initial progress (only raise, never drop)
      let stateChanged = false;
      state.zones.forEach(zone => {
        const progress = calculateZoneProgress(zone);
        const expectedStage = Math.min(11, Math.floor(progress / 8.3));
        if (zone.stage === undefined) {
          zone.stage = expectedStage;
          stateChanged = true;
        } else if (!zone.manualStageOverride && expectedStage > zone.stage) {
          zone.stage = expectedStage;
          stateChanged = true;
        }
      });
      if (stateChanged) saveState();
      
    } catch (e) {
      console.error("Failed to parse saved state, reloading default", e);
      initializeDefaultState();
    }
  } else {
    initializeDefaultState();
  }
}

function initializeDefaultState() {
  state.currentMonth = "2026-06";
  state.zones = JSON.parse(JSON.stringify(DEFAULT_ZONES_DATA));
  
  // Dynamic initialization of stages based on the initial progress
  state.zones.forEach(zone => {
    const progress = calculateZoneProgress(zone);
    zone.stage = Math.min(11, Math.floor(progress / 8.3));
    zone.manualStageOverride = false;
  });
  
  state.history = [];
  state.adminMode = false;
  state.resetOnMonth = true;
  saveState();
}

function saveState() {
  localStorage.setItem("online_education_status_state", JSON.stringify(state));
}

// Calculate progress percentage of a zone
function calculateZoneProgress(zone) {
  if (!zone.members || zone.members.length === 0) return 0;
  
  let totalButtons = zone.members.length * zone.topicsCount;
  let checkedButtons = 0;
  
  zone.members.forEach(member => {
    if (!member.completions) {
      member.completions = [];
    }
    while (member.completions.length < zone.topicsCount) {
      member.completions.push(false);
    }
    if (member.completions.length > zone.topicsCount) {
      member.completions = member.completions.slice(0, zone.topicsCount);
    }
    
    checkedButtons += member.completions.filter(Boolean).length;
  });
  
  return totalButtons === 0 ? 0 : Math.round((checkedButtons / totalButtons) * 100);
}

// ----------------------------------------------------
// Views & Navigation (SPA Routing)
// ----------------------------------------------------
let activeZoneId = null;

function navigateTo(viewId) {
  document.querySelectorAll(".view-section").forEach(view => {
    view.classList.remove("active");
  });
  document.getElementById(viewId).classList.add("active");
  
  // Maintain dynamic header / elements
  if (viewId === "dashboard-view") {
    renderDashboard();
  } else if (viewId === "settings-view") {
    renderSettings();
  }
}

// Helper to format Date string
function formatMonthString(yyyy_mm) {
  const [yearStr, monthStr] = yyyy_mm.split("-");
  const monthIdx = parseInt(monthStr) - 1;
  return `${MONTHS_ENGLISH[monthIdx]} ${yearStr}`;
}

// ----------------------------------------------------
// Render Dashboard View
// ----------------------------------------------------
function renderDashboard() {
  const gridContainer = document.getElementById("zones-grid");
  gridContainer.innerHTML = "";
  
  state.zones.forEach(zone => {
    const progress = calculateZoneProgress(zone);
    
    // Stage is persistent and only updates when climbing (does not drop automatically during render)
    
    // Next upgrade threshold is (current_stage + 1) * 8.3%
    const nextStageThreshold = Math.min(100, Math.round((zone.stage + 1) * 8.3 * 10) / 10);
    
    const card = document.createElement("div");
    card.className = "zone-card";
    
    // Stage progress / status text in English
    let growthBadgeHTML = "";
    if (zone.stage >= 11) {
      growthBadgeHTML = `<span class="growth-badge growth-waiting" style="background:#e3f2fd; color:#0d47a1; border:1px solid #bbdefb;">🌳 Completed Stage 12</span>`;
    } else {
      growthBadgeHTML = `<span class="growth-badge growth-waiting">Next: ${nextStageThreshold}%</span>`;
    }
    
    card.innerHTML = `
      ${growthBadgeHTML}
      <div class="character-box" style="padding: 10px;">
        ${getCharacterSVG(zone.stage)}
      </div>
      <div class="card-info">
        <div class="zone-name-row">
          <span class="zone-title">${zone.name}</span>
          <span class="zone-percentage">${progress}%</span>
        </div>
        <span class="stage-badge" style="color: white; background: var(--primary);">${STAGE_NAMES[zone.stage]}</span>
        
        <div class="progress-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
      </div>
      
      <div class="card-footer">
        <span class="member-count-badge">👥 Members: ${zone.members.length}</span>
        <button class="btn btn-outline btn-sm btn-manage-zone" data-id="${zone.id}">Manage Details ➔</button>
      </div>
    `;
    
    card.querySelector(".btn-manage-zone").addEventListener("click", () => {
      openZoneDetails(zone.id);
    });
    
    gridContainer.appendChild(card);
  });
}

// ----------------------------------------------------
// Render Zone Details View
// ----------------------------------------------------
function openZoneDetails(zoneId) {
  activeZoneId = zoneId;
  navigateTo("detail-view");
  renderZoneDetails();
}

function renderZoneDetails() {
  const zone = state.zones.find(z => z.id === activeZoneId);
  if (!zone) return;
  
  const progress = calculateZoneProgress(zone);
  
  // Stage is persistent and reads directly from state (does not drop on render)
  
  document.getElementById("detail-character-svg").innerHTML = getCharacterSVG(zone.stage);
  
  const zoneNameInput = document.getElementById("detail-zone-name");
  zoneNameInput.value = zone.name;
  
  document.getElementById("detail-stage-name").textContent = STAGE_NAMES[zone.stage];
  document.getElementById("detail-progress-percent").textContent = `${progress}%`;
  document.getElementById("detail-member-count").textContent = `${zone.members.length}`;
  
  let totalButtons = zone.members.length * zone.topicsCount;
  let checkedButtons = 0;
  zone.members.forEach(m => {
    checkedButtons += m.completions.filter(Boolean).length;
  });
  document.getElementById("detail-completed-ratio").textContent = `${checkedButtons}/${totalButtons}`;
  
  const adminPanel = document.getElementById("admin-override-panel");
  if (state.adminMode) {
    adminPanel.style.display = "block";
    document.getElementById("manual-stage-selector").value = zone.stage;
  } else {
    adminPanel.style.display = "none";
  }
  
  const headerRow = document.getElementById("table-header-row");
  headerRow.innerHTML = `
    <th class="member-name-cell">Member Name</th>
    <th class="course-cell">Active Course</th>
    <th>Completion Check (Tap when completed - 8.3% step growth)</th>
    <th style="width: 60px; text-align: center;">Action</th>
  `;
  
  const tableBody = document.getElementById("member-table-body");
  tableBody.innerHTML = "";
  
  zone.members.forEach((member, memberIndex) => {
    const row = document.createElement("tr");
    
    let circlesHTML = `<div class="circles-scroll-container">`;
    for (let c = 0; c < zone.topicsCount; c++) {
      const isChecked = member.completions[c] || false;
      circlesHTML += `
        <button class="check-btn ${isChecked ? 'checked' : ''}" data-member="${memberIndex}" data-topic="${c}">
          <span>${c + 1}</span>
        </button>
      `;
    }
    circlesHTML += `</div>`;
    
    row.innerHTML = `
      <td>
        <input type="text" class="table-input member-name-input" data-index="${memberIndex}" value="${member.name}" placeholder="Name">
      </td>
      <td>
        <input type="text" class="table-input member-course-input" data-index="${memberIndex}" value="${member.course || ''}" placeholder="Course name">
      </td>
      <td>
        ${circlesHTML}
      </td>
      <td style="text-align: center;">
        <button class="btn-delete-row" data-index="${memberIndex}" title="Delete Member">✕</button>
      </td>
    `;
    
    row.querySelector(".member-name-input").addEventListener("change", (e) => {
      zone.members[memberIndex].name = e.target.value;
      saveState();
      updateDetailStatsOnly();
    });
    
    row.querySelector(".member-course-input").addEventListener("change", (e) => {
      zone.members[memberIndex].course = e.target.value;
      saveState();
    });
    
    row.querySelector(".btn-delete-row").addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete ${member.name || 'this member'}?`)) {
        zone.members.splice(memberIndex, 1);
        saveState();
        renderZoneDetails();
      }
    });
    
    row.querySelectorAll(".check-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const mIdx = parseInt(btn.dataset.member);
        const tIdx = parseInt(btn.dataset.topic);
        
        const oldStage = zone.stage;
        
        // Toggle completions checkmark
        const currentState = zone.members[mIdx].completions[tIdx] || false;
        zone.members[mIdx].completions[tIdx] = !currentState;
        
        // Save and recalculate progress
        saveState();
        btn.classList.toggle("checked", !currentState);
        
        const newProgress = calculateZoneProgress(zone);
        
        // Upgrades automatically based on progress (Math.min(11, Math.floor(newProgress / 8.3)))
        if (!zone.manualStageOverride) {
          const calculatedStage = Math.min(11, Math.floor(newProgress / 8.3));
          
          // Once advanced, it never drops!
          if (calculatedStage > oldStage) {
            zone.stage = calculatedStage;
            saveState();
            
            renderZoneDetails();
            
            // Trigger instant real-time celebration if upgraded!
            const congratsItem = [{
              zoneName: zone.name,
              prevStageName: STAGE_NAMES[oldStage],
              newStageName: STAGE_NAMES[calculatedStage],
              stageIndex: calculatedStage
            }];
            showCelebrationModal(congratsItem);
          } else {
            // Keep the previous level, just update completion metrics
            updateDetailStatsOnly();
          }
        } else {
          updateDetailStatsOnly();
        }
      });
    });
    
    tableBody.appendChild(row);
  });
}

function updateDetailStatsOnly() {
  const zone = state.zones.find(z => z.id === activeZoneId);
  if (!zone) return;
  const progress = calculateZoneProgress(zone);
  
  document.getElementById("detail-progress-percent").textContent = `${progress}%`;
  document.getElementById("detail-member-count").textContent = `${zone.members.length}`;
  
  let totalButtons = zone.members.length * zone.topicsCount;
  let checkedButtons = 0;
  zone.members.forEach(m => {
    checkedButtons += m.completions.filter(Boolean).length;
  });
  document.getElementById("detail-completed-ratio").textContent = `${checkedButtons}/${totalButtons}`;
}

// ----------------------------------------------------
// Render Settings View
// ----------------------------------------------------
function renderSettings() {
  document.getElementById("toggle-admin-mode").checked = state.adminMode;
  document.getElementById("toggle-reset-on-month").checked = state.resetOnMonth;
  
  // Set current month in Settings Panel
  document.getElementById("display-current-month").textContent = formatMonthString(state.currentMonth);
  
  // Calculate ready zones count
  let readyCount = 0;
  state.zones.forEach(zone => {
    const progress = calculateZoneProgress(zone);
    const nextStageThreshold = Math.min(100, Math.round((zone.stage + 1) * 8.3 * 10) / 10);
    if (progress >= nextStageThreshold && zone.stage < 11) {
      readyCount++;
    }
  });
  document.getElementById("display-ready-count").textContent = `${readyCount} of 6 zones ready to level up`;
  
  const logContainer = document.getElementById("history-log-container");
  if (state.history && state.history.length > 0) {
    logContainer.innerHTML = "";
    const reversedHistory = [...state.history].reverse();
    reversedHistory.forEach(item => {
      const logRow = document.createElement("div");
      logRow.className = "history-item";
      
      let zoneUpdates = [];
      for (const [zId, val] of Object.entries(item.zoneStages)) {
        const zoneObj = state.zones.find(z => z.id === parseInt(zId));
        const prevStage = val.prev;
        const newStage = val.new;
        if (newStage > prevStage) {
          zoneUpdates.push(`${zoneObj ? zoneObj.name.split(" ")[0] : zId + ' Zone'} (Lv. ${prevStage + 1} ➔ ${newStage + 1})`);
        }
      }
      
      const updateText = zoneUpdates.length > 0 ? zoneUpdates.join(", ") : "No zones grew";
      logRow.innerHTML = `
        <span style="font-weight: 700; color: var(--primary-dark);">${formatMonthString(item.month)} Settle</span>
        <span style="color: var(--text-secondary); text-align: right;">${updateText}</span>
      `;
      logContainer.appendChild(logRow);
    });
  } else {
    logContainer.innerHTML = `<div style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 12px;">No historical logs recorded.</div>`;
  }
}

// ----------------------------------------------------
// Monthly Advance Growth Simulation Engine
// ----------------------------------------------------
function advanceMonth() {
  const currentSimMonth = state.currentMonth;
  let grownZones = [];
  const monthlyUpdateLog = {};
  
  state.zones.forEach(zone => {
    const progress = calculateZoneProgress(zone);
    const prevStage = zone.stage;
    
    if (!zone.manualStageOverride) {
      const calculatedStage = Math.min(11, Math.floor(progress / 8.3));
      if (calculatedStage > zone.stage) {
        zone.stage = calculatedStage;
      }
    }
    
    const newStage = zone.stage;
    monthlyUpdateLog[zone.id] = { prev: prevStage, new: newStage };
    
    // Reset checkmarks for new month
    if (state.resetOnMonth) {
      zone.members.forEach(member => {
        member.completions = member.completions.map(() => false);
      });
    }
  });
  
  state.history.push({
    month: currentSimMonth,
    zoneStages: monthlyUpdateLog
  });
  
  const [yearStr, monthStr] = currentSimMonth.split("-");
  let year = parseInt(yearStr);
  let month = parseInt(monthStr);
  month += 1;
  if (month > 12) {
    month = 1;
    year += 1;
  }
  state.currentMonth = `${year}-${String(month).padStart(2, '0')}`;
  
  saveState();
  renderSettings();
  
  alert(`[${formatMonthString(currentSimMonth)} Settlement Completed]\nAdvanced to the next month. ${state.resetOnMonth ? 'All checklist buttons have been reset to start the new courses.' : 'Checklist status maintained.'}`);
}

// Celebration Pop-up Modal
let currentCelebrationQueue = [];
let currentCelebrationIndex = 0;

function showCelebrationModal(grownList) {
  currentCelebrationQueue = grownList;
  currentCelebrationIndex = 0;
  displayNextCelebration();
}

function displayNextCelebration() {
  if (currentCelebrationIndex >= currentCelebrationQueue.length) {
    document.getElementById("growth-modal").classList.remove("active");
    return;
  }
  
  const item = currentCelebrationQueue[currentCelebrationIndex];
  
  document.getElementById("modal-stage-svg").innerHTML = getCharacterSVG(item.stageIndex);
  document.getElementById("modal-title-text").innerHTML = `🎉 Level Up! 🎉`;
  document.getElementById("modal-desc-text").innerHTML = `
    <strong>${item.zoneName}</strong>'s character grew<br>
    from <span style="color: var(--text-secondary); text-decoration: line-through;">${item.prevStageName}</span> to <br>
    <span style="color: var(--primary-dark); font-size: 19px; font-weight: 800;">${item.newStageName}</span>!
  `;
  
  createSparklesEffect();
  document.getElementById("growth-modal").classList.add("active");
}

function createSparklesEffect() {
  const container = document.getElementById("modal-sparkles-container");
  container.innerHTML = "";
  const colors = ["#ffeb3b", "#ff4081", "#00e676", "#00b0ff", "#d500f9", "#ff9100"];
  const shapes = ["✨", "⭐", "🌸", "🍀", "🎉", "🍂"];
  
  for (let i = 0; i < 70; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti-particle";
    
    const isShape = Math.random() > 0.4;
    if (isShape) {
      particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      particle.style.fontSize = Math.random() * 20 + 14 + "px";
    } else {
      particle.style.width = Math.random() * 10 + 6 + "px";
      particle.style.height = Math.random() * 10 + 6 + "px";
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = Math.random() > 0.5 ? "50%" : "3px";
    }
    
    particle.style.position = "absolute";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = "-5vh";
    
    const duration = Math.random() * 2.5 + 2.5; // 2.5 to 5 seconds
    const delay = Math.random() * 0.5;
    const horizontalSway = Math.random() * 200 - 100;
    
    particle.style.opacity = Math.random() * 0.8 + 0.2;
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    particle.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, opacity ${duration}s ease ${delay}s`;
    
    container.appendChild(particle);
    
    setTimeout(() => {
      particle.style.transform = `translateY(110vh) translateX(${horizontalSway}px) rotate(${Math.random() * 720}deg)`;
      particle.style.opacity = 0;
    }, 50);
  }
}

// ----------------------------------------------------
// Secret Admin Settings Button Triggers
// ----------------------------------------------------
function setupSecretAdminTrigger() {
  let clickCount = 0;
  let lastClickTime = 0;

  // Clicking on background margins, text headers, or secure labels triggers the prompt
  document.addEventListener("click", (e) => {
    // Exclude interactive controls so they work normally
    const isInteractive = e.target.closest("button, input, select, textarea, .zone-card, .check-btn, table, tr, td, th, a");
    if (isInteractive) return;
    
    const now = Date.now();
    // 3 seconds window to complete 5 clicks
    if (now - lastClickTime < 3000) {
      clickCount++;
    } else {
      clickCount = 1;
    }
    lastClickTime = now;
    
    if (clickCount >= 5) {
      clickCount = 0; // reset
      const passcode = prompt("Enter passcode to access Settings & Controls:");
      if (passcode === "11111") {
        navigateTo("settings-view");
      } else if (passcode !== null) {
        alert("Incorrect passcode!");
      }
    }
  });
}

// ----------------------------------------------------
// Event Handlers Setup
// ----------------------------------------------------
function setupEventListeners() {
  // Setup the secret clicks
  setupSecretAdminTrigger();
  
  // Navigation back buttons
  document.getElementById("btn-back-to-dashboard").addEventListener("click", () => {
    navigateTo("dashboard-view");
  });
  
  document.getElementById("btn-settings-back").addEventListener("click", () => {
    navigateTo("dashboard-view");
  });
  
  // Month advance trigger
  document.getElementById("btn-advance-month").addEventListener("click", () => {
    if (confirm(`Do you want to end simulated month (${formatMonthString(state.currentMonth)}) and start the next month?\n${state.resetOnMonth ? '※ WARNING: All checklist marks will be reset to false for all students.' : '※ Checklist marks will be kept.'}`)) {
      advanceMonth();
    }
  });
  
  // Close growth modal
  document.getElementById("btn-close-modal").addEventListener("click", () => {
    currentCelebrationIndex++;
    if (currentCelebrationIndex < currentCelebrationQueue.length) {
      displayNextCelebration();
    } else {
      document.getElementById("growth-modal").classList.remove("active");
    }
  });
  
  document.getElementById("detail-zone-name").addEventListener("change", (e) => {
    const zone = state.zones.find(z => z.id === activeZoneId);
    if (zone) {
      zone.name = e.target.value;
      saveState();
    }
  });
  
  // Add Member
  document.getElementById("btn-add-member").addEventListener("click", () => {
    const zone = state.zones.find(z => z.id === activeZoneId);
    if (!zone) return;
    
    const newName = prompt("Enter new member name:", "");
    if (newName && newName.trim()) {
      const newMember = {
        name: newName.trim(),
        course: "New Course",
        completions: Array(zone.topicsCount).fill(false)
      };
      zone.members.push(newMember);
      saveState();
      renderZoneDetails();
    }
  });

  // Delete Member
  document.getElementById("btn-delete-member").addEventListener("click", () => {
    const zone = state.zones.find(z => z.id === activeZoneId);
    if (!zone || zone.members.length === 0) return;
    
    const nameToDelete = prompt("Enter exact member name to delete:", "");
    if (nameToDelete) {
      const idx = zone.members.findIndex(m => m.name === nameToDelete.trim());
      if (idx !== -1) {
        if (confirm(`Are you sure you want to delete member [${nameToDelete}]?`)) {
          zone.members.splice(idx, 1);
          saveState();
          renderZoneDetails();
        }
      } else {
        alert(`Member [${nameToDelete}] not found.`);
      }
    }
  });
  
  // Add Topic Column
  document.getElementById("btn-add-column").addEventListener("click", () => {
    const zone = state.zones.find(z => z.id === activeZoneId);
    if (!zone) return;
    
    if (zone.topicsCount >= 16) {
      alert("Maximum of 16 check buttons allowed.");
      return;
    }
    
    zone.topicsCount += 1;
    zone.members.forEach(member => {
      if (!member.completions) member.completions = [];
      member.completions.push(false);
    });
    
    saveState();
    renderZoneDetails();
  });
  
  // Remove Column
  document.getElementById("btn-remove-column").addEventListener("click", () => {
    const zone = state.zones.find(z => z.id === activeZoneId);
    if (!zone) return;
    
    if (zone.topicsCount <= 4) {
      alert("Minimum of 4 check buttons required.");
      return;
    }
    
    if (confirm("Are you sure you want to delete the last check button? All members' checkmarks for this topic will be lost.")) {
      zone.topicsCount -= 1;
      zone.members.forEach(member => {
        if (member.completions && member.completions.length > 0) {
          member.completions.pop();
        }
      });
      saveState();
      renderZoneDetails();
    }
  });
  
  // Setting checkboxes
  document.getElementById("toggle-admin-mode").addEventListener("change", (e) => {
    state.adminMode = e.target.checked;
    saveState();
  });
  
  document.getElementById("toggle-reset-on-month").addEventListener("change", (e) => {
    state.resetOnMonth = e.target.checked;
    saveState();
  });
  
  // Apply Manual Override
  document.getElementById("btn-apply-manual-stage").addEventListener("click", () => {
    const zone = state.zones.find(z => z.id === activeZoneId);
    if (!zone) return;
    
    const selectedStage = parseInt(document.getElementById("manual-stage-selector").value);
    zone.stage = selectedStage;
    zone.manualStageOverride = true; 
    saveState();
    renderZoneDetails();
    alert(`Character stage for ${zone.name} is now locked to ${STAGE_NAMES[selectedStage]}.`);
  });
  
  // Load Sample
  document.getElementById("btn-load-sample").addEventListener("click", () => {
    if (confirm("This will overwrite current records with English sample data. Continue?")) {
      initializeDefaultState();
      renderSettings();
      alert("Sample data loaded successfully!");
    }
  });
  
  // Factory Reset
  document.getElementById("btn-reset-all").addEventListener("click", () => {
    if (confirm("Are you sure you want to wipe all data? All stages will reset to Stage 1: Seed.")) {
      state.currentMonth = "2026-06";
      state.zones = [
        { id: 1, name: "Eden Zone", stage: 0, topicsCount: 8, members: [], manualStageOverride: false },
        { id: 2, name: "Onnuri Zone", stage: 0, topicsCount: 8, members: [], manualStageOverride: false },
        { id: 3, name: "Hallelujah Zone", stage: 0, topicsCount: 8, members: [], manualStageOverride: false },
        { id: 4, name: "Shalom Zone", stage: 0, topicsCount: 8, members: [], manualStageOverride: false },
        { id: 5, name: "Immanuel Zone", stage: 0, topicsCount: 8, members: [], manualStageOverride: false },
        { id: 6, name: "Somang Zone", stage: 0, topicsCount: 8, members: [], manualStageOverride: false }
      ];
      state.history = [];
      state.adminMode = false;
      state.resetOnMonth = true;
      saveState();
      renderSettings();
      alert("All data reset to defaults.");
    }
  });
}

// ----------------------------------------------------
// App Initialization
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  setupEventListeners();
  renderDashboard();
});

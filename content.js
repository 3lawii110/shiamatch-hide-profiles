function getHiddenIDs() {
  return new Promise(resolve => {
    chrome.storage.local.get(["hiddenIDs"], result => {
      resolve(result.hiddenIDs || []);
    });
  });
}

function setHiddenIDs(ids) {
  return new Promise(resolve => {
    chrome.storage.local.set({ hiddenIDs: ids }, resolve);
  });
}

function createButton(pid, row) {
  const btn = document.createElement("button");
  btn.textContent = "Hide";
  btn.style.padding = "4px 8px";
  btn.style.borderRadius = "6px";
  btn.style.border = "1px solid #ccc";
  btn.style.cursor = "pointer";
  btn.style.background = "#f5f5f5";

  btn.addEventListener("click", async e => {
    e.preventDefault();
    e.stopPropagation();

    let ids = await getHiddenIDs();
    if (!ids.includes(pid)) {
      ids.push(pid);
      await setHiddenIDs(ids);
    }

    row.style.display = "none";
    updateCounter();
  });

  return btn;
}

async function updateCounter() {
  const ids = await getHiddenIDs();
  let banner = document.getElementById("hidden-count-banner");

  if (!banner) {
    banner = document.createElement("div");
    banner.id = "hidden-count-banner";
    banner.style.padding = "10px";
    banner.style.marginBottom = "10px";
    banner.style.background = "#ffe0e0";
    banner.style.border = "1px solid #ffaaaa";

    const container = document.querySelector(".txt-home");
    if (container) container.prepend(banner);
  }

  if (banner) {
    banner.textContent = `Hidden profiles: ${ids.length}`;
  }
}

async function init() {
  const rows = document.querySelectorAll("tr.rslt-id2, tr.rslt-id3");
  const hiddenIDs = await getHiddenIDs();

  // Add a header cell to the table header row
  const headerRow = document.querySelector("tr[bgcolor='#FDDC68']");
  if (headerRow && headerRow.children.length === 5) {
    const th = document.createElement("td");
    th.className = "rslt-lbls";
    th.style.textAlign = "center";
    th.textContent = "Action";
    headerRow.appendChild(th);
  }

  rows.forEach(row => {
    const link = row.querySelector("a");
    if (!link) return;

    const onClick = link.getAttribute("onClick") || link.getAttribute("onclick") || "";
    const match = onClick.match(/pid=(\d+)/);
    if (!match) return;

    const pid = match[1];

    if (hiddenIDs.includes(pid)) {
      row.style.display = "none";
    }

    if (row.children.length === 5) {
      const td = document.createElement("td");
      td.style.textAlign = "center";
      td.appendChild(createButton(pid, row));
      row.appendChild(td);
    }
  });

  updateCounter();
}

init();
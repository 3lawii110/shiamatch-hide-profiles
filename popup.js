function load() {
  chrome.storage.local.get(["hiddenIDs"], result => {
    const list = document.getElementById("list");
    const empty = document.getElementById("empty");
    const count = document.getElementById("count");

    list.innerHTML = "";

    const ids = result.hiddenIDs || [];
    count.textContent = `${ids.length} hidden profile${ids.length === 1 ? "" : "s"}`;

    if (ids.length === 0) {
      empty.style.display = "block";
      return;
    }

    empty.style.display = "none";

    ids.forEach(id => {
      const item = document.createElement("div");
      item.className = "profile-item";

      const info = document.createElement("div");
      info.className = "profile-info";

      const title = document.createElement("div");
      title.className = "profile-title";
      title.textContent = `Profile #${id}`;

      const sub = document.createElement("div");
      sub.className = "profile-subtitle";
      sub.textContent = "Hidden on search results";

      info.appendChild(title);
      info.appendChild(sub);

      const actions = document.createElement("div");
      actions.className = "profile-actions";

      const openBtn = document.createElement("button");
      openBtn.className = "open-btn";
      openBtn.textContent = "Open";
      openBtn.addEventListener("click", () => {
        chrome.tabs.create({
          url: `https://www.shiamatch.com/qview.php?pid=${id}`
        });
      });

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.textContent = "Unhide";
      removeBtn.addEventListener("click", () => {
        const updated = ids.filter(x => x !== id);
        chrome.storage.local.set({ hiddenIDs: updated }, load);
      });

      actions.appendChild(openBtn);
      actions.appendChild(removeBtn);

      item.appendChild(info);
      item.appendChild(actions);

      list.appendChild(item);
    });
  });
}

document.getElementById("clear").addEventListener("click", () => {
  chrome.storage.local.set({ hiddenIDs: [] }, load);
});

load();
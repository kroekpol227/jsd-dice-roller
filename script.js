
      const diceDisplay = document.getElementById("diceDisplay");
      const rollButton = document.getElementById("rollButton");
      const historyList = document.getElementById("historyList");
      const noHistoryMessage = document.getElementById("noHistoryMessage");

      const dotPositions = {
        1: [{ cx: 50, cy: 50 }],
        2: [
          { cx: 25, cy: 25 },
          { cx: 75, cy: 75 },
        ],
        3: [
          { cx: 25, cy: 25 },
          { cx: 50, cy: 50 },
          { cx: 75, cy: 75 },
        ],
        4: [
          { cx: 25, cy: 25 },
          { cx: 75, cy: 25 },
          { cx: 25, cy: 75 },
          { cx: 75, cy: 75 },
        ],
        5: [
          { cx: 25, cy: 25 },
          { cx: 75, cy: 25 },
          { cx: 50, cy: 50 },
          { cx: 25, cy: 75 },
          { cx: 75, cy: 75 },
        ],
        6: [
          { cx: 25, cy: 25 },
          { cx: 75, cy: 25 },
          { cx: 25, cy: 50 },
          { cx: 75, cy: 50 },
          { cx: 25, cy: 75 },
          { cx: 75, cy: 75 },
        ],
      };

      // 1 , 2 , 3 , 4 , 5 , 6

      function createDiceSVG(value) {
        const dots = dotPositions[value] || dotPositions[1];
        const circles = dots
          .map(
            (d) =>
              `<circle cx="${d.cx}" cy="${d.cy}" r="10" fill="#a1f2a3ff"></circle>`
          )
          .join("");
        return `
        <svg viewBox="0 0 100 100" class="w-full h-full ">
          <rect width="100" height="100" rx="5" ry="5" fill="#de2828ff"></rect>
          ${circles}
        </svg>
      `;
      }

      function addRollToHistory(result) {
        if (noHistoryMessage) noHistoryMessage.remove();
        const item = document.createElement("div");
        item.className =
          "flex items-center justify-between py-2 border-b border-gray-200 text-gray-700";
        const now = new Date();
        const time = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        item.innerHTML = `<span class="font-medium">Roll: ${result}</span><span class="text-gray-500 text-sm">${time}</span>`;
        historyList.prepend(item);
        if (historyList.children.length > 10) historyList.lastChild.remove();
      }

      function rollDice() {
        rollButton.disabled = true;
        diceDisplay.classList.add("animate-shake");
        let count = 0;
        const interval = setInterval(() => {
          const temp = Math.floor(Math.random() * 6) + 1;
          diceDisplay.innerHTML = createDiceSVG(temp);
          if (++count >= 10) {
            clearInterval(interval);
            const final = Math.floor(Math.random() * 6) + 1;
            diceDisplay.innerHTML = createDiceSVG(final);
            diceDisplay.classList.remove("animate-shake");
            rollButton.disabled = false;
            addRollToHistory(final);
          }
        }, 100);
      }

      rollButton.addEventListener("click", rollDice);
      
      diceDisplay.innerHTML = createDiceSVG(1);

      //update//
    
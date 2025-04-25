

const desktop = document.getElementById('desktop');
const taskbarApps = document.getElementById('taskbar-apps');
const clock = document.getElementById('clock');
const icons = document.querySelectorAll('.icon');
const windowsContainer = document.getElementById('windows');

function addToTaskbar(appName) {
    const existingTaskbarItem = taskbarApps.querySelector(`.taskbar-item[data-app="${appName}"]`);
    if (existingTaskbarItem) return;

    const taskbarItem = document.createElement('div');
    taskbarItem.className = 'taskbar-item';
    taskbarItem.dataset.app = appName;

    // Add an icon to the taskbar item
    const icon = document.createElement('img');
    const customIcons = {
        about: 'src/icons/tamino1230-icon.jpg',
        bunker_crawler: 'src/icons/bunker-crawler-logo.ico',
        github: 'src/icons/github-icon.ico',
        mylove: 'src/icons/mylove-logo.ico',
        secret_documents: 'src/icons/docu.png',
        discord: 'src/icons/discord-icon.jpeg',
        html: 'src/icons/html-icon.png',
        pronomes: 'src/icons/documents.png',
        links: 'src/icons/documents.png',
        comment: 'src/icons//tamino1230-icon.jpg',
        error: 'src/icons/error.png'
    };

    if (customIcons[appName]) {
        icon.src = customIcons[appName];
    } else {
        icon.src = 'src/icons/default-icon.png'; // Fallback icon
    }
    icon.alt = `${appName} Icon`;
    icon.style.width = '24px';
    icon.style.height = '24px';
    icon.style.marginRight = '8px';
    icon.alt = `${appName} Icon`;
    icon.style.width = '24px';
    icon.style.height = '24px';
    icon.style.marginRight = '8px';

    const text = document.createElement('span');
    text.textContent = appName;

    taskbarItem.appendChild(icon);
    taskbarItem.appendChild(text);

    taskbarItem.style.display = 'inline-flex';
    taskbarItem.style.alignItems = 'center';
    taskbarItem.style.padding = '5px 10px';
    taskbarItem.style.marginRight = '10px';
    taskbarItem.style.border = '1px solid #ccc';
    taskbarItem.style.borderRadius = '4px';
    taskbarItem.style.backgroundColor = '#f0f0f0';
    taskbarItem.style.cursor = 'pointer';

    taskbarItem.addEventListener('click', () => {
        const appWindow = document.querySelector(`.window[data-app="${appName}"]`);
        if (appWindow) {
            appWindow.style.zIndex = getMaxZIndex() + 1;
            appWindow.style.display = appWindow.style.display === 'none' ? 'block' : 'none';
        }
    });

    taskbarApps.appendChild(taskbarItem);
    taskbarApps.style.display = 'flex'; // Ensure taskbar items are aligned horizontally

    // Limit taskbar items to 2 and show "..." if more
    const taskbarItems = taskbarApps.querySelectorAll('.taskbar-item');
    if (taskbarItems.length > 2) {
        taskbarItems.forEach((item, index) => {
            item.style.display = index < 2 ? 'inline-flex' : 'none';
        });

        let moreButton = taskbarApps.querySelector('.taskbar-more');
        if (!moreButton) {
            moreButton = document.createElement('div');
            moreButton.className = 'taskbar-more';
            moreButton.textContent = '...';
            moreButton.style.display = 'inline-flex';
            moreButton.style.alignItems = 'center';
            moreButton.style.padding = '5px 10px';
            moreButton.style.marginRight = '10px';
            moreButton.style.border = '1px solid #ccc';
            moreButton.style.borderRadius = '4px';
            moreButton.style.backgroundColor = '#f0f0f0';
            moreButton.style.cursor = 'pointer';

            moreButton.addEventListener('click', () => {
                taskbarItems.forEach((item, index) => {
                    if (index >= 2) {
                        item.style.display = item.style.display === 'none' ? 'inline-flex' : 'none';
                    }
                });
            });

            taskbarApps.appendChild(moreButton);
        }
    }
}

function removeFromTaskbar(appName) {
    const taskbarItem = taskbarApps.querySelector(`.taskbar-item[data-app="${appName}"]`);
    if (taskbarItem) {
        taskbarItem.remove();
    }

    const taskbarItems = taskbarApps.querySelectorAll('.taskbar-item');
    const moreButton = taskbarApps.querySelector('.taskbar-more');

    if (taskbarItems.length <= 2 && moreButton) {
        moreButton.remove();
        taskbarItems.forEach(item => {
            item.style.display = 'inline-flex';
        });
    }
}

const appContent = {
    bunker_crawler: '<h1>Bunker Crawler</h1><p>This is the first game i have ever made in the Year 2023. I made it with a friend originally, but i continued developing it alone.</p> <img src="src/icons/bunker-crawler-logo.ico" alt="Bunker Crawler" style="width: 64px; height: auto;"><p>You can play the old version of the Game here: <a href="https://editor.p5js.org/Tamino1230/full/mBZwvuqLg" target="_blank">Link</a> (There is no Boss etc in the old Version!)</p><p>The New Version is gonna be released on Itch.io or on my GitHub Page</p> <p>I am right now about to Remake the Game with new Graphics and new/remade Game-Mechanics. ',
    about: '<h1>About Me</h1><p>👋 Hi! I\'m Tamino1230 a Developer Student from Austria, a Gamer, a (bad) Artist.</p><p>Currently i am working in <strong>Java, Python, JavaScript</strong> and <strong>C#</strong></p><p>I build my Apps with Elektron in <strong>HTML, CSS</strong> and <strong>JS</strong></p><p>In my free time I play videogame, read, draw and watch Anime.</p><h1>Languages and Tools</h1><h4>Languages</h4><p>Java, C#, p5.js, Python, JS, HTML, CSS</p><h4>Game Engines</h4><p>Unity, Unreal Engine, Blender</p><h4>Developement</h4><p>VS StudioCode, VSCode, Intellij, PyCharm, CodeSandBox, p5.js, GitHub</p><h1>GitHub Stats</h1><img width="325px" src="https://camo.githubusercontent.com/65e6c4f585b2fc7d14c9d08e8c4f44f1b1187932a76d7c84818285d860b3ac1a/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d54616d696e6f313233302673686f775f69636f6e733d74727565267468656d653d7261646963616c"> <img src="https://camo.githubusercontent.com/fcdd0ae20de9acc41bfede3b7b4ab3583c82693b0a22a48c515f62aa548b12bb/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170692f746f702d6c616e67732f3f757365726e616d653d54616d696e6f31323330266c61796f75743d636f6d70616374267468656d653d7261646963616c2663616368655f7365636f6e64733d31"> ',
    secret_documents: '<h1>Secret Documents</h1><p>Access your documents here.</p><br><h1>SCP-049</h1><p><strong>Item #: </strong>SCP-049<p><p><strong>Object Class: </strong>Euclid</p><p><strong>Special Containment Procedures: </strong><p>SCP-049 is contained within a Standard Secure Humanoid Containment Cell in Research Sector-02 at Site-19. SCP-049 must be sedated before any attempts to transport it. During transport, SCP-049 must be secured within a Class III Humanoid Restriction Harness (including a locking collar and extension restraints) and monitored by no fewer than two armed guards.</p><img src="src/images/scp-049-scp-wiki.png" width="210px"><p><strong>Description: </strong>SCP-049 is a humanoid entity, roughly 1.9 meters in height, which bears the appearance of a medieval plague doctor. While SCP-049 appears to be wearing the thick robes and the ceramic mask indicative of that profession, the garments instead seem to have grown out of SCP-049\'s body over time1, and are now nearly indistinguishable from whatever form is beneath them. X-rays indicate that despite this, SCP-049 does have a humanoid skeletal structure beneath its outer layer.</p><a href="https://scp-wiki.wikidot.com/scp-049" target="_blank">Source</a></p>',
    github: '<h1>GitHub</h1><p><a href="https://github.com/Tamino1230" target="_blank">Link to my GitHub Profile</a>.</p><p><a href="https://github.com/Aqusorias" target="_blank">Link to my (Femboy) Friend GitHub Profile (Aqusorias)</a> (go to him and tell him that he is a God-Programmer).</p>',
    discord: '<h1>Discord</h1><p>Join my Discord server to connect and collaborate <a href="https://discord.gg/8b8R9qCBF8" target="_blank">Link to Server</a>.</p>',
    html: '<h1>My Websites</h1><p>Here is a List of all my Websites:</p><p><ul><li><a href="https://tamino1230.github.io" target="_blank">Tamino1230 Main Page</a></li><li><a href="https://tamino1230.github.io/webhook" target="_blank">Discord Webhook Manager</a></li><li><a href="https://tamino1230.github.io/me" target="_blank">Tamino1230\'s Profile</a> (this page)</li></ul></p>',
    mylove: '<h1>My Love</h1><p>In case you didn\'t know, I have a beautiful wife (Girlfriend)! I love her soooooooooooo damnn muchhh <33</p>',
    tamino1230: '<h1>Tamino1230</h1><p>Welcome to my personal space!</p>',
    pronomes: '<h1>Pronomes</h1><p>My Personal Pronouns are <strong>He/Him</strong>.</p><p>I am Hetero but i have nothing against that what People Identify as!</p><p>I like more being with People than being alone.</p><p>Except if I don\'t like you (But i ussually do not dislike you for no reason).</p><p>I Speak German and Egnlish. I can speak both languages pretty well and fluetly so I dont mind speaking English at all.<p>',
    links: '<h1>Links</h1><p>Here are some useful links and resources from me.</p><p><ul><li>Twitter: <a href="https://twitter.com/nuketamino" target="_blank">@nuketamino</a></li><li>GitHub: <a href="https://github.com/Tamino1230" target="_blank">@tamino1230</a></li><li>Discord: Tamino1230</li><li>Reddit: <a href="https://reddit.com/u/Tamino1230" target="_blank">/u/tamino1230</a></li><li>Steam: <a href="https://steamcommunity.com/id/Tamino1230" target="_blank">/id/Tamino1230</a></li><li>Twitch: <a href="https://twitch.tv/tamino001" target="_blank">Tamino001</a></li><li>Riot: DevilFish#hers</li></ul></p>',
    comment: '<h1>Comment on my Profile</h1><p>Feel free to leave a comment or feedback about my profile or any of my projects.</p><p>Your thoughts and suggestions are always welcome!</p><p>Link: <a href="http://users4.smartgb.com/g/g.php?a=s&i=g44-82925-8d" target="_blank">Link to Guestbook</a>',
    error: '<p>{</p><p>    "content": "not avaible anymore",</p><p>    "error": "trojan-89232.svg - null error",</p><p>}</p>'
};


function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    clock.textContent = formattedTime;
}
setInterval(updateClock, 1000);
updateClock();


function openApp(appName) {
    const existingWindow = document.querySelector(`.window[data-app="${appName}"]`);
    if (existingWindow) {
        existingWindow.style.zIndex = getMaxZIndex() + 1;
        existingWindow.style.display = 'block';
        return;
    }

    const appWindow = document.createElement('div');
    appWindow.className = 'window';
    appWindow.dataset.app = appName;
    appWindow.style.zIndex = getMaxZIndex() + 1;
    appWindow.innerHTML = `
        <div class="window-header">
            <span>${appName}</span>
            <button class="close-button">X</button>
        </div>
        <div class="window-content">
            ${appContent[appName] || '<p>Content not available.</p>'}
        </div>
    `;

    const closeButton = appWindow.querySelector('.close-button');
    closeButton.addEventListener('click', () => closeApp(appWindow));

    windowsContainer.appendChild(appWindow);
    makeDraggable(appWindow);
    addToTaskbar(appName);
}


function closeApp(appWindow) {
    const appName = appWindow.dataset.app;
    appWindow.remove();
    removeFromTaskbar(appName);
}


function makeDraggable(windowElement) {
    const header = windowElement.querySelector('.window-header');
    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;
        windowElement.style.zIndex = getMaxZIndex() + 1;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}


function getMaxZIndex() {
    return Array.from(document.querySelectorAll('.window'))
        .reduce((max, el) => Math.max(max, parseInt(getComputedStyle(el).zIndex) || 0), 0);
}


const startButton = document.getElementById('start-button');


const startMenu = document.createElement('div');
startMenu.id = 'start-menu';
startMenu.innerHTML = `
    <div class="menu-item" data-app="about">About Me</div>
    <div class="menu-item" data-app="bunker_crawler">Bunker Crawler</div>
    <div class="menu-item" data-app="github">GitHub</div>
    <div class="menu-item" data-app="mylove">My Love</div>

    <div class="menu-item" data-app="secret_documents">Secret Documents</div>
    <div class="menu-item" data-app="discord">Discord</div>
    <div class="menu-item" data-app="html">Websites</div>
    <div class="menu-item" data-app="pronomes">pronomes</div>
    <div class="menu-item" data-app="links">links</div>
    <div class="menu-item" data-app="comment">COMMENT HERE</div>
    <div class="menu-item" data-app="error">Errorx</div>
`;
desktop.appendChild(startMenu);

startButton.addEventListener('click', () => {
    startMenu.style.display = startMenu.style.display === 'none' || !startMenu.style.display ? 'flex' : 'none';
});


window.addEventListener('click', (e) => {
    if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
        startMenu.style.display = 'none';
    }
});


startMenu.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        openApp(item.dataset.app);
        startMenu.style.display = 'none';
    });
});


icons.forEach(icon => {
    icon.addEventListener('click', () => {
        openApp(icon.dataset.app);
    });
});


function showPopup(message, duration = 3000) {
    const popup = document.createElement('div');
    popup.className = 'popup';

    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.zIndex = getMaxZIndex() + 1;
    popup.style.backgroundColor = 'black';
    popup.style.color = 'lime';
    popup.style.padding = '15px';
    popup.style.border = '2px solid lime';
    popup.style.borderRadius = '5px';
    popup.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)';
    popup.style.fontFamily = 'Courier New, monospace';
    popup.style.fontSize = '14px';
    popup.style.textAlign = 'left';
    popup.style.whiteSpace = 'pre-wrap';

    let index = 0;
    const typingInterval = 50;
    const typingEffect = setInterval(() => {
        popup.textContent = message.slice(0, index);
        index++;
        if (index > message.length) {
            clearInterval(typingEffect);
        }
    }, typingInterval);

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, duration + message.length * typingInterval);
}

showPopup("Welcome to my Portfolio! Please press Windows Button to start Apps!", 5000);

let isFirstClick = true;

startButton.addEventListener('click', () => {
    if (isFirstClick) {
        showPopup("OMG OMG YOU FOUND ITTTTTTTT!", 3000);
        isFirstClick = false;
    }
});

const firstClickMessages = {
    about: "HIIIII THERE! I hope you are doing well!",
    bunker_crawler: "Have fun loooking at my first game :) Give me your Opinion!",
    github: "Check out my GitHub profile!",
    mylove: "Yup, i have a Girlfriend, i cant believe it myself <3",
    secret_documents: "Shush... This is a secret!",
    discord: "Join my Discord server!",
    html: "Thatttt are myyyy Websitesssss!",
    pronomes: "Viewing my Pronouns for the first time!",
    links: "Here are my useful links for the first time!"
};

const firstClickTracker = {};

startMenu.querySelectorAll('.menu-item').forEach(item => {
    const appName = item.dataset.app;
    firstClickTracker[appName] = true;

    item.addEventListener('click', () => {
        if (firstClickTracker[appName]) {
            const message = firstClickMessages[appName] || `You opened the ${appName} app for the first time!`;
            showPopup(message, 3000);
            firstClickTracker[appName] = false;
        }
        openApp(appName);
        startMenu.style.display = 'none';
    });
});
(function() {
    const PICTURES = {
        pictues: [
            // [
            //     {
            //         file: 'selfPortrait.png',
            //         title: 'LobstrHandz self portrait',
            //         size: {
            //             x: 0,
            //             y: 0
            //         }
            //     }
            // ],
            // [
                {
                    file: 'theWindow.gif',
                    title: 'The window',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    // FIx the frame
                    file: 'batsDiedInBloodbourne.gif',
                    title: 'Bats died in Bloodbourne',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'borat.gif',
                    title: 'Borat',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'ladyAndTheTramp.gif',
                    title: 'Lady and the Tramp',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'monaLyosha.gif',
                    title: 'Mona Lyosha',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'ramy.gif',
                    title: 'Ramy',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'theAlpes.gif',
                    title: 'The Alpes',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'theOwl.gif',
                    title: 'The owl',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'theSheep.png',
                    title: 'The sheep',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'theFish.gif',
                    title: 'The fish',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'turdWave.gif',
                    title: 'Turd wave',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'batkittoPortrait.gif',
                    title: 'Batkitto portrait',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'batmanGetsANightSnack.gif',
                    title: 'Batman gets a night snack',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'kingOfTheHill.gif',
                    title: 'King of the hill',
                    size: {
                        x: 256,
                        y: 256
                    }
                },
                {
                    file: 'theWraith.gif',
                    title: 'The wraith',
                    size: {
                        x: 256,
                        y: 312
                    }
                }
            // ]
        ],
        screens: [
            [
                {
                    file: "regularStartScreen.gif",
                    title: "Regular stream start",
                    size: {
                        x: 480,
                        y: 270
                    }
                },
                {
                    file: "regularBrbScreen.gif",
                    title: "Regular BRB",
                    size: {
                        x: 480,
                        y: 270
                    }
                },
                {
                    file: "regularEndScreen.gif",
                    title: "Regular stream end",
                    size: {
                        x: 480,
                        y: 270
                    }
                },
            ],
            [
                {
                    file: "batmanStartScreen.gif",
                    title: "Batman stream start",
                    size: {
                        x: 480,
                        y: 270
                    }
                },
                {
                    file: "batmanBrbScreen.gif",
                    title: "Batman BRB",
                    size: {
                        x: 480,
                        y: 270
                    }
                }
            ],
            [
                {
                    file: "starWarsStartScreen.gif",
                    title: "Star wars stream start",
                    size: {
                        x: 480,
                        y: 270
                    }
                },
                {
                    file: "starWarsBrbScreen.gif",
                    title: "Star wars BRB",
                    size: {
                        x: 480,
                        y: 270
                    }
                }
            ],
            [
                {
                    file: "mgsStartScreen.gif",
                    title: "Metal gear solid stream start",
                    size: {
                        x: 480,
                        y: 270
                    }
                },
                {
                    file: "mgsBrbScreen.gif",
                    title: "Metal gear solid BRB",
                    size: {
                        x: 480,
                        y: 270
                    }
                }
            ],
            [
                {
                    file: "alienStartScreen.gif",
                    title: "Alien: Isolation stream start",
                    size: {
                        x: 480,
                        y: 270
                    }
                },
                {
                    file: "alienBrbScreen.gif",
                    title: "Alien: Isolation BRB",
                    size: {
                        x: 480,
                        y: 270
                    }
                }
            ],
            [
                {
                    file: "darkSoulsStartScreen.gif",
                    title: "Dark Souls stream start",
                    size: {
                        x: 480,
                        y: 270
                    }
                },
                {
                    file: "darkSoulsBrbScreen.gif",
                    title: "Dark Souls BRB",
                    size: {
                        x: 480,
                        y: 270
                    }
                }
            ]
        ]
    }

    const containter = document.querySelector('#container');
    const fullSizeView = document.querySelector('#fill-size-container');

    function createNavMenu() {
        const navMenu = document.querySelector('#nav-menu');

        for(let key in PICTURES) {
            let link = document.createElement('span');
            link.id=`${key}-page-link`;
            link.innerText = key[0].toUpperCase() + key.slice(1);
            link.onclick = getNavLinkEventHandler(key);
            navMenu.appendChild(link);
        }

        navMenu.children[0].classList.add('current-page');
    }

    function getNavLinkEventHandler(pageName) {
        return () => {
            document.querySelector('.current-page').classList.remove('current-page');
            document.querySelector(`#${pageName}-page-link`).classList.add('current-page');
            fillContainer(pageName);
        }
    }

    function fillContainer(pageName) {
        const pageContent = PICTURES[pageName];
        container.innerHTML = '';

        for (let item of pageContent) {
            if (Array.isArray(item)) {
                renderRow(item);
            } else {
                renderPicture(item, container);
            }
        }
    }

    function renderPicture(pictureData, parent) {
        let pictureContainer = document.createElement('div');
        let pictureElement = document.createElement('img');
        let plaque = document.createElement('span');

        pictureContainer.classList.add('picture-container');
        pictureElement.classList.add('picture');
        pictureElement.src = `./pictures/${pictureData.file}`;
        pictureElement.height = pictureData.size.y;
        pictureElement.width = pictureData.size.x;
        pictureElement.onclick = () => {
            fullSizeView.children[0].src = `./pictures/${pictureData.file}`;
            fullSizeView.classList.remove('hidden');
            document.body.classList.add('full-view-enabled');
        }
        plaque.classList.add('plaque', 'picture-caption');
        plaque.innerText = pictureData.title;

        pictureContainer.appendChild(pictureElement);
        pictureContainer.appendChild(plaque);
        parent.appendChild(pictureContainer);
    }

    function renderRow(row) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('picture-row');

        for (let item of row) {
            renderPicture(item, rowElement);
        }

        container.appendChild(rowElement)
    }


    createNavMenu();
    fillContainer('pictues');
    fullSizeView.onclick = () => {
        fullSizeView.classList.add('hidden');
        document.body.classList.remove('full-view-enabled');
        fullSizeView.children[0].src = '';
    }
}());
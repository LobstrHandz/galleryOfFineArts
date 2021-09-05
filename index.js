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
                }
            // ]
        ]
    }

    const containter = document.querySelector('#container');

    function fillContainer(pageName) {
        const pageContent = PICTURES[pageName];

        for (let picture of pageContent) {
            let pictureContainer = document.createElement('div');
            let pictureElement = document.createElement('img');
            let plaque = document.createElement('span');

            pictureContainer.classList.add('picture-container');
            pictureElement.classList.add('picture');
            pictureElement.src = `./pictures/${picture.file}`;
            pictureElement.height = picture.size.y;
            pictureElement.width = picture.size.x;
            plaque.classList.add('plaque', 'picture-caption');
            plaque.innerText = picture.title;

            pictureContainer.appendChild(pictureElement);
            pictureContainer.appendChild(plaque);
            containter.appendChild(pictureContainer);
        }
    }

    fillContainer('pictues');
}());

function renderApp() {
    const githubLink = document.createElement('a');
    githubLink.innerHTML = 'github'
    githubLink.target = '_blank'
    githubLink.className = 'fixed fs-24 fw-3 top-0 right-0 bg-green p-20 text-white br-half'
    githubLink.href = 'https://github.com/GitHubJiKe/atomic-css-webpack-plugin'

    const title = document.createElement('h1')

    title.innerText = 'Atomic CSS'
    title.className = 'text-center text-red bg-yellow p-20 fs-24 fw-3 bw-2 bs-solid bc-1 br-8 mt-40'

    const code = document.createElement('div');
    code.className = 'text-white bg-black fs-18 p-20 m-20  br-8 shadow-1 whitespace-nowrap overflow-x-auto'
    code.innerText = parse(require('./myconfig'))

    const box = document.createElement('div')
    box.className = 'flex flex-row justify-evenly'
    const letters = ['A', 'T', 'O', 'M', 'I', 'C']
    for (let index = 0; index < 6; index++) {
        const item = document.createElement('span')
        item.className = 'flex-1 ml-10 mr-10 bs-solid bc-2 bw-2 h-80 w-80 justify-center flex align-items-center fs-24 p-20 br-8 bg-red text-white fw-3 cursor-pointer'
        item.innerText = letters[index]
        item.id = `item-${index}`
        box.appendChild(item)
    }

    box.addEventListener('click', (e) => {
        if (e.target.nodeName === 'SPAN') {
            alert(e.target.innerHTML)
        };
    })

    document.body.appendChild(githubLink)
    document.body.appendChild(title)
    document.body.appendChild(box)
    document.body.appendChild(code)

}

function parse(config) {
    let content = ''
    for (const key in config) {
        // key: prefix
        const obj = config[key];
        for (const prop in obj) {
            // prop: css property
            const conf = obj[prop];
            for (const field in conf) {
                // field: postfix 
                const value = conf[field];
                content += `.${key.startsWith('$') ? '' : key}${field}{${prop}:${value}}\n`
            }
        }
    }

    return content;
}

renderApp()
const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')

focoBtn.addEventListener ('click', () => {
    html.setAttribute('data-contexto', 'foco')
})

curtoBtn.addEventListener ('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
})

longoBtn.addEventListener ('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
})
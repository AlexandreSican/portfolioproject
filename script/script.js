const c = (el) => document.querySelector(el)
const ca = (el) => document.querySelectorAll(el)
window.scrollTo(0,0)
document.addEventListener('scroll', function(){
    lastKnownScrollPosition = window.scrollY;
    setInterval(()=>{
        if(lastKnownScrollPosition >= 67){
            c('header').style.padding = '5px 0px'
        }else{
            c('header').style.padding = '20px 0px'
        }
    }, 500)
})

const links = ca('.menu a')

for (const link of links) {
    link.addEventListener("click", clickHandler);
}
  
function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
  
    scroll({
      top: offsetTop,
      behavior: "smooth"
    });
}

function confirmSend(){
    document.querySelector('.btn-send').innerHTML = 'Enviar'
    let bodyC = c('.main')
        bodyC.style.display = 'none'
        document.querySelector('.confirmation').style.display = 'flex'

}

function returnNormal(){
    
    document.querySelector('.btn-red').innerHTML = '<img src="assets/loading.png" class="loadingI">'
    setTimeout(()=>{
        document.querySelector('.confirmation').style.display = 'none'
        document.querySelector('.main').style.display = 'flex'
        document.querySelector('.main').style.flexDirection = 'column'
    }, 2000)
}


c('.btn-red').addEventListener('click', returnNormal)

const handleSubmit = () =>{
    
    

    let nameInput = c('#nameI').value
    let emailInput = c('#emailI').value
    let interpriseInput = c('#interpriseI').value

    fetch('https://api.sheetmonkey.io/form/4x2wihW3bmBY3MhGCNzCpm', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: `${nameInput}`, email: `${emailInput}`, empresa: `${interpriseInput}`}) 
        
    })
    confirmSend()

}

const sendButton = c('.card-form');
    
c('.btn-send').addEventListener('click', (e)=>{
    document.querySelector('.btn-send').innerHTML = '<img src="assets/loading.png" class="loadingI">'
    
    setTimeout(() => {
        
        handleSubmit()
        let limpar = ca('input')
        limpar.forEach((item)=>{
        item.value = ('')
    })
    }, 2000);
    
})


import { baseUrl, getDataInfo, myHeaders } from "../../scripts/getApi.js"

let usersArr = []

function getUser(){
    let getSearch = JSON.parse(localStorage.getItem('recentUsers')) || []
    usersArr = getSearch
    let inputLogin = document.getElementById('inputName')
    let btnLogin = document.getElementById('btnLogin')
    let form= document.getElementById('formLogin')
     
    inputLogin.addEventListener('keyup', function(event){
        event.preventDefault()
        const message = document.querySelector('.error-message')
        if(inputLogin.value.length > 0){
            btnLogin.disabled = false  
            message.classList.add('hidden')
            inputLogin.classList.remove('border_error')
            btnLogin.classList.add('section-2-btn-active') 
            btnLogin.classList.add('button-login-active')
        }else{
            btnLogin.disabled = true
            btnLogin.classList.remove('section-2-btn-active') 
            btnLogin.classList.remove('button-login-active')
        }     
    })

   form.addEventListener('submit', async function(event){
        event.preventDefault()
        btnLogin.innerHTML = ''
   
        
        const spinnerImg = document.createElement('img')
        spinnerImg.src = './pages/login/assets/spinner.svg'
        spinnerImg.classList.add('loading')
        btnLogin.appendChild(spinnerImg)
            try{
                let data = await fetch(`${baseUrl}${inputLogin.value}`, {
                    method: 'GET',
                    headers: myHeaders
                })
                if(data.status != 404){
                    if(usersArr.filter(elt => elt == inputLogin.value).length == 0){
                        if(usersArr.length >= 3){
                            usersArr.pop()
                            usersArr.unshift(inputLogin.value)
                            localStorage.setItem('recentUsers', JSON.stringify(usersArr))
                        }else{
                            usersArr.unshift(inputLogin.value)
                            localStorage.setItem('recentUsers', JSON.stringify(usersArr))
                        } 
                    }else{
                        let findLastUserIndex = usersArr.indexOf(elt => elt == inputLogin.value)
                        let findLastUserName = usersArr.find(elt => elt == inputLogin.value)
                        usersArr.splice(findLastUserIndex, 1)         
                        usersArr.unshift(findLastUserName)    
                        localStorage.setItem('recentUsers', JSON.stringify(usersArr))  
                    }
                    localStorage.setItem('lastSearch', inputLogin.value)
                    window.location.replace('./pages/home/index.html')
                }else{
                    errorMessage()
                    inputLogin.value = ''
                    btnLogin.innerText = 'Ver usuário Github'
                }

            }catch(error){
                console.log(error)               
            }
    }) 
    return usersArr
}

getUser()

async function renderRecentUsers(){
    let getSearch = JSON.parse(localStorage.getItem('recentUsers')) || []
    for(let i = 0; i < getSearch.length; i++){
        let dataAPI = await getDataInfo(getSearch[i])
        let rUsers = document.getElementById('rUsers')
        let buttonUsers = document.createElement('button')
        let imgUser = document.createElement('img')
        let btnHover = document.createElement('div')
        let btnHoverSpan = document.createElement('span')

        imgUser.classList = 'img-user'
        buttonUsers.classList = 'recent-users-btn'
        btnHover.classList = 'hover-recent-users hidden'
        btnHoverSpan.classList = 'hover-recent-users-span'
         

        imgUser.src = dataAPI.avatar_url
        btnHoverSpan.innerText = 'Acessar este perfil'

        buttonUsers.addEventListener('click', function(event){
            event.preventDefault()
     
            localStorage.setItem('lastSearch', getSearch[i])
            window.location.replace('../../pages/home/index.html')   
        })

        buttonUsers.addEventListener("mouseover", function(event){
            event.preventDefault()
            btnHover.classList.remove('hidden')
        })

        buttonUsers.addEventListener("mouseout", function(event){
            event.preventDefault()
            btnHover.classList.add('hidden')
        })

        btnHover.append(btnHoverSpan)
        buttonUsers.append(imgUser, btnHover)
        rUsers.append(buttonUsers)
    }
}

renderRecentUsers()

function errorMessage(){
    const message = document.querySelector('.error-message')
    const inputLogin = document.getElementById('inputName')
    message.classList.remove('hidden')
    inputLogin.classList.add('border_error')
}


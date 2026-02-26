const content=document.querySelector('#content');

window.addEventListener('load', ()=>{
    getUsers();
});

function getUsers(){
    let html=""
    fetch('https://api.sampleapis.com/monstersanctuary/monsters', {mode:'cors'})
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then(data=>{
        console.log(data);
        data.forEach(element=>{
            html+=`<li><img src="${monster.image}" 
                             alt="${monster.name}" 
                             width="60" 
                             height="60" 
                             style="vertical-align: middle; margin-right: 10px;">${element.name}<li>`;
        })
        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error)
    })

}



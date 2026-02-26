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
            html+=`<li>${element.first_name}${element.last_name}<li>`;
        })
        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error)
    })

}

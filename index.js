let temas = [];

document.addEventListener("DOMContentLoaded", ev=>{
    const formulario = document.getElementById("formulario");
    const inputField = document.getElementById("inputField");
    const container = document.getElementById("container");
    
    
    formulario.addEventListener("submit", async ev => {
        ev.preventDefault();
        
        let _name = inputField.value;
        let _image = await GetImage(_name);
        let temaObjeto = {
            name: _name,
            image: _image
        }
        temas.push(temaObjeto);
        
        reloadContent(temas, container);
    });
})

async function GetImage(seed)
{
    let response = await fetch(`https://picsum.photos/seed/${seed}/300/200`);
    let url = response.url;
    return url;
}

function elementHTML(elementCount, name, imageUrl)
{
    const elementInnerHTML = `
    <div id="element-${elementCount}" class="theme-element">
            <h3 class="theme-name">${name}</h3>
            <img class="theme-image" src=${imageUrl} width="300" height="200">
            <label>
                Completado
                <input type="checkbox" name="completed">
            </label>
            
            <button class="delete-button">Eliminar</button>
        </div>
    `
    let element = document.createElement("div");
    element.innerHTML = elementInnerHTML;
    element.querySelector(".delete-button").addEventListener("click", ev=>{
        temas.splice(elementCount, 1);
        reloadContent();
    })

    return element;
}

function reloadContent()
{
    const container = document.getElementById("container");
    container.innerHTML="";
    for(let i=0; i<temas.length; i++)
    {
        container.append(elementHTML(i, temas[i].name, temas[i].image));
    }
}
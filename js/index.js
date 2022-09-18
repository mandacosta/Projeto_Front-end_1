let vitrineProdutos = document.getElementsByClassName("produtos")[0]
let carrinhoAncora = document.querySelector(".carrinho")
let aside = document.getElementsByTagName("aside")[0]
let btnPesquisa = document.getElementById("btnPesquisa")
let input = document.getElementById("inputPesquisa")
let filtros = document.getElementsByClassName("filtros")[0]


let carrinhoCompras = document.createElement("ul")
carrinhoCompras.classList.add("carrinho-produtos")


function criarCardVitrine(produto){

    let li = document.createElement("li")
    let figure = document.createElement("figure")
    let imagem = document.createElement("img")
    let div = document.createElement("div")
    let spanTag = document.createElement("span")
    let h3 = document.createElement("h3")
    let pDescr_quant = document.createElement("p")
    let spanPreco = document.createElement("span")
    let spanBtn = document.createElement("span")

    imagem.src = produto.img
    imagem.alt = produto.alt
    spanTag.classList.add("tag")
    spanBtn.classList.add("btn")
    spanBtn.id = produto.id

    spanTag.innerHTML = produto.tag
    h3.innerHTML = produto.nameItem    
    spanPreco.innerHTML = `R$ ${produto.value},00`
    spanBtn.innerHTML = produto.btn
    pDescr_quant.innerHTML = produto.description
        
    div.append(spanTag,h3,pDescr_quant,spanPreco,spanBtn)
    figure.append(imagem)
    li.append(figure,div)
    
    return li
}


function renderizarVitrine (lista, local){
    if(lista.length > 0){
      for(let i=0; i<lista.length; i++){        
           let card = criarCardVitrine(lista[i])
            local.append(card)            
                
    }  
    } else{
        renderizarPesquisaVazia()
    }
    
}

function renderizarPesquisaVazia(){

    vitrineProdutos.innerHTML = `<div class="pesquisaVazia">
    <h2>Não encontrei resultados para sua pesquisa !</h2>
     <figure><img src="./img/magnifier.png" alt=""></figure> 
    </div>`

}
renderizarVitrine(data, vitrineProdutos)


function renderizarCarrinhoVazio (){
    let div = document.createElement("div")    

    div.innerHTML = `
    <h3>Carrinho vazio - Adicione produtos</h3>
    <figure>
        <img src="./img/puppy-icon-26.jpg" alt="ícone-cachorro">
    </figure>`

    carrinhoAncora.appendChild(div)
}
renderizarCarrinhoVazio()

function criarCardCarrinho (produto){
    
    let li = document.createElement("li")
    let figure = document.createElement("figure")
    let imagem = document.createElement("img")
    let div = document.createElement("div")
    let spanTag = document.createElement("span")
    let h3 = document.createElement("h3")
    let pDescr_quant = document.createElement("p")
    let spanPreco = document.createElement("span")
    let spanBtn = document.createElement("span")

    imagem.src = produto.img
    imagem.alt = produto.alt
    spanTag.classList.add("tag")
    spanBtn.classList.add("btn")
    spanBtn.id = produto.id

    spanTag.innerHTML = produto.tag
    h3.innerHTML = produto.nameItem    
    spanPreco.innerHTML = `R$ ${produto.value},00`
    spanBtn.innerHTML = "Remover 1 item"
    pDescr_quant.innerHTML = `Quantidade: ${produto.quantidade}`
        
    div.append(spanTag,h3,pDescr_quant,spanPreco,spanBtn)
    figure.append(imagem)
    li.append(figure,div)
    
    return li     
    
}

function renderizarCarrinho (lista, local){
    for(let i=0; i<lista.length; i++){        
        if(lista[i].quantidade > 0){
          let card = criarCardCarrinho(lista[i])
            local.append(card)
            carrinhoAncora.append(local)    
        }     
 }
}

let listaCarrinho = []
vitrineProdutos.addEventListener("click", function(event){
    
    let index = 0
    if(event.target.className == "btn"){
      
        index = event.target.id
        
        adicionarCarrinho(data,index)
        carrinhoAncora.innerHTML = `<h2><span>Carrinho de compras</span></h2>`
        carrinhoCompras.innerHTML = ""
        renderizarCarrinho(listaCarrinho, carrinhoCompras)
        renderizarTotais(listaCarrinho)       
    }   
         
})

function acharProduto (data,index){    
    for(let j=0; j<data.length; j++){
        if(data[j].id == index){
            return data[j]            
        }
    }    
}


function adicionarCarrinho (data, index){
    const produto = acharProduto(data, index)    
    
    let produtoNoCarrinho = listaCarrinho.find(objeto => produto.id == objeto.id)
    if(produtoNoCarrinho == undefined){
        listaCarrinho.push(produto)
        listaCarrinho[listaCarrinho.length-1].quantidade = 1
    } else{
        let indice = listaCarrinho.indexOf(produtoNoCarrinho)
        listaCarrinho[indice].quantidade += 1
    }       
    return listaCarrinho 
}


function renderizarTotais (lista){
    let quantidadeT = 0
    let valorT = 0

    for(let i=0; i<lista.length; i++){
        quantidadeT += lista[i].quantidade
        valorT += (lista[i].value)*(lista[i].quantidade)
    }

    let div = document.createElement("div")
    div.classList.add("totais")
    div.innerHTML = `
    <p>Quantidade:</p>
    <p>${quantidadeT}</p>
    <p>Total:</p>
    <p>R$ ${valorT},00</p> `

    carrinhoAncora.appendChild(div)
    
}

aside.addEventListener("click", function(e){
    let index = 0
    if(e.target.className === "btn"){
        
        index = e.target.id
        removerProdutoCarrinho (listaCarrinho, index)

        carrinhoAncora.innerHTML = `<h2><span>Carrinho de compras</span></h2>`
        carrinhoCompras.innerHTML = ""

        let quantidadeT = 0

        for(let i=0; i<listaCarrinho.length; i++){
        quantidadeT += listaCarrinho[i].quantidade
        } if(quantidadeT > 0){
           renderizarCarrinho(listaCarrinho, carrinhoCompras)
            renderizarTotais(listaCarrinho) 
        } else{            
            renderizarCarrinhoVazio() 
        }
        
    }
})

function removerProdutoCarrinho (listaCarrinho, index){
    const produto = acharProduto (listaCarrinho, index)
    let indexProduto = listaCarrinho.indexOf(produto)
    
    listaCarrinho[indexProduto].quantidade -= 1   

}

btnPesquisa.addEventListener("click", function(e){

    let listaEncontrada = pesquisarProdutos(data,input.value)

    vitrineProdutos.innerHTML = ""

    renderizarVitrine(listaEncontrada, vitrineProdutos)
})

input.addEventListener("keypress", function(e){

    if(e.key == "Enter"){
     let listaEncontrada = pesquisarProdutos(data,input.value)

    vitrineProdutos.innerHTML = ""

    renderizarVitrine(listaEncontrada, vitrineProdutos)   
    }
    
})

function pesquisarProdutos (data, palavra){
    let listaResultado = []
    let palavraTratada = palavra.trim().toLowerCase()

    for(let i=0; i<data.length; i++){
        let nomeProduto = data[i].nameItem.toLowerCase()
        let descricao =  data[i].description.toLowerCase()
        if(nomeProduto.includes(palavraTratada) || descricao.includes(palavraTratada)){
            listaResultado.push(data[i])
        }
    }

    return listaResultado
}

filtros.addEventListener("click", function(e){

    let tag = e.target.id   
    
    vitrineProdutos.innerHTML = ""

    renderizarVitrine(filtrar (data, tag), vitrineProdutos)  

})

function filtrar (data,tag){
    let listaFiltrada = []

    for(let i=0; i<data.length; i++){
        let categoria = data[i].tag[0].toLowerCase()
        if(tag == categoria){
            listaFiltrada.push(data[i])            
        } 
    }
    if(listaFiltrada.length > 0){
       return listaFiltrada 
    } else{
        return data
    }
    
}
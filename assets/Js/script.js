//Seleciona os elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista

const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");

//Captura o input
amount.oninput = () => {
    //Pega os valores do input e atual e retira os caracteres nao numericos
    let value = amount.value.replace(/\D/g,"");

    //Faz o valor ficar em centavos
    value = Number(value) / 100;

    //Atualiza o valor do input
    amount.value = formatCurrencyBRL(value);
}

//Formata o valor na moeda Real
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    return value;
}

//Captura o envio do formulario
form.onsubmit = (event) => {
    event.preventDefault();
//Cria um novo objeto com os detalhes na nova despesa (capturados dos dados enviados pelo formulario)
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
//Chama a função de adicionar na lista
    expenseAdd(newExpense);
}

//Adiciona novo item na lista
function expenseAdd(newExpense){
    try {
        //Cria o elemento para adicionar na lista
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");
        //Cria icone da categoria
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `assets/img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        
        //Cria a informação da despesa
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");
        
        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name
        
        //Cria o nome da despesa
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense_name;
        
        //Cria o icone de remover
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");     
        removeIcon.setAttribute("src","assets/img/remove.svg");  
        removeIcon.setAttribute("alt","remover");

        //Cria o valor da despesa
        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$","")}`;
        
        //Adiciona name e category em expense info (div)
        expenseInfo.append(expenseName,expenseCategory);


        //Adiciona as informçãoes do item
        expenseItem.append(expenseIcon,expenseInfo, expenseAmount,removeIcon);
        expenseList.append(expenseItem);

        //Atualiza os totais
        updateTotals();

    } catch (error) {
        alert("Não foi possivel atualizar a lista de despesas");
        console.log(error);
    }
}

//Atualiza os totais
function updateTotals() {
    try {
        //Recupera os itens da lista
        const items = expenseList.children;

        //Atualiza a quantidade de itens da lista.
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
    } catch (error) {
        console.log(erro);
        alert("Não foi possivel atualizar os totais");
    }
}
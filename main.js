const optionList =document.querySelectorAll('select');
     fromCurrency = document.querySelector('.from select');
     toCurrency = document.querySelector('.to select');
     input = document.querySelector('.input-box input');
     output = document.querySelector('.output-box input');
    convert = document.querySelector('.btn');


for(let i=0;i<optionList.length;i++){
    for(let currency_code in country_list){
let selected = i == 0 ? currency_code == 'USD' ? 'selected' :'':
                        currency_code == 'INR' ? 'selected' : '';

        let optionTag =`<option ${selected}>${currency_code}</option>`;

        optionList[i].insertAdjacentHTML('beforeend',optionTag);
    }

    optionList[i].addEventListener('change',(e)=>{
        loadFlag(e.target);
    })
}

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            const imgTag = element.parentElement.querySelector('img');
            imgTag.src=`https://flagcdn.com/16x12/${country_list[code].toLowerCase()}.png`;
        }
    }
}

function getExchangeRate(){
    const url= `https://v6.exchangerate-api.com/v6/4e835f2b5c37a40b35d502be/latest/USD`;

    fetch(url).then((response) => response.json()).then((result) => {
        let amount = result.conversion_rates[toCurrency.value];

        if(input.value >0){
            output.value = input.value *amount;
        }
        else{
            output.value =amount;
        }
    }).catch(() => {
        output.value = 'Something went wrong'
    })
}

convert.addEventListener('click',()=>{
    if(input.value !=0 && input.value!= ''){
        getExchangeRate()
    }
})
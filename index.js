'use strict'
const submitButton=document.querySelector('.submit-button');
const monthlyRepayments=document.querySelector('.monthy-repayments');
const totalRepay= document.querySelector('.total-repay');
const resultDisplay= document.querySelector('.result-container');
const emptyResults= document.querySelector('.right-container > .empty-results');
const clearAll= document.querySelector('.clear-all');
const myForm= document.querySelector('.my-form');
const interestOnly= document.querySelector('.interest-only');
const repaymentRadio=document.querySelector('.repayment-radio');
const interestRadio=document.querySelector('.interest-radio');
const interest= document.querySelector('.interest');
const repayOrInterest= document.querySelector('.repay-or-interest')


class Mortgage{
    constructor(principal,term,rate){
        this.principal=principal;
        this.term=term;
        this.rate=rate;
        this.n=12;
    }

    calculateMortgage(){
            let rate= (this.rate/100)/12;
            let n= this.term*this.n;
            let calculatedRate=(1+rate);
            let finalRate=Math.pow(calculatedRate,n);
            let x=(finalRate*rate)/(finalRate -1)
            let mp=(x*this.principal)
            let totalPay= mp * this.term * 12
            let totalInterest=totalPay-this.principal
            return {monthlyPayment:mp.toFixed(2), 
                repaymentOverYears:totalPay.toFixed(2), 
                totalInterest:totalInterest.toFixed(2)}
        }

        resetForm(){
            return myForm.reset();

        }

    clearResults(){
        emptyResults.style.display="block";
        resultDisplay.style.display="none";
        interestOnly.style.display="none";


    }

    hideResults(){
        emptyResults.style.display="none";
        resultDisplay.style.display="block";
        interestOnly.style.display="none";
    }
    showInterest(){
        emptyResults.style.display="none";
        resultDisplay.style.display="block";

        interestOnly.style.display="block";


    }
}

window.document.addEventListener('DOMContentLoaded',()=>{
    submitButton.addEventListener('click', (e)=>{
        e.preventDefault();
        const amount=parseInt(document.querySelector('#principal').value);
        const mortgageTerm= parseFloat(document.querySelector('#term').value);
        const mortgageRate= parseFloat(document.querySelector('#rate').value);
        const m1= new Mortgage(amount,mortgageTerm,mortgageRate);

        clearAll.addEventListener('click', ()=>{
            m1.resetForm();
            m1.clearResults();
        })

        let finalOutput=m1.calculateMortgage();
        console.log(finalOutput,"final Output")
        if(repaymentRadio.checked){
            console.log(repaymentRadio.checked,"repayment radio checking")
            let x=finalOutput.repaymentOverYears.split("");
            let f=finalOutput.monthlyPayment.split("");
            m1.hideResults();
            x.splice(3,0,",");
            f.splice(1,0,",");
            let z=f.join("");
            let y= x.join("");
            monthlyRepayments.innerHTML=z;
            totalRepay.innerHTML=y;
            repayOrInterest.innerHTML="Your monthly repayments";
        }
        else if(interestRadio.checked){
            console.log(interestRadio.checked,"interest radio checking")
            let m= finalOutput.totalInterest.split("");
            m1.showInterest();
            m.splice(3,0,",");
            let n= m.join("");
            repayOrInterest.innerHTML="Your Total Interest";
            monthlyRepayments.innerHTML=n;
            totalRepay.innerHTML=finalOutput.repaymentOverYears;

        }
    })
})

'use strict'

window.addEventListener('DOMContentLoaded', event => {
    // -----------Form elements--------------

    const $guestForm = document.querySelector('#guestForm')
    const $guestName = document.querySelector('#guestName')
    const $guestPhone = document.querySelector('#guestNumber')
    const $pronounCheckboxes = document.querySelectorAll('.pronounCheckbox')
    const $langCheckboxes = document.querySelectorAll('.langCheckbox')

    // --------------Forms---------------

    $guestPhone.addEventListener('input', event => {
        event.preventDefault()
        
        if (!$guestPhone.value.includes('+996') || !$guestPhone.value) {
            $guestPhone.value = '+996'
        }
        
    })

    // -----------Checkboxes-------------

    function uncheckAllCheckboxes(checkboxes = []){
        checkboxes.forEach(checkbox => {
            checkbox.checked = false
        })
    }
    $pronounCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', event => {
            uncheckAllCheckboxes($pronounCheckboxes)
            event.target.checked = true
        })
    })
    $langCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', event => {
            uncheckAllCheckboxes($langCheckboxes)
            event.target.checked = true
        })
    })

    //------------Guest Generation------------

    const guestGeneration = () => {
        const guest = {}

        guest.name = $guestName.value.toUpperCase()
        guest.phoneNumber = $guestPhone.value
        $pronounCheckboxes.forEach(checkbox => {
            if(checkbox.checked){
                guest.pronoun = checkbox.value
            }
        })
        $langCheckboxes.forEach(checkbox => {
            if(checkbox.checked){
                guest.lang = checkbox.value
            }
        })

        return guest
        
    }
    // ---------------Button--------------
    const $sendButton = document.querySelector('#sendButton')

    $sendButton.addEventListener('click', event => {
        event.preventDefault()

        new Promise ( (resolve, reject) => {
            let guest = null

            if ( $guestName.value.trim() && $guestPhone.value.trim() && $guestPhone.value.slice(4) && $guestPhone.value.length === 13) {
                guest = guestGeneration()
                resolve(guest)
            }
            reject()
        })
        .then((guest) => {
            fetch('http://localhost:3000/api', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(guest)
            }).then(data => {
                console.log(data)
                
                if(data.status >= 200 && data.status < 300){
                    alert('Приглашение отправленно')
                    $guestForm.reset()
                }else if (data.status == 404){
                    alert('Введен несущевствующий номер')
                    $guestForm.reset()
                }else{
                    alert('Гость уже был приглашен')
                    $guestForm.reset()
                }
    
            })
        })
        .catch(() => alert('Введите корректные данные'))      
    })
})
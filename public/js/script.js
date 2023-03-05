'use strict'

window.addEventListener('DOMContentLoaded', event => {
    // -----------Form elements--------------

    const $guestForm = document.querySelector('#guestForm')
    const $guestName = document.querySelector('#guestName')
    const $guestPhone = document.querySelector('#guestNumber')
    const $pronounCheckboxes = document.querySelectorAll('.pronounCheckbox')
    const $langCheckboxes = document.querySelectorAll('.langCheckbox')
    const $messageSendingStatus = document.querySelector('#sending')
    const $messageSuccesStatus = document.querySelector('#success')
    const $messageErrorStatus = document.querySelector('#error')
    const $messageWarningStatus = document.querySelector('#warning')
    const $clientCheckingStatus = document.querySelector('#checking')
    const $clientWaitingStatus = document.querySelector('#waiting')
    const $clientConnectedStatus = document.querySelector('#connected')
    const $listButton = document.querySelector('#listButton')
    // --------------Forms---------------

    $guestPhone.addEventListener('input', event => {
        event.preventDefault()
        
        if (!$guestPhone.value.includes('+') || !$guestPhone.value) {
            $guestPhone.value = '+'
        }
        const value = $guestPhone.value
        $guestPhone.value = value.replace(/[A-Za-zА-Яа-я.,~!@#$%^&*)(_:;"'/?~><|`= ]/g, '')
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
        guest.link = window.location.origin

        return guest
        
    }

    // --------------Whatsapp client status checking--------------

    let clientStatus
    const clientStatusCheck = setInterval(async () => {
        await fetch('/api/qrcode')
        .then((response) => response.json())
        .then((data) => {
            clientStatus = data.status
            if (data.status === true) {
                $clientConnectedStatus.classList.remove('hidden')
                $clientWaitingStatus.classList.add('hidden')
                $clientCheckingStatus.classList.add('hidden')
                $listButton.classList.remove('hidden')
            }else{
                $clientWaitingStatus.classList.remove('hidden')
                $clientConnectedStatus.classList.add('hidden')
                $clientCheckingStatus.classList.add('hidden')
                $listButton.classList.add('hidden')
            }
            for (let key in data) console.log(`${key}: ${data[key]}`)
        })
    },1000)

    // ---------------Button--------------

    const $sendButton = document.querySelector('#sendButton')

    $sendButton.addEventListener('click', event => {
        event.preventDefault()

        if (clientStatus === true) {
            new Promise ( (resolve, reject) => {
                let guest = null
    
                if ( $guestName.value.trim() && $guestPhone.value.trim() && $guestPhone.value.slice(4) && $guestPhone.value.length <= 20) {
                    guest = guestGeneration()
                    resolve(guest)
                }
                reject()
            })
            .then((guest) => {
                $messageSendingStatus.classList.remove('hidden')
                $guestForm.reset()
                fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(guest)
                }).then(data => {
                    $messageSendingStatus.classList.add('hidden')
                    
                    if(data.status >= 200 && data.status < 300){
                        $messageSuccesStatus.classList.remove('hidden')
                        const timer = setTimeout(() => {
                            $messageSuccesStatus.classList.add('hidden')
                        }, 2000)
                    }else if (data.status == 404){
                        $messageErrorStatus.classList.remove('hidden')
                        const timer = setTimeout(() => {
                            $messageErrorStatus.classList.add('hidden')
                        }, 2000)
                    }else{
                        $messageWarningStatus.classList.remove('hidden')
                        const timer = setTimeout(() => {
                            $messageWarningStatus.classList.add('hidden')
                        }, 2000)
                    }
        
                })
            })
            .catch(() => alert('Введите корректные данные'))      
        }else{
            alert('Ватсап не подключен, выполните подключение')
        }
    })
})
'use strict'

const $guestInfo = document.querySelectorAll('.guest')
const $messageSendingStatus = document.querySelector('#sending')
const $messageSuccesStatus = document.querySelector('#success')

$guestInfo.forEach( guest => {
    guest.addEventListener('click', event => {
        event.preventDefault
        
        if (event.target.tagName == 'BUTTON'){
            $messageSendingStatus.classList.remove('hidden')
            fetch('/api/list', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: event.target.id})
            })
              .then(data => {
                $messageSendingStatus.classList.add('hidden')
                if( data.status === 200 ) {
                    $messageSuccesStatus.classList.remove('hidden')
                    const timer = setTimeout(() => {
                        $messageSuccesStatus.classList.add('hidden')
                    }, 2000)
                }
              })
        }

    })
})
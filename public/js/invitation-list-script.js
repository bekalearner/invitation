'use strict'

const $guestInfo = document.querySelectorAll('.guest')

$guestInfo.forEach( guest => {
    guest.addEventListener('click', event => {
        event.preventDefault
        
        if (event.target.tagName == 'BUTTON'){
            fetch('http://localhost:3000/api/list', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: event.target.id})
            })
              .then(data => {
                if( data.status === 200 ) {
                    alert('Успешно отправлено')
                }
              })
        }

    })
})
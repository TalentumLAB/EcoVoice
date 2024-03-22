//funcion para traer los mensajes del chat cuando se carga la página
function showMessages(){
    let asistente = localStorage.getItem('asistant');
    if(asistente != null ){
        fetch(`${M.cfg.wwwroot}/blocks/chatbot_tany/api/getMessages.php`, {
            method: 'POST',
            body: JSON.stringify({
                thread_id: localStorage.getItem('thread')
            })
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            } else {
               return response.json();
            }
        })
        .then(data => {
            let message = data.data;

            message.forEach((message) => {
                if(message.assistant_id != null){
                    var botMessage = '<div class="message received">';
                    botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
                    botMessage += message.content[0].text.value +'</div>';
                
                    chatbox.innerHTML += botMessage;
                    chatbox.scrollTop = chatbox.scrollHeight;
                }else{
                    var userMessage = '<div class="message sent">' + message.content[0].text.value + '</div>';
                    chatbox.innerHTML += userMessage;
                }
                
                
            });
            
            
                            
        })
        .catch(error => {
            console.log(error);
            var botMessage = '<div class="message received">';
            botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
            botMessage += data.error.message +'</div>';
            chatbox.innerHTML += botMessage;
            chatbox.scrollTop = chatbox.scrollHeight;
        });
    }
}

//funcion para abrir el offcanvas

function toggleChat() {
    var chatContainer = document.getElementById('chat-container-wrapper');
    var isOpen = chatContainer.style.width === '500px';

    if (isOpen) {
        chatContainer.style.width = '0';
    } else {
        chatContainer.style.width = '500px';
    }
}

function sendMessage() {
    var userInput = document.getElementById('user-input');
    var chatbox = document.getElementById('chatbox');

    let userPrompt = '';

    if (userInput.value.trim() !== '') {
        var userMessage = '<div class="message sent">' + userInput.value + '</div>';
        chatbox.innerHTML += userMessage;
        userPrompt = userInput.value;
        userInput.value = '';
    }
    /**
     * Creo un hilo y lo agrego al storage
     */
    /**
     * verifico si hay hilo en el local storage
     */
    let hilo = localStorage.getItem('thread');

    if(hilo == null || hilo == undefined){

        let th =  async()=>{
            const [thr] = threadresponse = await Promise.all([
                fetch(`${M.cfg.wwwroot}/blocks/chatbot_tany/api/createThread.php`, {
                    method: 'POST',
                    body: ''
                })
            ])
            
            const thre =  await thr;
            return thre.json();
        }

        th().then(thread =>{
            localStorage.setItem('thread',thread.id)
            //ejecutar las respuestas
        /**
             * peticion al hilo
             */
        var botMessage = '<div class="message received">Tany esta procesando tu petición</div>';
        
        chatbox.innerHTML += botMessage;
        chatbox.scrollTop = chatbox.scrollHeight;
        let response = async()=>{
            const [messageResponse] = await Promise.all([
                fetch(`${M.cfg.wwwroot}/blocks/chatbot_tany/api/thread.php`, {
                    method: 'POST',
                    body: JSON.stringify({
                        message: userPrompt,
                        thread_id: localStorage.getItem('thread'),
                    })
                })
              ]);
    
              const messages = await messageResponse;
              
             return messages.json();
        }
        response().then(mess => {
             // verifico si gpt ya dio respuesta
             if(mess.status != 'completed'){
                let responserun = async()=>{
                    const [messageResponse] = await Promise.all([
                        fetch(`https://api.openai.com/v1/threads/${mess.thread_id}/runs/${mess.id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': 'Bearer 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' ,
                                'Content-Type': 'application/json',
                                'OpenAI-Beta': 'assistants=v1'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                              },
                        })
                    ]);
            
                    const messages = await messageResponse;
                    
                    return messages.json();
                }
                responserun().then(ok =>{

                    let messagesr = async()=>{
                        const [messageResponse] = await Promise.all([
                            fetch(`${M.cfg.wwwroot}/blocks/chatbot_tany/api/getMessages.php`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    message: userPrompt,
                                    thread_id: localStorage.getItem('thread'),
                                })
                            })
                          ]);
                
                          const messages = await messageResponse;
                          
                         return messages.json();
                    }
                    messagesr().then(m=>{
                        console.log(m);
                        let lastMessage = Object.values(m.data).pop();
                        console.log(lastMessage.content[0].text.value);
                        if(lastMessage.content[0].text.value){
                            var botMessage = '<div class="message received">';
                            botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
                            botMessage += lastMessage.content[0].text.value +'</div>';
                        
                            chatbox.innerHTML += botMessage;
                            chatbox.scrollTop = chatbox.scrollHeight;
                        }else{
                            var botMessage = '<div class="message received">';
                            botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">Tany no pudo procesar el mensaje</div>';
                            chatbox.innerHTML += botMessage;
                            chatbox.scrollTop = chatbox.scrollHeight;
                        }
                    })
                })
                
            }else{
                let messagesr = async()=>{
                    const [messageResponse] = await Promise.all([
                        fetch(`${M.cfg.wwwroot}/blocks/chatbot_tany/api/getMessages.php`, {
                            method: 'POST',
                            body: JSON.stringify({
                                message: userPrompt,
                                thread_id: localStorage.getItem('thread'),
                            })
                        })
                      ]);
            
                      const messages = await messageResponse;
                      
                     return messages.json();
                }
                messagesr().then(m=>{
                    console.log(m);
                    let lastMessage = Object.values(m.data).pop();
                    console.log(lastMessage.content[0].text.value);
                    if(lastMessage.content[0].text.value){
                        var botMessage = '<div class="message received">';
                        botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
                        botMessage += lastMessage.content[0].text.value +'</div>';
                    
                        chatbox.innerHTML += botMessage;
                        chatbox.scrollTop = chatbox.scrollHeight;
                    }else{
                        var botMessage = '<div class="message received">';
                        botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">Tany no pudo procesar el mensaje</div>';
                        chatbox.innerHTML += botMessage;
                        chatbox.scrollTop = chatbox.scrollHeight;
                    }
                })
            }
            
        })
        .catch(error => {
            console.log(error);
            var botMessage = '<div class="message received">';
            botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
            botMessage += error +'</div>';
            chatbox.innerHTML += botMessage;
            chatbox.scrollTop = chatbox.scrollHeight;
        })
            
        })
        
    }else{
        //ejecutar las respuestas
        /**
        * peticion al hilo
        */
        var botMessage = '<div class="message received">Tany esta procesando tu petición</div>';
        
        chatbox.innerHTML += botMessage;
        chatbox.scrollTop = chatbox.scrollHeight;
        let response = async()=>{
            const [messageResponse] = await Promise.all([
                fetch(`${M.cfg.wwwroot}/blocks/chatbot_tany/api/thread.php`, {
                    method: 'POST',
                    body: JSON.stringify({
                        message: userPrompt,
                        thread_id: localStorage.getItem('thread'),
                    })
                })
              ]);
    
              const messages = await messageResponse;
              
             return messages.json();
        }
        response().then(mess => {
            // verifico si gpt ya dio respuesta
           
            if(mess.status != 'completed'){
                let responserun = async()=>{
                    const [messageResponse] = await Promise.all([
                        fetch(`https://api.openai.com/v1/threads/${mess.thread_id}/runs/${mess.id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': 'Bearer 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' ,
                                'Content-Type': 'application/json',
                                'OpenAI-Beta': 'assistants=v1'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                              },
                        })
                    ]);
            
                    const messages = await messageResponse;
                    
                    return messages.json();
                }
                responserun().then((ok) =>{
                    let messagesr = async()=>{
                        const [messageResponse] = await Promise.all([
                            fetch(`${M.cfg.wwwroot}/blocks/chatbot_tany/api/getMessages.php`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    message: userPrompt,
                                    thread_id: localStorage.getItem('thread'),
                                })
                            })
                          ]);
                
                          const messages = await messageResponse;
                          
                         return messages.json();
                    }
                    messagesr().then(m=>{
                        console.log(m);
                        let lastMessage = Object.values(m.data).pop();
                        console.log(lastMessage.content[0].text.value);
                        if(lastMessage.content[0].text.value){
                            var botMessage = '<div class="message received">';
                            botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
                            botMessage += lastMessage.content[0].text.value +'</div>';
                        
                            chatbox.innerHTML += botMessage;
                            chatbox.scrollTop = chatbox.scrollHeight;
                        }else{
                            var botMessage = '<div class="message received">';
                            botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">Tany no pudo procesar el mensaje</div>';
                            chatbox.innerHTML += botMessage;
                            chatbox.scrollTop = chatbox.scrollHeight;
                        }
                    })
                })
            }else{
                let messagesr = async()=>{
                    const [messageResponse] = await Promise.all([
                        fetch(`${M.cfg.wwwroot}/blocks/chatbot_tany/api/getMessages.php`, {
                            method: 'POST',
                            body: JSON.stringify({
                                message: userPrompt,
                                thread_id: localStorage.getItem('thread'),
                            })
                        })
                      ]);
            
                      const messages = await messageResponse;
                      
                     return messages.json();
                }
                messagesr().then(m=>{
                    console.log(m);
                    let lastMessage = Object.values(m.data).pop();
                    console.log(lastMessage.content[0].text.value);
                    if(lastMessage.content[0].text.value){
                        var botMessage = '<div class="message received">';
                        botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
                        botMessage += lastMessage.content[0].text.value +'</div>';
                    
                        chatbox.innerHTML += botMessage;
                        chatbox.scrollTop = chatbox.scrollHeight;
                    }else{
                        var botMessage = '<div class="message received">';
                        botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">Tany no pudo procesar el mensaje</div>';
                        chatbox.innerHTML += botMessage;
                        chatbox.scrollTop = chatbox.scrollHeight;
                    }
                })
            }
            
        })
        .catch(error => {
            console.log(error);
            var botMessage = '<div class="message received">';
            botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
            botMessage += error +'</div>';
            chatbox.innerHTML += botMessage;
            chatbox.scrollTop = chatbox.scrollHeight;
        })
   
    }

       
    
    
}
// ... (el mismo JavaScript que antes) ...

    

function sendMessageChat(){
    var userInput = document.getElementById('user-input');
    var chatbox = document.getElementById('chatbox');

    let userPrompt = '';

    if (userInput.value.trim() !== '') {
        var userMessage = '<div class="message sent">' + userInput.value + '</div>';
        chatbox.innerHTML += userMessage;
        userPrompt = userInput.value;
        userInput.value = '';
    }
    /**
     * peticion al chat
     */
    var botMessage = '<div class="message received">Tany esta procesando tu petición</div>';
            
    chatbox.innerHTML += botMessage;
    chatbox.scrollTop = chatbox.scrollHeight;
      
    fetch(`${M.cfg.wwwroot}/blocks/chatbot_tany/api/chat.php`, {
            method: 'POST',
            body: JSON.stringify({
                message: userPrompt,
            })
        })
        .then(result=>{
            if (!result.ok) {
                throw Error(result.statusText)
            } else {
                return result.json();
            }
        })
        .then(data => {
            try {
                var botMessage = '<div class="message received">';
                botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
                botMessage += data.choices[0].message.content +'</div>';
            
                chatbox.innerHTML += botMessage;
                chatbox.scrollTop = chatbox.scrollHeight;
            } catch (error) {
                var botMessage = '<div class="message received">';
                botMessage += '<img class="avatar" src="../blocks/chatbot_tany/pix/avatar.png" alt="Tany Avatar">';
                botMessage += data.error.message +'</div>';
            
                chatbox.innerHTML += botMessage;
                chatbox.scrollTop = chatbox.scrollHeight;
            }
        })
        .catch(error => {
            console.log(error);
            // document.querySelector('#openai_input').classList.add('error')
            // document.querySelector('#openai_input').placeholder = errorString
        })
}

//funcion para leer los archivos y hacer la peticion de aprendizaje

//funcion para leer la bd con las consultas predefinidas


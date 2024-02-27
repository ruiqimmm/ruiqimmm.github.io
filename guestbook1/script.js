<script>
    window.onload = function () {
        const messageDisplay = document.getElementById('message-display');
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach(message => {
            addMessageToDisplay(message);
        });

        document.getElementById('message-form').addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name-input').value.trim();
            const gender = document.getElementById('gender-input').value;
            const contact = document.getElementById('contact-input').value.trim();
            const messageText = document.getElementById('message-input').value.trim();

            if (name && gender && contact && messageText) {
                const message = {
                    name,
                    gender,
                    contact,
                    message: messageText
                };

                messages.push(message);
                localStorage.setItem('messages', JSON.stringify(messages));

                clearFormInputs();
                addMessageToDisplay(message);
            }
        });

        function addMessageToDisplay(message) {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';

            const nameLabel = document.createElement('span');
            nameLabel.textContent = '姓名：' + message.name;
            messageItem.appendChild(nameLabel);

            const contactLabel = document.createElement('span');
            contactLabel.textContent = '联系方式：' + message.contact;
            messageItem.appendChild(contactLabel);

            const messageText = document.createElement('p');
            messageText.textContent = '留言：' + message.message;
            messageItem.appendChild(messageText);

            messageDisplay.appendChild(messageItem);
        }

        function clearFormInputs() {
            document.getElementById('name-input').value = '';
            document.getElementById('contact-input').value = '';
            document.getElementById('message-input').value = '';
        }
    };
</script>